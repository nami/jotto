import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
	return (
	  <div data-test="input-component">
	  </div>
	)
}

Input.propTypes = {
	secretWord: PropTypes.string.isRequired
};

export default Input;
