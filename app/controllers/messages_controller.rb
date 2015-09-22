class MessagesController < ApplicationController
  def create
    message = Message.create(body: params[:body], channel_id: params[:channel])
    render status: 200, json: message.as_json
  end
end
