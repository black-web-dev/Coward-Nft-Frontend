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

import SidebarSection from './sidebar';
import BorderButtonComponent from '@/components/layout/borderButtonComponent';

export default function Header() {
	const router = useRouter();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	}

	const handleArena = () => {
		router.push('/battle');
	}

	return (
		<>
			<Disclosure as="nav">
				{({ open, close }) => (
					<div className='header fixed top-0 right-0 left-0 z-20 bg-black/10 backdrop-blur-sm'>
						<div className="mx-auto px-2 md:px-14">
							<div className="relative flex items-center justify-between h-20">
								{
									router.pathname == '/' && (
										<div className="absolute z-10 inset-y-0 right-0 flex items-center lg:hidden">
											<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md border-2 border-transparent text-white hover:text-white hover:border-white">
												<span className="sr-only">Open main menu</span>
												{open ? (
													<XIcon className="block h-6 w-6" aria-hidden="true" />
												) : (
													<MenuIcon className="block h-6 w-6" aria-hidden="true" />
												)}
											</Disclosure.Button>
										</div>
									)
								}
								<div className="w-full h-full flex items-center justify-start cursor-pointer">
									{
										router.pathname == '/' ? (
											<ScrollLink to={'home'} spy={true} smooth={true}>
												<div className='flex items-center justify-start'>
													<img
														className=" h-14 lg:h-22 md:h-20"
														src="/images/logo.webp"
														alt="son of mars"
													/>
													<div className='relative hidden md:flex items-start justify-center w-60 h-20 xl:h-40'>
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
													<div className='relative hidden md:flex items-start justify-center w-60 h-20 xl:h-40'>
														<Image src={'/images/home/som.webp'} layout='fill' objectFit='scale-down' />
													</div>
												</div>
											</Link>
										)
									}
								</div>
								<div className={clsx('w-full flex items-center justify-end', router.pathname !== '/' ? '' : 'lg:hidden mr-14')}>
									<div className="flex space-x-4 h-full items-center">
										<div onClick={handleArena}>
											<BorderButtonComponent className='cursor-pointer px-3 py-2 rounded-md text-sm font-medium' hover='true'>
												THE ARENA
											</BorderButtonComponent>
										</div>
									</div>
								</div>
								{
									router.pathname !== '/' ? (
										<button className="inline-flex items-center justify-center p-2 rounded-md border-2 border-transparent text-white hover:text-white hover:border-white" onClick={handleSidebar}>
											<MenuIcon className="block h-6 w-6" aria-hidden="true" />
										</button>
									) : (
										<div className="hidden lg:block lg:ml-6">
											<div className="flex space-x-4 h-full items-center">
												{
													Config.navigation.map((item) => {
														if (router.pathname == '/') {
															return (
																<ScrollLink
																	key={item.name}
																	to={item.href}
																	spy={true}
																	smooth={true}
																	aria-current={item.current ? 'page' : undefined}
																>
																	<BorderButtonComponent className='cursor-pointer px-3 py-2 rounded-md text-sm font-medium' hover='true'>
																		{item.name}
																	</BorderButtonComponent>
																</ScrollLink>
															)
														} else {
															return (
																<Link
																	key={item.name}
																	href='/'
																	aria-current={item.current ? 'page' : undefined}
																>
																	<BorderButtonComponent className='cursor-pointer px-3 py-2 rounded-md text-sm font-medium' hover='true'>
																		{item.name}
																	</BorderButtonComponent>
																</Link>
															)
														}
													})
												}
											</div>
										</div>
									)
								}
							</div>
						</div>
						<Disclosure.Panel className="lg:hidden">
							<div className='fixed top-0 right-0 left-0 bottom-0' onClick={() => close()}></div>
							<div className="px-2 pt-2 pb-3 space-y-1">
								{
									Config.navigation.map((item) => (
										<Disclosure.Button
											key={item.name}
											as="div"
											className={clsx(
												item.current ? 'bg-gray-900/80 text-white' : 'text-gray-300 hover:bg-gray-700/80 hover:text-white',
												'border block border-transparent rounded-md text-base font-medium backdrop-blur-sm cursor-pointer hover:border hover:border-main'
											)}
											aria-current={item.current ? 'page' : undefined}
										>
											<ScrollLink
												to={item.href}
												onClick={() => close()}
												spy={true}
												smooth={true}
												className='block px-3 py-2'
											>
												{item.name}
											</ScrollLink>
										</Disclosure.Button>
									))
								}
							</div>
						</Disclosure.Panel>
					</div>
				)}
			</Disclosure>
			{
				router.pathname !== '/' && (
					<SidebarSection open={sidebarOpen} setOpen={setSidebarOpen} />
				)
			}
		</>
	)
}
