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
* LocAreaAutoCompleteStore
* LocTypeAutoCompleteStore

### Actions
* ApiLocationActions.receiveLocations
* ApiLocationActions.receiveLocationTypes
* ApiLocationActions.receiveLocationAreas

### ApiUtil
* ApiLocationUtil.fetchLocations
* ApiLocationUtil.fetchLocationTypes
* ApiLocationUtil.fetchLocationAreas

## Gems/Libraries
* Flux Dispatcher
* React
* React Router
* React PState
