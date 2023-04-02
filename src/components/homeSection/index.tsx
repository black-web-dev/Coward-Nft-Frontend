import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import BorderButtonComponent from '../layout/borderButtonComponent';

function HomeSection(props: any) {
	const router = useRouter()
	const ref = useRef<HTMLVideoElement>(null);

	const handleLink = () => {
		router.push('/coward');
	}
	useEffect(() => {
		return () => {
			ref.current?.pause();
		}
	}, []);

	return (
		<div className='section h-full w-full'>
			<div className='landing-section h-full w-full'>
				{/* <div id='home' className='home relative flex items-center justify-center flex-col w-full h-screen bg-[url("/images/home/background.png")] bg-cover bg-center' data-aos="fade-up"> */}
				<div id='home' ref={props.homeRef} className='home relative flex items-center justify-center flex-col w-full h-screen bg-[url("/images/home/background.png")] bg-cover bg-center' data-aos="fade-up">
					<div className='background-color absolute top-0 left-0 h-full w-full bg-black bg-cover bg-center opacity-30'></div>
					<video autoPlay loop muted playsInline preload="" className="absolute w-auto min-w-full h-min-full max-w-none" ref={ref}>
						<source src="/videos/main.mp4" type="video/mp4" />
					</video>
					<div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black to-transparent'></div>
					<div className='z-10 cursor-pointer absolute bottom-[10%]' onClick={handleLink}>
						<BorderButtonComponent className='px-6 py-4'>
							<div className='text-2xl md:text-5xl'>
								ENTER THE ARENA
							</div>
						</BorderButtonComponent>
					</div>
				</div>
			</div>
		</div>
	)
}
export default HomeSection;