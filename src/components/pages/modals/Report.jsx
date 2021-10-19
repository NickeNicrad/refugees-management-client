import React from 'react';

import logo from '../../../img/HCR.png';
import flag from '../../../img/flag_rdc.png';

function Report(props) {
	return (
		<div
			className='table-responsive border-bottom-0 card-table'
			id='print-list'
			hidden>
			<div className='my-4 d-flex justify-content-between'>
				<img src={flag} height={45} width={60} alt='' />
				<div>
					<h4 className='mb-1 text-capitalize text-center text-primary'>
						REPUBLIQUE DEMOCRATIQUE DU CONGO
					</h4>
					<h6 className='mb-1 text-capitalize text-center text-primary'>
						LA LISTE DES REFUGIES ENREGISTRES
					</h6>
				</div>
				<img src={logo} height={50} width={45} alt='' />
			</div>
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
							Camp
						</th>
						<th scope='col' style={{ fontSize: 14, fontWeight: 'bold' }}>
							Sexe
						</th>
						<th scope='col' style={{ fontSize: 14, fontWeight: 'bold' }}>
							Age
						</th>
					</tr>
				</thead>
				<tbody>
					{props.filteredRefugees &&
						props.filteredRefugees.map((item, index) => (
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
								<td className='text-capitalize'>{item.camp && item.camp}</td>
								<td className='text-capitalize'>
									{item.gender && item.gender}
								</td>
								<td>
									{new Date().getFullYear() - new Date(item.dob).getFullYear()}{' '}
									ans
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export default Report;
