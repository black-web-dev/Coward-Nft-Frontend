import * as React from 'react';
import { useRouter } from 'next/router';
import Config from '@/config/app';
import BorderButtonComponent from '../layout/borderButtonComponent';

const Battle = () => {
	const router = useRouter()
	const handleLink = () => {
		router.push('/arena');
	}
	return (
		<div className='section h-full w-full'>
			<div className='landing-section h-full w-full'>
				{/* <div id='battle' className='battle relative flex items-center justify-center flex-col w-full h-screen bg-[url("/images/battle/background.png")] bg-cover bg-center' data-aos="fade-up"> */}
				<div id='battle' className='battle relative flex items-center justify-center flex-col w-full h-screen' data-aos="fade-up">
					<div className='background-color absolute top-0 left-0 h-full w-full bg-black bg-cover bg-center opacity-30'></div>
					<video autoPlay loop muted className="absolute w-auto min-w-full h-full max-w-none">
						<source src="/videos/arena.mp4" type="video/mp4" />
					</video>
					<div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black to-transparent'></div>
					<div className='absolute bottom-[100px]' onClick={handleLink}>
						<BorderButtonComponent className='px-8 py-4 text-3xl tracking-widest font-bold'>
							{Config.totalCount} TO GO
						</BorderButtonComponent>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Battle;