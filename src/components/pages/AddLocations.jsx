import React, { useState, useEffect } from 'react';
import {
	createCity,
	createState,
	createCountry,
	getAllCountries,
	getAllStates,
	getAllCities,
} from '../../api';

function AddLocations() {
	const [values, setValues] = useState({
		country_id: '',
		state_id: '',
		countryName: '',
		stateName: '',
		cityName: '',
	});

	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);

	const filteredCountries = countries
		.filter((item) => item.countryName === values.countryName)
		.shift();
	const filteredStates = states
		.filter((item) => item.stateName === values.stateName)
		.shift();

	const handleCreateCountry = (e) => {
		e.preventDefault();
		createCountry(values)
			.then((response) => {
				if (response.status === 200) {
					alert(response.data);
					setValues({
						...values,
						countryName: '',
						stateName: '',
						cityName: '',
					});
					loadCountries();
					loadStates();
					loadCities();
				} else {
					alert(response);
					console.log(response);
				}
			})
			.catch((error) => {
				alert(error);
				console.log(error);
			});
	};

	const handleCreateState = (e) => {
		e.preventDefault();
		createState({ ...values, country_id: filteredCountries.id })
			.then((response) => {
				if (response.status === 200) {
					alert(response.data);
					setValues({
						...values,
						countryName: '',
						stateName: '',
						cityName: '',
					});
					loadCountries();
					loadStates();
					loadCities();
				} else {
					alert(response);
					console.log(response);
				}
			})
			.catch((error) => {
				alert(error);
				console.log(error);
			});
	};

	const handleCreateCity = (e) => {
		e.preventDefault();
		createCity({ ...values, state_id: filteredStates.id })
			.then((response) => {
				if (response.status === 200) {
					alert(response.data);
					setValues({
						...values,
						countryName: '',
						stateName: '',
						cityName: '',
					});
					loadCountries();
					loadStates();
					loadCities();
				} else {
					alert(response);
					console.log(response);
				}
			})
			.catch((error) => {
				alert(error);
				console.log(error);
			});
	};

	const loadCountries = () => {
		getAllCountries()
			.then((response) => {
				if (response.status === 200) return setCountries([...response.data]);
			})
			.catch();
	};

	const loadStates = () => {
		getAllStates()
			.then((response) => {
				if (response.status === 200) return setStates([...response.data]);
			})
			.catch();
	};

	const loadCities = () => {
		getAllCities()
			.then((response) => {
				if (response.status === 200) return setCities([...response.data]);
			})
			.catch();
	};

	useEffect(() => {
		loadCountries();
		loadStates();
		loadCities();
	}, []);

	return (
		<div className='page-content'>
			<div className='container'>
				<div className='row'>
					<div className='col'>
						{/*  */}
						{countries.length > 0 ? (
							countries.map((country, index) => (
								<div key={index} className='accordion' id={`accordion${index}`}>
									<div className='accordion-item rounded mb-2'>
										<h2 className='accordion-header' id={`headingOne${index}`}>
											<button
												className='accordion-button border-0 mb-0 bg-transparent'
												type='button'
												data-bs-toggle='collapse'
												data-bs-target={`#collapseOne${index}`}
												aria-expanded='true'
												aria-controls={`collapseOne${index}`}>
												{country.countryName}
											</button>
										</h2>
										<div
											id={`collapseOne${index}`}
											className='accordion-collapse border-0 collapse show'
											aria-labelledby={`headingOne${index}`}
											data-bs-parent={`#accordion${index}`}>
											<div className='accordion-body text-muted'>
												{states &&
													states
														.filter((item) => item.country_id === country.id)
														.map((states, index) => (
															<div key={index} className='dropdown'>
																<span
																	className='dropdown-item dropdown-toggle text-capitalize'
																	data-bs-toggle='dropdown'>
																	{states.stateName}
																</span>
																<ul className='dropdown-menu p-0 w-100'>
																	<li className='dropdown-submenu'>
																		{cities &&
																			cities
																				.filter(
																					(item) => item.state_id === states.id,
																				)
																				.map((city, index) => (
																					<span
																						key={index}
																						className='dropdown-item px-5 text-capitalize'>
																						{city.cityName && city.cityName}
																					</span>
																				))}
																	</li>
																</ul>
															</div>
														))}
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<div>aucun données disponible</div>
						)}
						{/*  */}
					</div>
					<div className='col'>
						<div className='row'>
							<div className='card' style={{ height: '20vh' }}>
								<div className='card-body'>
									<div className='card-title'>Pays</div>
									<form onSubmit={handleCreateCountry}>
										<div className='messages' />

										<div className='row'>
											<div className='col-md-6'>
												<div className='form-group'>
													<input
														className='form-control'
														type='text'
														placeholder='Nom du Pays'
														value={values.countryName}
														onChange={(e) =>
															setValues({
																...values,
																countryName: e.target.value,
															})
														}
													/>
													<div className='help-block with-errors' />
												</div>
											</div>

											<div className='col-md-6'>
												<div className='form-group'>
													<button
														className='btn btn-primary btn-sm'
														onClick={handleCreateCountry}>
														ajouter
													</button>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>

						<br />

						<div className='row'>
							<div className='card' style={{ height: '24vh' }}>
								<div className='card-body'>
									<div className='card-title'>Province</div>
									<form onSubmit={handleCreateState}>
										<div className='messages' />

										<div className='row'>
											<div className='col-md-6'>
												<div className='form-group'>
													<select
														className='form-control'
														onChange={(e) =>
															setValues({
																...values,
																countryName: e.target.value,
															})
														}>
														<option selected disabled>
															Selectionnez un Pays...
														</option>
														{countries &&
															countries.map((item, index) => (
																<option key={index}>{item.countryName}</option>
															))}
													</select>
													<div className='help-block with-errors' />
												</div>
											</div>

											<div className='col-md-6'>
												<div className='form-group'>
													<input
														className='form-control'
														type='text'
														placeholder='Province'
														value={values.stateName}
														onChange={(e) =>
															setValues({
																...values,
																stateName: e.target.value,
															})
														}
													/>
													<div className='help-block with-errors' />
												</div>
											</div>
										</div>

										<div className='row'>
											<div className='col'>
												<button
													className='btn btn-primary btn-sm'
													onClick={handleCreateState}>
													ajouter
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>

						<br />

						<div className='row'>
							<div className='card' style={{ height: '24vh' }}>
								<div className='card-body'>
									<div className='card-title'>Ville</div>
									<form onSubmit={handleCreateCity}>
										<div className='messages' />

										<div className='row'>
											<div className='col-md-4'>
												<div className='form-group'>
													<select
														className='form-control'
														onChange={(e) =>
															setValues({
																...values,
																countryName: e.target.value,
															})
														}>
														<option selected disabled>
															Selectionnez Pays...
														</option>
														{countries &&
															countries.map((item, index) => (
																<option key={index}>{item.countryName}</option>
															))}
													</select>
													<div className='help-block with-errors' />
												</div>
											</div>

											<div className='col-md-4'>
												<div className='form-group'>
													<select
														className='form-control'
														onChange={(e) =>
															setValues({
																...values,
																stateName: e.target.value,
															})
														}>
														<option value='Country'>
															Selectionnez Province...
														</option>
														{states &&
															states.map((item, index) => (
																<option key={index}>
																	{item.stateName && item.stateName}
																</option>
															))}
													</select>
													<div className='help-block with-errors' />
												</div>
											</div>

											<div className='col-md-4'>
												<div className='form-group'>
													<input
														className='form-control'
														type='text'
														placeholder='Ville'
														value={values.cityName}
														onChange={(e) =>
															setValues({
																...values,
																cityName: e.target.value,
															})
														}
													/>
													<div className='help-block with-errors' />
												</div>
											</div>
										</div>

										<div className='row'>
											<div className='col'>
												<button
													className='btn btn-primary btn-sm'
													onClick={handleCreateCity}>
													ajouter
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddLocations;
