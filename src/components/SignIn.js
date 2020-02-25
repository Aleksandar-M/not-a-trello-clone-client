import React, { useState } from 'react';
import {
	Button, Form,
} from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import signInStyles from './SignIn.module.css';
import { signInAction } from '../reducers/user';
import { alertErrorAction } from '../reducers/alert';
import Notification from './Notification';

const SignIn = (props) => {
	const {
		signIn, alertError,
	} = props;
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignIn = () => {
		if (email && password) {
			signIn(email, password, history);
		} else {
			alertError('Error: All fields are required!');
		}
	};


	return (
		<div>
			<div className={signInStyles.formContainer}>
				<h1>Sign in</h1>
				<Form>
					<Form.Input
						icon="user"
						iconPosition="left"
						style={{ width: '500px', height: '50px' }}
						fluid
						placeholder="Email adress"
						type="Email"
						onChange={({ target }) => setEmail(target.value)}
					/>
					<Form.Input
						icon="lock"
						iconPosition="left"
						style={{ width: '500px', height: '50px' }}
						fluid
						placeholder="Password"
						type="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</Form>

				<Button
					style={{ margin: '10px' }}
					inverted
					circular
					size="large"
					content="SIGN IN"
					onClick={handleSignIn}
				/>
				<div className={signInStyles.bottomText}>
					Don't have account?
					{' '}
					<Link
						to="/signup"
						style={{ color: '#ADFF2F' }}
					>
						Sign up
					</Link>
				</div>
			</div>

			<Notification />
		</div>
	);
};

const mapDispatchToProps = {
	signIn: signInAction,
	alertError: alertErrorAction,
};

export default connect(null, mapDispatchToProps)(SignIn);
