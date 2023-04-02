import { useState, useEffect, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import clsx from "clsx";
import { isMobile } from "react-device-detect";
import { NATIVE } from '@sushiswap/core-sdk'
import toast from "@/components/toast";
import "react-toastify/dist/ReactToastify.css";
import Config from '@/config/app';
import Web3Network from '@/components/Web3Network'
import Web3Status from '@/components/Web3Status'
import useIsCoinbaseWallet from '@/hooks/useIsCoinbaseWallet'
import { useActiveWeb3React } from '@/services/web3'

import Web3 from "web3";
import SomContractContext from "@/context/somContractContext";
import CowardContractContext from "@/context/cowardContractContext";

import BorderButtonComponent from "@/components/layout/borderButtonComponent";

declare const window: Window &
    typeof globalThis & {
        ethereum: any
    }

const SidebarSection = ({ open, setOpen }: { open: any, setOpen: any }) => {
    const router = useRouter();
    const somContractCtx = useContext(SomContractContext);
    const cowardContractCtx = useContext(CowardContractContext);
    const [loading, setLoading] = useState(false);
    const [adminPanel, setAdminPanel] = useState(false);
    const [currentRoundId, setCurrentRoundId] = useState<any>(0);
    const [isRandomNumber, setIsRandomNumber] = useState<any>(false);
    const [isRevealed, setIsRevealed] = useState<any>(false);
    const [winner, setWinner] = useState<any>(0);
    const { active, account, chainId, library } = useActiveWeb3React()
    const isCoinbaseWallet = useIsCoinbaseWallet()


    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const handleMint = () => {
        router.push('/mint');
    }

    const handleWarriors = () => {
        // router.push('/warriors');
        setOpen(false);
        router.push({hash: 'warriors'});
    }

    const handleBackArena = () => {
        setOpen(false);
        router.push('/');
    }

    const handleViewRound = () => {
        router.push('/arena');
    }

    const loadContract = async () => {
        const web3 = new Web3(Web3.givenProvider);
        const somContract: any = await somContractCtx.loadContract(web3, Config.som, account);
        const cowardContract: any = await cowardContractCtx.loadContract(web3, Config.coward);

        // Event subscription
        cowardContract?.events.setRandomNumber()
            .on('data', () => {
                setIsRandomNumber(true);
            })
            .on('error', (error: any) => {
                console.log(error);
            });
    }

    const handleStartRound = async () => {
        if (!active) {
            return notify('error', 'Please connect your wallet!');
        }
        if (!isRandomNumber && currentRoundId != 0) return

        setLoading(true);

        const somContract: any = somContractCtx.contract;
        const cowardContract: any = cowardContractCtx.contract;
        const isRevealed = somContractCtx.isRevealed;

        if (!isRevealed) {
            try {
                await somContract.methods
                    .setRevealed()
                    .send({ from: account, value: 0 })
                    .on('receipt', function (receipt: any) {
                        setLoading(false);
                    })
                    .then(async (_tx: any) => {
                        notify('success', 'Success set revealed.');
                        loadContract();
                    })
            } catch (err: any) {
                if (err.code == 4001) notify('error', err.message);
                else notify('error', 'Error set revealed');
                console.log('Error set revealed : ', err);
            }
        } else if (winner > 0) {
            try {
                await cowardContract.methods
                    .setWinnerShow()
                    .send({ from: account, value: 0 })
                    .on('receipt', function (receipt: any) {
                        setLoading(false);
                    })
                    .then(async (_tx: any) => {
                        notify('success', 'Success set revealed.');
                        loadContract();
                    })
            } catch (err: any) {
                if (err.code == 4001) notify('error', err.message);
                else notify('error', 'Error set revealed');
                console.log('Error set revealed : ', err);
            }
        } else {

            try {
                await cowardContract.methods.
                    endRound()
                    .send({ from: account, value: 0 })
                    .on('receipt', function (receipt: any) {
                        setLoading(false);
                    })
                    .then(async (_tx: any) => {
                        notify('success', 'Finish round successfully');
                        loadContract();
                    })
            } catch (err: any) {
                if (err.code == 4001) notify('error', err.message);
                else notify('error', 'Error finish round');
                console.log('Error finish round : ', err);
            }
        }

        setLoading(false);
    }

    const handleSetFinishCoward = async () => {
        const cowardContract: any = cowardContractCtx.contract;
        try {
            await cowardContract.methods
                .setFinishCoward()
                .send({ from: account, value: 0 })
                .on('receipt', function (receipt: any) {
                    setLoading(false);
                })
                .then(async (_tx: any) => {
                    notify('success', 'Success set finish coward.');
                    loadContract();
                })
        } catch (err: any) {
            if (err.code == 4001) notify('error', err.message);
            else notify('error', 'Error set finish coward');
            console.log('Error set finish coward : ', err);
        }
    }

    const handleSetFinishMars = async () => {
        const cowardContract: any = cowardContractCtx.contract;
        try {
            await cowardContract.methods
                .setFinishMars()
                .send({ from: account, value: 0 })
                .on('receipt', function (receipt: any) {
                    setLoading(false);
                })
                .then(async (_tx: any) => {
                    notify('success', 'Success set finish mars.');
                    loadContract();
                })
        } catch (err: any) {
            if (err.code == 4001) notify('error', err.message);
            else notify('error', 'Error set finish mars');
            console.log('Error set finish mars : ', err);
        }
    }
    useEffect(() => {
        if (account === Config.adminAddress || account === Config.developerAddress1) setAdminPanel(true);
        else setAdminPanel(false);
    }, [account]);

    useEffect(() => {
        setCurrentRoundId(cowardContractCtx.currentRound ? cowardContractCtx.currentRound.roundId : 0);
        setIsRandomNumber(cowardContractCtx.isRandomNumber);
        setIsRevealed(somContractCtx.isRevealed);
    }, [cowardContractCtx, somContractCtx]);

    useEffect(() => {
        // if ((!window.ethereum || window.ethereum.networkVersion != Config.netId) && !isMobile) return notify('error', 'Please switch Ethereum MainNet on MetaMask')
        // if (isMobile) return
        account && loadContract();
    }, [account]);

    return (
        <>
            <div className={clsx("z-20 fixed overflow-y-auto top-[80px] w-full md:w-[500px] bottom-0 text-xl text-[#9b9fa2] bg-[#252525] transition-all ease-linear", open ? 'left-0' : '-left-full md:left-[-500px]')}>
                <div className="relative h-full p-10">
                    <div className="flex items-center justify-start py-2">
                        <img className='mr-2' src="/images/sidebar/wallet.png" />
                        {/* <Wallet /> */}

                        <div className="flex items-center justify-end gap-2">
                            {library && (library.provider.isMetaMask || isCoinbaseWallet) && (
                                <div className="hidden sm:inline-block">
                                    <Web3Network />
                                </div>
                            )}

                            <div className="flex items-center w-auto text-sm font-bold cursor-pointer pointer-events-auto select-none whitespace-nowrap">
                                {account && chainId && (
                                    <Link href="/" passHref={true}>
                                        <a className="hidden px-3 text-high-emphesis text-bold md:block">
                                            {/*@ts-ignore*/}
                                            {NATIVE[chainId || 1].symbol}
                                        </a>
                                    </Link>
                                )}
                                <Web3Status />
                            </div>
                        </div>

                    </div>
                    <div className="py-6">
                        <div className="cursor-pointer hover:text-red-700" onClick={handleWarriors}>My Warriors</div>
                        <div className="border-b-2 border-[#9b9fa2] pt-2"></div>
                    </div>
                    {/* <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div className="cursor-pointer hover:text-red-700" onClick={handleMint}>Mint</div>
                        </div>
                        <div className="border-b-2 border-[#9b9fa2] pt-2"></div>
                    </div> */}
                    <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div className="cursor-pointer hover:text-red-700" onClick={handleBackArena}>Back to Arena</div>
                        </div>
                        <div className="border-b-2 border-[#9b9fa2] pt-2"></div>
                    </div>
                    {
                        adminPanel && (
                            <>
                                {
                                    !loading ? (
                                        <>
                                            <div className="pt-2" onClick={handleStartRound}>
                                                {!isRevealed &&
                                                    <BorderButtonComponent className={clsx((!isRandomNumber && currentRoundId != 0) && 'opacity-30', 'p-4 text-center mb-4')}>
                                                        Set Revealed
                                                    </BorderButtonComponent>
                                                }
                                                <BorderButtonComponent className='p-4 text-center'>
                                                    { currentRoundId > 0 && !isRandomNumber ? 'Starting...' : 'Start round' }
                                                </BorderButtonComponent>
                                            </div>
                                            <div className="pt-4" onClick={handleSetFinishCoward}>
                                                <BorderButtonComponent className='p-4 text-center'>
                                                    Set Finish Coward
                                                </BorderButtonComponent>
                                            </div>
                                            <div className="pt-4" onClick={handleSetFinishMars}>
                                                <BorderButtonComponent className='p-4 text-center'>
                                                    Set Finish Mars
                                                </BorderButtonComponent>
                                            </div>
                                        </>
                                    ) : (
                                        <div className='loading mt-4 flex flex-col items-center justify-center'>
                                            <div className="border-t-transparent w-14 h-14 border-4 border-main border-dashed rounded-full animate-spin"></div>
                                            <div className='text-white text-md mt-4'>
                                                Waiting for MetaMask Confirmation..
                                            </div>
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
            <div className={clsx("z-10 fixed top-[80px] left-0 right-0 bottom-0 backdrop-blur-sm", open ? '' : 'hidden')} onClick={() => setOpen(false)}></div>
        </>
    )
}

export default SidebarSection;