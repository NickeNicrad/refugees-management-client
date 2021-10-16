import React from 'react';

function Footer() {
	return (
		<footer className='footer'>
			<hr />
			<div className='row align-items-center py-1'>
				<div className='col-md-5 text-center'>
					Copyright &copy; {new Date().getFullYear()} Tous les droits reservé
				</div>
				<div className='col-md-3 col-lg-3 col-xl-3 me-auto mb-5 mb-lg-0 d-none d-xl-block'>
					<ul className='list-inline'>
						<li className='list-inline-item'>
							<a
								href='https://www.facebook.com/'
								className='border rounded px-2 py-1 text-dark'>
								<i className='la la-facebook'></i>
							</a>
						</li>
						<li className='list-inline-item'>
							<a
								href='https://www.instagram.com/'
								className='border rounded px-2 py-1 text-dark'>
								<i className='la la-instagram'></i>
							</a>
						</li>
						<li className='list-inline-item'>
							<a
								href='https://www.twitter.com/'
								className='border rounded px-2 py-1 text-dark'>
								<i className='la la-twitter'></i>
							</a>
						</li>
						<li className='list-inline-item'>
							<a
								href='https://www.linkedin.com/'
								className='border rounded px-2 py-1 text-dark'>
								<i className='la la-linkedin'></i>
							</a>
						</li>
					</ul>
				</div>
				<div className='col-md-4 text-md-end mt-md-0'>
					<ul className='list-inline mb-0 text-center'>
						<li className='me-3 list-inline-item'>
							{' '}
							<span className='list-group-item-action'>Termes du Contrat</span>
						</li>

						<li className='list-inline-item'>
							{' '}
							<span className='list-group-item-action'>Apropos</span>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
