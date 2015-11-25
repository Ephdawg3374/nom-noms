class Review < ActiveRecord::Base
  validates :author, :location, :body, presence: true

  belongs_to(
      :author,
      :class_name => "User",
      :foreign_key => :user_id,
      :primary_key => :id
    )

  belongs_to :location

  has_many :images, dependent: :destroy
end
