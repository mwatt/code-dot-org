/* global React */

var Report = React.createClass({
  propTypes: {
    dataUrl: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {chartsLoaded: false, data: null};
  },

  componentDidMount: function () {
    // Google APIs only allow loading the charts once. Re-use if it has already been loaded.
    if (typeof google === 'object' && typeof google.visualization === 'object') {
      this.handleChartsLoaded();
    } else {
      $.ajax({
        type: "GET",
        url: "https://www.gstatic.com/charts/loader.js",
        dataType: "script"
      }).done(function () {
        // Load the Visualization API and the table package.
        google.charts.load('current', {'packages':['table']});

        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(this.handleChartsLoaded);
      }.bind(this));
    }

    $.ajax({
      type: "GET",
      url: this.props.dataUrl,
      dataType: "json"
    }).done(this.handleDataLoaded)
  },

  componentDidUpdate: function () {
    if (this.state.chartsLoaded && this.state.data) {
      this.drawTable();
    }
  },

  handleChartsLoaded: function () {
    this.state.chartsLoaded = true;
    this.setState(this.state);
  },

  handleDataLoaded: function (data) {
    this.state.data = data;
    this.setState(this.state);
  },

  drawTable: function () {
    // Create our data table out of JSON data loaded from server.
    var dataTable = new google.visualization.DataTable(this.state.data);

    // Instantiate and draw our chart, passing in some options.
    var table_div = $(ReactDOM.findDOMNode(this)).find('#table-div')[0];
    var table = new google.visualization.Table(table_div);

    table.draw(dataTable, {allowHtml: true});
  },

  render: function () {
    var spinner = null;
    if (!this.state.chartsLoaded || !this.state.data) {
      spinner  = <i className="fa fa-spinner fa-pulse fa-3x" />;
    }
    return (
      <div>
        {spinner}
        <div id="table-div" width="100%"></div>
      </div>
    );
  }
});
module.exports = Report;
