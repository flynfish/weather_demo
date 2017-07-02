class CreateFavorites < ActiveRecord::Migration[5.1]
  def change
    create_table :favorites do |t|
      t.point :location
      t.string :name

      t.timestamps
    end
  end
end
