class Image < ActiveRecord::Base
  validates :review, :user, presence: true

  has_attached_file :image_pic,
    styles: { medium: "640x480" }

  validates_attachment_content_type :image_pic, content_type: /\Aimage\/.*\Z/

  belongs_to :review
  belongs_to :user
end
