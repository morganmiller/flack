class ChannelsController < ApplicationController
  respond_to :html

  def index
    @channels = Channel.all
  end

  def show
    @channel = Channel.find(params[:id])
    render json: { attributes: @channel.as_json,
                  messages: @channel.message_data.as_json }.as_json
  end

  private

  def channel_params
    params.require(:channel).permit(:name)
  end
end
