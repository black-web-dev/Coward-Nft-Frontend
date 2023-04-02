import React from 'react'

interface numProp {
	num: string | number,
	unit: string,
	flip: boolean,
};

export const NumberBox = ({ num, unit, flip }: numProp) => {
	return (
		<div className="flex flex-col items-center mt-0 md:mt-4 px-2">
			<div className=" relative bg-transparent flex flex-col items-center justify-center rounded-lg w-12 sm:w-24 h-12 sm:h-24  text-2xl sm:text-4xl mt-4 ">
				<div className="rounded-t-md sm:rounded-t-lg rounded-b-md sm:rounded-b-lg bg-[#343650] w-full h-full"></div>

				<div className="text-xl absolute text-white z-10 font-bold sm:text-5xl font-mono">
					{num}
				</div>

				<div className="rounded-t-md sm:rounded-t-lg rounded-b-md sm:rounded-b-lg bg-[#2c2e3f] w-full h-full"></div>

				<div className={`absolute  w-full h-1/2 top-0  rounded-t-md sm:rounded-t-lg z-5 ${flip ? 'animate-flip bg-[#676978]' : 'bg-transparent'}`}></div>
				{/* Two Small Dots */}
				<div className="absolute -right-1 top-[30px] sm:top-[45px] rounded-full w-[7px] sm:w-[10px] h-[7px] sm:h-[10px] bg-[#1e1f29]"></div>
				<div className="absolute -left-1 top-[30px] sm:top-[45px] rounded-full w-[7px] sm:w-[10px] h-[7px] sm:h-[10px] bg-[#1e1f29]" ></div>
			</div>
			<p className="mt-3 font-semibold text-white text-xs sm:text-base">
				{unit}
			</p>
		</div>
	)
}