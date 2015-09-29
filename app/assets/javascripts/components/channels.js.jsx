var Channels = React.createClass({
  getInitialState: function() {
    return ({ currentChannel: fetchChannel.call(this, "1"), messages: null })
  },

  componentDidMount() {
    socket.on("message", function(data){
      var message = {body: data.body, user: data.user, channel: data.channel_id};
      console.log(message);
      this.setState({messages: this.state.messages.concat(message)});
    }.bind(this))
  },

  handleClick: function(e){
    e.preventDefault();
    this.setState({ currentChannel: fetchChannel.call(this, e.target.id)});
  },

  handleMessageSubmit: function(message) {
    var messageData = {body: message.body, channel: this.state.currentChannel.id};

    $.ajax({
      url: '/messages',
      dataType: 'json',
      type: 'POST',
      data: messageData
    })
  },

  messageBlock: function(){
    if(this.state.currentChannel) {
      return(
        <div className="panel panel-info">
        <Messages channel={this.state.currentChannel} messages={this.state.messages} />
        <MessageForm onMessageSubmit={this.handleMessageSubmit} />
      </div>
    )} else {
      return( <p>Loading...</p> )
    }
  },

  render: function(){
    var channels = this.props.channels.map(function(c) {
      return (<li><a href={"/channels/" + c.id} onClick={this.handleClick} id={c.id}>
                { c.name }
      </a></li>)
    }.bind(this));

    return(
      <div className="row">
        <div className="col-md-4">
          <div className="panel panel-primary">
            <div className="panel-heading">Channels</div>
              <div className="panel-body">
                <ul className="media-list">
                  <div className="media-body">
                    <div className="media">
                      <div className="media-body" >
                        <li className="media">{ channels }</li>
                      </div>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
        </div>
      <div className="col-md-8">
        { this.messageBlock() }
      </div>
      </div>

    )
  }
});

function fetchChannel(channelId) {
  $.ajax({
    url: '/channels/' + channelId,
    success: function(response) {
      this.setState({currentChannel: response.attributes,
                     messages: response.messages});
    }.bind(this)
  });
}
