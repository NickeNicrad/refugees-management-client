import React, { useState } from 'react';
import { login } from '../../api';

function Login() {
	const [AUTH_TOKEN] = useState(localStorage.getItem('token'));
	const [values, setValues] = useState({ email: '', password: '' });
	const [error, setError] = useState('');

	const isUserLogged = () => {
		if (AUTH_TOKEN) return (window.location.href = '/');
	};

	isUserLogged();

	const handleLogin = (e) => {
		e.preventDefault();
		login(values)
			.then((response) => {
				if (response.status === 200 && response.data.token) {
					window.localStorage.setItem('token', response.data.token);
					window.localStorage.setItem('uid', JSON.stringify(response.data.uid));
					window.localStorage.setItem(
						'role',
						JSON.stringify(response.data.role),
					);
					window.location.href = '/';
				} else {
					setError(response.message);
				}
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className='page-wrapper'>
			<div className='page-content'>
				<section>
					<div className='container'>
						<div className='row justify-content-center'>
							<div className='col-lg-5'>
								<div className='bg-white shadow rounded p-4'>
									<h2 className='text-center mb-5 mt-3'>Login</h2>
									{error ? (
										<div className='alert alert-warning alert-dismissible'>
											<strong>Desolé!</strong> {error}
										</div>
									) : (
										<div className='alert alert-dismissible'></div>
									)}
									<form id='contact-form' onSubmit={handleLogin}>
										<div className='form-group'>
											<label>Adresse Electronique</label>
											<input
												id='form_name'
												type='text'
												name='name'
												className='form-control'
												placeholder='email'
												required='required'
												data-error='adresse electronique est requise'
												value={values.email}
												onChange={(e) =>
													setValues({ ...values, email: e.target.value })
												}
											/>
											<div className='help-block with-errors'></div>
										</div>
										<div className='form-group'>
											<label>Mot de Passe</label>
											<input
												id='form_password'
												type='password'
												name='password'
												className='form-control'
												placeholder='mot de passe'
												required='required'
												data-error='le mot de passe est requis'
												value={values.password}
												onChange={(e) =>
													setValues({ ...values, password: e.target.value })
												}
											/>
											<div className='help-block with-errors'></div>
										</div>
										<div className='form-group mt-4 mb-5'>
											<div className='remember-checkbox d-flex align-items-center justify-content-between'>
												<span className='float-right'>
													mot de passe oublié?
												</span>
											</div>
										</div>{' '}
										<button
											type='submit'
											className='btn btn-primary btn-sm w-100'
											onClick={handleLogin}>
											connectez
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

export default Login;
