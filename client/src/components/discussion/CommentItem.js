//reusable comment item that shows the comment for the discussion/discussions page
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/discussion';

const CommentItem = ({
  deleteComment,
  discussionID,
  comment: { _id, text, name, avatar, user, date },
  auth,
}) => {
  return (
    <div class='comments'>
      <div class='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${user}`}>
            <img class='round-img' src={avatar} alt={name} />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p class='my-1'>{text}</p>
          <p class='post-date'>
            Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
          </p>
          {!auth.loading && user === auth.user._id && (
            <button
              type='button'
              className='btn btn-danger'
              onClick={(e) => deleteComment(discussionID, _id)}
            >
              <i className='fas fa-times'></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  discussionID: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
