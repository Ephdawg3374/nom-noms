# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed
firstname       | string    | not null, indexed
lastname        | string    | not null, indexed
password_digest | string    | not null
session_token   | string    | not null, indexed
profile_pic     | string    | from Paperclip

## locations
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
location_type    | string    | not null
name             | string    | not null
description      | text      | not null
price_range      | integer   | not null, limit 1
website          | string    |
phone_number     | string    |
street_address   | string    | not null
city             | string    | not null
state            | string    | not null, limit 2
state_long       | string    | not null
zipcode          | string    | not null, limit 5
lat              | float     | not null
lng              | float     | not null
cuisine          | string    | not null

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
location_id | integer   | not null, foreign key (references locations), indexed
body        | text      | not null
updated_at  | datetime  | not null
created_at  | datetime  | not null
