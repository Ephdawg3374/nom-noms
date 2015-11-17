# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null
password_digest | string    | not null
session_token   | string    | not null, indexed


## locations
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
location_type    | integer   | not null
name             | string    | not null
description      | text      | not null
price_range      | integer   | not null, limit 1
website          | string    |
phone_number     | string    | 
street_address   | string    | not null
city             | string    | not null
state            | string    | not null, limit 2
zipcode          | string    | not null, limit 5
lat              | float     | not null
lng              | float     | not null

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
location_id | integer   | not null, foreign key (references locations), indexed
tag_ids     | integer[] |
body        | text      | not null
date        | datetime  | not null

## comments
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users), indexed
review_id       | integer   | not null, foreign key (references reviews), indexed
body            | string    | not null
date            | datetime  | not null

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
tag_id      | integer   | not null, foreign key (references tags), indexed
review_id   | integer   | not null, foreign key (references reviews), indexed, unique [tag_id]

## followings
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
follower_user_id | integer   | not null, foreign key (references notes), indexed, unique [tag_id]
followee_user_id | integer   | not null, foreign key (references tags), indexed
