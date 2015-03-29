require 'rails_helper'

describe Tag do


	let(:adventure) { Tag.new( name: 'Adventure')}
	
	it "is valid if there is a name" do
		expect(adventure).to be_valid
	end
end