import React from 'react';
import styles from './Styles.module.css';
import Tab from './Tab';

const Content = (props) => (
	<div className={styles.content}>
		<Tab />
		<Tab />
		<Tab />
		<Tab />
	</div>
);

export default Content;
