import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link as ScrollLink } from 'react-scroll';

import Config from '@/config/app';

const socials = [
	{ name: 'discord', link: Config.discord },
	{ name: 'tiktok', link: Config.tiktok },
	{ name: 'instagram', link: Config.instagram },
	{ name: 'twitter', link: Config.twitter }
]

import SidebarSection from './sidebar';

export default function Header() {
	const router = useRouter();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	}

	const handleSocialLink = (link: string) => () => {
		window.open(link, '_blank');
	}

	return (
		<>
			<Disclosure as="nav">
				{() => (
					<div className='header fixed top-0 right-0 left-0 z-20 bg-black/10'>
						<div className="mx-auto px-2 md:px-14">
							<div className="relative flex items-center justify-between h-20">
								<div className="flex items-center justify-start cursor-pointer">
									{
										router.pathname == '/' ? (
											<ScrollLink to={'home'} spy={true} smooth={true}>
												<div className='flex items-center justify-start'>
													<img
														className="w-14 h-14 md:h-20 md:w-20 lg:w-22 lg:h-22 "
														src="/images/logo.webp"
														alt="son of mars"
													/>
													<div className='relative hidden md:flex items-start justify-center h-20 xl:h-40'>
														<Image src={'/images/home/som.webp'} layout='fill' objectFit='scale-down' />
													</div>
												</div>
											</ScrollLink>
										) : (
											<Link href='/'>
												<div className='flex items-center justify-start'>
													<img
														className=" h-14 lg:h-22 md:h-20"
														src="/images/logo.webp"
														alt="son of mars"
													/>
													<div className='relative hidden md:flex items-start justify-center h-20 xl:h-40'>
														<Image src={'/images/home/som.webp'} layout='fill' objectFit='scale-down' />
													</div>
												</div>
											</Link>
										)
									}
								</div>
								<div className='w-full h-full flex items-center justify-end mr-0 sm:mr-4k backdrop-blue-none'>
									<div className="flex items-center justify-center mr-4">
										{
											socials.map(item => (
												<div key={item.name} className='cursor-pointer rounded-lg border-transparent border-2 hover:border-2 hover:border-white p-2' onClick={handleSocialLink(item.link)}>
													<img className='w-6 h-6' src={`./images/socials/${item.name}.svg`} />
												</div>
											))
										}
										<div className='cursor-pointer rounded-lg border-transparent border-2 hover:border-2 hover:border-white p-2'>
											<a href='https://opensea.io/collection/the-cowards-gambit-by-som' target='_blank'><img className='w-6 h-6' src={`./images/socials/opensea.png`} /></a>
										</div>
									</div>
									<button className="inline-flex items-center justify-center p-2 rounded-md border-2 border-transparent text-white hover:text-white hover:border-white" onClick={handleSidebar}>
										<MenuIcon className="block h-6 w-6" aria-hidden="true" />
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</Disclosure>
			<SidebarSection open={sidebarOpen} setOpen={setSidebarOpen} />
		</>
	)
}
