import React from 'react';
import Projects from './components/Projects';
import Header from './components/Header';
import Content from './components/Content';
import styles from './components/Styles.module.css';

function App() {
	return (
		<div>
			<Header />
			<div className={styles.main}>
				<Projects />
				<Content />
			</div>
		</div>
	);
}

export default App;
