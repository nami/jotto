import React from 'react';
import PropTypes from 'prop-types';

import languageContext from './contexts/languageContext';
import stringsModule from './helpers/strings';

const Input = (props) => {
	const [ currentGuess, setCurrentGuess] = React.useState('');
	const language = React.useContext(languageContext);

	const handleSubmit = (e) => {
		e.preventDefault()
		setCurrentGuess(currentGuess)
	}

	return (
	  <div data-test="input-component">
	  <form className="form-inline">
	  	<input 
		  	data-test="input-box"
		  	className="mb-2 mx-sm-3"
		  	type="text"
		  	placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
		  	value={currentGuess}
		  	onChange={(e) => setCurrentGuess(e.target.value)}
	  	/>
	  	<button
		  	data-test="submit-button"
		  	className="btn btn-primary mb-2"
		  	onClick={handleSubmit}
	  	>{stringsModule.getStringByLanguage(language, 'submit')}</button>
	  </form>
	  </div>
	)
}

Input.propTypes = {
	secretWord: PropTypes.string.isRequired
};

export default Input;
