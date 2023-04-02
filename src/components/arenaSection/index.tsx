import { useEffect, useState, useContext } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import NextImage from '../NextImage';
import Config from '@/config/app';
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import ConnectWallet from '@/components/connectWallet';
import ContractContext from '@/context/contractContext';
import BorderComponent from '../layout/borderComponent';

const Admin = () => {
	const contractCtx = useContext(ContractContext);
	const { active, account, error, provider }: any = useWeb3React();
	const [listLoading, setListLoading] = useState<any>(true);
	const [isRandomNumber, setIsRandomNumber] = useState<any>(false);
	const [currentRoundId, setCurrentRoundId] = useState<any>(0);
	const [currentRoundDeathPercent, setCurrentRoundDeathPercent] = useState<any>(0);
	const [winner, setWinner] = useState<any>();
	const [nftList, setNftList] = useState([]);
	const [restAmount, setRestAmount] = useState<any>(0);

	const roundCount = Config.roundCount;

	const loadContract = async () => {
		const web3 = new Web3(Web3.givenProvider);
		const _contract: any = contractCtx.loadContract(web3, Config.som);

		const totalSupply: any = await contractCtx.loadTotalSupply(_contract);

		if (totalSupply > 0) {
			contractCtx.loadCurrentRound(_contract);
			contractCtx.loadIsRandomNumber(_contract);
			contractCtx.loadWinner(_contract);
			contractCtx.loadRestAmount(_contract);
			contractCtx.loadNftList(_contract);

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

	const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
		return `https://som.mypinata.cloud/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
	}

	useEffect(() => {
		loadContract();
	}, [provider, account]);

	useEffect(() => {
		setCurrentRoundId(contractCtx.currentRound ? contractCtx.currentRound.roundId : 0);
		setCurrentRoundDeathPercent(contractCtx.currentRound ? contractCtx.currentRound?.deathPercent : 0);
		if (!contractCtx.loading) setIsRandomNumber(contractCtx.isRandomNumber);
		setWinner(contractCtx.winner);
		setNftList(contractCtx.nftList);
		setRestAmount(contractCtx.restAmount)
		setListLoading(contractCtx.loading);
	}, [contractCtx]);

	return (
		<div className='w-full h-full min-h-screen flex flex-col items-center justify-center bg-black text-white ' data-aos="fade-up">
			{/* <div className='text-5xl'>Admin Page</div> */}
			<div className='flex flex-col items-center justify-center p-12'>
				{!account ? (
					<div className='create-nft flex items-center justify-center'>
						<div className='flex items-center justify-center text-xl'>
							<ConnectWallet />
						</div>
					</div>
				) : (
					<>
						<div className='flex items-center justify-center text-5xl py-18'>
							{
								currentRoundId == 0 ? (
									<>
										{
											winner ? (
												<div className='item px-2 my-4 flex flex-col items-center justify-center'>
													<div className='font-bold text-3xl'>WINNER</div>
													<BorderComponent className='item px-2 my-4 flex flex-col items-center justify-center'>
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
													<div className='bg-white mt-6 p-2'>
														<a href={Config.opensea_url + Config.som.address} target='_blank'>
															<img className='w-[200px] h-auto' src='/images/networks/opensea.png' />
														</a>
													</div>
													<div className='font-bold text-3xl text-center py-6'>Preparing The Game</div>
												</div>

											) : (
												<div className='font-bold text-3xl text-center'>Preparing The Game</div>
											)
										}
									</>
								) : (
									<>
										{
											currentRoundId == roundCount ? (
												<>
													Game Over
												</>
											) : (
												<div className='w-full'>
													<BorderComponent className='w-[350px] p-8'>
														<div className="uppercase text-2xl md:text-3xl text-center font-extrabold text-transparent tracking-widest bg-clip-text bg-gradient-to-r from-[#ff757c] via-[#b50912] to-[#ff757c] pt-4">
															{
																currentRoundId == 0 ? (
																	<>
																		<div>GAME</div>
																		<div>START</div>
																	</>
																) : (
																	<>
																		{
																			currentRoundId == roundCount - 1 ? (
																				<>
																					<div>LAST</div>
																					<div>ROUND</div>
																				</>
																			) : (
																				<>
																					<div>NEXT</div>
																					<div>ROUND</div>
																				</>
																			)
																		}
																	</>
																)
															}
														</div>
														<div className='text-base'>
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
																<div>{Math.round(restAmount * currentRoundDeathPercent / 100)}</div>
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
													</BorderComponent>
												</div>
											)
										}
									</>
								)
							}
						</div>
						{/* {
							account ? (
								<>
									{
										!loading ? (
											<>
												<button className={clsx((!isRandomNumber && currentRoundId != 0) && 'opacity-30', 'flex items-center justify-center mt-10 rounded-[50px] border-2 border-white font-bold text-base sm:text-2xl transaction-all duration-100 px-6 py-2 sm:px-8 sm:py-4 backdrop-blur-sm bg-[#1d9cef] hover:shadow-lg hover:shadow-[#1d9cef]')} disabled={!isRandomNumber && currentRoundId != 0} onClick={handleStartRound}>
													{currentRoundId === '0' ? 'Start Game' : (!isRandomNumber && currentRoundId != 0 ? 'Starting...' : 'Next Round')}
												</button>
												<button className='my-4' onClick={refreshMetadata}>Refresh opensea metadata</button>
											</>
										) : (
											<div className='loading mt-8 flex flex-col items-center justify-center'>
												<div className="border-t-transparent w-14 h-14 border-4 border-main border-dashed rounded-full animate-spin"></div>
												<div className='text-white text-md mt-4'>
													Waiting for MetaMask Confirmation..
												</div>
											</div>
										)
									}
								</>
							) : (
								<div className='create-nft flex items-center justify-center'>
									<div className='flex items-center justify-center text-xl'>
										<ConnectWallet />
									</div>
								</div>
							)
						} */}
					</>

				)}
			</div>
			<div className='z-10 fixed cursor-pointer top-0 right-[-360px] w-[380px] bottom-0 flex flex-col justify-start items-center backdrop-blur-sm p-8 pr-4 border-l-2 border-[#731e22] bg-black/10 hover:translate-x-[-360px] transaction-all duration-700'>
				<div className='absolute left-[-17px] top-[50%] w-8 h-8 flex items-center justify-center m-auto rounded-full bg-[#731e22] text-white'>
					<div className='text-3xl font-bold'>+</div>
				</div>
				<Image className='opacity-10' src={'/images/experience/background.webp'} layout='fill' objectFit='fill' />
				<div className='relative w-full h-screen flex flex-col items-center justify-center'>
					{
						listLoading && (
							<div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
								<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
							</div>
						)
					}
					<div className='z-10 overflow-y-auto my-10 p-4'>
						{
							nftList.length == 0 ? (
								<div className='flex items-center justify-center'>
									There is no item.
								</div>
							) : (
								<>
									{
										nftList.map((item: any) => {
											return (
												<div key={item.tokenId} className={clsx(`flex items-center justify-between text-[15px] font-bold border-b-[1px] border-[grey] py-4 ${item.color}`, item.state == roundCount + 1 && 'animate-pulse')}>
													<div>{item.tokenId}</div>
													<div className='px-4'>-</div>
													<div>
														{item.address.substring(0, 10)} ... {item.address.substring(item.address.length - 8)}
													</div>
													<div className='w-[30px] px-4 text-white'>{(item.state != 1 && item.state != roundCount + 1) ? 'X' : 'O'}</div>
												</div>
											)
										})
									}
								</>
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

export default Admin;