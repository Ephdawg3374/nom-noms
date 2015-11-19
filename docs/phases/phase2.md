# Phase 2: Flux Architecture, Location Querying, and Filtering (2.5 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* LocationSearch
  - LocationSearch
  - AuthComponent (UserLoggedIn or UserLoggedOut)
* SearchResultsPage
  - LocationFilter
  - LocationIndex
    + LocationIndexItem
  - SearchResultsMap
* LocationFilteringForm

### Stores
* LocationStore
* MarkerStore
* FilterParamStore

### Actions
* ApiLocationActions.receiveLocations
* FilterActions.updateFilter

### ApiUtil
* ApiLocationUtil.fetchLocations

## Gems/Libraries
* Flux Dispatcher
* React
* React Router
