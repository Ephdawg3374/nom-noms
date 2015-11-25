class Review < ActiveRecord::Base
  validates :author, :location, :body, presence: true

  belongs_to(
      :author,
      :class_name => "User",
      :foreign_key => :user_id,
      :primary_key => :id
    )

  belongs_to :location

  has_attached_file :images,
    default_url: "profile_pic_placeholder.png",
    styles: { medium: "320x240" }

  validates_attachment_content_type :profile_pic, content_type: /\Aimage\/.*\Z/
end
