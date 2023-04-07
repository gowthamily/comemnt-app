// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleIsLiked, deleteComment} = props
  const {id, name, comment, date, initialClassName, isLiked} = commentDetails

  const initial = name ? name[0].toUpperCase() : ''

  const likedClassName = isLiked ? 'button active' : 'button'
  const likedImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const postedDate = formatDistanceToNow(date)

  const onClickLike = () => {
    toggleIsLiked(id)
  }
  const onDeleteComment = () => {
    deleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="name-time-container">
            <p className="username">{name}</p>
            <p className="time">{postedDate} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img src={likedImageUrl} alt="like" className="liked-image" />
          <button
            type="button"
            className={likedClassName}
            onClick={onClickLike}
          >
            Like
          </button>
        </div>
        <button
          type="button"
          className="button"
          onClick={onDeleteComment}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
