// This should be auto generate
var React = require("react"),
  ReactDom = require('react-dom'),
  App = React.createFactory(require("components/app"));

if (typeof window !== "undefined") {
  window.onload = function() {
    ReactDom.render(App(), document.getElementById("mount"));
  };
}
