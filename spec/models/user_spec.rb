require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { User.create(username: "jdog", password: "password") }

  it 'is valid' do
    expect(user).to be_valid
  end
end
