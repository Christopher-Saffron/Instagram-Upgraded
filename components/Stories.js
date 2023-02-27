import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
import Story from './Story';
import { useSession } from 'next-auth/react';
const Stories = () => {
    const {data: session} = useSession();
    const [SUGGESTIONS, SETSUGGESTIONS] = useState([])
    useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => ({
            userId: faker.datatype.uuid(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            password: faker.internet.password(),
            birthdate: faker.date.birthdate(),
            registeredAt: faker.date.past(),
          }));
          SETSUGGESTIONS(suggestions);
    }, [])

  return (
    <div className='flex space-x-2 bg-white mt-8 border-gray-200 border rounded-sm p-6 overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>

      {session && (
        <Story img={session.user.image}  username={session.user.username}   />
      )}
        {SUGGESTIONS.map(profile => (
            <Story img={profile.avatar} username={profile.username} key={profile.userId} />
        ))}
    </div>

  )
}

export default Stories