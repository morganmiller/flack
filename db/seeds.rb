class Seed

  def initialize
    make_users
    make_channels
    make_messages
  end

  def make_users
    User.create(username: "Morgan", password: "password")
    User.create(username: "Justin", password: "password")
    puts "made users"
  end

  def make_channels
    Channel.create(name: "Get Pitted")
    Channel.create(name: "Jurassic Park")
    puts "made channels"
  end

  def make_messages
    Message.create(user_id: 1, channel_id: 2, body: "Dinosaurs are so freakin cool")
    Message.create(user_id: 2, channel_id: 2, body: "Dinosaurs suck")
    Message.create(user_id: 1, channel_id: 2, body: "Justin why are you in this channel if you don't like dinosaurs")

    Message.create(user_id: 2, channel_id: 1, body: "so pitted")
    Message.create(user_id: 2, channel_id: 1, body: "bro")
    Message.create(user_id: 2, channel_id: 1, body: "is anyone surfin tomorrow?")
    Message.create(user_id: 2, channel_id: 1, body: "sick swells")
    puts "posted messages"
  end
end

Seed.new
