import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getDiscussions } from '../../actions/discussions';

const Discussions = ({
  getDiscussions,
  discussion: { discussions, loading },
}) => {
  useEffect(() => {
    getDiscussions();
  }, [getDiscussions]);
  return <div>Discussions</div>;
};

Discussions.propTypes = {
  getDiscussions: PropTypes.func.isRequired,
  discussion: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  discussion: state.discussion,
});

export default connect(mapStateToProps, { getDiscussions })(Discussions);
