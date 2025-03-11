require "test_helper"

class Api::BankAccountsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_bank_accounts_index_url
    assert_response :success
  end

  test "should get create" do
    get api_bank_accounts_create_url
    assert_response :success
  end
end
