import React, { useState } from 'react';
import { signup } from '../../api';

function Signup() {
	const [values, setValues] = useState({
		fname: '',
		lname: '',
		email: '',
		phone: '',
		role: 'user',
		password: '',
		confirmPass: '',
	});

	const handleSignup = (e) => {
		e.preventDefault();
		signup(values)
			.then((response) => {
				if (response.status === 200) {
					alert(response.data);
					window.location.href = '/users';
				} else {
					alert(response.data);
				}
			})
			.catch((error) => console.log(error));
	};

	return (
		<section className='register mt-0 pt-0'>
			<div className='container'>
				<div className='row justify-content-center text-center'>
					<div className='col-lg-8 col-md-12'>
						<div className='mb-5'>
							<h2>Inscription</h2>
							<p className='lead'>
								Bienvenu à notre programme 'Refugees Management'
							</p>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-8 col-md-10 ms-auto me-auto'>
						<div className='register-form text-center'>
							<form onSubmit={handleSignup}>
								<div className='messages'></div>
								<div className='row'>
									<div className='col-md-6'>
										<div className='form-group'>
											<input
												id='form_name'
												type='text'
												name='name'
												className='form-control'
												placeholder='nom'
												required='required'
												data-error='le nom est requis'
												value={values.fname}
												onChange={(e) =>
													setValues({ ...values, fname: e.target.value })
												}
											/>
											<div className='help-block with-errors'></div>
										</div>
									</div>
									<div className='col-md-6'>
										<div className='form-group'>
											<input
												id='form_lastname'
												type='text'
												name='lname'
												className='form-control'
												placeholder='prénom'
												required='required'
												data-error='le prénom est requis'
												value={values.lname}
												onChange={(e) =>
													setValues({ ...values, lname: e.target.value })
												}
											/>
											<div className='help-block with-errors'></div>
										</div>
									</div>
								</div>
								<div className='row'>
									<div className='col-md-6'>
										<div className='form-group'>
											<input
												id='form_email'
												type='email'
												name='email'
												className='form-control'
												placeholder='adresse electronique'
												required='required'
												data-error={`l'adresse electronique est requise`}
												value={values.email}
												onChange={(e) =>
													setValues({ ...values, email: e.target.value })
												}
											/>
											<div className='help-block with-errors'></div>
										</div>
									</div>
									<div className='col-md-6'>
										<div className='form-group'>
											<input
												id='form_phone'
												type='tel'
												name='phone'
												className='form-control'
												placeholder='numero de téléphone'
												required='required'
												data-error='le numéro de téléphone est requis'
												value={values.phone}
												onChange={(e) =>
													setValues({ ...values, phone: e.target.value })
												}
											/>
											<div className='help-block with-errors'></div>
										</div>
									</div>
								</div>
								<div className='row'>
									<div className='col-md-6'>
										<div className='form-group'>
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
									</div>
									<div className='col-md-6'>
										<div className='form-group'>
											<input
												id='form_password1'
												type='password'
												name='password'
												className='form-control'
												placeholder='confirmer le mot de passe'
												required='required'
												data-error='le mot de passe est requis'
												value={values.confirmPass}
												onChange={(e) =>
													setValues({ ...values, confirmPass: e.target.value })
												}
											/>
											<div className='help-block with-errors'></div>
										</div>
									</div>
								</div>

								<div className='row mt-5'>
									<div className='col'>
										<button
											className='btn btn-primary btn-sm'
											onClick={handleSignup}>
											créer compte
										</button>
										<span className='mt-4 d-block'>compte utilisateur</span>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Signup;
