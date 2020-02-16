import React, { useState } from 'react';
import {
	Button, Icon, Modal, Header, Input, Form,
} from 'semantic-ui-react';
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
import projectServices from '../services/projects';

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
	const {
		projectDetails, currentTabIndex, tabName, tabId, setFetchAgain, activeProject,
	} = props;
	const tab = projectDetails[currentTabIndex];
	console.log('props curent tab', tabName, tabId, currentTabIndex, projectDetails[currentTabIndex]);

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

	const [open, setOpen] = useState(false);
	const close = () => setOpen(false);

	const handleAddCard = () => {
		setOpen(true);
	};

	// Form variables for adding new card
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');

	const handleForm = () => {
		// Send POST request for adding new card
		projectServices.addNewCard(activeProject, tabId, { description, deadlineDate: date });

		// Render again, trigger useEffect
		setFetchAgain(true);
		close();
	};

	return (
		<div className={styles.tab}>
			<div className={styles.tabTitleContainer}>
				<div className={styles.tabTitle}>{tabName}</div>
				<div className={styles.tabTitleAlign} />
				<div className={styles.tabAciveNum}>{tab.length}</div>
				<div className={styles.tabTitleAddCardBtn}>
					<Button animated="fade" circular color="yellow" size="small" onClick={handleAddCard}>
						<Button.Content visible>
						</Button.Content>
						<Button.Content hidden>
							<Icon name="add" />
						</Button.Content>
					</Button>
				</div>
			</div>

			{open
			&& (
				<div>
					<Modal dimmer="blurring" open={open} onClose={close}>
						<Modal.Header>
							Create new card for
							{' '}
							{tabName}
						</Modal.Header>
						<Modal.Content image>
							<Modal.Description>
								<Form>
									<Form.Input
										fluid
										label="Description"
										onChange={({ target }) => setDescription(target.value)}
									/>
									<Form.Input
										fluid
										label="Deadline date (yyyy-mm-dd)"
										onChange={({ target }) => setDate(target.value)}
									/>
								</Form>
							</Modal.Description>
						</Modal.Content>
						<Modal.Actions>
							<Button color="black" onClick={close}>
              					Cancel
							</Button>
							<Button
								positive
								icon="checkmark"
								labelPosition="right"
								content="Create"
								onClick={handleForm}
							/>
						</Modal.Actions>
					</Modal>
				</div>
			)}

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
									))].map(() => (
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
													text={`${daysBetween(el.deadlineDate, tab[index + 1].deadlineDate)} days`}
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
		activeProject: state.base.activeProject,
		projectDetails: state.base.projectDetails,
	};
};

export default connect(mapStateToProps)(Tab);
