import React, { useState } from 'react';
import {
	Button, Form,
} from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import signInStyles from './SignIn.module.css';
import { signUpAction } from '../reducers/user';

const SignUp = (props) => {
	const { signUp } = props;
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [repeatPass, setRepeatPass] = useState('');

	const handleSignUp = () => {
		if (email && pass === repeatPass) {
			signUp(email, pass, history);
		} else {
			console.log('Error: passwords must match!');
		}
	};

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
					onChange={({ target }) => setEmail(target.value)}
				/>
				<Form.Input
					icon="lock"
					iconPosition="left"
					style={{ width: '500px', height: '50px' }}
					fluid
					placeholder="Password"
					type="Password"
					onChange={({ target }) => setPass(target.value)}
				/>
				<Form.Input
					icon="lock"
					iconPosition="left"
					style={{ width: '500px', height: '50px' }}
					fluid
					placeholder="Repeat password"
					type="Password"
					onChange={({ target }) => setRepeatPass(target.value)}
				/>
			</Form>

			<Button
				style={{ margin: '10px' }}
				inverted
				circular
				size="large"
				content="SIGN UP"
				onClick={handleSignUp}
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

const mapDispatchToProps = {
	signUp: signUpAction,
};

export default connect(null, mapDispatchToProps)(SignUp);
