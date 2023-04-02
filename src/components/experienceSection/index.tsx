import * as React from 'react';
import Image from 'next/image';
import BorderComponent from '../layout/borderComponent';

function ExperienceSection() {
	return (
		<div id='experience' className='experience relative flex flex-col items-center'>
			<div className='relative w-full h-[350px]'>
				<Image src='/images/experience/banner.png' objectFit='fill' layout='fill' />
				<div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black via-transparent to-black'></div>
				<div className='absolute top-0 w-full h-full'>
					<div className='w-full h-full flex flex-col items-center justify-center text-black text-3xl tracking-widest font-bold'>
						<div className='pt-4'>
							5554 DIE
						</div>
						<div className='pt-4'>
							1 SURVIVES
						</div>
						<div className='pt-4'>
							<BorderComponent className='p-3'>
								<div className="uppercase text-3xl font-extrabold text-transparent tracking-widest bg-clip-text bg-gradient-to-r from-[#ff757c] via-[#b50912] to-[#ff757c]">
									ENTER THE ARENA
								</div>
							</BorderComponent>
						</div>
					</div>
				</div>
			</div>
			<div className='relative w-full flex flex-col md:flex-row items-center justify-end'>
				<div className='w-full md:absolute md:left-[-100px] bottom-0 flex items-center justify-center'>
					<div className='relative w-[550px] md:w-[800px] h-[450px] md:h-[700px] flex items-center justify-start'>
						<Image className='' src={'/images/experience/warriormarblisedinverse.png'} layout='fill' objectFit='scale-down' />
						<div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black to-transparent'></div>
					</div>
				</div>
				<div className='w-full md:w-[650px] p-6 md:p-24'>
					<div className='backdrop-blur-sm'>
						<BorderComponent className='p-8'>
							<div className='flex flex-col items-center justify-center tracking-widest'>
								<div className='text-3xl font-bold py-4 md:py-10'>THE EXPERIENCE</div>
								<div className='text-[#E9F3FC] text-base md:text-xl text-justify leading-10'>
									<p>
										Get ready for a battle of epic proportions!
									</p>
									<p className='py-4'></p>
									<p>
										If you want to be a digital fighter, you better be prepared for 40 days of grueling battle and 15 rounds of intense fighting until only one is left alive.  The others will be transformed into Roman statues.
									</p>
									<p className='py-4'></p>
									<p>
										In this experience, four random statues will be airdropped 5ETH.
									</p>
									<p className='py-4'></p>
									<p className='pb-4'>
										The last one standing will be offered the grand prize of 200ETH
									</p>
								</div>
							</div>
						</BorderComponent>
					</div>
				</div>
			</div>
		</div >
	)
}
export default ExperienceSection;