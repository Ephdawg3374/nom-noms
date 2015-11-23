class User < ActiveRecord::Base
  validates :username, :session_token, presence: true
  validates :username, uniqueness: true
  has_secure_password

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

end
