require 'rails_helper'

RSpec.describe MessagesController, :type => :controller do
  describe "#create" do
    let!(:user) { User.create(username: "jdog", password: "password") }
    let!(:channel) { Channel.create(name: "test channel")}

    it "creates a message" do
      controller.stub(:current_user).and_return(user)
      params = {body: "Hey there", channel: channel.id}
      post :create, params

      expect(response).to have_http_status(:success)

      expected_body = {"user" => "jdog",
                       "body" => "Hey there",
                       "channel_id" => channel.id}.to_json
      expect(response.body).to eq(expected_body)
    end
  end
end
