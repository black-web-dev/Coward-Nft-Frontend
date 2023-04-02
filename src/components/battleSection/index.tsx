import { useState, useContext, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import NextImage from '../NextImage';
import { isMobile } from "react-device-detect";
import { ExternalLinkIcon } from '@heroicons/react/outline'
import toast from "@/components/toast";
import "react-toastify/dist/ReactToastify.css";
import Config from '@/config/app';
import Web3 from "web3";
import { httpGet } from '@/utils/http.utils';
import { useWeb3React } from "@web3-react/core";
import ContractContext from '@/context/contractContext';
import BorderComponent from '../layout/borderComponent';

import BorderButtonComponent from '../layout/borderButtonComponent';
import TimeCounter from '../timeCounterSection';

declare const window: Window &
	typeof globalThis & {
		ethereum: any
	}

const Battle = () => {
	const router = useRouter()
	const contractCtx = useContext(ContractContext);
	const { active, account, error, provider }: any = useWeb3React();
	const [listLoading, setListLoading] = useState<any>(false);
	const [isRandomNumber, setIsRandomNumber] = useState<any>(false);
	const [currentRoundId, setCurrentRoundId] = useState<any>(0);
	const [currentRoundDeathPercent, setCurrentRoundDeathPercent] = useState<any>(0);
	const [winner, setWinner] = useState<any>();
	const [restAmount, setRestAmount] = useState<any>(0);
	const [nftList, setNftList] = useState<any>([]);
	const [myNFTcount, setMyNFTcount] = useState<any>(0);
	const [myDeadNFTcount, setMyDeadNFTcount] = useState<any>(0);
	const [isRevealed, setIsRevealed] = useState(false);
	const [totalSupply, setTotalSupply] = useState<any>(0);
	const videoRef = useRef<HTMLVideoElement>(null);

	const roundCount = Config.roundCount;

	const handleMint = () => {
		router.push('/mint');
	}

	const notify = useCallback((type, message) => {
		toast({ type, message });
	}, []);

	const loadContract = async () => {
		const web3 = new Web3(Web3.givenProvider);
		const _contract: any = contractCtx.loadContract(web3, Config.som);

		const totalSupply: any = await contractCtx.loadTotalSupply(_contract);

		if (totalSupply > 0) {
			contractCtx.loadCurrentRound(_contract);
			contractCtx.loadIsRandomNumber(_contract);
			contractCtx.loadWinner(_contract);
			contractCtx.loadRestAmount(_contract);
			// contractCtx.loadNftList(_contract);

			// Event subscription
			_contract.events.setRandomNumber()
				.on('data', () => {
					setIsRandomNumber(true);
				})
				.on('error', (error: any) => {
					console.log(error);
				});
		}
	}
	const handleGetNFTs = async () => {
		if (!account) return notify('warning', 'please connect your wallet');

		const web3 = new Web3(Web3.givenProvider);

		const SOM = new web3.eth.Contract(
			Config.som.abi as [],
			Config.som.address as string
		)

		setNftList([]);

		const mySOMs = await SOM.methods.fetchMySOMs(account).call();

		if (mySOMs.length > 0) {
			setListLoading(true);
			setMyNFTcount(mySOMs.length);
		}

		let deadCount = 0;

		for (let i = 0; i < mySOMs.length; i++) {
			const tokenId = mySOMs[i].tokenId;
			const tokenURI = await SOM.methods.tokenURI(tokenId).call();
			const state = mySOMs[i].state;

			if (state != 1) deadCount++;

			setMyDeadNFTcount(deadCount);

			try {
				const { image, name, description }: any = await httpGet(tokenURI);
				setNftList((list: any) => {
					return [...list, { tokenId, image, name, description, state }]
				});
			} catch (error) {
				console.log(error)
			}
		}
		setListLoading(false);

		const revealed = await SOM.methods.isRevealed().call();
		setIsRevealed(revealed);
	}

	const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
		return `https://som.mypinata.cloud/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
	}

	useEffect(() => {
		// if( (!window.ethereum || window.ethereum.networkVersion != Config.netId) && !isMobile ) return notify('error', 'Please switch Ethereum MainNet on MetaMask')
		// if(isMobile && !provider) return
		loadContract();
	}, [provider, account]);

	useEffect(() => {
		setCurrentRoundId(contractCtx.currentRound ? contractCtx.currentRound.roundId : 0);
		setCurrentRoundDeathPercent(contractCtx.currentRound ? contractCtx.currentRound?.deathPercent : 0);
		if (!contractCtx.loading) setIsRandomNumber(contractCtx.isRandomNumber);
		setWinner(contractCtx.winner);
		setRestAmount(contractCtx.restAmount || 0)
		setTotalSupply(contractCtx.totalSupply || 0);
		setListLoading(contractCtx.loading);
	}, [contractCtx]);

	useEffect(() => {
		if (error) return notify('error', 'please log in MetaMask');
		if (!active) return;
		if (window.ethereum.networkVersion != Config.netId) return;
		account && handleGetNFTs();
	}, [active, account, error]);

	useEffect(() => {
		return () => {
			videoRef.current?.pause();
		}
	}, []);

	return (
		<div className='section h-full w-full'>
			<div className='h-full w-full'>
				<div id='battle' className='battle relative flex items-center justify-center flex-col w-full h-screen bg-[url("/images/battle/background.png")] bg-cover bg-center' data-aos="fade-up">
					<div className='background-color absolute top-0 left-0 h-full w-full bg-black bg-cover bg-center opacity-30'></div>
					<video autoPlay loop muted playsInline preload="" className="absolute w-auto min-w-full h-full max-w-none" ref={videoRef}>
						<source src="/videos/arena.mp4" type="video/mp4" />
					</video>
					<div className='absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black to-transparent'></div>
					<div className='absolute bottom-[100px]'>
						<BorderButtonComponent className='px-8 py-4 text-3xl tracking-widest font-bold'>
							TEST GAME 1
						</BorderButtonComponent>
					</div>
				</div>
			</div>

			<div className='relative w-full flex items-center justify-center'>
				<TimeCounter timeLineId={0} />
			</div>

			<div className='flex flex-col md:flex-row items-center justify-center font-bold text-2xl tracking-[15px]'>
				<div className='flex flex-col items-center justify-center m-16'>
					<div className='w-[150px] h-[150px]'>
						<img src='./images/test/alive.png' />
					</div>
					<div className=''>{restAmount}</div>
					<div className='pt-6'>ALIVE</div>
				</div>
				<div className='flex flex-col items-center justify-center m-16'>
					<div className='w-[150px] h-[150px]'>
						<img src='./images/test/dead.png' />
					</div>
					<div className=''>{totalSupply - restAmount}</div>
					<div className='pt-6'>DEAD</div>
				</div>
			</div>

			<div className='w-full flex items-center justify-center'>
				{
					currentRoundId == 0 && winner && !winner.isEndGame ? (
						<div className='item px-2 my-4 flex flex-col items-center justify-center'>
							<div className='font-bold text-3xl'>WINNER</div>
							<BorderComponent className='item px-2 my-4 flex flex-col items-center justify-center'>

								<div className='z-10 absolute top-0 right-0 p-4'>
									<a href={Config.opensea_asset_url + Config.som.address + `/` + winner.id} target='_blank'>
										<ExternalLinkIcon className="block h-6 w-6 text-[#b9111a]" aria-hidden="true" />
									</a>
								</div>
								<div className='item-image rounded-lg relative h-[288px] w-[288px]'>
									<NextImage
										useSkeleton
										loader={imgLoader}
										className='p-4'
										src={winner.image}
										width='288'
										height='288'
										alt={winner.name}
									/>
								</div>
								<div className='detail w-[288px] py-4'>
									<div className='title color-black text-2xl font-bold text-center'>
										{winner.name}
									</div>
									<div className='location w-full text-sm text-[grey] text-center'>
										{winner.description}
									</div>
									<div className='location w-full text-sm text-[grey] text-center'>
										{winner.address.substring(0, 12)} ... {winner.address.substring(winner.address.length - 8)}
									</div>
								</div>
							</BorderComponent>
							<div className='font-bold text-3xl text-center py-6'>Game Over</div>
						</div>
					) : (
						<div className='w-5/6 md:w-[650px] items-center justify-center'>
							<div className="uppercase text-2xl md:text-4xl text-center font-extrabold text-transparent tracking-widest bg-clip-text bg-gradient-to-r from-[#ff757c] via-[#b50912] to-[#ff757c] mx-auto py-10 mt-2 md:mt-10">
								{
									currentRoundId == 0 ? (
										<>
											<div>GAME START</div>
										</>
									) : (
										<>
											{
												currentRoundId == roundCount - 1 ? (
													<>
														<div>LAST ROUND</div>
													</>
												) : (
													<>
														<div>NEXT ROUND</div>
													</>
												)
											}
										</>
									)
								}
							</div>
							<div className='text-lg'>
								<div className='flex items-center justify-between py-2'>
									<div>Round Number</div>
									<div>{currentRoundId}</div>
								</div>
								<div className='flex items-center justify-between py-2'>
									<div>Death %</div>
									<div>{currentRoundDeathPercent}</div>
								</div>
								<div className='flex items-center justify-between py-2'>
									<div>Death Amount</div>
									<div>{Math.floor(restAmount * currentRoundDeathPercent / 100)}</div>
								</div>
								<div className='flex items-center justify-between py-2'>
									<div>State</div>
									<div className='ml-4'>{Config.state[currentRoundId - 1] || '---'}</div>
								</div>
								<div className='flex items-center justify-between mt-10 py-2'>
									<div>Will Survive</div>
									<div>{restAmount - Math.floor(restAmount * currentRoundDeathPercent / 100)}</div>
								</div>
							</div>
						</div>
					)
				}
			</div>

			<div className='mb-20 flex flex-col items-center justify-center'>

				<div className='pt-20 pb-6'>
					<a href={Config.opensea_url} target='_blank'>
						<BorderButtonComponent className='px-6 py-4'>
							GO TO OPENSEA COLLECTION
						</BorderButtonComponent>
					</a>
				</div>

				<div className="uppercase flex items-center justify-center text-2xl md:text-4xl text-center font-extrabold text-transparent tracking-widest bg-clip-text bg-gradient-to-r from-[#ff757c] via-[#b50912] to-[#ff757c] mx-auto py-10 mt-2 md:mt-4">
					<div>MY WARRIORS</div>
					<div className='ml-8 text-5xl'>{myNFTcount}</div>
				</div>
				<div className='w-full px-24'>
					{
						!account ? (
							<div className="flex items-center justify-center text-white">Please Connect Your Wallet</div>
						) : (
							<>
								{
									nftList.length == 0 ? (
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
										<div className='w-full flex flex-col items-center justify-center'>
											<div className='w-5/6 md:w-[650px] items-center justify-center mb-12'>

												<div className='text-lg'>
													<div className='flex items-center justify-between py-2'>
														<div>Warriors</div>
														<div>{myNFTcount}</div>
													</div>
													<div className='flex items-center justify-between py-2'>
														<div>Alive</div>
														<div>{myNFTcount - myDeadNFTcount}</div>
													</div>
													<div className='flex items-center justify-between py-2'>
														<div>Dead</div>
														<div>{myDeadNFTcount}</div>
													</div>
												</div>
											</div>
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
																			<div>{isRevealed ? (item.state.toString() == '1' ? 'ALIVE' : (item.state == Config.roundCount + 1 ? 'WINNER' : (item.state === 15 ? `Coward` : (item.state === 20 ? `Mars` : `DEAD IN ROUND (${item.state - 1})`)))) : 'Unrevealed'}</div>
																		</div>
																	</div>
																</BorderComponent>
															</div>
														)
													})
												}
											</div>
										</div>
									)
								}
							</>
						)
					}
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
		</div >
	)
}

export default Battle;