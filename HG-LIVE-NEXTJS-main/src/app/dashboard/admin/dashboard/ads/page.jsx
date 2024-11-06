"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import { MdAlternateEmail, MdAudiotrack, MdKey } from 'react-icons/md'
import Link from 'next/link'
import { MdOutlineSubtitles, MdDescription, MdPhoto } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BsCalendarDate, BsClock, BsMailbox } from 'react-icons/bs';
import { FaAccessibleIcon, FaLock } from 'react-icons/fa6';
import { createAds } from '@/lib/actions/user';

const page = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState({});
    const [filePrev, setFilePrev] = useState('');
    const [loading, setLoading] = useState(false);


    const dispatch = useDispatch();


    const handleFileChange = (e) => {
        const [file] = e.target.files;
        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState == 2){
                setFilePrev(reader.result);
                setFile(file);
            }
        }

        reader.readAsDataURL(file);
    }




    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title',title);
            formData.append('description',description);
            formData.append('file',file);
            await dispatch(createAds(formData));
            setTitle('');
            setDescription('');
            e.target.reset();
            setFilePrev('');
            setFile({});

        } catch (error) {
            console.log(error.message);
        }
        setLoading(false);

    }

    return (
        <section className='w-full py-5 px-4'>
            <div className='flex justify-start items-center h-full flex-col'>
                <h1 className='main-heading mb-10'>Create Team</h1>
                <div className='min-w-[40rem] border-[.2rem] border-primary rounded-[2.8rem] px-8 p-6'>
                    <form className='p-1' onSubmit={submitHandler}>
                        <div className='input-group flex flex-col m-3 mb-6'>
                            <label htmlFor="subject" className='text-lg mb-1 text-gray-700'>Title</label>
                            <input type='text' name='subject' id='subject' placeholder='Enter Your Title' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className='input-group flex flex-col m-3 mb-6'>
                            <label htmlFor="subject" className='text-lg mb-1 text-gray-700'>Description (optional)</label>
                            <input type='text' name='subject' id='subject' placeholder='Enter Your Description' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className='input-group flex flex-col m-3 mb-6'>
                            <label htmlFor="subject" className='text-lg mb-1 text-gray-700'>Ads Image</label>
                            <input type='file' name='subject' id='subject' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' required onChange={handleFileChange}/>
                        </div>

                        {
                            filePrev && 
                            <div className='flex justify-center items-center mb-6'>
                                <img src={filePrev} className='w-[20%]'/>
                            </div>
                        }

                        <div className='flex justify-center items-center  m-3 mt-8'>
                            <button type='submit' className='bg-primary text-white text-lg py-2 px-6 rounded'>{loading ? 'Loadind' : 'Add Now'}</button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    )
}

export default page