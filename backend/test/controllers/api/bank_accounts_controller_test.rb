# frozen_string_literal: true

require "test_helper"

module Api
  class BankAccountsControllerTest < ActionDispatch::IntegrationTest
    test "should get index" do
      get api_bank_accounts_index_url
      assert_response :success
    end

    test "should get create" do
      get api_bank_accounts_create_url
      assert_response :success
    end
  end
end
