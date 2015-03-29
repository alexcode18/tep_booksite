class BooksController < ApplicationController
  
  def index
    @books = Book.limit(50).order(title: :asc)
  	render json: @books.to_json(include: [:tags])
  end

  def get_more
    offset_by = params[:offset].to_i
    # if there's a tag param then find the next limit of tagged books
    if params[:tag]
      tag_books = Tag.find(params[:tag]).books
      @books = tag_books.offset(offset_by).limit(1).order(title: :asc)
    else
      puts '--- else route ---------------'
      @books = Book.offset(offset_by).limit(1).order(title: :asc) 
    end
    render json: @books.to_json(include: [:tags])
  end

  # 
  def tag_books
    @tag_books = Tag.find(params[:tag]).books.limit(50).order(title: :asc)
    render json: @tag_books.to_json(include: [:tags])
  end

  def show
    book = Book.find(params[:id])
    # tag_books = Tag.find(params[:tag]).books
    render json: book.to_json(include: [:tags])
  end

  private

  def book_params
  	# params.require(:book).permit(:title,:author,:description,:isbn,:imprint,:copyright,:cover_price)
  end
end