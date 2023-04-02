import React from 'react'

interface msgProps {
  message: string,
};

export const Header = ({ message }: msgProps) => {
  return (
    <header className="mx-auto mt-3">
      <div className="uppercase text-2xl md:text-4xl text-center font-black text-transparent tracking-widest bg-clip-text bg-gradient-to-r from-[#ff757c] via-[#b50912] to-[#ff757c] mx-auto">
        {message ? message : "NEXT ROUND"}
      </div>
    </header>
  )
}