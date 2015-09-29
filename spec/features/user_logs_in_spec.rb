require 'rails_helper'

feature 'Unauthenticated user' do

  scenario "is redirected to login page" do
    @user = User.create!(username: "Morgan",
                         password: "password",
                         password_confirmation: "password")

    visit root_path
    expect(current_path).to eq('/login')

    fill_in "username", with: @user.username
    fill_in "password", with: "password"

    click_button "Submit"

    expect(current_path).to eq(root_path)
    within("h3") do
      expect(page).to have_content "FLACK"
    end
  end

  scenario "can't login with invalid credentials" do
    visit root_path
    expect(current_path).to eq('/login')

    fill_in "username", with: "notauser"
    fill_in "password", with: "password"

    click_button "Submit"

    expect(current_path).to eq('/login')
    expect(page).to have_content "Invalid Login"
  end
end
