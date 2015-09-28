class MessagesController < ApplicationController
  def create
    message = Message.create(body: params[:body], channel_id: params[:channel], user_id: current_user.id)
    channel = Channel.find(params[:channel])
    message_submit = { user: message.user.username, body: message.body, channel_id: message.channel_id }.to_json
    $redis.publish("flack:#{channel.id}", message_submit)
    render status: 200, json: message_submit
  end
end
