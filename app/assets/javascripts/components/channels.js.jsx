var Channels = React.createClass({
  getInitialState: function() {
    return ({ currentChannel: fetchChannel.call(this, "1"), newMessage: [] })
  },

  handleClick: function(e){
    e.preventDefault();
    this.setState({ currentChannel: fetchChannel.call(this, e.target.id)});
    console.log(this.state)
  },

  handleMessageSubmit: function(message) {

    $.ajax({
      url: '/messages',
      dataType: 'json',
      type: 'POST',
      data: message,
      success: function(data) {
        this.setState({newMessage: data});
      }.bind(this)
      //TODO: maybe add error handler
    })
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
        <Messages channel={this.state.currentChannel} />
        <MessageForm onMessageSubmit={this.handleMessageSubmit} />
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
