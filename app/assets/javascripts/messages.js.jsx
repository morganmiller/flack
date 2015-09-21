var ShowMessages = React.createClass({
  render: function(){
    return React.createElement("div", {onClick: this.handleClick}, "idk");
  },

  handleClick: function() {
    //$(".message-board").setState({messages: this.props});
    $.ajax({
      url: '/channels/' + this.props.id,
      type: GET,
      success: function(response) {
        this.setState({messages: response.body});
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {messages: "Welcome to Flack!"}
  }
});

$(document).ready(function(){
  debugger;
  React.render(
    React.createElement(ShowMessages),
    document.getElementById("channels-list")
  )
});
  //
  //var Hello = React.createClass({
  //  render: function() {
  //    return React.createElement("div", null, "Hello World");
  //  }
  //});
  //
  //$(document).ready(function() {
  //  React.render(
  //    React.createElement(Hello),
  //    document.getElementById('articles')
  //  );
  //});
