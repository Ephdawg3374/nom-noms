class User < ActiveRecord::Base
  validates :username, :firstname, :lastname, :session_token, presence: true
  validates :username, uniqueness: true
  validate :valid_names

  has_secure_password

  has_attached_file :profile_pic,
    default_url: "profile_pic_placeholder.png",
    styles: {
      tiny: "58x58#",
      thumb: "100x100#",
      avatar: "240x320"}

  validates_attachment_content_type :profile_pic, content_type: /\Aimage\/.*\Z/

  has_many :reviews, dependent: :destroy
  has_many :images, dependent: :destroy
  has_many :locations, through: :reviews


  after_initialize :ensure_session_token

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
  end

  private

  def ensure_session_token
    self.session_token = self.session_token || User.generate_session_token
  end

  def valid_names
    if (self.firstname =~ /[[:punct:]]/)
      errors.add(:invalid_name, "First name can't include invalid characters.")
    end

    if (self.lastname =~ /[[:punct:]]/)
      errors.add(:invalid_name, "Last name can't include invalid characters.")
    end
  end

end
