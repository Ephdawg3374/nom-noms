# Nom-noms

[Live Site][live]

[live]: www.feed-the-noms.com

## Summary

Nom noms is a social-themed location search platform inspired by Yelp that allows users to search for locations, create reviews, and connect with other users.

### Languages
* JavaScript
* Ruby
* HTML
* CSS
* SQL

### Frameworks
* Rails
* React.js

### Libraries and Technologies
* PostgreSQL
* jQuery
* Google Maps API
* Google Maps Geocoding API
* Paperclip w/ AWS
* Figaro
* ReactRouter
* Flux
* Faker
* jBuilder

### App features
You can:
- Create an account with an avatar
- Log in / Log out (demo account available too)
- Search for locations by name, type, cuisine and city
- View search results by search index or by interactive Google Maps view
- Sort index items by rating, distance, or time
- Access location pages from the index or map view
- Filter search results by price range and distance
- Create, read, edit, and delete location reviews
- Upload multiple pictures to location reviews
- Access personal page with stats, reviews, and pictures
- Search for other users' page by username, first name, or last name

Nom noms is focused on the user experience. It features:
- A tutorial for how to use the site features
- Selectable autocomplete lists to for every search
- Search index and google maps integration

### API

Nom noms is powered by a RESTful JSON API.

I took great care to ensure correspondence between React routes and API endpoints. If you're on a page that displays data, you can replace the # in the URI fragment at any time with api to see what's being served up for a given view. This includes search results, location, and user pages.

Many API responses handle nested data, associations, and perform basic mathematical calculations (for stats). I made extensive use of jbuilder to manage these.

API responses are structured to prevent N+1 queries. I used model scoping with find_by_sql as needed to minimize database fetching and keep controllers slim.

Sorting the index results is done completely in the front end. Since data is already loaded into the stores, the sort functions simply sort the stores rather than refetching from the database.  Therefore, sorting is a very inexpensive operation.

### Future enhancements

- Follow other users
- Bookmark locations
- Pagination / infinite scroll for Search Index with Kaminari
- Omni Auth (Facebook)

## Implementation Timeline
* [View Implementation Plan][plan]
* [View DB Schema][schema]

[plan]: ./docs/plan.md
[schema]: ./docs/schema.md
