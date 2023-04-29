# models/score.rb
require 'active_record'

class Score < ActiveRecord::Base
  validates :score, presence: true
  validates :username, presence: true
end
