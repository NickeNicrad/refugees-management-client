import React, { useEffect, useState } from 'react';
import {
	createRefugee,
	getAllRefugies,
	getAllCountries,
	getAllStates,
	getAllCities,
} from '../../../api';
import RefCard from '../modals/RefCard';
import Refugee from '../modals/Refugee';

function Adults() {
	const [uid] = useState(JSON.parse(localStorage.getItem('uid')));
	const [val, setVal] = useState({ search: '', isUpdateInited: '' });

	const [refugeeInited, setInitedRefugee] = useState({});
	const [values, setValues] = useState({
		fname: '',
		lname: '',
		dest_from: '',
		destination: '',
		gender: '',
		partner: '',
		dob: '',
		married: false,
	});

	const [refuees, setRefugees] = useState([]);
	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);

	const handleCreate = (e) => {
		e.preventDefault();
		createRefugee({ ...values, uid })
			.then((data) => {
				loadRefugies();
				alert(data);
				setValues({
					fname: '',
					lname: '',
					dest_from: '',
					destination: '',
					gender: '',
					partner: '',
					dob: '',
					married: false,
				});
			})
			.catch((error) => console.log(error));
	};

	const handleUpdate = (data) => {
		setValues({ ...data });
	};

	const btnCancel = () => {
		setValues({
			fname: '',
			lname: '',
			country: '',
			state: '',
			city: '',
			dest_from: '',
			destination: '',
			gender: '',
			partner: '',
			dob: '',
			married: true,
		});
	};

	const initRefugee = (data) => {
		setInitedRefugee({ ...data });
	};

	const initPartner = (data) => {
		setValues({ ...values, partner: `${data.fname} ${data.lname}` });
	};

	const loadCountries = () => {
		getAllCountries()
			.then((response) => {
				if (response.status === 200) {
					setCountries([...response.data]);
				}
			})
			.catch();
	};
	const loadStates = () => {
		getAllStates()
			.then((response) => {
				if (response.status === 200) {
					setStates([...response.data]);
				}
			})
			.catch();
	};
	const loadCities = () => {
		getAllCities()
			.then((response) => {
				if (response.status === 200) {
					setCities([...response.data]);
				}
			})
			.catch();
	};

	const loadRefugies = () => {
		getAllRefugies()
			.then((response) => {
				if (response.status) return setRefugees([...response.data]);
				alert(response.data);
			})
			.catch((error) => console.log(error));
	};

	const filteredRefugees = refuees.filter(
		(item) =>
			(item.fname + ' ' + item.lname)
				.toLowerCase()
				.indexOf(val.search.toLowerCase()) !== -1,
	);

	useEffect(() => {
		loadRefugies();
		loadCountries();
		loadStates();
		loadCities();
	}, []);

	return (
		<div className='row'>
			<div className='d-xl-none d-sm-block justify-content-between px-3 pb-3 pt-2'>
				<input
					type='search'
					className='form-control mb-2 border'
					placeholder='recherche...'
					value={val.search}
					onChange={(e) => setVal({ ...val, search: e.target.value })}
				/>
				<div className='d-flex justify-content-end'>
					<button className='btn btn-sm border'>
						<i className='la la-plus'></i>
					</button>
				</div>
			</div>
			<div className='col-lg-3 p-0 d-none d-xl-block'>
				<div className='card card-input'>
					<div className='card-body px-3 pb-1'>
						<form onSubmit={handleCreate}>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									placeholder='Nom'
									value={values.fname}
									onChange={(e) =>
										setValues({ ...values, fname: e.target.value })
									}
								/>
							</div>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									placeholder='Prénom'
									value={values.lname}
									onChange={(e) =>
										setValues({ ...values, lname: e.target.value })
									}
								/>
							</div>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									placeholder='Lieu de Provenance'
									data-bs-toggle='modal'
									data-bs-target='#locationsModal'
									value={values.dest_from}
									// onChange={(e) =>
									// 	setValues({ ...values, dest_from: e.target.value })
									// }
								/>
							</div>
							<div className='form-group'>
								<input
									type='text'
									className='form-control'
									placeholder='Lieu de Destination'
									data-bs-toggle='modal'
									data-bs-target='#locationsModal'
									value={values.destination}
									// onChange={(e) =>
									// 	setValues({ ...values, destination: e.target.value })
									// }
								/>
							</div>
							<div className='row'>
								<div className='col'>
									<div className='form-group'>
										<input
											type='date'
											className='form-control'
											placeholder='date de naissance'
											max={`${new Date().getFullYear() - 18}-01-01`}
											value={values.dob}
											onChange={(e) =>
												setValues({ ...values, dob: e.target.value })
											}
										/>
									</div>
								</div>
								<div className='col'>
									<div className='form-group'>
										<select
											className='form-control'
											onChange={(e) =>
												setValues({ ...values, gender: e.target.value })
											}>
											<option disabled selected>
												Sexe
											</option>
											<option>M</option>
											<option>F</option>
										</select>
									</div>
								</div>
							</div>
							<div className='form-group'>
								<div className='row align-items-center'>
									<div className='col-7'>
										<div className='form-check form-check-inline'>
											<input
												className='form-check-input'
												type='checkbox'
												id='check_married'
												value={values.married}
												onChange={(e) =>
													setValues({ ...values, married: e.target.value })
												}
											/>
											<label
												className='form-check-label'
												htmlFor='check_married'>
												Marié(e)
											</label>
										</div>
									</div>
									<div className='col-5 btn btn-sm'>
										<input
											hidden
											id='ref-profile-image'
											type='file'
											accept='image/*'
										/>
										<label
											className='text-muted form-control'
											htmlFor='ref-profile-image'>
											<i className='la la-image'></i> image
										</label>
									</div>
								</div>
								<div className='dropdown'>
									<select
										className='form-control'
										disabled={!values.gender || values.married === false}
										onChange={(e) =>
											setValues({ ...values, partner: e.target.value })
										}>
										<option disabled selected>
											Nom du Partenaire
										</option>
										{refuees &&
											refuees
												.filter((item) => item.gender !== values.gender)
												.map((item, index) => (
													<option
														key={index}
														style={{ fontSize: 13 }}
														onClick={initPartner.bind(this, item)}>
														{item.fname && item.fname}{' '}
														{item.lname && item.lname}
													</option>
												))}
									</select>
								</div>
							</div>

							<div className='form-group d-flex'>
								<button
									type='submit'
									className='btn btn-outline-primary btn-sm'>
									ajouter
								</button>
								<button
									type='reset'
									className='btn btn-outline-success mx-2 btn-sm'
									onClick={btnCancel}>
									annuler
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className='col-xl-9 col-lg-12 col-md-12 col-sm-12'>
				<div className='card'>
					<div className='card-body'>
						<div className='d-flex justify-content-between align-items-center py-2'>
							<h6 className='text-muted'>Liste des Refugiés</h6>
							<input
								type='search'
								className='form-control w-25 float-end d-none d-xl-block'
								placeholder='recherche...'
								value={val.search}
								onChange={(e) => setVal({ ...val, search: e.target.value })}
							/>
						</div>
						<div className='table-responsive border-bottom-0 card-table'>
							<table className='cart-table table-striped table-hover table text-center mb-0 table-font'>
								<thead className='bg-light'>
									<tr>
										<th
											scope='col'
											style={{ fontSize: 14, fontWeight: 'bold' }}>
											#
										</th>
										<th
											scope='col'
											style={{ fontSize: 14, fontWeight: 'bold' }}>
											Nom et Prénom
										</th>
										<th
											scope='col'
											style={{ fontSize: 14, fontWeight: 'bold' }}>
											Provenance
										</th>
										<th
											scope='col'
											style={{ fontSize: 14, fontWeight: 'bold' }}>
											Destination
										</th>
										<th
											scope='col'
											style={{ fontSize: 14, fontWeight: 'bold' }}>
											Sexe
										</th>
										<th
											scope='col'
											style={{ fontSize: 14, fontWeight: 'bold' }}>
											Age
										</th>

										<th scope='col' style={{ fontSize: 15 }}></th>
									</tr>
								</thead>
								<tbody>
									{filteredRefugees &&
										filteredRefugees.map((item, index) => (
											<tr key={index}>
												<td>{index + 1}</td>
												<td>
													<h6
														className='mb-0 text-muted text-capitalize text-xs'
														data-bs-toggle='modal'
														data-bs-target='#refugeeModal'
														style={{ fontSize: 13, fontWeight: 'bold' }}
														onClick={initRefugee.bind(this, item)}>
														{item.fname && item.fname}{' '}
														{item.lname && item.lname}
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
												<td className='border-right-0'>
													<button
														className='btn btn-outline-success btn-sm btn-table'
														onClick={handleUpdate.bind(this, item)}>
														<i
															className='las la-edit'
															data-toggle='tooltip'
															title='modifier'
															data-placement='bottom'
														/>
													</button>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<RefCard {...refugeeInited} />
			<Refugee {...refugeeInited} />
			{/* modal */}

			<div
				className='modal fade'
				id='locationsModal'
				tabIndex={-1}
				aria-labelledby='locationsModalLabel'
				aria-hidden='true'>
				<div className='modal-dialog modal-md'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='locationsModalLabel'>
								Lieu de Provenance
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'></button>
						</div>
						<div className='modal-body'>
							<form>
								<div className='messages' />

								<div className='form-group'>
									<select
										className='form-control'
										onChange={(e) =>
											setValues({
												...values,
												dest_from: e.target.value,
											})
										}>
										<option value='Country'>Selectionnez Pays...</option>
										{countries.map((item, index) => (
											<option key={index} className='text-capitalize'>
												{item.countryName && item.countryName}
											</option>
										))}
									</select>
									<div className='help-block with-errors' />
								</div>

								<div className='form-group'>
									<select className='form-control'>
										<option selected>Selectionnnez Province...</option>
										{states &&
											states.map((item, index) => (
												<option key={index} className='text-capitalize'>
													{item.stateName && item.stateName}
												</option>
											))}
									</select>
									<div className='help-block with-errors' />
								</div>
								<div className='form-group'>
									<select
										className='form-control'
										onChange={(e) => values.dest_from.push(e.target.value)}>
										<option value='Country'>Selectionnez Ville...</option>
										{cities &&
											cities.map((item, index) => (
												<option key={index} className='text-capitalize'>
													{item.cityName && item.cityName}
												</option>
											))}
									</select>
									<div className='help-block with-errors' />
								</div>

								<div className='row px-2'>
									<button className='btn btn-primary btn-sm'>ajouter</button>

									<button type='reset' className='btn btn-danger btn-sm my-2'>
										annuler
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			{/* modal */}
		</div>
	);
}

export default Adults;
