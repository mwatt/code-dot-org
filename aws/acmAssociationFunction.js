exports.handler = function(event, context) {
  var response = require('cfn-response');
  console.log('REQUEST RECEIVED:\\n', JSON.stringify(event));
  if (event.RequestType == 'Delete') {
      response.send(event, context, response.SUCCESS);
      return;
  }
  var distributionId = event.ResourceProperties.DistributionId;
  var certificateArn = event.ResourceProperties.CertificateArn;
  var physicalId = 'connection:' + certificateArn + ':to:' + 'distributionId';
  var responseData = {};
  if (distributionId && certificateArn) {
      var AWS = require('aws-sdk');
      var cloudfront = new AWS.CloudFront();
      cloudfront.getDistributionConfig({Id: distributionId}, function(err, data) {
          if (err) {
              responseData = {Error: 'getDistributionConfig call failed'};
              console.log(responseData.Error + ':\\n', err);
              response.send(event, context, response.FAILED, responseData);
          }
          else {
              var etag = data.ETag;
              var config = data.DistributionConfig;
              if (!config['ViewerCertificate']) {
                  responseData = {Error: 'No ViewerCertificate'};
                  console.log(responseData.Error + ':\\n', err);
                  response.send(event, context, response.FAILED, responseData);
                  return;
              }
              if (config['ViewerCertificate']['Certificate'] == certificateArn) {
                  response.send(event, context, response.SUCCESS, responseData, physicalId);
                  return;
              }
              config['ViewerCertificate'] = {
                'ACMCertificateArn': certificateArn,
                'MinimumProtocolVersion': 'TLSv1',
                'SSLSupportMethod': 'sni-only'
              };
              cloudfront.updateDistribution({
                Id: distributionId,
                DistributionConfig: config,
                IfMatch: etag
              }, function(err, data) {
                if (err) {
                    responseData = {Error: 'updateDistribution call failed'};
                    console.log(responseData.Error + ':\\n', err);
                    response.send(event, context, response.FAILED, responseData);
                }
                response.send(event, context, response.SUCCESS, responseData, physicalId);
              });
          }
      });
  } else {
      responseData = {Error: 'Required properties DistributionId and/or CertificateArn not specified'};
      console.log(responseData.Error);
      response.send(event, context, response.FAILED, responseData);
  }
};
