import React, { useState, useEffect, useContext } from 'react';
import BorderComponent from '../layout/borderComponent';
import NextImage from '../NextImage';
import Image from 'next/image';

import Config from '@/config/app';
import SomContractContext from "@/context/somContractContext";
import { httpGet } from '@/utils/http.utils';

type Props = {
	mainWinnerId: number;
	cowardWinnerId: number;
}

const Winners = ({ mainWinnerId, cowardWinnerId }: Props) => {
	const somContractCtx = useContext(SomContractContext);
	const [mainWinner, setMainWinner] = useState<any>({});
	const [cowardWinner, setCowardWinner] = useState<any>({});

	const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
		return `https://som.mypinata.cloud/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
	}

	const loadWinner = async () => {
		const somContract: any = somContractCtx.contract;

		try {
			const mainWinnertokenURI = await somContract.methods.tokenURI(mainWinnerId).call();
			const cowardWinnertokenURI = await somContract.methods.tokenURI(cowardWinnerId).call();
			const { image: m_image, name: m_name, description: m_description }: any = await httpGet(mainWinnertokenURI);
			const { image: c_image, name: c_name, description: c_description }: any = await httpGet(cowardWinnertokenURI);
			setMainWinner({
				tokenId: mainWinnerId,
				image: m_image,
				name: m_name,
				description: m_description
			});
			setCowardWinner({
				tokenId: cowardWinnerId,
				image: c_image,
				name: c_name,
				description: c_description
			});
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		somContractCtx.contract && loadWinner();
	}, [somContractCtx]);

	return (
		<div className='w-full py-10'>
			{/* nft list */}
			<div className='max-w-[1000px] mx-auto flex items-center justify-center'>
				<div className='inline-grid grid-cols-1 md:grid-cols-2 gap-2'>
					{
						cowardWinner.image &&
						<div className='relative px-2 my-4 flex flex-col items-center justify-center'>
							<BorderComponent className='p-2'>
								<div className='z-10 absolute top-0 right-0 p-4'>
									<a href={Config.opensea_asset_url + Config.som.address + `/` + cowardWinner.tokenId} target='_blank'>
										<Image src='/images/coward/opensea.png' width={60} height={60} />
									</a>
								</div>
								<div className='relative h-[400px] border-2 border-black'>
									<NextImage
										useSkeleton
										loader={imgLoader}
										src={cowardWinner.image}
										width='350'
										height='400'
										alt={cowardWinner.name}
									/>
								</div>
								<div className='absolute inset-x-2 top-1/2 bottom-2 bg-gradient-to-t from-black to-transparent'></div>
								<div className='absolute bottom-2 inset-x-0 flex items-center justify-around p-2'>
									<Image className='hover:scale-110 transition-all' src='/images/coward/coward.png' width={120} height={120} />
								</div>
							</BorderComponent>
						</div>
					}

					{mainWinner.image &&
						<div className='relative px-2 my-4 flex flex-col items-center justify-center'>
							<BorderComponent className='p-2'>
								<div className='z-10 absolute top-0 right-0 p-4'>
									<a href={Config.opensea_asset_url + Config.som.address + `/` + mainWinner.tokenId} target='_blank'>
										<Image src='/images/coward/opensea.png' width={60} height={60} />
									</a>
								</div>
								<div className='relative h-[400px] border-2 border-black'>
									<NextImage
										useSkeleton
										loader={imgLoader}
										src={mainWinner.image}
										width='350'
										height='400'
										alt={mainWinner.name}
									/>
								</div>
								<div className='absolute inset-x-2 top-1/2 bottom-2 bg-gradient-to-t from-black to-transparent'></div>
								<div className='absolute bottom-2 inset-x-0 flex items-center justify-around p-2'>
									<Image className='hover:scale-110 transition-all' src={'/images/coward/logo.png'} width={120} height={120} />
								</div>
							</BorderComponent>
						</div>
					}
				</div>
			</div>

		</div>
	)
}

export default Winners;

