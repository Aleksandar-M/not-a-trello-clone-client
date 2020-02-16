import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import baseReducer from './reducers/base';
import userReducer from './reducers/user';
import App from './App';

const reducers = combineReducers({
	base: baseReducer,
	users: userReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);
