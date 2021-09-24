//discussion form component for the user to post a discussion
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addDiscussion } from '../../actions/discussion';
import PropTypes from 'prop-types';

const DiscussionForm = ({ addDiscussion }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='post-form-header bg-primary my-1'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addDiscussion({ text });
          setText('');
        }}
      >
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          name='text'
          cols='30'
          rows='5'
          placeholder='Start a discussion'
        ></textarea>
        <input type='submit' value='Submit' className='btn btn-dark my-1' />
      </form>
    </div>
  );
};

DiscussionForm.propTypes = {
  addDiscussion: PropTypes.func.isRequired,
};

export default connect(null, { addDiscussion })(DiscussionForm);
