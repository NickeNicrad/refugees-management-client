import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { getAllChildren, getAllRefugies } from '../../api';

function Dashboard() {
	const [refugees, setRefugees] = useState([]);
	const [children, setChildren] = useState([]);
	const loadRefugees = () => {
		getAllRefugies()
			.then((response) => {
				setRefugees(response);
			})
			.catch((error) => console.log(error));
	};

	const loadChildren = () => {
		getAllChildren()
			.then((response) => setChildren(response.data))
			.catch((error) => console.log(error));
	};

	const filteredRefugiesbyGender = (gender) => {
		return refugees.filter((item) => item.gender === gender);
	};

	const refugeesChart = () => {
		const dataTable = refugees.filter(
			(item) =>
				new Date(item.createdAt).getFullYear() === new Date().getFullYear(),
		);

		const dataChart = {
			jan: [],
			feb: [],
			mar: [],
			apr: [],
			may: [],
			june: [],
			july: [],
			aug: [],
			sept: [],
			oct: [],
			nov: [],
			dec: [],
		};

		for (let i = 0; i < dataTable.length; i++) {
			if (new Date(dataTable[i].createdAt).getMonth() + 1 === 1) {
				dataChart.jan.push({
					data: dataTable[i],
				});
			} else if (new Date(dataTable[i].createdAt).getMonth() + 1 === 2) {
				dataChart.feb.push({
					data: dataTable[i],
				});
			} else if (new Date(dataTable[i].createdAt).getMonth() + 1 === 3) {
				dataChart.mar.push({
					data: dataTable[i],
				});
			} else if (new Date(dataTable[i].createdAt).getMonth() + 1 === 4) {
				dataChart.apr.push({
					data: dataTable[i],
				});
			} else if (new Date(dataTable[i].createdAt).getMonth() + 1 === 5) {
				dataChart.may.push({
					data: dataTable[i],
				});
			} else if (new Date(dataTable[i].createdAt).getMonth() + 1 === 6) {
				dataChart.june.push({
					data: dataTable[i],
				});
			} else if (new Date(dataTable[i].createdAt).getMonth() + 1 === 7) {
				dataChart.july.push({
					data: dataTable[i],
				});
			} else if (new Date(dataTable[i].createdAt).getMonth() + 1 === 8) {
				dataChart.aug.push({
					data: dataTable[i],
				});
			} else if (new Date(dataTable[i].createdAt).getMonth() + 1 === 9) {
				dataChart.sept.push({
					data: dataTable[i],
				});
			} else if (new Date(dataTable[i].createdAt).getMonth() + 1 === 10) {
				dataChart.oct.push({
					data: dataTable[i],
				});
			} else if (new Date(dataTable[i].createdAt).getMonth() + 1 === 11) {
				dataChart.nov.push({
					data: dataTable[i],
				});
			} else if (new Date(dataTable[i].createdAt).getMonth() + 1 === 12) {
				dataChart.dec.push({
					data: dataTable[i],
				});
			}
		}
		return dataChart;
	};

	// const childrenChart = () => {};

	const { jan, feb, mar, apr, may, june, july, aug, sept, oct, nov, dec } =
		refugeesChart();
	useEffect(() => {
		loadRefugees();
		loadChildren();
	}, []);
	return (
		<div className='page-content'>
			<div className='container'>
				<div className='row mb-3'>
					<div className='col-3'>
						<div className='card stats-card'>
							<div className='card-body'>
								<h5 className='card-title'>
									{filteredRefugiesbyGender('M').length}
								</h5>
								Hommes
							</div>
						</div>
					</div>
					<div className='col-3'>
						<div className='card stats-card'>
							<div className='card-body'>
								<h5 className='card-title'>
									{filteredRefugiesbyGender('F').length}
								</h5>
								Femmes
							</div>
						</div>
					</div>
					<div className='col-3'>
						<div className='card stats-card'>
							<div className='card-body'>
								<h5 className='card-title'>{refugees && refugees.length}</h5>
								Adultes
							</div>
						</div>
					</div>
					<div className='col-3'>
						<div className='card stats-card'>
							<div className='card-body'>
								<h5 className='card-title'>{children && children.length}</h5>
								<small className='text-muted'>Enfants</small>
							</div>
						</div>
					</div>
				</div>

				<div className='row'>
					<div className='col-8'>
						<Bar
							data={{
								labels: [
									'jan',
									'fév',
									'mars',
									'avril',
									'mai',
									'juin',
									'juil',
									'aout',
									'sept',
									'oct',
									'nov',
									'dec',
								],
								datasets: [
									{
										label: 'réfugiés enregistrés',
										data: [
											jan && jan.length,
											feb && feb.length,
											mar && mar.length,
											apr && apr.length,
											may && may.length,
											june && june.length,
											july && july.length,
											aug && aug.length,
											sept && sept.length,
											oct && oct.length,
											nov && nov.length,
											dec && dec.length,
										],
										backgroundColor: [
											'rgba(255, 99, 132, 0.2)',
											'rgba(255, 159, 64, 0.2)',
											'rgba(255, 205, 86, 0.2)',
											'rgba(75, 192, 192, 0.2)',
											'rgba(54, 162, 235, 0.2)',
											'rgba(153, 102, 255, 0.2)',
											'rgba(201, 203, 207, 0.2)',
											'rgba(255, 99, 132, 0.2)',
											'rgba(255, 159, 64, 0.2)',
											'rgba(255, 205, 86, 0.2)',
											'rgba(75, 192, 192, 0.2)',
											'rgba(54, 162, 235, 0.2)',
										],
										barThickness: 8,
									},
								],
							}}
							options={{
								responsive: true,
								plugins: {
									legend: {
										position: 'bottom',
									},
									title: {
										display: true,
										text: 'statistique des refugiés enregistrés',
									},
								},
							}}
						/>
					</div>
					<div className='col-4'>
						<Doughnut
							data={{
								labels: ['Hommes', 'Femmes', 'Adultes', 'Enfants'],
								datasets: [
									{
										label: '',
										data: [
											filteredRefugiesbyGender('M').length,
											filteredRefugiesbyGender('F').length,
											refugees && refugees.length,
											children && children.length,
										],
										backgroundColor: [
											'rgb(54, 162, 135)',
											'rgb(255, 205, 86)',
											'#ffa500',
											'rgb(54, 162, 235)',
										],
										barThickness: 8,
									},
								],
							}}
							options={{
								responsive: true,
								plugins: {
									legend: {
										position: 'bottom',
									},
									title: {
										display: true,
										text: 'statistique des nouveaux réfugiés',
									},
								},
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
