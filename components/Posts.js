import { db } from '@/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Post from './Post'

const DUMMY_DATA = [
    {
        id: '1232',
        username: 'havvs',
        userImg: 'https://links.papareact.com/3ke',
        img: 'https://links.papareact.com/3ke',
        caption: 'Hello world!'
    },
    {
        id: '1231',
        username: 'havvs',
        userImg: 'https://links.papareact.com/3ke',
        img: 'https://links.papareact.com/3ke',
        caption: 'Hello world!'
    },
    {
        id: '123',
        username: 'havvs',
        userImg: 'https://links.papareact.com/3ke',
        img: 'https://links.papareact.com/3ke',
        caption: 'Hello world!'
    },
    {
        id: '1234',
        username: 'havvs',
        userImg: 'https://links.papareact.com/3ke',
        img: 'https://links.papareact.com/3ke',
        caption: 'Hello world!'
    },
]

const Posts = () => {
    const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
    //         setPosts(snapshot.docs);
    //     });

    //     return unsubscribe;

    // }, [db])

    useEffect(() => 
         onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
            setPosts(snapshot.docs);
        })
    , [db])

  return (
    <div>
        {posts.map(post => (
            <Post key={post.id} id={post.id} username={post.data().username} userImg={post.data().profileImg} img={post.data().image} caption={post.data().caption} />
        ))}
    </div>
  )
}

export default Posts