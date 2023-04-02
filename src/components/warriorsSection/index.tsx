import { useState, useEffect, useCallback } from 'react';
import NextImage from '../NextImage';
import { ExternalLinkIcon } from '@heroicons/react/outline'

import toast from "@/components/toast";
import "react-toastify/dist/ReactToastify.css";

import { httpGet } from '@/utils/http.utils';
import Config from '@/config/app';
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

import BorderComponent from '../layout/borderComponent';
import BorderButtonComponent from '../layout/borderButtonComponent';
import { useRouter } from 'next/router';

const Warriors = () => {
	const router = useRouter();
	const { active, account }: any = useWeb3React();
	const [listLoading, setListLoading] = useState(false);
	const [nftList, setNftList] = useState<any>([]);
	const [myNFTcount, setMyNFTcount] = useState<any>(0);
	const [isRevealed, setIsRevealed] = useState(false);

	const notify = useCallback((type, message) => {
		toast({ type, message });
	}, []);

	const handleMint = () => {
		console.log('mint')
		router.push('/mint');
	}

	const handleGetNFTs = async () => {
		if (!account) return notify('warning', 'please connect your wallet');

		const web3 = new Web3(Web3.givenProvider);

		const SOM = new web3.eth.Contract(
			Config.som.abi as [],
			Config.som.address as string
		)
		const mySOMs = await SOM.methods.fetchMySOMs(account).call();
		if (mySOMs.length > 0) {
			setListLoading(true);
		}

		setMyNFTcount(0);

		let list: any[] = [];
		let count = 0;
		setMyNFTcount('...');
		for (let i = 0; i < mySOMs.length; i++) {
			const tokenId = mySOMs[i].tokenId;
			const state = mySOMs[i].state;

			if(state === 20) continue; // if mar's state then continue
			
			let tokenURI = await SOM.methods.tokenURI(tokenId).call();

			tokenURI = tokenURI.replace('gateway.pinata.cloud', 'som.mypinata.cloud');
			try {
				const { image, name, description }: any = await httpGet(tokenURI);
				setNftList((list: any) => {
					return [...list, { tokenId, image, name, description, state }]
				});
				count++;
			} catch (error) {
				console.log(error)
			}
		}
		setMyNFTcount(count);
		setListLoading(false);

		const revealed = await SOM.methods.isRevealed().call();
		setIsRevealed(revealed);
	}

	const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
		return `https://som.mypinata.cloud/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
	}

	useEffect(() => {
		account && handleGetNFTs();
	}, [active, account]);

	return (
		<div className='section h-full w-full'>
			<div className='landing-section h-full w-full'>
				<div id='warriors' className='warriors relative flex items-center justify-center flex-col w-full h-full min-h-screen' data-aos="fade-up">
					<BorderButtonComponent className='p-4 mt-40 mb-20'>
						<div className='flex flex-col md:flex-row items-center justify-center text-2xl md:text-5xl tracking-widest text-center'>
							<div>MY WARRIORS</div>
							<div className='ml-8 text-5xl'>{myNFTcount}</div>
						</div>
					</BorderButtonComponent>
					<div className=''>
						{
							!account || nftList.length == 0 ? (
								<div className='w-full flex flex-col items-center justify-center'>
									<div className='text-md uppercase tracking-widest text-center'>
										<div>you have no warriors yet</div>
										<div className='py-2'></div>
										<div>mint now or buy on opensea</div>
									</div>
									<div className='flex flex-col items-center justify-center'>
										<div onClick={handleMint} >
											<BorderButtonComponent className='tracking-widest text-lg font-bold px-4 py-2 mt-20'>
												M I N T
											</BorderButtonComponent>
										</div>
										<div className='bg-white mt-6 p-2'>
											<a href={Config.opensea_url} target='_blank'>
												<img className='w-[200px] h-auto' src='/images/networks/opensea.png' />
											</a>
										</div>
									</div>
								</div>
							) : (
								<div className='list w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>

									{
										nftList.map((item: any, key: any) => {
											return (
												<div key={key} className='item relative px-2 my-4 flex flex-col items-center justify-center'>
													<BorderComponent className='p-2'>
														<div className='z-10 absolute top-0 right-0 p-4'>
															<a href={Config.opensea_asset_url + Config.som.address + `/` + item.tokenId} target='_blank'>
																<ExternalLinkIcon className="block h-6 w-6 text-[#b9111a]" aria-hidden="true" />
															</a>
														</div>
														<div className='item-image relative h-[288px] border-2 border-black'>
															<NextImage
																useSkeleton
																loader={imgLoader}
																className='p-4'
																src={item.image}
																width='288'
																height='288'
																alt={item.name}
															/>
															{/* <div className="z-10 absolute w-full h-full top-0 left-0 flex justify-center items-center">
																<div className='absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm'></div>
																<div className="lds-ring"><div></div><div></div><div></div><div></div></div>
															</div> */}
															{/* <Image className='p-4' loader={imgLoader} src={item.image} layout="fill" objectFit="scale-down" /> */}
														</div>
														<div className='detail w-[288px] py-4'>
															<div className='title text-white text-2xl font-bold text-left'>
																{item.name}
															</div>
															<div className='w-full flex items-center justify-start text-sm text-white text-center'>
																<div className='mr-2'>STATUS:</div>
																<div>{isRevealed ? (item.state.toString() === '1' ? 'ALIVE' : (item.state.toString() === Config.roundCount.toString() ? 'WINNER' : (item.state.toString() === '15' ? `Coward` : (item.state.toString() === '20'? `Mars` : `DEAD IN ROUND (${item.state - 1})`)))) : 'Unrevealed'}</div>
															</div>
														</div>
													</BorderComponent>
												</div>
											)
										})
									}
								</div>
							)
						}
					</div>
				</div>
			</div>
			{
				listLoading && (
					<div className='fixed top-0 right-0 bottom-0 left-0 flex items-end justify-start'>
						<div className='text-3xl font-bold p-8 text-[#721f23] flex items-center justify-start'>
							<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
						</div>
					</div>
				)
			}
		</div>
	)
}

export default Warriors;