import { useCallback } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import toast from "@/components/toast";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react'
import { LogoutIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link as ScrollLink } from 'react-scroll';

import Config from '@/config/app';
import { useWeb3React } from "@web3-react/core";

const logo = [
	{ name: LogoutIcon, href: '/', current: true }
]

const socials = [
	{ name: 'discord', link: Config.discord },
	{ name: 'tiktok', link: Config.tiktok },
	{ name: 'instagram', link: Config.instagram },
	{ name: 'twitter', link: Config.twitter }
]

export default function Header() {
	const router = useRouter();
	const { account }: any = useWeb3React();

	const notify = useCallback((type, message) => {
		toast({ type, message });
	}, []);

	const handleMint = () => {
		router.push(`/mint`);
	}

	const handleAdmin = () => {
		// if (account !== Config.adminAddress || account !== Config.developerAddress1 || account !== Config.developerAddress2) return notify('error', 'please connect admin wallet.');

		router.push(`/admin`);
	}

	const handleSocialLink = (link: string) => () => {
		// notify('warning', `please link the ${link}`);
		window.open(link, '_blank');
	}

	return (
		<Disclosure as="nav">
			{({ open, close }) => (
				<>
					<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
						<div className="relative flex items-center justify-between h-20">
							<div className="absolute z-10 inset-y-0 right-0 flex items-center lg:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md border-2 border-transparent text-white hover:text-white hover:border-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex-1 flex items-center sm:items-stretch sm:justify-between">
								<div className="cursor-pointer flex-shrink-0 flex items-center sm:ml-10">
									{
										router.pathname == '/' ? (
											<ScrollLink to={'home'} spy={true} smooth={true}>
												<img
													className="block h-14 lg:h-22 md:h-20 w-auto"
													src="/images/logo.webp"
													alt="son of mars"
												/>
											</ScrollLink>
										) : (
											<Link href={'/'}>
												<img
													className="block h-14 lg:h-22 md:h-20 w-auto"
													src="/images/logo.webp"
													alt="son of mars"
												/>
											</Link>
										)
									}
									
								</div>
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
															className={clsx(
																item.current ? 'hover:bg-white text-white hover:text-black' : 'text-gray-300 hover:bg-white hover:text-black',
																'cursor-pointer px-3 py-2 rounded-md text-sm font-medium'
															)}
															aria-current={item.current ? 'page' : undefined}
														>
															{item.name}
														</ScrollLink>
													)
												} else {
													return (
														<Link
															key={item.name}
															href='/'
															aria-current={item.current ? 'page' : undefined}
														>
															<div
																className={clsx(
																	item.current ? 'hover:bg-white text-white hover:text-black' : 'text-gray-300 hover:bg-white hover:text-black',
																	'cursor-pointer px-3 py-2 rounded-md text-sm font-medium'
																)}>
																{item.name}
															</div>
														</Link>
													)
												}
											})
										}
										<a target='_blank' href={Config.whitepaper} className='text-white hover:bg-white hover:text-black cursor-pointer px-3 py-2 rounded-md text-sm font-medium'>
											WhitePaper
										</a>
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<div className="items-center justify-center hidden sm:flex lg:hidden xl:flex mr-10 lg:mr-0">
									{
										socials.map(item => (
											<div key={item.name} className='cursor-pointer rounded-lg border-transparent border-2 hover:border-2 hover:border-white px-4 py-2' onClick={handleSocialLink(item.link)}>
												<img className='w-6 h-6' src={`./images/socials/${item.name}.svg`} />
											</div>
										))
									}
								</div>
								<div className="relative flex items-center justify-center">
									<div className="cursor-pointer w-32 border-2 border-white text-white text-center hover:text-black hover:bg-white py-2 px-4 mx-4 flex text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transaction-all duration-500" >
										<button onClick={handleMint}>MINT SOM</button>
									</div>
								</div>
								<div className="relative flex items-center justify-center mr-10">
									<div className='cursor-pointer rounded-lg border-transparent border-2 hover:border-2 hover:border-white px-4 py-2' onClick={handleAdmin}>
										<img className='w-6 h-6' src={`./images/svg/icon-admin.svg`} />
									</div>
								</div>
							</div>
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
							<Disclosure.Button
								as="div"
								className={clsx('bg-gray-900/80 hover:text-white block border border-transparent rounded-md text-base font-medium backdrop-blur-sm cursor-pointer hover:border hover:border-main'
								)}
							>
								<a className='block px-3 py-2' target='_blank' href={Config.whitepaper}>
									WhitePaper
								</a>
							</Disclosure.Button>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}
