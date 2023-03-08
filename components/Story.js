import React from 'react'

const Story = ({img, username}) => {
  return (
    <div className='z-0'>
        <img className='object-contain cursor-pointer border-red-500 border-2 h-14 w-14 rounded-full p-[1.5px] hover:scale-110 transition transform duration-150' src={img} alt='' />
        <p className='text-xs w-14 truncate text-center'>{username}</p>
    </div>
  )
}

export default Story