class TagsController < ApplicationController
  
  def index
  	@tags = Tag.all
  	render json: @tags.to_json(include: [:books])
  end

  def show
    @tag = Tag.find(params[:id])
    render json: @tag.to_json(include: :books)
  end

  private

  def tag_params
  	params.require(:tag).permit(:name)
  end
end
