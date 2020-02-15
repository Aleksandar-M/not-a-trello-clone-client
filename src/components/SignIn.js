import React, { useState } from 'react';
import {
	Button, Form,
} from 'semantic-ui-react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import signInStyles from './SignIn.module.css';
import SignUp from './SignUp';

const SignIn = () => {
	const history = useHistory();

	const handleSignIn = () => {
		history.push('/workspace');
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
					// onChange={({ target }) => setDescription(target.value)}
				/>
				<Form.Input
					icon="lock"
					iconPosition="left"
					style={{ width: '500px', height: '50px' }}
					fluid
					placeholder="Password"
					type="Password"
					// onChange={({ target }) => setDate(target.value)}
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

export default SignIn;
