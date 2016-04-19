/* global React */

var DistrictReport = React.createClass({
  componentDidMount: function () {
    $.ajax({
      async: false,
      type: "GET",
      url: "https://www.gstatic.com/charts/loader.js",
      dataType: "script"
    }).done(this.handleLoadCharts);
  },

  handleLoadCharts: function () {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['table']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(this.drawTable);
  },

  drawTable: function () {
    var jsonData = $.ajax({
      url: "/api/v1/pd/district_reports",
      dataType: "json",
      async: false
    }).responseText;

    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);

    // Instantiate and draw our chart, passing in some options.
    var table_div = $(ReactDOM.findDOMNode(this)).find('#table-div')[0];
    var table = new google.visualization.Table(table_div);

    table.draw(data, {
      cssClassNames: {
        headerRow: 'table-clean',
        headerCell: 'table-clean',
        // tableRow: 'table-clean',
        // oddTableRow: 'table-clean'
      }
    });
  },

  render: function () {

    return (
      <div>
        <div id="table-div" width="100%"></div>
      </div>
    );
  }
});
module.exports = DistrictReport;
