'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react'

import { FaCamera, FaRegEye, FaMicrophone, FaLaptop, FaUsers, FaThumbsUp, FaShare, FaThumbsDown } from 'react-icons/fa'
import Messages from '@/components/Messages';


import { IoMdSend } from "react-icons/io";
import ScrollToBottom from 'react-scroll-to-bottom';
import { BsMagic } from "react-icons/bs";
import SuperChat from '@/components/SuperChat';
import { useSocket } from '@/Context/socketProvider';
import webrtcMediaSoup_client from '@/mediasoup/webrtc_mediasoup_host';
import RenderStream from '@/components/RenderStream';
import socket from '@/components/socket';
import axios from 'axios';
import { toast } from 'react-toastify';
const page = ({ params }) => {
    const webrtc_client = new webrtcMediaSoup_client(false, socket)
    const [videoStream, setVideoStream] = useState()
    const [isStreaming, setisStreaming] = useState(false)
    const [otherStream, setotherStream] = useState([])
    const oldTracks = useRef([])
    const [messages, setMessages] = useState([])
    const [SuperChatmessages, setSuperChatMessages] = useState([])
    const [filterOpen, setFilterOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [streamDetails, setStreamDetails] = useState({});
    const [likes, setlikes] = useState(0)
    const [dislikes, setdislikes] = useState(0)
    const [views, setViews] = useState(0)
    const [dlike,setDLike] = useState(false);
    const [like,setLike] = useState(false);
    const [permission,setPermission] = useState(true);



    const handleSendMessageEvent = (data) => {
        console.log(data)
        if (data.superchat) {
            setSuperChatMessages((prev) => [...prev, { coins: data.coins, message: data.message }])
        }
        else {
            console.log("got message ", data.message)
            setMessages((prev) => [...prev, data.message])
        }

    }

    const handleSendMessage = () => {
        console.log("sending message", message)
        socket.emit("send-message", ({ roomName: params.room, message: message }))
        setMessages((prev) => [...prev, message])
    }


    const handleConnection = () => {
        console.log("run")
        webrtc_client.roomName = params.room;
        webrtc_client.getLocalStream()

        setTimeout(() => {
            console.log("checking after some time", webrtc_client.mystream)

            setotherStream((prev) => [...prev, webrtc_client.mystream]);
            setisStreaming(true);
        }, 2000); // 5000 milliseconds (5 seconds) - Adjust the time interval as needed

        // Optionally, you can clear the interval after a certain duration


    }
    const addNewHosts = () => {
        let alltracks = webrtc_client.mainTracks
        console.log("this is all tracks that is consumed ", alltracks)
        console.log("this is old tracks that is consumed ", oldTracks)

        for (var i = 0; i < alltracks.length; i = i + 2) {

            var combinedStream = new MediaStream();

            // Add audio track to the combined stream
            alltracks[i].getAudioTracks().forEach(track => {
                combinedStream.addTrack(track);
            });

            // Add video track to the combined stream
            alltracks[i + 1].getVideoTracks().forEach(track => {
                combinedStream.addTrack(track);
            });
            if (!(oldTracks.current.includes(alltracks[i])) && !(oldTracks.current.includes(alltracks[i + 1]))) {
                setotherStream((prev) => [...prev, combinedStream])
                oldTracks.current.push(alltracks[i])
                oldTracks.current.push(alltracks[i + 1])
                console.log("this is stream check", oldTracks)
            }

        }

    }
    const handleUpComingHost = (hostData) => {
        console.log("this is host data" , hostData)
        Object.keys(hostData).forEach(key => {
            hostData[key].forEach(host=>{
                setTimeout(() => {
                    console.log("tihs is the host i am setngin",host)
                webrtc_client.signalNewConsumerTransportHost(host,key)
                 }, 500); 
                
            })
           

        })

    setTimeout(() => {
        Object.keys(hostData).forEach(key => {
            var combinedStream = new MediaStream();
            webrtc_client.mainTracks[key].forEach(host=>{
                if(host['producerKind']=="video"){
                    host['media'].getVideoTracks().forEach(track => {
                        combinedStream.addTrack(track);
                    });
                }
                else if (host['producerKind']=="audio"){
                    host['media'].getAudioTracks().forEach(track => {
                        combinedStream.addTrack(track);
                    });
                }
            })
            setotherStream((prev) => [...prev, combinedStream])
            
        })
     
      
    }, 2000); //
    }
    const handlelikeEvent = ({ like, dislike }) => {
        console.log(dislike)
        setlikes(like)
        setdislikes(dislike)
      }
      const handleViewsEvent = ({ views }) => {
        console.log("these are views ", views)
        setViews(views)
    
      }
    useEffect(() => {

        socket.on('connection-success', handleConnection)
        socket.on("hosts:PresentHost", handleUpComingHost)
        socket.on("hosts:AceptedHost", handleUpComingHost)
        socket.on("recive-message", handleSendMessageEvent)
        
        socket.on("stream:likeDetails", handlelikeEvent)
        socket.on("stream:views", handleViewsEvent)
        return () => {
            socket.off('connection-success', handleConnection)
            socket.off("hosts:PresentHost", handleUpComingHost)
            socket.off("hosts:AceptedHost", handleUpComingHost)
            socket.off("recive-message", handleSendMessageEvent)
            
        socket.off("stream:likeDetails", handlelikeEvent)
        socket.off("stream:views", handleViewsEvent)
        }
    }, [socket]);

    const handleStreamingStart = () => {
        if(permission==true){
        if (!isStreaming) {
            socket.emit("start-streaming", ({ connected: true }))
        }
    }

    }

    // get strea details 
    useEffect(() => {
        (async function () {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/streams/${params.room}`, {
                    withCredentials: true
                });
                setStreamDetails(data.stream);
                console.log(data.stream)
            } catch (error) {
                console.log(error.message);
            }
        })();
    
        (async function () {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setPermission(true);
            } catch (err) {
                toast.warning("Please Allow Camera/Mic");
                setPermission(false);
            }
        })();
    }, []);
    

    const handleMainBox = (targetClass) => {
        const videoBoxs = document.querySelectorAll('.video-box');
        videoBoxs.forEach(ele => {
            ele.classList.remove('main');
        })
        console.log(targetClass)
        document.querySelector(targetClass).classList.add('main');

    }
    return (
        <section className='section-live flex relative'>
            <div className='w-[70%] bg-gray-800 relative flex'>
                <div className='options h-full w-24 bg-gray-950 flex flex-col items-center justify-start relative'>
                    <button className='bg-none outline-none border-none py-3 my-2 '><FaRegEye size={30} className='text-white transition-all hover:text-green-500' /></button>
                    <button className='bg-none outline-none border-none py-3 my-2 '><FaCamera size={30} className='text-white transition-all hover:text-green-500' /></button>
                    <button className='bg-none outline-none border-none py-3 my-2 '><FaMicrophone size={30} className='text-white transition-all hover:text-green-500' /></button>
                    <button className='bg-none outline-none border-none py-3 my-2 '><FaLaptop size={30} className='text-white transition-all hover:text-green-500' /></button>
                    <button className='bg-none outline-none border-none py-3 my-2 ' onClick={() => setFilterOpen(!filterOpen)}><BsMagic size={30} className={` transition-all hover:text-green-500 ${filterOpen ? 'text-green-500' : 'text-white'}`} /></button>


                    {
                        filterOpen && <div className='filters w-full flex flex-col h-[28rem] overflow-auto px-2 py-1 gap-2'>
                            <div className='filer w-full cursor-pointer'>
                                <img src='/images/image-1.jpg' className='h-16 w-full rounded-md' />
                            </div>
                            <div className='filer w-full cursor-pointer'>
                                <img src='/images/image-1.jpg' className='h-16 w-full rounded-md' />
                            </div>
                            <div className='filer w-full cursor-pointer'>
                                <img src='/images/image-1.jpg' className='h-16 w-full rounded-md' />
                            </div>
                            <div className='filer w-full cursor-pointer'>
                                <img src='/images/image-1.jpg' className='h-16 w-full rounded-md' />
                            </div>
                            <div className='filer w-full cursor-pointer'>
                                <img src='/images/image-1.jpg' className='h-16 w-full rounded-md' />
                            </div>
                            <div className='filer w-full cursor-pointer'>
                                <img src='/images/image-1.jpg' className='h-16 w-full rounded-md' />
                            </div>
                            <div className='filer w-full cursor-pointer'>
                                <img src='/images/image-1.jpg' className='h-16 w-full rounded-md' />
                            </div>
                            <div className='filer w-full cursor-pointer'>
                                <img src='/images/image-1.jpg' className='h-16 w-full rounded-md' />
                            </div>
                        </div>
                    }
                </div>
                <div className='main flex-1 w-full relative flex flex-col'>
                    <div className='flex justify-start items-center p-3'>
                        <div className='live-time flex w-48 h-10 rounded-md bg-gray-950 text-white relative'>
                            <div className='w-[50%] bg-primary rounded-md text-white flex justify-center items-center'>
                                <h2 className='text-sm'>Live</h2>
                            </div>
                            <div className='w-[50%] flex justify-center items-center text-white'>
                                <h2 className='text-sm'>00:12</h2>
                            </div>
                        </div>

                        <div className='ml-5 flex justify-start items-center gap-5'>
                        <h2 className='text-sm text-white flex items-center gap-2'>
                                <span><FaUsers size={22} /></span>
                                <span>{views}</span>
                            </h2>
                            <h2 className='text-sm text-white flex items-center gap-2'>
                                <span className='mb-1'><FaThumbsUp size={20} /></span>
                                <span>{likes}</span>
                            </h2>
                            <h2 className='text-sm text-white flex items-center gap-2'>
                                <span className='mb-1'><FaThumbsDown size={20} /></span>
                                <span>{dislikes}</span>
                            </h2>
                        </div>
                    </div>

                    <div className='flex-1 relative'>
                        {/* <div className='w-full h-[calc(100vh-7.72rem)] overflow-auto gap-4 stream-container'>
                            {
                                otherStream.map((stream, i) => (
                                    <div className={`relative video-box cursor-pointer video-box-${i} ${i === 0 ? 'main' : ''}`} onClick={(e) => handleMainBox(`.video-box-${i}`)}>
                                        <video className='absolute top-0 bottom-0 w-[100%] h-[100%] object-cover' ref={(videoRef) => {
                                            if (videoRef) {
                                                videoRef.srcObject = stream;
                                            }
                                        }} controls autoPlay>
                                        </video>
                                    </div>
                                ))
                            }
                        </div> */}
                        <RenderStream streamDetails={streamDetails} handleMainBox={handleMainBox} otherStream={otherStream} className1={'w-full h-[calc(100vh-7.72rem)] overflow-auto gap-4 stream-container'} className2={'w-full h-[calc(100vh-7.72rem)] relative'}/>
                    </div>

                    <div className='flex justify-center items-center p-3 bg-gray-900 gap-2'>
                        <div className='flex justify-center items-center gap-1'>
                            <span className='w-1 h-1 rounded-full bg-green-500'></span>
                            <span className='w-1 h-1 rounded-full bg-green-500'></span>
                            <span className='w-1 h-1 rounded-full bg-white'></span>
                            <span className='w-1 h-1 rounded-full bg-white'></span>
                            <span className='w-1 h-1 rounded-full bg-white'></span>
                        </div>
                        <button className='bg-none border-none outline-none p-2 tex'><FaMicrophone className='text-white transition-all hover:text-green-500' /></button>
                        <button className='bg-none border-none outline-none p-2 tex'><FaShare className='text-white transition-all hover:text-green-500' /></button>
                        <button className='py-2 px-4 rounded-md text-sm text-white bg-primary uppercase' onClick={handleStreamingStart}>Join Stream</button>
                    </div>

                </div>
            </div>
            <div className='w-[30%] bg-gray-950 relative'>
                <div className='py-[1.14rem] flex justify-center bg-gray-900'>
                    <h2 className='text-lg text-primary'>Live Chat</h2>
                </div>
                <div className='h-[4rem] absolute top-14 left-0 right-0 p-1 overflow-x-auto flex items-center super-chat-box pt-3'>
                    <SuperChat avatar={'/images/image-1.jpg'} amount={1000.00} />


                </div>
                <ScrollToBottom className='h-[calc(100vh-7.72rem)]  overflow-y-auto p-3 pr-7 pt-[4.2rem]'>
                    {
                        messages.map((msg, i) => (
                            <Messages name={'someone'} message={msg} admin={false} />

                        )

                        )
                    }

                </ScrollToBottom>
                <div className='h-[3rem]'>
                    <div className='w-full h-full flex justify-between items-center pl-2 pr-7 py-1 gap-2'>
                        <input type='text' placeholder='messages...' className='w-[89%] py-2 px-3 outline-none rounded-3xl bg-gray-800 text-white' value={message} onChange={(e) => setMessage(e.target.value)} />
                        <button className='text-white p-2 rounded-full bg-gray-800 hover:text-primary transition-all
                        ' onClick={handleSendMessage}><IoMdSend size={23} /></button>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default page