var Messages = React.createClass({
  render: function(){
    var channel = this.props.channel;
    var messages = this.props.messages.map(function(m){
        return ( <li>{m.user}: {m.body}</li> )
    });

    return(
      //<div className="messages">
      //  <h2>
      //    { channel.name }: { channel.id }
      //  </h2>
      //  <ul>
      //    { messages }
      //  </ul>
      //</div>
      <div className="messages">
              <div className="panel panel-info">
                <div className="panel-heading">
                  { channel.name }
                </div>
                <div className="panel-body">
                  <div className="media-body">
                    <div className="media">
                      <div className="media-body" >
                        <ul className="media-list">
                          <li className="media">
                          { messages }
                            </li>
                          </ul>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
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
      <input type="text" className="form-control" placeholder="Say something..." ref="body" />
      <input type="submit" value="Send" className="btn btn-info"/>
    </form>

    )
  }
});
