import * as React from 'react';
import Image from 'next/image';
import BorderComponent from '../layout/borderComponent';

function StorySection() {
	return (
		<div id='story' className='story relative flex flex-col items-center'>
			<div className='relative w-full h-full'>
				<img src='/images/story/banner.gif' />
				<div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black via-transparent to-black'></div>
			</div>
			<div className='relative w-full flex flex-col md:flex-row'>
				<div className='w-full h-[400px] md:absolute right-0'>
					<div className='relative top-[-20px] md:right-0 md:top-0 flex flex-col items-center md:items-end justify-end'>
						<div className='absolute md:right-[-100px] top-0 w-[450px] h-[450px] flex items-center justify-start'>
							<Image src={'/images/story/shieldinverse.png'} layout='fill' objectFit='fill' />
						</div>
						<div className='hidden md:absolute right-0 top-0 w-[900px] h-[1000px] md:flex items-center justify-start'>
							<Image src={'/images/story/spearinverse.png'} layout='fill' objectFit='fill' />
						</div>
						<div className='hidden md:absolute right-0 top-0 w-[900px] h-[1000px] md:flex items-center justify-start'>
							<Image src={'/images/story/tridentinverse.png'} layout='fill' objectFit='fill' />
						</div>
					</div>
				</div>
				<div className='w-full md:w-[800px] p-12 md:p-24'>
					<div className='backdrop-blur-sm'>
						<BorderComponent className='p-8'>
							<div className='flex flex-col items-center justify-center tracking-widest'>
								<div className='text-3xl md:text-5xl font-bold py-2 md:py-6'>STORY</div>
								<div className='text-[#E9F3FC] text-base md:text-xl text-justify leading-10'>
									<p>
										The year is 50AD, the city Rome and 5555 fathers, sons and brothers arise with blood in their eyes. The roman God of War, Mars, is looking for his champion. He has chosen his combatants and they will fight until the winner has been found.
									</p>
									<p className='py-4'></p>
									<p>
										None of the warriors know why they must fight, but fight they must. None of them have seen their competitors before today but war consumes them all. None know why Mars needs his champion, they only hear his voice in their heads. He tells them that today, the Sons Of Mars, see only red.
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
export default StorySection;