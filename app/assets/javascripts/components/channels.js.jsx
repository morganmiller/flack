var Channels = React.createClass({
  getInitialState: function() {
    return ({ currentChannel: fetchChannel.call(this, "1") })
  },

  handleClick: function(e){
    e.preventDefault();
    this.setState({ currentChannel: fetchChannel.call(this, e.target.id)});
    console.log(this.state)
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
        <Messages channel={this.state.currentChannel} /></div>
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
