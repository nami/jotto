import moxios from 'moxios';
import { storeFactory } from '../../test/testUtils';
import { getSecretWord } from './';

describe('getSecretWord action creator', () => {
	beforeEach(() => {
		moxios.install()
	})
	afterEach(() => {
		moxios.uninstall()
	})
	test('add response word to state', () => {
		const secretWord = 'party'
		const store = storeFactory()

		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: secretWord
			})
		})
		// you must add a .then after dispatch to ensure promise resolved before the test runs!
		return store.dispatch(getSecretWord())
			.then(() => {
				const newState = store.getState()
				expect(newState.secretWord).toBe(secretWord)
			})
	})
});