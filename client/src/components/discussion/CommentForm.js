import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/discussion';

const CommentForm = ({ addComment, discussionID }) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='post-form-header bg-primary my-1'>
        <h3>Add to the discussion...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(discussionID, { text });
          setText('');
        }}
      >
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment on the post'
        ></textarea>
        <input type='submit' value='Submit' className='btn btn-dark my-1' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
