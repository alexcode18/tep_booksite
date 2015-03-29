require 'rails_helper'

describe Book do


	let(:pirates) { Book.new( title: 'Treasure Island',
														author: 'Robert Louis Stevenson',
														description: 'A wild good time',
														isbn: '9780486275598',
														imprint: 'Dover',
														copyright: 'Dover',
														cover_price: '$7.00',
														tags: Tag.where(name: ['12-11','Adventure'])
			)}
	
	it "is valid if there is a title, author, description, isbn, imprint, copyright, cover_price, tags" do
		expect(pirates).to be_valid
	end
end