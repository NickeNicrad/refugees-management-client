import React, { useState } from 'react';
import QRcode from 'qrcode';

import logo from '../../../img/HCR.png';
import flag from '../../../img/flag_rdc.png';

function RefCard(props) {
	const [qrURL, setQrURL] = useState('');
	const printCard = () => {
		const pageToPrint = document.querySelector('#id-card-img').innerHTML;
		const body = document.body.innerHTML;
		document.body.innerHTML = pageToPrint;
		window.print();
		document.body.innerHTML = body;
		window.location.reload();
	};

	const generateQRCode = (uid) => {
		QRcode.toDataURL(uid, (error, qrURL) => {
			setQrURL(qrURL);
			console.log(error);
			printCard();
		});
	};

	return (
		<div
			className='modal fade'
			id='refcardModal'
			tabIndex={-1}
			aria-labelledby='refcardModalLabel'
			aria-hidden='true'>
			<div className='modal-dialog modal-sm'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title' id='refcardModalLabel'>
							Carte de Refugié(e)
						</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'></button>
					</div>
					<div className='modal-body'>
						<div className='text-center py-2 px-2'>
							<div
								className='mb-4 d-flex justify-content-center'
								style={{ height: 200 }}>
								{props && props.img ? (
									<img
										className='img-fluid rounded-circle shadow overflow-hidden'
										src='assets/images/team/01.png'
										alt=''
									/>
								) : (
									<div
										className='d-flex justify-content-center img-fluid align-items-center rounded-circle shadow overflow-hidden bg-primary text-white text-uppercase'
										style={{ width: 200, height: 200, fontSize: 55 }}>
										{props.fname && props.fname[0]}
										{props.lname && props.lname[0]}
									</div>
								)}
							</div>
							<div>
								<h5 className='mb-1 text-capitalize'>
									{props && props.fname} {props && props.lname}
								</h5>
								<small className='text-muted mb-3 d-block text-capitalize'>
									{props && props.dest_from} - {props && props.destination}
								</small>
							</div>
						</div>
						<div className='form-group text-center'>
							<button
								className='btn btn-outline-primary btn-sm'
								onClick={() => generateQRCode(props.id)}>
								imprimer la carte
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* card to print start */}

			<div id='id-card-img' className='modal-dialog modal-sm' hidden>
				<div className='modal-content'>
					<div className='modal-body'>
						<div className='py-4 px-2'>
							<div className='row'>
								<div className='mb-2 d-flex justify-content-between'>
									<img src={flag} height={45} width={60} alt='' />
									<div>
										<h4 className='mb-1 text-capitalize text-center text-primary'>
											REPUBLIQUE DEMOCRATIQUE DU CONGO
										</h4>
										<h6 className='mb-1 text-capitalize text-center text-primary'>
											CARTE DE REFUGIE
										</h6>
									</div>
									<img src={logo} height={50} width={45} alt='' />
								</div>
								<div className='col-4'>
									<img
										className='img-fluid rounded-circle shadow overflow-hidden'
										src='assets/images/team/01.png'
										alt=''
									/>
								</div>
								<div className='col-6'>
									<small className='text-muted mb-3 d-block'>
										Nom:{' '}
										<b className='text-capitalize'>{props && props.fname}</b>
									</small>
									<small className='text-muted mb-3 d-block'>
										Prénom:{' '}
										<b className='text-capitalize'>
											{props.lname && props.lname}
										</b>
									</small>
									<small className='text-muted mb-3 d-block'>
										Sexe:{' '}
										<b className='text-capitalize'>
											{props.gender && props.gender}
										</b>
									</small>
									<small className='text-muted mb-3 d-block'>
										Né(e):
										<b className='text-capitalize'>
											{' '}
											le{' '}
											{props && new Date(props.dob).toLocaleDateString('fr-Fr')}
										</b>
									</small>
									<small className='text-muted mb-3 d-block'>
										Age:{' '}
										<b>
											{props.dob &&
												new Date().getFullYear() -
													new Date(props.dob).getFullYear()}
										</b>
										ans
									</small>
								</div>
								<div className='col-2 qrcode-container'>
									<img className='qrcode' src={qrURL} width={80} alt='' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* card to print end */}
		</div>
	);
}

export default RefCard;
