import React, { useState, useEffect } from 'react';
import {
	createCity,
	createState,
	createCountry,
	getAllCountries,
	getAllStates,
} from '../../api';

function AddLocations() {
	const [values, setValues] = useState({
		countryId: '',
		stateId: '',
		countryName: '',
		stateName: '',
		cityName: '',
	});

	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);

	const handleCreateCountry = (e) => {
		e.preventDefault();
		createCountry(values)
			.then((response) => {
				if (response.status === 200) {
					alert(response.data);
					loadCountries();
					loadStates();
				} else {
					alert(response.data);
					console.log(response.data);
				}
			})
			.catch((error) => {
				alert(error);
				console.log(error);
			});
	};

	const handleCreateState = (e) => {
		e.preventDefault();
		createState(values)
			.then((response) => {
				if (response.status === 200) {
					alert(response.data);
					loadCountries();
					loadStates();
				} else {
					alert(response.data);
					console.log(response.data);
				}
			})
			.catch((error) => {
				alert(error);
				console.log(error);
			});
	};

	const handleCreateCity = (e) => {
		e.preventDefault();
		createCity(values)
			.then((response) => {
				if (response.status === 200) {
					alert(response.data);
					loadCountries();
					loadStates();
				} else {
					alert(response.data);
					console.log(response.data);
				}
			})
			.catch((error) => {
				alert(error);
				console.log(error);
			});
	};

	const initCountry = (country) => {
		setValues({ ...values, countryId: country.id });
	};

	const initState = (states) => {
		setValues({ ...values, statesId: states.id });
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

	useEffect(() => {
		loadCountries();
		loadStates();
	}, []);

	return (
		<div className='page-content'>
			<div className='container'>
				<div className='row'>
					<div className='col'></div>
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
														placeholder='Pays'
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
															Pays...
														</option>
														{countries &&
															countries.map((item, index) => (
																<option
																	key={index}
																	onClick={initCountry.bind(this, item)}>
																	{item.countryName}
																</option>
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
											<div className='col-md-6'>
												<div className='form-group'>
													<select className='form-control'>
														<option value='Country'>Province...</option>
														{states &&
															states.map((item, index) => (
																<option
																	key={index}
																	onClick={initState.bind(this, item)}>
																	{item.stateName}
																</option>
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
