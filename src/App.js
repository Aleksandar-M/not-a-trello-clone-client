import React from 'react';
import {
	BrowserRouter, Route, Redirect,
} from 'react-router-dom';
import Projects from './components/Projects';
import Header from './components/Header';
import Content from './components/Content';
import styles from './components/Styles.module.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Notification from './components/Notification';

function App() {
	return (
		<BrowserRouter>

			<Route exact path="/" render={() => <SignIn />} />
			<Route exact path="/signup" render={() => <SignUp />} />
			<Route
				exact
				path="/workspace"
				render={() => (localStorage.getItem('currentUser')
					? (
						<div>
							<Header />
							<div className={styles.main}>
								<Projects />
								<Content />
							</div>

							<Notification />
						</div>
					)
					: <Redirect to="/" />)}
			/>
		</BrowserRouter>

	);
}

export default App;
