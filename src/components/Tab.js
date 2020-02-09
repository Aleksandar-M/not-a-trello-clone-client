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
import { connect } from 'react-redux';
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
	const { projectDetails, currentTabIndex, tabName } = props;
	const tab = projectDetails[currentTabIndex];
	console.log('props curent tab', tabName, currentTabIndex, projectDetails[currentTabIndex]);

	// Function for getting date without time value
	const stringToDate = (dateVal) => {
		const newDate = new Date(dateVal);
		return newDate.toDateString();
	};

	// Calculate days between to dates
	const daysBetween = (firstDate, secondDate) => {
		const newFirst = new Date(firstDate);
		const newSecond = new Date(secondDate);

		const days = Math.floor((newSecond - newFirst) / (24 * 60 * 60 * 1000));

		return days.toString();
	};

	// Condition for rendering dots or number of days
	const renderDots = (index, el) => (index < tab.length - 1)
				&& daysBetween(el.deadlineDate, tab[index + 1].deadlineDate) <= 7;

	return (
		<div className={styles.tab}>
			<div className={styles.tabTitleContainer}>
				<div className={styles.tabTitle}>{tabName}</div>
				<div className={styles.tabTitleAlign} />
				<div className={styles.tabAciveNum}>{tab.length}</div>
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
				{ tab.map((el, index) => (
					<div>
						<Timeline theme={themes.roli} opts={{ layout: 'inline-evts-inline-date' }}>
							<Events>
								<TextEvent
									date={stringToDate(el.deadlineDate)}
									text={el.description}
								/>
							</Events>
						</Timeline>
						<Timeline theme={customTheme} opts={{ layout: 'inline-evts-inline-date' }}>
							<Events>
								{ renderDots(index, el)
									? [...Array(parseInt(
										daysBetween(el.deadlineDate,
											tab[index + 1].deadlineDate), 10,
									))].map((el) => (
										<TextEvent
											date=""
											text=""
										/>
									))

									: (
										<div>
											{(index < tab.length - 1)
											&& (
												<TextEvent
													text={daysBetween(el.deadlineDate, tab[index + 1].deadlineDate)}
													date=""
												/>
											)}
										</div>
									)}
							</Events>
						</Timeline>
					</div>
				))}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	console.log('state from tab', state);
	return {
		activeProject: state.activeProject,
		projectDetails: state.projectDetails,
	};
};

export default connect(mapStateToProps)(Tab);
