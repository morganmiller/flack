var Channels = React.createClass({
  getInitialState: function() {
    return ({ currentChannel: fetchChannel.call(this, "1"), newMessage: [] })
  },

  handleClick: function(e){
    e.preventDefault();
    this.setState({ currentChannel: fetchChannel.call(this, e.target.id)});
  },

  handleMessageSubmit: function(message) {
    var messageData = {body: message.body, channel: this.state.currentChannel.attributes.id};

    $.ajax({
      url: '/messages',
      dataType: 'json',
      type: 'POST',
      data: messageData,
      success: function(data) {
        this.setState({newMessage: message});
      }.bind(this)
      //TODO: maybe add error handler
    })
  },

  messageBlock: function(){
    if(this.state.currentChannel) {
      return(
        <div>
        <Messages channel={this.state.currentChannel} />
        <MessageForm onMessageSubmit={this.handleMessageSubmit} />
        </div>
    );

    } else {
      return(<p>Loading...</p>)
    }
  },

  render: function(){
    var channels = this.props.channels.map(function(c) {
      return (<li><a href={"/channels/" + c.id} onClick={this.handleClick} id={c.id}>
                { c.name }
      </a></li>)
    }.bind(this));

    return(
      <div>
        <div className="channels">
        <ul id="channels">
      { channels }
        </ul>
        </div>
      { this.messageBlock() }
      </div>
    )
  }
});

function fetchChannel(channelId) {
  $.ajax({
    url: '/channels/' + channelId,
    success: function(response) {
      this.setState({currentChannel: response});
    }.bind(this)
  });
}
