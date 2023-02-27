import React from 'react'
import { signOut, useSession, getSession } from 'next-auth/react'
const MiniProfile = () => {
  const {data: session, status} = useSession();

  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
        <img className='w-16 h-16 rounded-full border p-[2px]' src={session?.user?.image} alt='' />

        <div className='flex-1 mx-4'>
            <h2 className='font-bold'>{session?.user?.username}</h2>
            <h3 className='text-gray-400 text-sm'>Welcome to instagram</h3>
        </div>

        <button onClick={signOut} className='text-blue-400 font-semibold text-sm'>
            Sign Out
        </button>
    </div>
  )
}

export default MiniProfile