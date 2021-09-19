import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getDiscussions } from '../../actions/discussion';
import DiscussionItem from './DiscussionItem';
import DiscussionForm from './DiscussionForm';

const Discussions = ({
  getDiscussions,
  discussion: { discussions, loading },
}) => {
  useEffect(() => {
    getDiscussions();
  }, [getDiscussions]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>
        <i className='fas fa-comments'></i> Discussion
      </h1>
      <p className='lead'>Create or Join a Discussion!</p>
      <p>
        <strong>Rules:</strong>
      </p>
      <p>
        <strong>1: Play nice!</strong>
      </p>
      <p>
        <strong>2: Respect others opinions.</strong>
      </p>
      <p>
        <strong>3: Hate speech of any kind will not be tolerated.</strong>
      </p>
      <p>
        <strong>4: Bullying will not be tolerated.</strong>
      </p>
      <p>
        <strong>
          5: Have fun! We're all here to discuss film/TV/Theatre/Podcasts, not
          set the world to rights so keep the politics and drama out of it!
        </strong>
      </p>
      <DiscussionForm />
      <div className='posts'>
        {discussions.map((discussion) => (
          <DiscussionItem key={discussion._id} discussion={discussion} />
        ))}
      </div>
    </Fragment>
  );
};

Discussions.propTypes = {
  getDiscussions: PropTypes.func.isRequired,
  discussion: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  discussion: state.discussion,
});

export default connect(mapStateToProps, { getDiscussions })(Discussions);
