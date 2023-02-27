import { modalState } from '@/atoms/modalAtom'
import React from 'react'
import { useRecoilState } from 'recoil'
import {Dialog, Transition} from '@headlessui/react' 
import { Fragment, useRef, useState } from 'react'
import {CameraIcon} from '@heroicons/react/outline'
import { db, storage } from '../firebase'
import { addDoc, updateDoc, doc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'

const Modal = () => {
    const {data: session} = useSession();
    const [open, setOpen] = useRecoilState(modalState)
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const filePickerRef = useRef(null);
    const captionRef = useRef(null);

    const addImage = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        }
    }

    const uploadPost = async () => {
        if (loading) return;

        setLoading(true);

        //post creation and upload

        const docRef = await addDoc(collection(db, 'posts'), {
            username: session.user.username,
            caption: captionRef.current.value,
            profileImg: session.user.image,
            timestamp: serverTimestamp()
        })

        console.log('new doc added with id', docRef.id)

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        await uploadString(imageRef, selectedFile, 'data_url').then(async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, 'posts', docRef.id), {
                image: downloadURL
            })
        })

        setOpen(false);
        setLoading(false);
        setSelectedFile(null);
    }

  return (
    <Transition.Root show={open} as={Fragment} onClose={setOpen}>
        <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='min-h-[800px] sm:min-h-screen flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'  />
                </Transition.Child>

                <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
                    &#8203;
                </span>

                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    enterTo='opacity-100 translate-y-0 sm:scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                    leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                >
                    <div className='inline-block bg-white rounded-lg px-4 pt-5 pb-4 text-left align-bottom overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-ful sm:p-6'>
                        <div>

                            {selectedFile ? (
                                <img className='w-full object-contain cursor-pointer' src={selectedFile} onClick={() => {setSelectedFile(null)}} alt='' />
                            ): (
                                <div 
                                    className='flex items-center justify-center mx-auto h-12 w-12 rounded-full bg-red-100 cursor-pointer'
                                    onClick={() => filePickerRef.current.click()}
                                >
                                    <CameraIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                                </div>
                            )}
                            
                            <div>
                                <div className='mt-3 text-center sm:mt-5'>
                                    <Dialog.Title as='h3' className='text-lg leading-6 text-gray-900 font-medium'>
                                        Upload photo
                                    </Dialog.Title>
                                </div>
                                <div>
                                    <input 
                                        type='file'
                                        ref={filePickerRef}
                                        hidden
                                        onChange={addImage}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <input
                                        className='border-none focus:ring-0 w-full text-center'
                                        type='text'
                                        ref={captionRef}
                                        placeholder='Please enter a caption...'
                                    />
                                </div>
                            </div>
                            
                        </div>

                        <div className='mt-5 sm:mt-6'>
                            <button type='button' 
                                disabled={!selectedFile}
                                className='inline-flex justify-center rounded-md w-full border border-transparent px-4 py-2 shadow-sm bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-red-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-gray-700 hover:disabled:bg-gray-300'
                                onClick={uploadPost}
                            >
                                {loading ? 'Uploading...' : 'Upload Post'}
                                Upload Post
                            </button>
                        </div>
                    </div>

                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>
  )
}

export default Modal