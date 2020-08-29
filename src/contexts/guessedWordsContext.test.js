import React from 'react';
import { shallow } from 'enzyme';

import guessedWordsContext from './guessedWordsContext';

// a functional component that calls useguessedWords for our tests
const FunctionalComponent = () => {
	guessedWordsContext.useGuessedWords()
	return (
		<div></div>
	)
}

test('useGuessedWords throws error when not wrapped in guessedWordsProvider', () => {
	expect(() => {
		shallow(<FunctionalComponent />)
	}).toThrow('useGuessedWords must be used within a guessedWordsProvider')
});

test('useGuessedWords does not throw error when wrapped in guessedWordsProvider', () => {
  expect(() => {
    shallow(
      <guessedWordsContext.GuessedWordsProvider>
        <FunctionalComponent />
      </guessedWordsContext.GuessedWordsProvider>
    )
  }).not.toThrow();
})