import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';
import Input from './Input';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';

const defaultProps = { secretWord: 'party' };

const setup = ({ secretWord, language, success }) => {
	language = language || 'en' 
	secretWord = secretWord || 'party' 
	success = success || false

	return mount(
		<languageContext.Provider value={language}>
		<successContext.SuccessProvider value={[success, jest.fn()]}>
			<Input secretWord={secretWord} />
		</successContext.SuccessProvider>
		</languageContext.Provider>
	)
};

test('App renders without error', () => {
	const wrapper = setup({})
	const component = findByTestAttr(wrapper, 'input-component')
	expect(component.length).toBe(1)
})

test('does not throw warning with expected props', () => {
	checkProps(Input, defaultProps)
});

describe('state controlled input field', () => {
	let wrapper
	let mockSetCurrentGuess = jest.fn()

	beforeEach(() => {
		// clear before every test
		mockSetCurrentGuess.mockClear()
		React.useState = jest.fn(() => ["", mockSetCurrentGuess])
		wrapper = setup({})
	})

	test('state updates with value of input box upon change', () => {
		const inputBox = findByTestAttr(wrapper, 'input-box')
		const mockEvent = { target: { value: 'train'}}
		inputBox.simulate("change", mockEvent)
		expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
	})

	test('field is cleared upon submit button click', () => {
		const submitButton = findByTestAttr(wrapper, 'submit-button')

		submitButton.simulate('click', { preventDefault() {} })
		expect(mockSetCurrentGuess).toHaveBeenCalledWith('')
	})
});

describe('languagePicker', () => {
	test('correctly renders submit button in english', () => {
		const wrapper = setup({ language: 'en' })
		const submitButton = findByTestAttr(wrapper, 'submit-button')
		expect(submitButton.text()).toBe('Submit')
	})
	test('correctly render congrats string in emoji', () => {
		const wrapper = setup({ language: 'emoji' })
		const submitButton = findByTestAttr(wrapper, 'submit-button')
		expect(submitButton.text()).toBe('🚀')
	})
});

test('input component does not show when success is true', () => {
	const wrapper = setup({ secretWord: 'party', success: true })
	expect(wrapper.isEmptyRender()).toBe(true)
});
