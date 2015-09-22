class MessagesController < ApplicationController
  def create
    message = Message.create(body: params[:body])
  end
end
