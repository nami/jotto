import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import App from './App';

import hookActions from './actions/hookActions';

const mockGetSecretWord = jest.fn();

const setup = () => {
	//clear fn to make sure it doesnt carry through
	mockGetSecretWord.mockClear()
	// replace with mock fn
	hookActions.getSecretWord = mockGetSecretWord
	// use mount before useEffect is not called on 'shallow'
	return mount(<App />)
};

test('App renders without error', () => {
	const wrapper = setup()
	const component = findByTestAttr(wrapper, 'component-app')
	expect(component.length).toBe(1)
});

describe('getSecretWord calls', () => {
	test('getSecretWord gets called on App mount', () => {
		setup()

		expect(mockGetSecretWord).toHaveBeenCalled()
	})
});