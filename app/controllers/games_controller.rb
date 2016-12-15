class GamesController < ApplicationController

  def index
    @games = Game.all
    render json: @games
  end

  def new
    @game = Game.new
  end

  def create
    @game = Game.create(:state => params["game"]["state"])
    render json: @game.to_json(only: [:id, :state])
  end

  def show
    @game = Game.find(params[:id])
    render json: @game.to_json(only: [:id, :state]) 
  end

  def edit
    
  end

  def update
   @game = Game.find(params[:id])
   @game.update(state: params["game"]["state"])
  end

  def delete
    
  end
end
