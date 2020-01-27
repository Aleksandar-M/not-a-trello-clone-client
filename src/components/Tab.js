import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import {
	themes,
	createTheme,
	Timeline,
	Events,
	UrlButton,
	ImageEvent,
	TextEvent,
	YouTubeEvent,
} from '@merc/react-timeline';
import styles from './Styles.module.css';

const customTheme = createTheme(themes.roli, {
	card: {
		backgroundColor: '#0C1734',
		boxShadow: '0 0 0 0',
	},
	date: {
		backgroundColor: 'rebeccapurple',
	},
	marker: {
	//   borderColor: 'rebeccapurple',
	},
	timelineTrack: {
	//   backgroundColor: 'rebeccapurple',
	},
});


const Tab = (props) => {
	const events = [
		{ ts: '2017-09-17T12:22:46.587Z', text: 'Logged in' },
	];

	return (
		<div className={styles.tab}>
			<div className={styles.tabTitleContainer}>
				<div className={styles.tabTitle}>Tabnaslov</div>
				<div className={styles.tabTitleAlign} />
				<div className={styles.tabAciveNum}>5</div>
				<div className={styles.tabTitleAddCardBtn}>
					<Button animated="fade" circular color="yellow" size="small">
						<Button.Content visible>
						</Button.Content>
						<Button.Content hidden>
							<Icon name="add" />
						</Button.Content>
					</Button>
				</div>
			</div>
			<div className={styles.tabTimelineContainer}>
				<Timeline theme={themes.roli} opts={{ layout: 'inline-evts-inline-date' }}>
					<Events>
						<TextEvent date="1/1/19" text="**Markdown** is *supported*" />

						<TextEvent
							date="1/1/19"
							text="Events alternate by default (given enough space in the browser)"
						/>
					</Events>
				</Timeline>
				<Timeline theme={customTheme} opts={{ layout: 'inline-evts-inline-date' }}>
					<Events>
						<TextEvent
							date=""
							text=""
						/>
						<TextEvent
							date=""
							text=""
						/>

						<YouTubeEvent
							date="6/18/19"
							id="6UnRHtwHGSE"
							name="General Tso's Chicken recipe"
							text="... and YouTube videos!"
						/>
					</Events>
				</Timeline>
				<Timeline theme={themes.roli} opts={{ layout: 'inline-evts-inline-date' }}>
					<Events>
						<TextEvent date="1/1/19" text="**Markdown** is *supported*" />

						<TextEvent
							date="1/1/19"
							text="Events alternate by default (given enough space in the browser)"
						/>
						<TextEvent
							date="1/1/19"
							text="Events alternate by default (given enough space in the browser)"
						/>
						<TextEvent
							date=""
							text=""
						/>
					</Events>
				</Timeline>
			</div>
		</div>
	);
};

export default Tab;
