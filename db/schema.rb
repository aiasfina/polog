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

ActiveRecord::Schema.define(version: 3) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string   "name"
    t.string   "surname"
    t.string   "email"
    t.string   "crypted_password"
    t.string   "role"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "attachments", force: :cascade do |t|
    t.integer  "account_id", null: false
    t.json     "file"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", force: :cascade do |t|
    t.integer  "account_id",                null: false
    t.string   "title",                     null: false
    t.text     "content",      default: ""
    t.text     "content_html", default: ""
    t.text     "tags",         default: [],              array: true
    t.datetime "published_at"
    t.datetime "deleted_at"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.index ["account_id"], name: "index_posts_on_account_id", using: :btree
    t.index ["deleted_at"], name: "index_posts_on_deleted_at", using: :btree
    t.index ["published_at"], name: "index_posts_on_published_at", order: { published_at: :desc }, using: :btree
    t.index ["tags"], name: "index_posts_on_tags", using: :gin
  end

end
