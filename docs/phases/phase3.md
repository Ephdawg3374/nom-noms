# Phase 3: Location Reviews and Location Show Page (2 days)

## Rails
### Models
* Review

### Controllers
* Api::ReviewsController (create, destroy, index, show, update)

### Views
* reviews/index.json.jbuilder
* reviews/show.json.jbuilder

## Flux
### Views (React Components)
* LocationShowPage
  - LocationMap (Single location)
  - LocationSummary
  - ReviewForm
  - ReviewIndex
    + ReviewIndexItem

### Stores
* ReviewStore

### Actions
* ApiReviewActions.receiveReviews
* ApiReviewActions.receiveSingleReview
* ApiReviewActions.deleteReview

### ApiUtil
* ApiReviewUtil.fetchReviews
* ApiReviewUtil.createReview
* ApiReviewUtil.editReview
* ApiReviewUtil.destroyReview

## Gems/Libraries
* Cloudinary
