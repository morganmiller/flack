var Messages = React.createClass({
  render: function(){
    var channel = this.props.channel;
    var messages = this.props.messages.map(function(m){
        return ( <li>{m.user}: {m.body}</li> )
    });

    return(
      <div className="messages">
        <h2>
          { channel.name }: { channel.id }
        </h2>
        <ul>
          { messages }
        </ul>
      </div>
    )
  }
});

var MessageForm = React.createClass({
  handleSubmit: function(event) {
    event.preventDefault();
    var body = React.findDOMNode(this.refs.body).value.trim();
    if (!body) { return; }
    this.props.onMessageSubmit({body: body});

    React.findDOMNode(this.refs.body).value = '';
    return;
  },

  render: function() {
    return(
      <form className="messageForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Say something..." ref="body" />
        <input type="submit" value="Post" />
      </form>
    )
  }
});
