import Image from 'next/image'
import React from 'react'
import {SearchIcon, UserGroupIcon, MenuIcon, PaperAirplaneIcon, HeartIcon, PlusCircleIcon} from '@heroicons/react/outline'
import {HomeIcon} from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { modalState } from '../atoms/modalAtom'
import { useRecoilState } from 'recoil'
const Header = () => {
    
    const [open, setOpen] = useRecoilState(modalState)
    const {data: session, status} = useSession();
    // const open = useRecoilValue(modalState);
    const router = useRouter();

  return (
    <div className='shadow-sm border-b bg-white sticky top-0 z-5'>
        <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>
            {/* LEFT */}
            <div onClick={() => {router.push('/')}} className='relative hidden lg:inline-grid w-24 '>
                <Image
                src='https://links.papareact.com/ocw'
                fill
                alt=''
                className='cursor-pointer'
                style={{objectFit: 'contain'}}
                />
            </div>

            <div className='relative  cursor-pointer lg:hidden w-10  flex-shrink-0'>
                <Image
                src='https://links.papareact.com/jjm'
                fill
                alt=''
                style={{objectFit: 'contain'}}
                />
            </div>

            {/* MIDDLE */}
            <div className='max-w-xs'>
                <div className='relative mt-1 p-3 rounded-md'>
                    <div className='flex items-center pointer-events-none absolute inset-y-0 pl-3 '>
                        <SearchIcon className='h-5 w-5 text-gray-500' />
                    </div>
                    <input className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md' type='text' placeholder='Search' />
                </div>
            </div>
            

            {/* RIGHT */}
            <div className='flex items-center justify-end space-x-4'>
                <HomeIcon onClick={() => {router.push('/')}} className='buttonNav' />
                <MenuIcon className='h-6 md:hidden cursor-pointer' />

                {session ? (
                    <>
                    <div className='relative navBtn'>
                        <PaperAirplaneIcon className='buttonNav rotate-45' />
                        <div className='text-xs text-white w-5 h-5 absolute -top-1 -right-2 bg-red-500 rounded-full flex items-center justify-center animate-pulse '>3</div>
                    </div>

                    <PlusCircleIcon onClick={() => {setOpen(true)}} className='buttonNav' />
                    <UserGroupIcon className='buttonNav' />
                    <HeartIcon className='buttonNav' />

                    <img onClick={signOut} src={session.user.image} alt='' className='cursor-pointer h-10 w-10 rounded-full' />
                    </>
                ): (
                    <button onClick={signIn}>Sign in</button>
                )}
                


            </div>

        </div>
    </div>
  )
}

export default Header


    
