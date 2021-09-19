import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getDiscussion } from '../../actions/discussion';
import DiscussionItem from '../discussions/DiscussionItem';

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
