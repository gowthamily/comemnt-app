import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialColorName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialColorName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  toggleLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const filterComments = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({
      commentsList: filterComments,
    })
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeTextArea = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1>Comments</h1>
          <div className="comments-input">
            <form className="form" onSubmit={this.onAddComment}>
              <p>Say something about 4.O technologies</p>
              <input
                value={nameInput}
                type="text"
                placeholder="Your Name"
                className="name-input"
                onChange={this.onChangeName}
              />
              <textarea
                value={commentInput}
                type="text"
                placeholder="Your Comment"
                className="comment-area"
                onChange={this.onChangeTextArea}
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
          </div>
          <hr className="line" />
          <p className="comments-label">
            <span className="comments-count">{commentsList.length}</span>
            Comments
            <ul>
              {commentsList.map(eachComment => (
                <CommentItem
                  commentDetails={eachComment}
                  key={eachComment.id}
                  toggleIsLiked={this.toggleLiked}
                  deleteComment={this.deleteComment}
                />
              ))}
            </ul>
          </p>
        </div>
      </div>
    )
  }
}

export default Comments
