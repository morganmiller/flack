require 'rails_helper'

feature 'Unauthenticated User' do

  scenario "can sign up" do

    visit root_path
    expect(current_path).to eq('/login')
    click_on "Signup"
    expect(current_path).to eq('/signup')

    fill_in "user_username", with: "Justin"
    fill_in "user_password", with: "password"
    fill_in "user_password_confirmation", with: "password"

    click_button "Submit"
    expect(current_path).to eq('/')
    within("h3") do
      expect(page).to have_content "FLACK"
    end
  end
end
