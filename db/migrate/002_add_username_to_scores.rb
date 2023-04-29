# db/migrate/002_add_username_to_scores.rb
class AddUsernameToScores < ActiveRecord::Migration[6.1]
    def change
      add_column :scores, :username, :string
    end
  end
  