import React, { useState, useEffect } from 'react';
import RefCard from './modals/RefCard';
import { getAllRefugies, deleteRefugee, getAllUsers } from '../../api';

function Refugees() {
	const [val, setVal] = useState({ search: '', isUpdateInited: '' });
	const [refugeeInited, setInitedRefugee] = useState({});
	const [refuees, setRefugees] = useState([]);
	const [users, setUsers] = useState([]);

	const initRefugee = (data) => {
		setInitedRefugee({ ...data });
	};

	const handleDelete = (data) => {
		if (window.confirm('voulez-vous vraiment supprimer?')) {
			deleteRefugee(data.id)
				.then((data) => {
					loadRefugies();
					alert(data);
				})
				.catch((error) => console.log(error));
		}
	};

	const filteredRefugiees = refuees.filter(
		(item) =>
			(item.fname + ' ' + item.lname)
				.toLowerCase()
				.indexOf(val.search.toLowerCase()) !== -1,
	);

	const filteredUsersById = (uid) => {
		return users.filter((item) => item.id === uid).map((user) => user.email);
	};

	const loadRefugies = () => {
		getAllRefugies()
			.then((response) => {
				if (response.status === 200) return setRefugees([...response.data]);
				alert(response.data);
			})
			.catch((error) => console.log(error));
	};

	const loadUsers = () => {
		getAllUsers()
			.then((response) => {
				if (response.status === 200) return setUsers([...response.data]);
				console.log(response);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		loadRefugies();
		loadUsers();
	}, []);

	return (
		<div className='container'>
			<div className='d-flex justify-content-between align-items-center py-2'>
				<h6 className='text-muted'>Liste des Refugiés</h6>
				<input
					type='search'
					className='form-control w-25 float-end'
					placeholder='recherche...'
					value={val.search}
					onChange={(e) => setVal({ ...val, search: e.target.value })}
				/>
			</div>
			<div className='table-responsive border-bottom-0 data-table'>
				<table className='cart-table table-striped table-hover table text-center mb-0 table-font'>
					<thead className='bg-light'>
						<tr>
							<th scope='col' style={{ fontSize: 14, fontWeight: 'bold' }}>
								#
							</th>
							<th scope='col' style={{ fontSize: 14, fontWeight: 'bold' }}>
								Nom et Prénom
							</th>
							<th scope='col' style={{ fontSize: 14, fontWeight: 'bold' }}>
								Provenance
							</th>
							<th scope='col' style={{ fontSize: 14, fontWeight: 'bold' }}>
								Destination
							</th>
							<th scope='col' style={{ fontSize: 14, fontWeight: 'bold' }}>
								Sexe
							</th>
							<th scope='col' style={{ fontSize: 14, fontWeight: 'bold' }}>
								Age
							</th>
							<th scope='col' style={{ fontSize: 14, fontWeight: 'bold' }}>
								ID Carte
							</th>
							<th scope='col' style={{ fontSize: 14, fontWeight: 'bold' }}>
								Crée par
							</th>
							<th scope='col' style={{ fontSize: 15 }}></th>
						</tr>
					</thead>
					<tbody>
						{filteredRefugiees &&
							filteredRefugiees.map((item, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>
										<h6
											className='mb-0 text-muted text-capitalize text-xs'
											data-bs-toggle='modal'
											data-bs-target='#refugeeModal'
											style={{ fontSize: 13, fontWeight: 'bold' }}>
											{item.fname && item.fname} {item.lname && item.lname}
										</h6>
									</td>
									<td className='text-capitalize'>
										{item.dest_from && item.dest_from}
									</td>
									<td className='text-capitalize'>
										{item.destination && item.destination}
									</td>
									<td className='text-capitalize'>
										{item.gender && item.gender}
									</td>
									<td>
										{new Date().getFullYear() -
											new Date(item.dob).getFullYear()}{' '}
										ans
									</td>
									<td>
										<button
											className='btn btn-sm text-primary'
											data-bs-toggle='modal'
											data-bs-target='#refcardModal'
											onClick={initRefugee.bind(this, item)}>
											aperçu
										</button>
									</td>
									<td className='text-success'>
										{filteredUsersById(item.uid).shift()}
									</td>
									<td className='border-right-0'>
										<button
											className='btn btn-outline-danger btn-sm btn-table'
											onClick={handleDelete.bind(this, item)}>
											<i
												className='las la-times'
												data-toggle='tooltip'
												title='supprimer'
												data-placement='bottom'></i>
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			<RefCard {...refugeeInited} />
		</div>
	);
}

export default Refugees;
