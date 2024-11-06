"use client"
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { login, register } from '@/lib/actions/user'
import { useDispatch } from 'react-redux'
import { redirect } from 'next/navigation'
import { MdModeEditOutline } from "react-icons/md";
import { toast } from 'react-toastify';

const page = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [streamer, setStreamer] = useState(false);
    const [channelName, setChannelName] = useState('');
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState('');
    const [denomination, setDenomination] = useState('');
    const [worshipStyle, setWorshipStyle] = useState('');
    const [language, setLanguage] = useState('');
    const [size, setSize] = useState('');
    const [geographicLocation, setGeographicLocation] = useState('');
    const [specialEvent, setSpecialEvent] = useState('');
    const [ministryFocus, setMinistryFocus] = useState('');
    const [sermonSeries, setSermonSeries] = useState('');

    const fileRef = useRef();

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();

        if (confirmPassword !== password) {
            toast.error('Cofirm password does not match')
            return
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('denomination', denomination);
        formData.append('worshipStyle', worshipStyle);
        formData.append('language', language);
        formData.append('size', size);
        formData.append('geographicLocation', geographicLocation);
        formData.append('specialEvent', specialEvent);
        formData.append('ministryFocus', ministryFocus);
        formData.append('sermonSeries', sermonSeries);

        if (channelName) formData.append('channelName', channelName);
        if (file) formData.append('file', file);
        if (streamer)
            formData.append('role', 'streamer')
        else
            formData.append('role', 'viewer')

        dispatch(register(formData));
        redirect('/')
    }


    const fileChangeHandler = (e) => {
        e.preventDefault();
        const [file] = e.target.files;
        const reader = new FileReader();

        reader.onload = (e) => {
            if (reader.readyState === 2) {
                setFile(file);
                setFilePreview(reader.result);
            }
        }

        reader.readAsDataURL(file);
    }
    return (
        <section className='min-h-[100vh] flex items-center p-5'>
            <div className='container m-auto flex justify-center items-center'>
                <div className='w-[50rem] max-w-[50rem] border-[.2rem] border-primary rounded-[2.8rem] px-8 py-3'>
                    <h2 className='text-center text-4xl text-black font-[600]'>Register</h2>
                    <form className='p-1' onSubmit={submitHandler}>
                        <div className='flex justify-center items-center'>
                            <div className='relative mt-4'>
                                <img src={filePreview || `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/images/default.jpg`} className='rounded-full w-28 h-28' />
                                <button type='button' className='absolute bottom-2 rotate-20 right-2 text-green-500 p-1 rounded-full hover:text-white hover:bg-green-500 transition-all' onClick={() => fileRef.current.click()}>
                                    <MdModeEditOutline size={20} />
                                </button>
                            </div>
                        </div>
                        <input type='file' id='file' ref={fileRef} className='hidden' onChange={fileChangeHandler} />
                        <div className='input-group flex flex-col m-3 mb-6'>
                            <label htmlFor="name" className='text-lg mb-1'>Name</label>
                            <input type='text' name='name' id='name' placeholder='Enter Your name' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className='input-group flex flex-col m-3 mb-6'>
                            <label htmlFor="email" className='text-lg mb-1'>Email</label>
                            <input type='email' name='email' id='email' placeholder='Enter Your Email' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className='input-group flex flex-col m-3'>
                            <label htmlFor="password" className='text-lg mb-1'>Password</label>
                            <input type='password' id='password' name='password' placeholder='Enter Your Password' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className='input-group flex flex-col m-3'>
                            <label htmlFor="confirm password" className='text-lg mb-1'>Confirm Password</label>
                            <input type='password' id='confirm password' name='confirm password' placeholder='Enter Your Confirm Password' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>

                        <div className='input-group flex flex-row gap-2 my-3 mx-4'>
                            <input type='checkbox' checked={streamer} onChange={() => setStreamer(prev => !prev)} />
                            <p className='text-black/90'>I am streamer</p>
                        </div>

                        {
                            streamer &&
                            <>
                                <div className='input-group flex flex-col m-3'>
                                    <label htmlFor="channel-name" className='text-lg mb-1'>Channel Name</label>
                                    <input type='text' id='channel-name' name='channel-name' placeholder='Enter Your Channel Name' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={channelName} onChange={(e) => setChannelName(e.target.value)} />
                                </div>
                                <div className='input-group flex flex-col m-3'>
                                    <label htmlFor="channel-name" className='text-lg mb-1'>Denomination</label>
                                    <select type='text' id='channel-name' name='channel-name' placeholder='Enter Your Channel Name' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={denomination} onChange={(e) => setDenomination(e.target.value)}>
                                        <option value={'baptist'}>Batist</option>
                                        <option value={'catholic'}>Catholic</option>
                                        <option value={'methodist'}>Methodist</option>
                                        <option value={'lutheran'}>Lutheran</option>
                                        <option value={'presbyterian'}>Presbyterian</option>
                                        <option value={'non-denomonational'}>Non-denomonational</option>
                                    </select>
                                </div>

                                <div className='input-group flex flex-col m-3'>
                                    <label htmlFor="channel-name" className='text-lg mb-1'>Worship Style</label>
                                    <select type='text' id='channel-name' name='channel-name' placeholder='Enter Your Channel Name' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={worshipStyle} onChange={(e) => setWorshipStyle(e.target.value)}>
                                        <option value={'traditional'}>Traditional</option>
                                        <option value={'contemporay'}>Contemporay</option>
                                        <option value={'charismatic'}>Charismatic</option>
                                        <option value={'liturgical'}>Liturgical</option>
                                    </select>
                                </div>

                                <div className='input-group flex flex-col m-3'>
                                    <label htmlFor="channel-name" className='text-lg mb-1'>Language</label>
                                    <select type='text' id='channel-name' name='channel-name' placeholder='Enter Your Channel Name' className='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={language} onChange={(e) => setLanguage(e.target.value)}>
                                        <option value="czech">Czech</option>
                                        <option value="javanese">Javanese</option>
                                        <option value="serbo-croatian">Serbo-Croatian</option>
                                        <option value="hmong">Hmong</option>
                                        <option value="zulu">Zulu</option>
                                        <option value="kinyarwanda">Kinyarwanda</option>
                                        <option value="quechua">Quechua</option>
                                        <option value="xhosa">Xhosa</option>
                                        <option value="uighur">Uighur</option>
                                        <option value="balochi">Balochi</option>
                                        <option value="somali">Somali</option>
                                        <option value="chichewa">Chichewa (Nyanja)</option>
                                        <option value="malagasy">Malagasy</option>
                                        <option value="nepali">Nepali</option>
                                        <option value="shona">Shona</option>
                                        <option value="uyghur">Uyghur</option>
                                        <option value="belarusian">Belarusian</option>
                                        <option value="kazakh">Kazakh</option>
                                        <option value="tigrinya">Tigrinya</option>
                                        <option value="dari">Dari</option>
                                        <option value="finnish">Finnish</option>
                                        <option value="uzbek">Uzbek</option>
                                        <option value="haitian-creole">Haitian Creole</option>
                                        <option value="greek">Greek</option>
                                        <option value="swedish">Swedish</option>
                                        <option value="catalan">Catalan</option>
                                        <option value="taishanese">Taishanese</option>
                                        <option value="mongolian">Mongolian</option>
                                        <option value="zhuang">Zhuang</option>
                                        <option value="armenian">Armenian</option>
                                        <option value="hmong-2">Hmong</option>
                                        <option value="zulu-2">Zulu</option>
                                        <option value="greek-2">Greek</option>
                                        <option value="swedish-2">Swedish</option>
                                        <option value="javanese-2">Javanese</option>
                                        <option value="kurdish">Kurdish</option>
                                        <option value="somali-2">Somali</option>
                                        <option value="javanese-3">Javanese</option>
                                        <option value="pashto">Pashto</option>
                                        <option value="fijian">Fijian (iTaukei)</option>
                                        <option value="samoan">Samoan</option>
                                        <option value="maori">Maori</option>
                                        <option value="tongan">Tongan</option>
                                        <option value="tahitian">Tahitian</option>
                                        <option value="hawaiian">Hawaiian</option>
                                        <option value="marshallese">Marshallese</option>
                                        <option value="tok-pisin">Tok Pisin</option>
                                    </select>
                                </div>

                                {/* <!-- Size --> */}
                                <div class='input-group flex flex-col m-3'>
                                    <label for="congregation-size" class='text-lg mb-1'>Size</label>
                                    <select id='congregation-size' name='congregation-size' class='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={size} onChange={(e) => setSize(e.target.value)}>
                                        <option value='small'>Small congregation</option>
                                        <option value='medium'>Medium congregation</option>
                                        <option value='large'>Large congregation</option>
                                    </select>
                                </div>

                                {/* <!-- Geographic Location --> */}
                                <div class='input-group flex flex-col m-3'>
                                    <label for="geographic-location" class='text-lg mb-1'>Geographic Location</label>
                                    <select id='geographic-location' name='geographic-location' class='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={geographicLocation} onChange={(e) => setGeographicLocation(e.target.value)}>
                                        <option value='country'>Country</option>
                                        <option value='region'>Region</option>
                                        <option value='city'>City</option>
                                    </select>
                                </div>

                                {/* <!-- Special Events --> */}
                                <div class='input-group flex flex-col m-3'>
                                    <label for="special-events" class='text-lg mb-1'>Special Events</label>
                                    <select id='special-events' name='special-events' class='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={specialEvent} onChange={(e) => setSpecialEvent(e.target.value)}>
                                        <option value='bible-studies'>Bible Studies</option>
                                        <option value='youth-services'>Youth Services</option>
                                        <option value='special-sermons'>Special Sermons</option>
                                    </select>
                                </div>

                                {/* <!-- Ministry Focus --> */}
                                <div class='input-group flex flex-col m-3'>
                                    <label for="ministry-focus" class='text-lg mb-1'>Ministry Focus</label>
                                    <select id='ministry-focus' name='ministry-focus' class='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={ministryFocus} onChange={(e) => setMinistryFocus(e.target.value)}>
                                        <option value='childrens-ministry'>Children's Ministry</option>
                                        <option value='youth-ministry'>Youth Ministry</option>
                                        <option value='outreach-programs'>Outreach Programs</option>
                                    </select>
                                </div>

                                <div class='input-group flex flex-col m-3'>
                                    <label for="sermon-series" class='text-lg mb-1'>Sermon Series</label>
                                    <select id='sermon-series' name='sermon-series' class='outline-none border-2 border-primary rounded-lg bg-transparent py-3 px-2' value={sermonSeries} onChange={(e) => setSermonSeries(e.target.value)}>
                                        <option value='topic-based'>Topic-based series</option>
                                        <option value='book-of-the-bible'>Book of the Bible series</option>
                                    </select>
                                </div>

                            </>
                        }

                        <div className='flex justify-end items-center  m-3'>
                            <Link href={'/login'} className='text-primary text-sm'>Login In</Link>
                        </div>
                        <div className='flex justify-center items-center  m-3'>
                            <button type='submit' className='bg-primary text-white text-lg py-2 px-6 rounded'> Register </button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    )
}

export default page