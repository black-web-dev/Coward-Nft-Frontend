import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import Amount from './amount';
import MainVideo from './mainVideo';
import Modal from './modal';
import { nftProps } from './nft';
import RoundDetail from './roundDetail';
import Video from './video';
import Warriors from './warriors';
import Winners from './winners';
import toast from "@/components/toast";
import "react-toastify/dist/ReactToastify.css";
import Web3 from "web3";
import Config from '@/config/app';
import { useWeb3React } from "@web3-react/core";
import CowardContractContext from "@/context/cowardContractContext";
import SomContractContext from '@/context/somContractContext';
import { httpGet } from '@/utils/http.utils';
import { useRouter } from 'next/router';
import { useETHBalances } from '@/state/wallet/hooks';

const CowardSection = (): JSX.Element => {
	const router = useRouter();
	const flagRef = useRef<boolean[]>([]);
	const warriorsRef = useRef<any>(null);
	const somContractCtx = useContext(SomContractContext);
	const cowardContractCtx = useContext(CowardContractContext);
	const { account }: any = useWeb3React();

	const [state, setState] = useState({
		currentRound: {
			roundId: 0,
			deathPercent: 0
		},
		cowardAmount: 0,
		marsAmount: 0,
		totalAliveAmount: 0,
		coward: 0,
		mainWinnerId: 0,
		cowardWinnerId: 0,
		totalSupply: 0,
		cowardFinished: false,
		marsFinished: false,
		timeLineId: 0
	})

	const [listLoading, setListLoading] = useState<any>(false);
	const [loading, setLoading] = useState<any>(false);
	const [myNftAliveAmount, setMyNftAliveAmount] = useState<any>(0);
	const [myNftDeathAount, setMyNftDeathAmount ] = useState<any>(0);
	const [nftList, setNftList] = useState<any>([]);

	const [isRevealed, setIsRevealed] = useState<any>(false);

	const [selectedId, setSelectedId] = useState<any>(0);
	const [open, setOpen] = useState<Boolean>(false);
	const [openType, setOpenType] = useState<string>('Coward');

	const notify = useCallback((type, message) => {
		toast({ type, message });
	}, []);

	const handleCoward = (id: any) => {
		setSelectedId(id);
		setOpenType('Coward');
		setOpen(true);
	}

	const handleMars = (id: any) => {
		setSelectedId(id);
		setOpenType('Mars');
		setOpen(true);
	}

	const handleConfirm = async () => {
		const contract: any = cowardContractCtx.contract;
		let funcType: string = 'setCoward';

		if (openType === 'Mars') funcType = 'setMars';

		try {
			await contract.methods
			[funcType](selectedId)
				.send({ from: account, value: 0 })
				.on('receipt', function (receipt: any) {
				})
				.then((_tx: any) => {
					notify('success', `Successfully chosen the ${funcType === 'setCoward' ? `Coward's` : `Mars'`} Gambit`);
				});
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false);
			setOpen(false);
			const web3 = new Web3(Web3.givenProvider);
			await cowardContractCtx.loadContract(web3, Config.coward);
			
			handleGetNFTs();
		}
	}

	const handleGetNFTs = useCallback(async () => {
		const c = flagRef.current.length;
		if( c > 0) {
			flagRef.current[c - 1] = false;
		}
		flagRef.current.push(true);
		const somContract: any = somContractCtx.contract;
		const cowardContract: any = cowardContractCtx.contract;

		const revealed = await somContract.methods.isRevealed().call();
		setIsRevealed(revealed);

		const mySOMs = await somContract.methods.fetchMySOMs(account).call();
		if (mySOMs.length > 0) {
			setListLoading(true);
		}
		let aliveAmount = 0;
		let deathAmount = 0;
		let list: any[] = [];
		
		setMyNftAliveAmount(aliveAmount);
		setMyNftDeathAmount(deathAmount);

		for (let i = 0; i < mySOMs.length; i++) {
			
			if(!flagRef.current[c]) break;
			const tokenId = mySOMs[i].tokenId;
			const state:number = mySOMs[i].state;

			const marsState : boolean = await cowardContract.methods.MarsFlg(tokenId).call();
			const cowardState : boolean = await cowardContract.methods.CowardFlg(tokenId).call();
			let tokenURI : string = await somContract.methods.tokenURI(tokenId).call();
			
			if (state.toString() === '1' || state.toString() === '15') {
				aliveAmount++;
				setMyNftAliveAmount(aliveAmount);
			} else {
				deathAmount++;
				setMyNftDeathAmount(deathAmount);
			}
			try {
				tokenURI = tokenURI.replace('gateway.pinata.cloud', 'som.mypinata.cloud');
				const { image, name, description }: any = await httpGet(tokenURI);
				list.push({ tokenId, image, name, description, state, cowardState, marsState });
				
				setNftList(list);
				
			} catch (error) {
				console.log(error);
				if(!flagRef.current[c]) break;
			}
		}
		setListLoading(false);
	}, [somContractCtx, cowardContractCtx]);

	useEffect(() => {
		somContractCtx.contract && cowardContractCtx.contract && handleGetNFTs();
		setState({ ...state, totalSupply: somContractCtx.totalSupply });
	}, [somContractCtx, cowardContractCtx])

	useEffect(() => {
		setState({
			...state,
			currentRound: {
				roundId: cowardContractCtx.currentRound?.roundId || 0,
				deathPercent: cowardContractCtx.currentRound?.deathPercent || 0,
			},
			cowardAmount: cowardContractCtx.cowardAmount || 0,
			marsAmount: cowardContractCtx.marsAmount || 0,
			mainWinnerId: cowardContractCtx.mainWinnerId || 0,
			cowardWinnerId: cowardContractCtx.cowardWinnerId || 0,
			totalAliveAmount: cowardContractCtx.totalAliveAmount || 0,
			cowardFinished: cowardContractCtx.cowardFinished || false,
			marsFinished: cowardContractCtx.marsFinished || false,
			timeLineId: cowardContractCtx.timeLineId || 0
		})
	}, [cowardContractCtx])

	useEffect(() => {
		console.log(router.asPath.includes('#warriors'))
		if(router.asPath.includes('#warriors')) {
			warriorsRef.current.scrollIntoView();
		}
	}, [router])
	return (
		<div className='h-full w-full'>
			{/* main video section */}
			<MainVideo />

			{
				state.mainWinnerId > 0 || state.cowardWinnerId > 0 ? <>
					<div className='w-full text-center text-normal font-black my-10 tracking-[.75em]'>
						GAME FINISHED
					</div>

					{/* coward, alive, dead amount section */}
					<Amount coward={state.cowardAmount} alive={state.totalAliveAmount} dead={state.totalSupply - state.totalAliveAmount} marsFinished={state.marsFinished} />

					{/* main winner and coward winner section */}
					<Winners mainWinnerId={state.mainWinnerId} cowardWinnerId={state.cowardWinnerId} />
				</> : <>
					{/* video section */}
					<Video />

					{/* coward, alive, dead amount section */}
					<Amount coward={state.cowardAmount} alive={state.totalAliveAmount} dead={state.totalSupply - state.totalAliveAmount} marsFinished={state.marsFinished} />

					{/* round detail */}
					<RoundDetail
						currentRoundId={state.currentRound?.roundId}
						deathPercent={(state.currentRound?.roundId.toString() === '6') ? 98 : state.currentRound?.deathPercent}
						state={Config.state[state.currentRound.roundId - 1]}
						cowards={state.cowardAmount} mars={state.marsAmount} 
						timeLineId={state.timeLineId}
						/>

				</>
			}

			{/* my warrios */}
			<div ref={warriorsRef}>
				<Warriors alive={myNftAliveAmount} dead={myNftDeathAount} coward = {state.cowardAmount} list={nftList} isRevealed={isRevealed} currentRoundId={state.currentRound?.roundId} cowardFinished={state.cowardFinished} marsFinished={state.marsFinished} onCoward={handleCoward} onMars={handleMars} />
			</div>

			{/* modal */}
			<Modal open={open} setOpen={setOpen} openType={openType} selectedId={selectedId} onConfirm={handleConfirm} />
		</div>
	)
}

export default CowardSection;