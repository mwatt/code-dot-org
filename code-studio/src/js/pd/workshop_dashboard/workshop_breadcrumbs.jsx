/* global React */

var Breadcrumb = require('react-bootstrap').Breadcrumb;

var WorkshopBreadcrumbs = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  propTypes: {
    routes: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        breadcrumbs: React.PropTypes.array
      })
    ).isRequired,
    params: React.PropTypes.object.isRequired,
    children: React.PropTypes.object.isRequired
  },

  handleClick: function(path, e) {
    e.preventDefault();
    this.context.router.push(path);
  },

  renderBreadcrumbItems: function() {
    var breadcrumbItems = [];
    var builtPath = "/";
    breadcrumbItems.push({name: "Workshop Dashboard", path: builtPath});

    if (this.props.routes[1].breadcrumbs) {
      var breadcrumbs = this.props.routes[1].breadcrumbs;
      for (var i = 0; i < breadcrumbs.length; i++) {
        var breadcrumb = breadcrumbs[i];
        var paramName = breadcrumb[0].toLowerCase() + breadcrumb.substr(1) + "Id";
        builtPath += this.props.params[paramName] || breadcrumb;
        breadcrumbItems.push({name: breadcrumb, path: builtPath});
      }
    }

    return breadcrumbItems.map( function(breadcrumbItem, i) {
      if (i < breadcrumbItems.length - 1) {
        return (
          <Breadcrumb.Item
            href={this.context.router.createHref(breadcrumbItem.path)}
            onClick={this.handleClick.bind(null, breadcrumbItem.path)}
            key={i}
          >
            {breadcrumbItem.name}
          </Breadcrumb.Item>
        );
      } else {
        return (
          <Breadcrumb.Item active key={i}>
            {breadcrumbItem.name}
          </Breadcrumb.Item>
        );
      }
    }.bind(this));
  },

  render: function () {
    return (
      <div>
        <Breadcrumb>
          {this.renderBreadcrumbItems()}
        </Breadcrumb>
        {this.props.children}
      </div>
    );
  }
});
module.exports = WorkshopBreadcrumbs;