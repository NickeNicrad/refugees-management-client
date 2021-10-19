import React from 'react';
// tabs imports
import Adults from './tabs/Adults';
// import Families from './tabs/Families';
// import Children from './tabs/Children';

function Home() {
	return (
		<div className='page-content'>
			<div className='container'>
				<ul className='nav nav-tabs' id='myTab' role='tablist'>
					<li className='nav-item' role='presentation'>
						<button
							className='nav-link active'
							id='home-tab'
							data-bs-toggle='tab'
							data-bs-target='#home'
							type='button'
							role='tab'
							aria-controls='home'
							aria-selected='true'>
							Refugié(e)s
						</button>
					</li>
					<li className='nav-item' role='presentation'>
						<button
							className='nav-link'
							id='profile-tab'
							data-bs-toggle='tab'
							data-bs-target='#profile'
							type='button'
							role='tab'
							aria-controls='profile'
							aria-selected='false'>
							Familles
						</button>
					</li>
					<li className='nav-item' role='presentation'>
						<button
							className='nav-link'
							id='profile-tab'
							data-bs-toggle='tab'
							data-bs-target='#history'
							type='button'
							role='tab'
							aria-controls='history'
							aria-selected='false'>
							Historiques
						</button>
					</li>
				</ul>

				{/* tabs content */}
				<div className='tab-content'>
					<div
						className='tab-pane active'
						id='home'
						role='tabpanel'
						aria-labelledby='home-tab'>
						<Adults />
					</div>
					<div
						className='tab-pane'
						id='profile'
						role='tabpanel'
						aria-labelledby='profile-tab'>
						familles
					</div>
					<div
						className='tab-pane'
						id='history'
						role='tabpanel'
						aria-labelledby='profile-tab'>
						Historique
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
