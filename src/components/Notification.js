import React from 'react';
import {
	Message,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

const Notification = (props) => {
	const {
		alertMessage, alertType,
	} = props;

	return (
		<div>
			{ alertMessage
				&&	(
					<Message
						style={{
							left: '500px', top: '15px', width: '900px', position: 'absolute', borderRadius: '40px',
						}}
						color={alertType === 'SUCCESS' ? 'green' : 'red'}
						content={alertMessage}
					/>
				)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	alertMessage: state.alert.message,
	alertType: state.alert.type,
});

export default connect(mapStateToProps, null)(Notification);
