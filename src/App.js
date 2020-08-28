import React from 'react';
import './App.css';

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import hookActions from './actions/hookActions';

import Input from './Input'
import LanguagePicker from './LanguagePicker'
import languageContext from './contexts/languageContext';

function reducer(state, action) {
	switch(action.type) {
		case 'setSecretWord':
			return { ...state, secretWord: action.payload }
		case 'setLanguage':
			return { ...state, language: action.payload }
		default:
			throw new Error(`Invalid action type: ${action.type}`)
	}
}

const App = (props) => {
	const [state, dispatch] = React.useReducer(
		reducer,
		{ secretWord: null, language: 'en'}
	)

	const setSecretWord = (secretWord) => dispatch({ type: 'setSecretWord', payload: secretWord })
	const setLanguage = (language) => dispatch({ type: 'setLanguage', payload: language })

	React.useEffect(
		() => { hookActions.getSecretWord(setSecretWord)},
		[]
	)

	if(!state.secretWord) {
		return (
			<div className="container" data-test="spinner">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
				<p>Loading secret word</p>
			</div>
		)
	}

	return (
	  <div className="container" data-test="component-app">
	  	<h1>Jotto</h1>
	  	<languageContext.Provider value={state.language}>
		    <LanguagePicker setLanguage={setLanguage} />
		    <Congrats success={true} />
		    <Input secretWord={state.secretWord}/>
		    <GuessedWords guessedWords={[{ guessedWord: 'train', letterMatchCount: 3}]}/>
	    </languageContext.Provider>
	  </div>
	)
}

export default App;
