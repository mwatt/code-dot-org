/* global dashboard */

$(window).load(function () {
  $('#submitEvaluation').click(function () {
    var evaluationResponses = [];

    $('input:checked').each(function () {
      if (this.hasAttribute('value')) {
        evaluationResponses.push(this.value);
      }
    });

    $('#answerModuleList').val(evaluationResponses);
  });
});
