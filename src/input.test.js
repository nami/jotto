import React from 'react';
import { shallow } from 'enzyme';

import Input, { UnconnectedInput } from './Input';
import { findByTestAttr, storeFactory } from '../test/testUtils';

const setup = (initialState={}) => {
	const store = storeFactory(initialState)
	/**
	* shallow only returns the first level
	*/
	const wrapper = shallow(<Input store={store} />).dive().dive()
	return wrapper
};

describe('render', () => {
	describe('word has not been guessed', () => {
		let wrapper
		beforeEach(() => {
			const initialState = { success: false }
			wrapper = setup(initialState)
		})

		test('renders component without error', () => {
			const component = findByTestAttr(wrapper, 'component-input')
			expect(component.length).toBe(1)
		})
		test('renders input box', () => {
			const inputBox = findByTestAttr(wrapper, 'input-box')
			expect(inputBox.length).toBe(1)
		})
		test('renders submit button', () => {
			const submitButton = findByTestAttr(wrapper, 'submit-button')
			expect(submitButton.length).toBe(1)
		})
	});
	describe('word has been guessed', () => {
		let wrapper
		beforeEach(() => {
			const initialState = { success: true }
			wrapper = setup(initialState)
		})

		test('renders component without error', () => {
			const component = findByTestAttr(wrapper, 'component-input')
			expect(component.length).toBe(1)
		})
		test('does not renders input box', () => {
			const inputBox = findByTestAttr(wrapper, 'input-box')
			expect(inputBox.length).toBe(0)
		})
		test('doest not renders submit button', () => {
			const submitButton = findByTestAttr(wrapper, 'submit-button')
			expect(submitButton.length).toBe(0)
		})
		
	});
});

describe('redux props', () => {
	test('has success piece of state', () => {
		const success = true
		const wrapper = setup({ success })
		const successProp = wrapper.instance().props.success
		expect(successProp).toBe(success)
	})
	test('`guessWord` action creator is a function prop', () => {
		const wrapper = setup()
		const guessWordProp = wrapper.instance().props.guessWord
		expect(guessWordProp).toBeInstanceOf(Function)
	})
});

describe('`guessWord` action creator', () => {
	let guessWordMock,
	wrapper
	const guessedWord = 'train'

	beforeEach(() => {
		guessWordMock = jest.fn()
		const props = {
			guessWord: guessWordMock,
		}
		wrapper = shallow(<UnconnectedInput {...props}/>)

		// add value to input box
		wrapper.setState({ currentGuess: guessedWord })

		// find button and click
		const button = findByTestAttr(wrapper, 'submit-button')
		// pass it an event so preventDefault works
		button.simulate('click', { preventDefault() {} })
	})

	test('`guessWord` was called once', () => {
		//check to see if mock ran
		const guessWordCallCount = guessWordMock.mock.calls.length
		expect(guessWordCallCount).toBe(1)
	})
	test('calls `guessWord` with input value as argument', () => {
		// guessWordMock.mock.calls returns an array with an array of each argument
		const guessWordArg = guessWordMock.mock.calls[0][0]
		expect(guessWordArg).toBe(guessedWord)
	})
})





