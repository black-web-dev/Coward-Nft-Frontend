import { useState, useEffect, useCallback, useContext } from 'react'
import Image from 'next/image';
import toast from "@/components/toast";
import "react-toastify/dist/ReactToastify.css";
import Web3 from "web3";
import Config from '@/config/app';
import SomContractContext from "@/context/somContractContext";
import { useWeb3React } from "@web3-react/core";
import BorderButtonComponent from '../layout/borderButtonComponent';
import Modal from './modal';

function CreateSection() {
	const somContractCtx = useContext(SomContractContext);
	const [loading, setLoading] = useState(false);
	const [totalSupply, setTotalSupply] = useState(0);
	const [selectMintAmount, setSelectMintAmount] = useState(1);
	const { active, account }: any = useWeb3React();
	const [checkedWL, setCheckedWL] = useState<boolean>(false);
	const [addWLModal, setAddWLModal] = useState<Boolean>(false);

	const notify = useCallback((type, message) => {
		toast({ type, message });
	}, []);

	const handleSelectMintAmount = (event: any) => {
		let amount = event.target.value;
		amount = Math.ceil(amount);
		if (amount > 3 || amount < 0) amount = 3;
		setSelectMintAmount(amount);
	}

	const handleCreate = async () => {
		if (!active) {
			return notify('error', 'Please connect your wallet!');
		}

		// if (!checkedWL) {
		// 	setAddWLModal(true);
		// 	return;
		// }
		const restAmount: any = Config.totalCount - totalSupply < selectMintAmount;

		if (restAmount < 0) return notify('error', `You can mint ${restAmount} of NFTs`);

		setLoading(true);

		try {

			const somContract: any = somContractCtx.contract;

			if (!somContract) return;

			somContract.events.SOMMinted({
				filter: { to: account }
			})
				.on('data', function (event: any) {
					const web3 = new Web3(Web3.givenProvider);
					somContractCtx.loadContract(web3, Config.coward, account);
				})
				.on('error', console.error);

			let value = Config.mint_price * selectMintAmount;
			value = account === Config.adminAddress ? 0 : value;

			await somContract.methods
				.mint(
					selectMintAmount,
				)
				.send({ from: account, value: value })
				.on('receipt', function (receipt: any) {
					setLoading(false);
				})
				.then((_tx: any) => {
					notify('success', `You've successfully minted`);
				})

			setLoading(false);
		} catch (err: any) {
			setLoading(false);
			if (err.code == 4001) notify('error', err.message);
			else notify('error', 'Error minting the item');
			console.log('Error minting the item : ', err);
		} finally {
			const web3 = new Web3(Web3.givenProvider);
			somContractCtx.loadContract(web3, Config.som, account);
		}
	}

	const handleCheckWL = async () => {
		let WLFlag = false;

		try {
			const contract: any = somContractCtx.contract;
			WLFlag = await contract.methods.WhiteList(account).call();
		} catch (error) {
		} finally {
			setCheckedWL(WLFlag);
		}
	}

	useEffect(() => {
		setTotalSupply(somContractCtx.totalSupply);
		account && handleCheckWL();
	}, [somContractCtx, account]);

	return (
		<div className='section h-full w-full tracking-widest'>
			<div id='mint' className='mint relative flex items-center justify-center flex-col w-full h-full min-h-screen' data-aos="fade-up">
				<div className='relative w-[278px] h-[197px] mt-20'>
					<Image src='/images/coward/cowardsgambit.png' className='absolute' layout='fill' />
				</div>
				<div className='flex items-center justify-center text-xl font-bold tracking-widest mt-6'>
					<div>{Config.totalCount - totalSupply}</div>
					<div className='ml-4'>LEFT</div>
				</div>
				<div className='cursor-pointer h-[200px] flex flex-col items-center justify-center'>
					{
						!loading ? (
							<>
								{
									Config.totalCount - totalSupply == 0 ? (
										<div className='text-white text-2xl'>
											Sold Out
										</div>
									) : (
										<>
											{/* <div className='flex items-center justify-center text-[10px]'>
                                                    <div className='text-[14px] mr-2'>
                                                        {selectMintAmount}
                                                    </div>
                                                    <div>
                                                        PER TRANSACTION
                                                    </div>
                                                </div> */}

											<div className="flex items-center justify-center py-4">
												<input
													name="mintAmount"
													step={1}
													min='0'
													max='10'
													type="text" pattern="[0-9]*"
													value={selectMintAmount}
													onChange={handleSelectMintAmount}
													className="w-[150px] my-1 focus:ring-red-700 focus:border-red-700 block shadow-sm text-right text-2xl text-white border-[#b80e17] rounded-md bg-transparent"
												/>
											</div>
											<div onClick={handleCreate}>
												<BorderButtonComponent className='text-2xl tracking-widest font-bold px-12 py-4'>
													M I N T
												</BorderButtonComponent>
											</div>
										</>
									)
								}
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
				</div>
				<div className='uppercase flex flex-col items-center justify-center px-3'>
					<div className='py-2 text-center text-sm md:text-sm'>once you mint your warrior you can</div>
					<div className='py-2 text-center text-sm md:text-sm'>view them on opensea or in the ‘my</div>
					<div className='py-2 text-center text-sm md:text-sm'>warriors’ page in the arena</div>
				</div>
			</div>
			<Modal open={addWLModal} setOpen={setAddWLModal} />
		</div>
	)
}
export default CreateSection;