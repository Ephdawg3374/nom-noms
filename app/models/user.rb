class User < ActiveRecord::Base
  validates :username, :firstname, :lastname, :session_token, presence: true
  validates :username, uniqueness: true
  validate :valid_names
  before_save :ensure_name_capitalization!

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

  def self.find_users_autocomplete(user_search_param)
    if user_search_param.length < 2
      return []
    end

    actual_name_param = "%" + user_search_param.split(" ").map(&:capitalize).join("%") + "%"
    username_param = "%" + user_search_param.split(" ").join("%") + "%"

    user_search_param = { actual_name_param: actual_name_param, username_param: username_param }

    User.find_by_sql([
      "SELECT
        users.*
      FROM
        users
      WHERE
        username LIKE :username_param OR
        firstname LIKE :actual_name_param OR
        lastname LIKE :actual_name_param OR
        (users.firstname || ' ' || users.lastname) LIKE :actual_name_param",
      user_search_param])
  end

  private

  def ensure_session_token
    self.session_token = self.session_token || User.generate_session_token
  end

  def valid_names
    if (self.firstname =~ /[[:punct:]]/) || (self.firstname =~ /\d/)
      errors.add(:invalid_name, "First name can't include invalid characters.")
    end

    if (self.lastname =~ /[[:punct:]]/) || (self.lastname =~ /\d/)
      errors.add(:invalid_name, "Last name can't include invalid characters.")
    end
  end

  def ensure_name_capitalization!
    self.firstname.capitalize!
    self.lastname.capitalize!
  end

end
