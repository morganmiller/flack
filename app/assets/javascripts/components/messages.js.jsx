var Messages = React.createClass({
  render: function(){
    var channel = this.props.channel;

    var messages = this.props.channel.messages.map(function(m){
        return (
          <li>{m.user}: {m.body}</li>
        )
    });

    return(
      <div className="messages">
        <h2>
          { channel.attributes.name }: { channel.attributes.id }
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

//this.state.socket = io.params
//componentDidMount is where we will be listening for our sockets
