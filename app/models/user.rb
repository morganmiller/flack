class User < ActiveRecord::Base
  has_secure_password
  has_many :messages
  has_many :user_channels
  has_many :channels, through: :user_channels
end
