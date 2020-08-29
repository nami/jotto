import React from 'react';
import PropTypes from 'prop-types';

import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';
import stringsModule from './helpers/strings';
import { getLetterMatchCount } from './helpers';

const Input = ({ secretWord }) => {
	const [ currentGuess, setCurrentGuess ] = React.useState('');
	const language = React.useContext(languageContext);
	const [success, setSuccess] = successContext.useSuccess();
	const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();

	const handleSubmit = (e) => {
		e.preventDefault()
		const letterMatchCount = getLetterMatchCount(currentGuess, secretWord)
		const newGuessedWords = [...guessedWords, { guessedWord: currentGuess, letterMatchCount }]
		setGuessedWords(newGuessedWords)

		if (currentGuess === secretWord) {
			setSuccess(true)
		}
		// clearing Input Box 
		setCurrentGuess("")
	}

	if (success) { return null }

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
