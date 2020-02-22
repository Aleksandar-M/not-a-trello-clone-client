import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import baseReducer from './reducers/base';
import userReducer from './reducers/user';
import alertReducer from './reducers/alert';
import App from './App';

const reducers = combineReducers({
	base: baseReducer,
	users: userReducer,
	alert: alertReducer,
});

const rootReducer = (state, action) => {
	if (action.type === 'SIGNOUT') {
		// Clear redux store after sign out
		state = undefined;
	}

	return reducers(state, action);
};

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);
