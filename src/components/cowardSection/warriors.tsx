import React from 'react';
import Nft, { nftProps } from './nft';

type Props = {
	alive: number;
	dead: number;
	coward: number;
	list: nftProps[] | [];
	currentRoundId: number;
	isRevealed: boolean;
	cowardFinished: boolean;
	marsFinished: boolean;
	onCoward: (id: number) => void;
	onMars: (id: number) => void;
}

const Warriors = ({ alive, dead, list, coward, onCoward, onMars, currentRoundId, isRevealed, cowardFinished, marsFinished }: Props): JSX.Element => {
	return (
		<div className='w-full py-10'>
			<div className='w-full max-w-[700px] mx-auto tracking-widest px-10'>
				<div className="uppercase text-2xl md:text-4xl text-center font-black text-transparent tracking-widest bg-clip-text bg-gradient-to-r from-[#ff757c] via-[#b50912] to-[#ff757c] mx-auto">
					my warriors
				</div>

				{/* current round detail */}
				<div className='text-xl my-10'>
					<div className='flex items-center justify-between py-2'>
						<p className='first-letter:text-2xl uppercase'>warriors</p>
						<div>{alive + dead}</div>
					</div>

					<div className='flex items-center justify-between py-2'>
						<p className='first-letter:text-2xl uppercase'>alive</p>
						<div>{alive}</div>
					</div>

					<div className='flex items-center justify-between py-2'>
						<p className='first-letter:text-2xl uppercase'>dead</p>
						<p className='first-letter:text-2xl uppercase'>{dead}</p>
					</div>
				</div>

			</div>

			{/* nft list */}
			<div className='max-w-[1000px] mx-auto flex items-center justify-center'>
				<div className='inline-grid grid-cols-1 md:grid-cols-2 gap-2'>
					{
						list?.map((item: nftProps, index: number) => (
							<Nft key={index} {...item} onCoward={onCoward} onMars={onMars} currentRoundId={currentRoundId} isRevealed={isRevealed} cowardFinished={cowardFinished} marsFinished={marsFinished} />
						))
					}
				</div>
			</div>

		</div>
	)
}

export default Warriors;