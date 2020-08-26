import React from 'react';
// import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import App, { UnconnectedApp } from './App';
import { storeFactory } from '../test/testUtils';

const setup = (initialState={}) => {
	const store = storeFactory(initialState)
	/**
	* shallow only returns the first level
	*/
	const wrapper = shallow(<App store={store} />).dive().dive()
	return wrapper
};

describe('redux props', () => {
	test('has success piece of state', () => {
		const success = true
		const wrapper = setup({ success })
		const successProp = wrapper.instance().props.success
		expect(successProp).toBe(success)
	})
	test('has guessedWords piece of state', () => {
		const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3}]
		const wrapper = setup({ guessedWords })
		const guessedWordsProp = wrapper.instance().props.guessedWords
		expect(guessedWordsProp).toEqual(guessedWords)
	})
	test('has secretWord piece of state', () => {
		const secretWord = 'party'
		const wrapper = setup({ secretWord })
		const secretWordProp = wrapper.instance().props.secretWord
		expect(secretWordProp).toBe(secretWord)

	})
	test('`getSecretWord` action creator is a function prop', () => {
		const wrapper = setup()
		const getSecretWordProp = wrapper.instance().props.getSecretWord
		expect(getSecretWordProp).toBeInstanceOf(Function)
	})
});

test('`getSecretWord` runs on App mount', () => {
	const getSecretWordMock = jest.fn()

	const props = {
		getSecretWord: getSecretWordMock,
		success: false,
		guessedWords: []
	}

	// set up app component with getSecretWordMock as the getSecretWord prop
	const wrapper = shallow(<UnconnectedApp {...props}/>)

	// run lifecycle method
	wrapper.instance().componentDidMount()

	//check to see if mock ran
	const getSecretWordCallCount = getSecretWordMock.mock.calls.length

	expect(getSecretWordCallCount).toBe(1)
})







