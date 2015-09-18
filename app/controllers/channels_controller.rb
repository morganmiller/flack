class ChannelsController < ApplicationController
  respond_to :html

  def index
    @channels = Channel.all
  end

  def show
    @channel = Channel.find(params[:id])
    # render template: "show", layout: false
    render partial: "channels/channel", locals: { channel: @channel }
  end

  private

  def channel_params
    params.require(:channel).permit(:name)
  end
end
