//single discussion page with all the attached comments and comment form
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getDiscussion } from '../../actions/discussion';
import DiscussionItem from '../discussions/DiscussionItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Discussion = ({
  getDiscussion,
  discussion: { discussion, loading },
  match,
}) => {
  useEffect(() => {
    getDiscussion(match.params.id);
  }, [match.params.id, getDiscussion]);

  return loading || discussion === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/discussions' className='btn'>
        Back To Discussions
      </Link>
      <DiscussionItem discussion={discussion} showActions={false} />
      <CommentForm discussionID={discussion._id} />
      <div className='comments'>
        {discussion.comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            discussionID={discussion._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

Discussion.propTypes = {
  discussion: PropTypes.object.isRequired,
  getDiscussion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  discussion: state.discussion,
});

export default connect(mapStateToProps, { getDiscussion })(Discussion);
