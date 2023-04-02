const LoadingScreen = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="flex flex-col items-center justify-center">
                <div className="w-60 h-full">
                    <img src="/images/animatedlogo.gif" />
                </div>
                <div className="uppercase text-xl font-bold text-transparent tracking-widest bg-clip-text bg-gradient-to-r from-[#e7656c] via-[#b50912] to-[#e7656c]">
                    preparing for battle
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen;