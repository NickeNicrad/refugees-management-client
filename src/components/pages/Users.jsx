import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	deleteUser,
	getAllChildren,
	getAllRefugies,
	getAllUsers,
	updateUserState,
} from '../../api';

function Users() {
	const [users, setUsers] = useState([]);
	const [refugees, setRefugees] = useState([]);
	const [children, setChildren] = useState([]);
	const [val, setVal] = useState({
		search: '',
	});
	// const [values, setValues] = useState({
	// 	fname: '',
	// 	lnamme: '',
	// 	email: '',
	// 	phone: '',
	// 	password: '',
	// 	confirmPass: '',
	// });

	// const handleSignup = (e) => {
	// 	e.preventDefault();
	// 	signup(values)
	// 		.then((response) => console.log(response))
	// 		.catch((error) => console.log(error));
	// };

	const loadUsers = () => {
		getAllUsers()
			.then((response) => {
				if (response.status === 200) return setUsers([...response.data]);
				console.log(response);
			})
			.catch((error) => console.log(error));
	};

	const loadRefugees = () => {
		getAllRefugies()
			.then((response) => {
				if (response.status === 200) return setRefugees([...response.data]);
				console.log(response);
			})
			.catch((error) => console.log(error));
	};

	const loadChildren = () => {
		getAllChildren()
			.then((response) => {
				if (response.status === 200) return setChildren([...response.data]);
				console.log(response);
			})
			.catch((error) => console.log(error));
	};

	const handleUserState = (user) => {
		updateUserState(user)
			.then((response) => {
				if (response.status === 200) {
					alert(response.data);
					loadUsers();
				} else {
					alert(response);
				}
			})
			.catch((error) => console.log(error));
	};

	const handleDelete = (user) => {
		if (window.confirm('voulez-vous vraiment supprimer?')) {
			deleteUser(user.id)
				.then((response) => {
					console.log(response);
					alert(response.data);
					loadUsers();
				})
				.catch((error) => alert(error));
		}
	};

	const filteredUsers = users.filter(
		(item) =>
			(item.fname + ' ' + item.lname)
				.toLowerCase()
				.indexOf(val.search.toLowerCase()) !== -1,
	);

	const filteredRefugiesbyUser = (id) => {
		return refugees.filter((item) => item.uid === id);
	};

	const filteredChildrenbyUser = (id) => {
		return children.filter((item) => item.uid === id);
	};

	useEffect(() => {
		loadUsers();
		loadRefugees();
		loadChildren();
	}, []);
	return (
		<div className='container'>
			<div className='d-flex justify-content-between pb-4'>
				<h6>Tous les Utilisateurs</h6>
				<input
					className='form-control w-25'
					type='search'
					placeholder='recherche...'
					value={val.search}
					onChange={(e) => setVal({ ...val, search: e.target.value })}
				/>
				<Link to='/signup' className='btn btn-sm btn-primary'>
					<i className='las la-plus'></i> ajouter
				</Link>
			</div>

			<div className='row'>
				{filteredUsers.length > 0
					? filteredUsers
							.filter((item) => item.role !== 'admin')
							.map((user, index) => (
								<div
									key={index}
									className='col-12 col-lg-3 col-md-6 mb-4 mb-lg-0'>
									<div className='border text-center py-5 px-3 rounded'>
										<div className='mb-4 d-flex justify-content-center align-items-center'>
											{user.img && user.img ? (
												<img
													className='img-fluid rounded-circle shadow overflow-hidden'
													style={{ height: 150, width: 150 }}
													src='assets/images/team/01.png'
													alt=''
												/>
											) : (
												<div
													className='rounded-circle d-flex justify-content-center align-items-center display-5 text-white text-uppercase'
													style={{
														height: 160,
														width: 160,
														backgroundColor:
															styles.bg_colors[index % styles.bg_colors.length],
													}}>
													{user.fname && user.fname[0]}
													{user.lname && user.lname[0]}
												</div>
											)}
										</div>
										<div>
											<h5 className='mb-1 text-capitalize'>
												{user.fname && user.fname} {user.lname && user.lname}
											</h5>
											<small className='text-muted mb-1 d-block'>
												{user.role && user.role} |{' '}
												{user.active && user.active === true
													? 'activé'
													: 'desactivé'}
											</small>
											<small className='text-muted mb-3 d-block'>
												{filteredRefugiesbyUser(user.id).length} Adultes |{' '}
												{filteredChildrenbyUser(user.id).length} Enfants
											</small>

											<ul className='list-inline mb-0'>
												<li className='list-inline-item'>
													<Link
														to='/signup'
														className='btn btn-outline-success border px-2 py-1'>
														<i className='la la-edit' />
													</Link>
												</li>

												<li className='list-inline-item'>
													<button
														className={`btn btn-${
															user.active ? 'primary' : 'secondary'
														} border px-2 py-1`}
														onClick={handleUserState.bind(this, user)}>
														<i
															className={`la la-${
																user.active ? 'unlock' : 'lock'
															}`}
														/>
													</button>
												</li>

												<li className='list-inline-item'>
													<button
														className='btn btn-outline-danger border px-2 py-1'
														onClick={handleDelete.bind(this, user)}>
														<i className='la la-remove' />
													</button>
												</li>
											</ul>
										</div>
									</div>
								</div>
							))
					: null}
			</div>
		</div>
	);
}

const styles = {
	bg_colors: [
		'#fd7e14',
		'#6610f2',
		'#20c997',
		'#20c997',
		'#adb5bd',
		'#198754',
		'#dc3545',
	],
};

export default Users;
