import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProfile } from '../../api';

function Header() {
	const [AUTH_TOKEN] = useState(localStorage.getItem('token'));
	const [USER_ROLE] = useState(JSON.parse(localStorage.getItem('role')));
	const [profile, setProfile] = useState({});

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('role');
	};

	const loadProfile = () => {
		getProfile()
			.then((data) => setProfile({ ...data }))
			.catch((error) => {
				logout();
				window.location.href = '/login';
			});
	};

	useEffect(() => {
		loadProfile();
		if (!AUTH_TOKEN) return (window.location.href = '/login');
	}, [AUTH_TOKEN]);

	return (
		<header className='site-header' style={{ height: 83 }}>
			<div id='header-wrap'>
				<div className='container'>
					<div className='row'>
						<div className='col'>
							<nav className='navbar navbar-expand-lg navbar-light'>
								<a
									href='/'
									className='navbar-brand logo text-primary mb-0 font-w-4'>
									R<span className='text-dark font-w-4'>M</span>
								</a>

								<h6 className='d-none d-xl-block'>
									<span className='text-primary' style={{ fontSize: 13 }}>
										Refugees
									</span>{' '}
									Management
								</h6>
								<div
									className='collapse navbar-collapse justify-content-end'
									id='navbarNav'>
									<Link to='/' className='mx-5' style={{ fontSize: 13 }}>
										Acceuil
									</Link>
									{USER_ROLE === 'admin' ? (
										<>
											<Link to='/refugees' style={{ fontSize: 13 }}>
												Refugiés
											</Link>
											<Link
												to='/users'
												className='mx-5'
												style={{ fontSize: 13 }}>
												Utilisateurs
											</Link>
										</>
									) : null}

									<Link
										to='/profile'
										className='text-uppercase rounded-circle p-2 bg-primary text-white'>
										{profile.fname && profile.fname[0]}
										{profile.lname && profile.lname[0]}
									</Link>
									<ul className='navbar-nav'>
										<li className='nav-item dropdown'>
											<span
												className='nav-link dropdown-toggle'
												data-bs-toggle='dropdown'>
												{profile.fname && profile.fname}{' '}
												{profile.lname && profile.lname}
											</span>
											<ul className='dropdown-menu'>
												<li>
													<Link className='dropdown-item' to='/profile'>
														Mon Compte
													</Link>
												</li>
												{USER_ROLE === 'admin' ? (
													<li>
														<Link className='dropdown-item' to='/locations'>
															Locations
														</Link>
													</li>
												) : null}
												<li>
													<a
														className='dropdown-item'
														href='/login'
														onClick={logout}>
														Déconnexion
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</nav>
						</div>
					</div>
				</div>
				<hr />
			</div>
		</header>
	);
}

export default Header;
