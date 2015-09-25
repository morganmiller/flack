class MessagesController < ApplicationController
  def create
    message = Message.create(body: params[:body], channel_id: params[:channel], user_id: current_user.id)
    render status: 200, json: { user: message.user.username, body: message.body }.as_json
  end
end
