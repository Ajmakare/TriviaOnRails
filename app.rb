# app.rb
require 'sinatra'
require 'json'
require 'sinatra/activerecord'
require_relative 'app/models/score'
require 'rack/cors'

# Database configuration
set :database_file, 'config/database.yml'

use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:get, :post, :options]
  end
end

# GET /scores - Retrieve all scores
get '/scores' do
  content_type :json
  Score.all.to_json
end

# GET /scores/:id - Retrieve a specific score by id
get '/scores/:id' do
  content_type :json
  score = Score.find_by(id: params[:id])

  if score
    score.to_json
  else
    status 404
    { error: 'Score not found' }.to_json
  end
end

# POST /scores - Create a new score
post '/scores' do
  content_type :json
  data = JSON.parse(request.body.read)
  score = Score.new(score: data['score'], user_id: data['user_id'], username: data['username'])

  if score.save
    score.to_json
  else
    status 422
    { error: score.errors.full_messages }.to_json
  end
end

# PUT /scores/:id - Update an existing score
put '/scores/:id' do
  content_type :json
  score = Score.find_by(id: params[:id])

  if score
    data = JSON.parse(request.body.read)
    score.score = data['score'] if data['score']
    score.user_id = data['user_id'] if data['user_id']
    score.username = data['username'] if data['username']

    if score.save
      score.to_json
    else
      status 422
      { error: score.errors.full_messages }.to_json
    end
  else
    status 404
    { error: 'Score not found' }.to_json
  end
end

# DELETE /scores/:id - Delete a score by id
delete '/scores/:id' do
  content_type :json
  score = Score.find_by(id: params[:id])

  if score
    score.destroy
    { success: 'Score deleted' }.to_json
  else
    status 404
    { error: 'Score not found' }.to_json
  end
end
