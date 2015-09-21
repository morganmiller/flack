class Channel < ActiveRecord::Base
  has_many :messages
  has_many :user_channels
  has_many :users, through: :user_channels

  def message_data
    messages.map do |message|
      { body: message.body, user: message.user.username }
    end
  end
end
