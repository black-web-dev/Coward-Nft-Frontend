/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image';
import clsx from 'clsx';

interface Props {
  open: any;
  setOpen: (flag: boolean) => void;
  openType: string
  selectedId: number
  onConfirm: () => void
}

export default function Modal({ open = false, setOpen, openType, selectedId, onConfirm }: Props) {
  const cancelButtonRef = useRef(null)
  const [showContent, setShowContent] = useState<boolean>(false);

  const handleOk = () => {
    onConfirm();
  }

  const handleCancel = () => {
    setOpen(false);
  }
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
                      <Dialog.Title as="h3" className="text-lg font-medium text-center leading-6 text-gray-900">
                        <Image src={`/images/coward/${openType === 'Coward' ? `coward` : `mars`}.png`} width={150} height={150} />
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-2xl text-white font-bold text-center">
                          {`Are you sure you want to take the ${openType === 'Coward' ? `Coward's` : `Mars'`} Gambit?`}
                        </p>
                      </div>
                      <div className='w-full cursor-pointer flex flex-col text-md text-white my-4' onClick={() => setShowContent(!showContent)}>
                        <div className='flex items-center justify-center'>
                          <div className='mr-4'>READ ABOUT THE RISKS</div>
                          <div className='text-2xl'>+</div>
                        </div>
                        <div className={clsx('max-w-[500px] mx-auto text-white/80 text-center text-sm overflow-hidden transition-all durantion-1000', showContent ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0')}>
                          {
                            openType === 'Coward' ? <>
                              <p className='py-2'>
                                If you select this option you will not die in the game,
                                however you will be branded “a coward”.
                              </p>
                              <p className='py-2'>
                                A random coward will be selected and effectively steal 2 ETH from
                                the main game and be offered it instead.  If there are ever 200
                                or more cowards they will not steal anything
                                and be.... just cowards.
                              </p>

                              <p className='py-2'>
                                The overall coward tally is only updated at the conclusion
                                of every round.  So there could already be 200 cowards.
                              </p>
                            </> : <>
                              <p className='py-2'>
                                Every dead warrior/statue that has died between round 1-5 is eligible
                                for this option, but it comes at a very high risk.

                              </p>
                              <p className='py-2'>
                                10% of those who choose this option will successfully
                                re-enter the game in a new form.

                              </p>
                              <p className='py-2'>
                                However 90% will have their souls and memories burnt out of existence.
                                The holders NFT will be burnt and all holders privileges revoked.

                              </p>
                              <p className='py-2'>
                                This option is not for the faint of heart (maybe sweep the floor instead?).
                              </p>
                            </>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-8 sm:flex sm:flex-row-reverse justify-center sm:px-6">
                  <button className="uppercase text-xl font-medium text-center text-transparent tracking-widest bg-clip-text bg-gradient-to-r from-[#ff757c] via-[#b50912] to-[#ff757c] mx-10"
                    onClick={handleCancel}>
                    NO
                  </button>
                  <button className="uppercase text-xl font-medium text-center text-transparent tracking-widest bg-clip-text bg-gradient-to-r from-[#ff757c] via-[#b50912] to-[#ff757c] mx-10"
                    onClick={handleOk}>
                    YES
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
