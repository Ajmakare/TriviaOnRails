# db/migrate/003_remove_user_id_from_scores.rb
class RemoveUserIdFromScores < ActiveRecord::Migration[6.1]
    def change
      remove_column :scores, :user_id
    end
  end
  