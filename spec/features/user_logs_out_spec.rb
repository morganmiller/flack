require 'rails_helper'

feature 'Logged in user' do

  scenario "can log out" do
    @user = User.create!(username: "Morgan",
                         password: "password",
                         password_confirmation: "password")

    visit root_path
    expect(current_path).to eq('/login')

    fill_in "username", with: @user.username
    fill_in "password", with: "password"

    click_button "Submit"
    expect(current_path).to eq('/')
    click_on "Logout"
    expect(current_path).to eq('/login')
  end
end
