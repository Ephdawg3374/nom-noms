# Phase 1: User Authentication, Note Model and JSON API

## Rails
### Models
* User
* Location

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)
* Api::LocationsController (index, show)
* Api::UsersController (create, update, destroy)
* Api::SessionController (create, destroy)

### Views
* api/users/user.json.jbuilder
* api/users/index.json.jbuilder
* api/users/show.json.jbuilder
* api/session/new.json.jbuilder
* api/locations/location.json.jbuilder
* api/locations/index.json.jbuilder
* api/locations/show.json.jbuilder

## Flux
### React Components
* NavigationBar
  * SearchMain
  * UserLoggedIn
  * UserLoggedOut
* LogInPage
* NewUserPage

### Stores
* UsersStore
* CurrentUserStore

### Actions
* UserActions
* CurrentUserActions

### ApiUtil
* ApiUserUtil
* ApiSessionUtil

## Gems/Libraries
* BCrypt
* Faker
* ReactRouter
