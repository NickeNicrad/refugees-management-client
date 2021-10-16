import React, { useEffect, useState } from 'react';
import { getAllCities, getAllCountries, getAllStates } from '../../../api';

function Locations() {
	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);

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

	useEffect(() => {
		loadCountries();
		loadStates();
		loadCities();
	}, []);

	return (
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
								<select className='form-control'>
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
								<select className='form-control'>
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
	);
}

export default Locations;
