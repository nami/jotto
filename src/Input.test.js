import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';
import Input from './Input';

const defaultProps = { secretWord: 'party' };

const setup = (props={}) => {
	const setupProps = { ...defaultProps, ...props}
	return shallow(<Input { ...setupProps } />)
}

test('App renders without error', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'input-component')
	expect(component.length).toBe(1)
})

test('does not throw warning with expected props', () => {
	checkProps(Input, defaultProps)
});

describe('state controlled input field', () => {
	test('state updates with value of input box upon change', () => {
		const mockSetCurrentGuess = jest.fn()
		React.useState = jest.fn(() => ["", mockSetCurrentGuess])

		const wrapper = setup()
		const inputBox = findByTestAttr(wrapper, 'input-box')

		const mockEvent = { target: { value: 'train'}}
		inputBox.simulate("change", mockEvent)
		expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
	})
})