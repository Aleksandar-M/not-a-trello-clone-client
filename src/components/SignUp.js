import React, { useState } from 'react';
import {
	Button, Form,
} from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import signInStyles from './SignIn.module.css';
import { signUpAction } from '../reducers/user';
import { alertErrorAction } from '../reducers/alert';
import Notification from './Notification';

const SignUp = (props) => {
	const {
		signUp, alertError,
	} = props;
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [repeatPass, setRepeatPass] = useState('');

	const handleSignUp = () => {
		if (email && pass && repeatPass && pass === repeatPass) {
			signUp(email, pass, history);
		} else if (pass !== repeatPass) {
			alertError('Error: passwords must match!');
		} else {
			alertError('Error: All fields are required!');
		}
	};

	return (
		<div>
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
						style={{ color: '#ADFF2F' }}
					>
					Sign in
					</Link>

				</div>
			</div>

			<Notification />
		</div>
	);
};

const mapDispatchToProps = {
	signUp: signUpAction,
	alertError: alertErrorAction,
};

export default connect(null, mapDispatchToProps)(SignUp);
