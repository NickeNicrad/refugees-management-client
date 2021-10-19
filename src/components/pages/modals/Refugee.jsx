import React, { useEffect, useState } from 'react';
import {
	createChild,
	deleteChild,
	getAllChildren,
	updateChild,
} from '../../../api';

function Refugee(props) {
	const [uid] = useState(JSON.parse(localStorage.getItem('uid')));
	const [values, setValues] = useState({
		fname: '',
		lname: '',
		gender: '',
		dob: '',
	});
	const [val, setVal] = useState({ search: '' });
	const [children, setChildren] = useState([]);

	const loadChildren = () => {
		getAllChildren()
			.then((response) => {
				if (Array.isArray(response.data))
					return setChildren([...response.data]);
				console.log(response);
			})
			.catch((error) => console.log(error));
	};

	const handleCreate = (e) => {
		e.preventDefault();
		createChild({
			...values,
			parents: `${props.fname && props.fname} ${props.lname && props.lname}`,
			uid,
		})
			.then((response) => {
				loadChildren();
				alert(response.data);
			})
			.catch((error) => console.log(error));
	};

	const handleUpdate = (data) => {
		updateChild(data)
			.then((response) => {
				loadChildren();
				alert(response.data);
			})
			.catch((error) => console.log(error));
	};

	const handleDelete = (data) => {
		if (window.confirm('voulez-vous vraiment supprimer?')) {
			deleteChild(data.id)
				.then((response) => {
					loadChildren();
					alert(response.data);
				})
				.catch((error) => console.log(error));
		}
	};

	const filteredChildren = children.filter(
		(item) =>
			(item.fname + ' ' + item.lname)
				.toLowerCase()
				.indexOf(val.search.toLowerCase()) !== -1,
	);

	useEffect(() => {
		loadChildren();
	}, []);

	return (
		<div
			className='modal fade'
			id='refugeeModal'
			tabIndex={-1}
			aria-labelledby='refugeeModalLabel'
			aria-hidden='true'>
			<div className='modal-dialog modal-lg'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title' id='refugeeModalLabel'>
							Refugié(e)
						</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'></button>
					</div>
					<div className='modal-body'>
						<div className='container'>
							<div className='d-flex justify-content-between'>
								<ul className='w-50'>
									<li>
										Nom:{' '}
										<span className='fw-bold text-capitalize'>
											{props && props.fname} {props && props.lname}
										</span>
									</li>
									<li>
										Naissance:{' '}
										<span className='fw-bold'>
											{props && new Date(props.dob).toLocaleDateString('fr-FR')}
										</span>
									</li>

									<li>
										Provenance:{' '}
										<span className='fw-bold text-capitalize'>
											{props && props.dest_from}
										</span>
									</li>

									<li>
										Destination:{' '}
										<span className='fw-bold text-capitalize'>
											{props && props.destination}
										</span>
									</li>
								</ul>
								<ul>
									<li>
										Age:{' '}
										<span className='fw-bold'>
											{props &&
												new Date().getFullYear() -
													new Date(props.dob).getFullYear()}
											ans
										</span>
									</li>
									<li>
										Sexe:{' '}
										<span className='fw-bold text-capitalize'>
											{props && props.gender}
										</span>
									</li>
								</ul>
							</div>

							<center className='mb-4'>
								<input
									className='w-50 form-control'
									type='text'
									placeholder='recherche...'
									value={val.search}
									onChange={(e) => setVal({ ...val, search: e.target.value })}
								/>
							</center>

							<div className='d-flex justify-content-between align-items-center mb-2'>
								<h6 className='card-title' style={{ fontSize: 14 }}>
									Liste des Enfants
								</h6>
								<div className='d-flex gap-1'>
									<button
										data-bs-toggle='modal'
										data-bs-target='#addChildModal'
										className='btn btn-outline-secondary btn-block btn-sm m-1 d-flex'>
										<i className='la la-plus'></i>
										<span
											data-toggle='tooltip'
											title='ajouter enfant'
											data-placement='bottom'>
											Ajouter
										</span>
									</button>
									<button className='btn btn-outline-secondary btn-block btn-sm m-1 d-flex'>
										<i className='la la-print'></i>
										<span
											data-toggle='tooltip'
											title='imprimer la liste'
											data-placement='bottom'>
											Imprimer
										</span>
									</button>
								</div>
							</div>

							<div>
								<div>
									<div className='table-responsive'>
										<table className='cart-table table-striped table-hover table text-center mb-0 table-font'>
											<thead>
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
														Sexe
													</th>
													<th
														scope='col'
														style={{ fontSize: 14, fontWeight: 'bold' }}>
														Age
													</th>
													<th
														scope='col'
														style={{
															fontSize: 14,
															fontWeight: 'bold',
														}}></th>
												</tr>
											</thead>
											<tbody>
												{filteredChildren.length > 0
													? filteredChildren
															.filter(
																(child) =>
																	child.parents ===
																		props.fname + ' ' + props.lname ||
																	child.parents === props.partner,
															)
															.map((item, index) => (
																<tr key={index}>
																	<td>{index + 1}</td>
																	<td
																		className='text-capitalize text-muted'
																		style={{
																			fontSize: 13,
																			fontWeight: 'bold',
																		}}>
																		{item && item.fname} {item && item.lname}
																	</td>
																	<td className='text-capitalize'>
																		{item && item.gender}
																	</td>
																	<td>
																		{item &&
																			new Date().getFullYear() -
																				new Date(item.dob).getFullYear()}
																		ans
																	</td>
																	<td className='d-flex justify-content-around'>
																		<button
																			className='btn btn-outline-success btn-sm btn-table'
																			data-toggle='modal'
																			data-target='#newMemberModal'>
																			<i
																				className='lar la-edit'
																				data-toggle='tooltip'
																				title='modifier'
																				data-placement='bottom'
																				onClick={handleUpdate.bind(
																					this,
																					item,
																				)}></i>
																		</button>
																		<button
																			className='btn btn-outline-danger btn-sm btn-table'
																			data-toggle='modal'
																			data-target='#confirmModal'
																			onClick={handleDelete.bind(this, item)}>
																			<i
																				className='la la-times'
																				data-toggle='tooltip'
																				title='supprimer'
																				data-placement='bottom'></i>
																		</button>
																	</td>
																</tr>
															))
													: null}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* add child modal start */}

			<div
				className='modal fade'
				id='addChildModal'
				tabIndex={-1}
				aria-labelledby='addChildModalLabel'
				aria-hidden='true'>
				<div className='modal-dialog modal-sm'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='addChildModalLabel'>
								Ajouter Enfant
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'></button>
						</div>
						<div className='modal-body'>
							<form onSubmit={handleCreate}>
								<div className='form-group d-flex justify-content-between align-items-center'>
									<span>Nom: </span>
									<input
										className='form-control w-75'
										type='text'
										placeholder='Nom'
										value={values.fname}
										onChange={(e) =>
											setValues({ ...values, fname: e.target.value })
										}
									/>
								</div>
								<div className='form-group d-flex justify-content-between align-items-center'>
									<span>Prénom: </span>
									<input
										className='form-control w-75'
										type='text'
										placeholder='Prénom'
										value={values.lname}
										onChange={(e) =>
											setValues({ ...values, lname: e.target.value })
										}
									/>
								</div>

								<div className='form-group d-flex justify-content-between align-items-center'>
									<span>Sexe: </span>
									<select
										className='form-control w-75'
										onChange={(e) =>
											setValues({ ...values, gender: e.target.value })
										}>
										<option disabled selected>
											Selectionner le Sexe
										</option>
										<option>M</option>
										<option>F</option>
									</select>
								</div>

								<div className='form-group d-flex justify-content-between align-items-center'>
									<span>Date de Naissance: </span>
									<input
										className='form-control w-50'
										type='date'
										min={`${new Date() - 18}-01-01`}
										placeholder='Date de Naissance'
										value={values.dob}
										onChange={(e) =>
											setValues({ ...values, dob: e.target.value })
										}
									/>
								</div>

								<div className='modal-footer'>
									<button className='btn btn-sm' type='reset'>
										Annuler
									</button>
									<button className='btn btn-primary btn-sm' type='submit'>
										Ajouter
									</button>
								</div>
							</form>

							<div className='m-3 text-center'>
								<span id='warning-msg-id'>saved</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* add child modal end */}
		</div>
	);
}

export default Refugee;
