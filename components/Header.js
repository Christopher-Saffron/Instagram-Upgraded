import Image from 'next/image'
import React from 'react'
import {SearchIcon, UserGroupIcon, MenuIcon, PaperAirplaneIcon, HeartIcon, PlusCircleIcon} from '@heroicons/react/outline'
import {HomeIcon} from '@heroicons/react/solid'
const Header = () => {
  return (
    <div>
        <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>
            {/* LEFT */}
            <div className='relative hidden lg:inline-grid w-24 '>
                <Image
                src='https://links.papareact.com/ocw'
                fill
                alt=''
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
                <HomeIcon className='buttonNav' />
                <MenuIcon className='h-6 md:hidden cursor-pointer' />
                <PaperAirplaneIcon className='buttonNav' />
                <PlusCircleIcon className='buttonNav' />
                <UserGroupIcon className='buttonNav' />
                <HeartIcon className='buttonNav' />

                


            </div>

        </div>
    </div>
  )
}

export default Header