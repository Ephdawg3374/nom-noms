# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151125024110) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "locations", force: :cascade do |t|
    t.string "name",                     null: false
    t.text   "description",              null: false
    t.string "website"
    t.string "phone_number"
    t.string "street_address",           null: false
    t.string "city",                     null: false
    t.string "state",          limit: 2, null: false
    t.string "zipcode",        limit: 5, null: false
    t.float  "lat",                      null: false
    t.float  "lng",                      null: false
    t.string "location_type",            null: false
    t.string "price_range",              null: false
    t.string "img_url"
    t.string "state_long",               null: false
    t.string "cuisine"
  end

  add_index "locations", ["lat", "lng"], name: "index_locations_on_lat_and_lng", using: :btree
  add_index "locations", ["location_type"], name: "index_locations_on_location_type", using: :btree
  add_index "locations", ["price_range"], name: "index_locations_on_price_range", using: :btree

  create_table "reviews", force: :cascade do |t|
    t.integer  "user_id",                          null: false
    t.integer  "location_id",                      null: false
    t.integer  "rating",              default: 0,  null: false
    t.text     "body",                             null: false
    t.integer  "tags",                default: [],              array: true
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.string   "images_file_name",                              array: true
    t.string   "images_content_type",                           array: true
    t.integer  "images_file_size",                              array: true
    t.datetime "images_updated_at",                             array: true
  end

  add_index "reviews", ["location_id"], name: "index_reviews_on_location_id", using: :btree
  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",                 null: false
    t.string   "password_digest",          null: false
    t.string   "session_token",            null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "profile_pic_file_name"
    t.string   "profile_pic_content_type"
    t.integer  "profile_pic_file_size"
    t.datetime "profile_pic_updated_at"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

end
