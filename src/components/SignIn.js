import React, { useState } from 'react';
import {
	Button, Form,
} from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import signInStyles from './SignIn.module.css';
import { signInAction } from '../reducers/user';

const SignIn = (props) => {
	const { currentUser, isLoggedIn, signIn } = props;
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignIn = () => {
		if (email && password) {
			signIn(email, password, history);
		}

		setEmail('');
		setPassword('');
	};


	return (
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
					style={{ color: 'white' }}
				>
					Sign up
				</Link>


			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	currentUser: state.users.currentUser,
	isLoggedIn: state.users.isLoggedIn,
});

const mapDispatchToProps = {
	signIn: signInAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
