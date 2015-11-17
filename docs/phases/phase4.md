# Phase 4: Social interaction (follow, comment, tag) (1.5 days)

## Rails
### Models
* Comment
* Tag
* Tagging
* Following

### Controllers
* Api::CommentsController (index, create, update, show, destroy)
* Api::TagsController (create, destroy)

### Views
* comments/index.json.builder
* comments/show.json.builder

## Flux
### Views (React Components)
* FollowToggleButton
* TagForm
* CommentForm
* CommentIndex
  - CommentIndexItem

### Stores
* CommentStore

### Actions
* ApiCommentActions.receiveComments
* ApiCommentActions.receiveSingleComment
* ApiCommentActions.deleteComments

### ApiUtil
* ApiCommentUtil.fetchComments
* ApiCommentUtil.createComment
* ApiCommentUtil.editComment
* ApiCommentUtil.destroyComment
* ApiTaggingUtil.createTagging
* ApiTaggingUtil.destroyTagging

## Gems/Libraries
