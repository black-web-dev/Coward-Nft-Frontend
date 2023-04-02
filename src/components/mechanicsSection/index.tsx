import Image from 'next/image';
import BorderButtonComponent from '../layout/borderButtonComponent';
import BorderComponent from '../layout/borderComponent';

const Mechanics = () => {
	return (
		<div className='section h-full w-full'>
			<div className='landing-section h-full w-full'>
				<div id='mechanics' className='relative flex items-center justify-center flex-col w-full h-full min-h-screen mb-10 pt-24 md:pt-32'>
					<div className='w-full md:w-3/5 p-4'>
						<BorderComponent className='p-2 md:p-10 my-2 md:my-20'>
							<div className="uppercase text-2xl md:text-3xl text-center font-extrabold text-transparent tracking-widest bg-clip-text bg-gradient-to-r from-[#ff757c] via-[#b50912] to-[#ff757c] pt-10 pb-8">
								GAME MECHANICS
							</div>
							<div className='text-[#E9F3FC] text-lg text-justify p-2 md:p-10'>
								<p>
									7 - 14 days after the 5555th sale the experience will begin. First the warriors will immediately reveal and the date for the first fight round will be updated in the arena.
								</p>
								<p className='py-6'></p>
								<p>
									It will take 40 days to find our winner and 15 fight events with an accumulative increasing death rate at 5% extra per fight round. There will be a different death state applied to each round creating another layer of rarity. The final round will be at a death rate of 75%, leaving 3 dead & 1 final winner.
								</p>
								<p className='py-6'></p>
								<p>
									The experience will have no direct input from the holder other than the initial purchase and choices of when to buy and sell. The choices of who survives and dies will at all times be made by Oracle Chainlink using their VRF randomization software.
								</p>
							</div>
							<div className='w-full flex flex-col items-end justify-center py-2 py-12 md:p-12'>
								<div className='absolute flex flex-col items-end justify-center'>
									<div>Find out more about ChainLink VRF</div>
									<div className="cursor-pointer w-fullbg-[#375bd2] mt-4">
										<a href="https://docs.chain.link/docs/chainlink-vrf/" target='_blank'>
											<img className='w-full h-12' src="/images/sidebar/chainlink.png" />
										</a>
									</div>
								</div>
							</div>
						</BorderComponent>
					</div>
					<div className='relative w-3/5 h-[300px] md:h-[700px] my-6 md:my-20'>
						<Image src={'/images/mechanics/deathStateWheel.png'} layout='fill' objectFit='scale-down' />
					</div>
					<a href='/pdf/deathstate.pdf' target='_blank'>
						<BorderButtonComponent className='px-8 py-4'>
							PDF
						</BorderButtonComponent>
					</a>
				</div>
			</div>
		</div>
	)
}

export default Mechanics;