/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface Props {
    open: any;
    setOpen: (flag: boolean) => void;
}

export default function Modal({ open = false, setOpen }: Props) {
    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto tracking-widest">
                    <div className="max-x-auto flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg md:max-w-3xl">
                                <div className="bg-black px-4 pt-5 pb-10 sm:p-6 sm:pb-10">
                                    <div className="flex items-center justify-around">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg font-medium text-center leading-6 py-5">
                                                <div className="uppercase text-xl font-bold text-transparent tracking-widest bg-clip-text bg-gradient-to-r from-[#e7656c] via-[#b50912] to-[#e7656c]">
                                                    Mint Failed
                                                </div>
                                            </Dialog.Title>
                                            <div className='text-white text-center '>
                                                It looks like your wallet is not currently registered for minting, please head to Discord and get yourself on the list
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-8 sm:flex sm:flex-row-reverse justify-center sm:px-6">
                                    <a className='uppercase text-xl font-medium text-center text-transparent tracking-widest bg-clip-text bg-gradient-to-r from-[#ff757c] via-[#b50912] to-[#ff757c] mx-10' href='https://discord.gg/5YxGwcuA' target='_blank'>
                                        Add address to WhiteList on discord
                                    </a>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
