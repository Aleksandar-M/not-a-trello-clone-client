import React from 'react';
import Projects from './components/Projects';
import Header from './components/Header';
import Content from './components/Content';
import styles from './components/Styles.module.css';
import SignIn from './components/SignIn';

function App() {
	// if (!userFromRedux) {
	// 	return (
	// 		<SignIn />
	// 	);
	// }

	return (
		<div>
			<SignIn />
			{/* <Header />
			<div className={styles.main}>
				<Projects />
				<Content />
			</div> */}
		</div>
	);
}

export default App;
