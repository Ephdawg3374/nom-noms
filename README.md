# Nom-noms

[Heroku link][nom-noms.herokuapp.com] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Nom-noms is a web application inspired by Yelp built using Ruby on Rails
and React.js. Nom-noms allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [X] Create an account
- [X] Log in / Log out
- [X] Search for locations by Location name, type, cuisine and by City w/ autocomplete listings
- [X] View search results by index or by Google Maps view
- [X] Filter search results by price range and distance
- [X] Create, read, edit, and delete Location reviews
- [X] Upload pictures to location reviews
- [ ] Follow other users
- [ ] Comment on other user reviews
- [ ] Tag reviews with multiple tags
- [ ] Home page shows recent activity from followed users

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Location Model, Flux Architecture and JSON API (2.5 days)

In Phase 1, I will begin by implementing user signup and authentication (using BCrypt) with Flux and React. There will be a navigation bar at the top of each page that will contain a location type and a location search bar. In addition, guests will see a sign-up option that will allow he/she to create a user. A login button will also be available if the guest user already has a login. Finally, a "remember me" function will allow the user to visit the site without having to log back in. If the user is already logged in, the login button will be replaced with a logout button. Users not logged in will be able to conduct searches but they will not be able to use most of the site's functionality (commenting, creating reviews, etc).

The location model will contain all relevant data elements a user would be concerned with when searching for a location. I will be using the Faker gem to seed the database with locations to search from.

I chose to seed the database with fake locations rather than with real locations because that would take an enormous amount of time and I'd rather have the search index look more realistic by just getting a lot of data rather than select few locations.  The seeds.rb file generates 6000 random locations with lat/lng around NYC. Lastly, I hardcoded the seeds file to generate at least one location from each of the following cities so that you can search for a known city.

* New York, NY
* Brooklyn, NY
* Manhattan, NY
* Fort Lee, NJ
* Hoboken, NJ
* Englewood, NJ
* Queens, NY
* Bronx, NY
* Yonkers, NY
* New Rochelle, NY

I will also be using Jbuilder to create views that the JSON APIs will render when sending responses back to the client.

At the end of Phase 1, the user will be able to create a user, login, and be able to leave the site and come back without having to log back in.  On the backend side, location data will be ready to get sent over to the client.

[Details][phase-one]

### Phase 2: , Location Querying, and Filtering (2 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view structure for the search and filtering components of the application. After the basic Flux architecture has been set up, a Location data store will be implemented and a set of actions corresponding to the necessary CRUD operations for querying Locations. A param filter store will also be implemented with actions that will allow the app to maintain the users' required filter parameters.  The filter store will automatically update when locations are queried.

Once this is done, I will create React components for the `LocationIndex`, `LocationIndexItem`, `Location FilteringForm`, and `Location Map`. The React Router will be set up such that the correct parent-child relationships have been set up.

At the end of Phase 2 the user will be able to search for Locations, apply filters, and view results in an index page. Basic styling will be done to ensure the results can be clearly read.

[Details][phase-two]

### Phase 3: Location Reviews and Location Show Page (2 days)

Phase 3 adds reviewing functionality to the application. The work involved in this phase will be creating a Review model, additional React Routes, React components, adding additional callbacks to the flux, a Review store that will automatically get updated when location queries are performed, and additional API utils and actions that will allow for CRUD operations on reviews.

One of the bigger React components for this phase will be the `LocationShowPage`. This view will have several child components: `LocationMap`, `ReviewIndex`, `ReviewIndexItem`, `ReviewForm`, and `LocationSummary` section containing details about the location incl. average review. In addition, users will be able to upload photos to the review.  Users can go to the show page by clicking on an `IndexItem` component from the `Index` component.

At the end of Phase 3 the user will be able to review Locations and go to the location show page to see all the reviews

[Details][phase-three]

### Phase 4: Social interaction (follow, comment, tag) (2 days)

Phase 4 adds following, commenting, and tagging functionality to the application.  Users will be able to follow other users, comment on other users' reviews, and tag reviews.  The work involved in this phase will be to update the models and introduce several join tables so the associations can be built.

Once the database, models, and JSON APIs have been updated several React components will be introduced to build the front-end to enable the functionality on the client side. A `FollowToggleButton`, `CommentForm`, `CommentIndex`, `CommentIndexItem`, `TagForm`, and `TagItem` will be built. These components will be built within the review index component. Comments will be hidden by default and can be toggled to unhide by a button. This is a design decision that will prevent the review index from getting over crowded with comments.

At the end of phase 4, users will be able to follow other users, comment on reviews, and tag reviews. The taggings can be see from the Location Show Page within the review index component and the comments can be toggled to be seen from the same component.

[Details][phase-four]

### Phase 5: Home Page (.5 days)

Phase 5 will be focused on the app home page.  The home page will show the most recent activity from followed users. A React component `HomePageIndex` will be built which will be comprised of `LocationIndexItems`. A [Home] page button will be added to the navigation bar.

[Details][phase-five]
### Phase 6: Styling (1 day)

Phase 6 will be focused on styling the app and making last minute touch-ups.

### Bonus Features (TBD)
- [ ] Prettify transitions
- [ ] Pagination / infinite scroll for Location Index with Kaminari
- [ ] Multiple sessions
- [ ] Location album available in the show page
- [ ] Omni Auth (Facebook)

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
