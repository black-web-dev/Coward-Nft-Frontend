import { useEffect, useState, useCallback, useContext } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import toast from "@/components/toast";
import "react-toastify/dist/ReactToastify.css";
import Config from '@/config/app';
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import ConnectWallet from '@/components/connectWallet';
import ContractContext from '@/context/contractContext';
import { httpGet } from '@/utils/http.utils';
import { async } from 'rxjs';

const Admin = () => {
	const contractCtx = useContext(ContractContext);
	const { active, account }: any = useWeb3React();
	const [loading, setLoading] = useState(false);
	const [listLoading, setListLoading] = useState(true);
	const [isRandomNumber, setIsRandomNumber] = useState<any>(false);
	const [currentRoundId, setCurrentRoundId] = useState<any>(0);
	const [currentRoundDeathPercent, setCurrentRoundDeathPercent] = useState<any>(0);
	const [winner, setWinner] = useState<any>();
	const [nftList, setNftList] = useState([]);
	const [restAmount, setRestAmount] = useState<any>(0);

	const roundCount = Config.roundCount;

	const notify = useCallback((type, message) => {
		toast({ type, message });
	}, []);

	const handleStartRound = async () => {
		if (!active) {
			return notify('error', 'Please connect your wallet!');
		}

		setLoading(true);

		const contract: any = contractCtx.contract;

		try {
			await contract.methods
				.startRound()
				.send({ from: account, value: 0 })
				.on('receipt', function (receipt: any) {
					setLoading(false);
				})
				.then(async (_tx: any) => {
					loadContract();
					refreshMetadata();
				})

			setLoading(false);
		} catch (err: any) {
			setLoading(false);
			if (err.code == 4001) notify('error', err.message);
			else notify('error', 'Error start round');
			console.log('Error start round : ', err);
		}
	}

	const refreshMetadata = async () => {
		await httpGet(`/api/refresh_metadata`);
	}

	const loadContract = () => {
		const web3 = new Web3(Web3.givenProvider);
		const _contract: any = contractCtx.loadContract(web3, Config.som);
		contractCtx.loadCurrentRound(_contract);
		contractCtx.loadIsRandomNumber(_contract);
		contractCtx.loadWinner(_contract);
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

	const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
		return `https://som.mypinata.cloud/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
	}

	useEffect(() => {
		loadContract();
	}, []);

	useEffect(() => {
		setCurrentRoundId(contractCtx.currentRound ? contractCtx.currentRound.roundId : 0);
		setCurrentRoundDeathPercent(contractCtx.currentRound ? contractCtx.currentRound?.deathPercent : 0);
		setIsRandomNumber(contractCtx.isRandomNumber);
		setWinner(contractCtx.winner);
		setNftList(contractCtx.nftList);
		setRestAmount(contractCtx.restAmount)
		setListLoading(false);
	}, [contractCtx]);

	return (
		<div className='w-full h-full min-h-screen flex flex-col items-center justify-center bg-black text-white bg-[url("/images/home/home_blank.webp")] bg-cover bg-center' data-aos="fade-up">
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
													<div className='rounded-xl border-2 border-white bg-black'>
														<div className='item-image rounded-lg relative h-[288px] w-[288px]'>
															<Image className='rounded-lg p-4' loader={imgLoader} src={winner.image} layout="fill" objectFit="fill" />
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
													</div>
													<div className='font-bold text-3xl text-center py-6'>GAME OVER</div>
													<div className='font-bold text-3xl text-center'>Please start game</div>
												</div>
											) : (
												<div className='font-bold text-3xl text-center'>Please start the game</div>
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
												<div className='flex items-center justify-center text-slate-300 text-3xl'>
													<div className='flex flex-col items-end justify-center'>
														<div className='flex my-2'>
															<div>Round:</div>
														</div>
														<div className='flex my-2'>
															<div>Alive Amount:</div>
														</div>
														<div className='flex my-2'>
															<div>Death Percent:</div>
														</div>
														<div className='flex my-2'>
															<div>Death Amount:</div>
														</div>
													</div>
													<div className='flex flex-col items-start justify-center'>
														<div className='flex my-2'>
															<div className='mx-6 text-white'>{currentRoundId}</div>
														</div>
														<div className='flex my-2'>
															<div className='mx-6 text-white'>{restAmount}</div>
															<div>nfts</div>
														</div>
														<div className='flex my-2'>
															<div className='mx-6 text-white'>{currentRoundDeathPercent}</div>
															<div>%</div>
														</div>
														<div className='flex my-2'>
															<div className='mx-6 text-white'>{Math.round(restAmount * currentRoundDeathPercent / 100)}</div>
															<div>nfts</div>
														</div>
													</div>
												</div>
											)
										}
									</>
								)
							}
						</div>
						{
							account ? (
								<>
									{
										!loading ? (
											<>
												<button className={clsx((!isRandomNumber && currentRoundId != 0) && 'opacity-30', 'flex items-center justify-center mt-10 rounded-[50px] border-2 border-white font-bold text-base sm:text-2xl transaction-all duration-100 px-6 py-2 sm:px-8 sm:py-4 backdrop-blur-sm bg-[#1d9cef] hover:shadow-lg hover:shadow-[#1d9cef]')} disabled={!isRandomNumber && currentRoundId != 0} onClick={handleStartRound}>
													{currentRoundId == 0 ? 'Start Game' : (!isRandomNumber && currentRoundId != 0 ? 'Starting...' : 'Next Round')}
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
						}
					</>

				)}
			</div>
			<div className='fixed cursor-pointer top-0 left-[-360px] bottom-0 flex flex-col justify-start items-center backdrop-blur-sm p-8 border-r-2 border-white bg-black/10 hover:translate-x-[360px] transaction-all duration-700 delay-500'>
				<Image className='scale-x-[-1] opacity-50' src={'/images/experience/background.webp'} layout='fill' objectFit='fill' />
				<div className='relative w-full h-screen flex flex-col items-center justify-center'>
					<div className='absolute right-[-50px] w-8 h-8 flex items-center justify-center m-auto rounded-full bg-white text-black'>
						<div className='text-3xl font-bold'>+</div>
					</div>
					<div className='overflow-y-auto my-10 p-4'>
						{
							nftList.map((item: any) => {
								return (
									<div key={item.tokenId} className={clsx(`flex items-center justify-between text-[15px] font-bold border-b-[1px] border-[grey] py-4 ${item.color}`, item.state == roundCount + 1 && 'animate-pulse')}>
										<div>{item.tokenId}</div>
										<div className='px-4'>-</div>
										<div>
											{item.address.substring(0, 12)} ... {item.address.substring(item.address.length - 8)}
										</div>
										<div className='w-[30px] px-4 text-white'>{(item.state != 1 && item.state != roundCount + 1) ? 'X' : 'O'}</div>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
			{
				listLoading && (
					<div className='fixed top-0 right-0 bottom-0 left-0 flex items-end justify-start'>
						<div className='text-3xl font-bold p-8'>Loading...</div>
					</div>
				)
			}
		</div>
	)
}

export default Admin;