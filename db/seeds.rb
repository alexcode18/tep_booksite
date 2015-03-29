# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Book.destroy_all
Tag.destroy_all

file = File.open("#{Rails.root}/db/bookData.tsv",'r')
contents = (file.read)
books_array = []
tags_array = []

#Get Array of book objects
contents.each_line do |array|
	b_array = array.split('	')
	books_array << b_array
	b_array_split = b_array[0].split(' ')
	b_array0 = b_array_split[1]
	b_array[0] = b_array0
	tags_array << b_array[0]
	tags_array << b_array[1]
end

tags_array = tags_array.uniq

tags_array.each do |i|
	if (i != ' ')
		tag = Tag.create!(name: i)
	end
end

books_array.each do |book|
	# grade_array = book[0].split(' ')
	# grade_level = grade_array[1]

	puts tags_array
	# puts book[0] + " " + book[1]
	# if tags_array.index(book[0]) && tags_array.index(book[1])
	book = Book.create!({
		title: book[2],
		author: book[3],
		description: book[8],
		isbn: book[4],
		imprint: book[5],
		copyright: book[6],
		cover_price: book[7],
		tags: Tag.where(name: [book[0],book[1]])
	})
	# puts tags_array.find_index(book[0])
	# book.tags << Tag.where(name: book[0])
	# book.tags << Tag.where(name: book[1])
	# end
end

file.rewind()