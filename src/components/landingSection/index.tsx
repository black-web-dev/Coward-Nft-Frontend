import * as React from 'react';

function LandingSection() {
	return (
		<div id='landing' className='landing relative flex flex-col items-center bg-black'>
			<div className='w-full max-w-[500px] mx-auto text-center px-4 mb-10'>
				<p className='pb-10'>
					Set in Ancient Rome in an alternate version of our past the Roman God of war Mars has returned to the mortal realm.
				</p>
				<p className='pb-10'>
					Today he has announced that he is staging an epic Battle Royale tournament.
				</p>
				<p className='pb-10'>
					One where you get to be the combatant...
				</p>
			</div>

			<div className="cursor-pointer uppercase text-base md:text-xl font-bold text-transparent text-center tracking-widest bg-clip-text bg-gradient-to-r from-[#e7656c] via-[#b50912] to-[#e7656c] pb-10">
				Enter the arena for game 1<br />The Coward’s Gambit
			</div>

			<a href='#' className='pb-20'>Read more on our Whitepaper</a>

			<a href="https://docs.chain.link/docs/chainlink-vrf/" className='pb-10' target='_blank'>
				<img className='w-full h-12' src="/images/sidebar/chainlink.png" />
			</a>
		</div>
	)
}
export default LandingSection;