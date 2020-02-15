import React, { useState } from 'react';
import {
	Button, Input, Form, Grid,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import signInStyles from './SignIn.module.css';

const SignUp = (props) => {
	const { setSignUp } = props;

	return (
		<div className={signInStyles.formContainer}>
			<h1>Sign up</h1>
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
				<Form.Input
					icon="lock"
					iconPosition="left"
					style={{ width: '500px', height: '50px' }}
					fluid
					placeholder="Repeat password"
					type="Password"
				// onChange={({ target }) => setDate(target.value)}
				/>
			</Form>

			<Button
				style={{ margin: '10px' }}
				inverted
				circular
				size="large"
				content="SIGN UP"
			/>

			<div className={signInStyles.bottomText}>
				Have account?
				{' '}
				<Link
					to="/"
					style={{ color: 'white' }}
				>
					Sign in
				</Link>

			</div>
		</div>
	);
};

export default SignUp;