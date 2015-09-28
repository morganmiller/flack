//Probably these changes would be way better:

// 1. Rather than Channels, relegate most of this logic to a MessageBoard className
    // and separate Channels out of it, to make more modular. But the channel does dictate
    // the entire state of the message board, so is that really necessary?

// 2. Messages = AllMessages, and a nested Message component. Again, necessary, orrrrr?

//TODO: Get new message rendering on submit
//TODO: implement node socket listener... something with componentDidMount, like:
    //this.state.socket = io.params
    //componentDidMount is where we will be listening for our sockets


var Channels = React.createClass({
  getInitialState: function() {
    return ({ currentChannel: fetchChannel.call(this, "1"), messages: null })
  },

  componentDidMount() {
    socket.on("message", function(data){
      var message = {body: data.body, channel: data.channel_id};
      console.log(message);
      this.setState({messages: this.state.messages.concat(message)});
    }.bind(this))
  },

  //_messageReceive(message) {
  //  var {messages} = this.state;
  //  messages.push(message);
  //  this.setState({message});
  //},

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
      data: messageData,
      success: function(data) {
        this.setState({messages: this.state.messages.concat(data)});
        //this.state.currentChannel.messages;
      }.bind(this)
      //TODO: maybe add error handler
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

  //appendNewMessage: function(){
  //  //this is not working when I invoke it, but it also doesn't break anything...
  //
  //  //what i need to do is somehow append an additional message object to the messages div
  //  //will this require a Message component as a child of Messages or can I re-use some code and put in the right place?
  //  //Does it need createElement?
  //  //This is not jQuery.
  //
  //  //....i think i need to have the "currentChannel"
  //  //and Messages component separate from one another
  //  //currentChannel is a STATE that passes props to Messages
  //  //(which is kind of already happening?)
  //  //newMessage is a STATE that also passes props to Messages
  //  //Both state changes trigger the Messages div to react?
  //  //or maybe a singular Message component that is rendered by Messages
  //  //fuck if i know
  //
  //  if(this.state.newMessage){
  //    return(
  //      <Messages channel={this.state.currentChannel} />
  //    )}
  //},

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
