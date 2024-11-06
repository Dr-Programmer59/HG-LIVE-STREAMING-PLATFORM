'use client'
import ConfirmBox from '@/components/ConfirmBox';
import Messages from '@/components/Messages';
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { FaCamera, FaRegEye, FaMicrophone, FaLaptop, FaUsers, FaThumbsUp, FaShare, FaThumbsDown } from 'react-icons/fa'
import { IoMdClose, IoMdSend } from "react-icons/io";
import ScrollToBottom from 'react-scroll-to-bottom';
import { BsMagic ,BsFillMicMuteFill, BsMicMuteFill } from "react-icons/bs";
import SuperChat from '@/components/SuperChat';
import { RiCameraOffFill } from "react-icons/ri";

import webrtcMediaSoup_client from '@/mediasoup/webrtc_mediasoup_host';
import { IoIosCall } from "react-icons/io";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import RenderStream from '@/components/RenderStream';
// import { css } from 'emotion';
import "./style.css"
import { Camera } from "@mediapipe/camera_utils/camera_utils.js";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import socket from '@/components/socket';
import { useRouter } from 'next/navigation';
import { io } from "socket.io-client";

const page = ({ searchParams }) => {



    const [webrtc_client, setwebrtc_client] = useState(new webrtcMediaSoup_client(true, socket,false));
    const [screenSharingsocket, setscreenSharingsocket] = useState(new io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/mediasoup`))
    const [screenSharingWebrtcClient, setscreenSharingWebrtcClient] = useState(new webrtcMediaSoup_client(true, screenSharingsocket,true))

    const [videoStream, setVideoStream] = useState()
    const [filterOpen, setFilterOpen] = useState(false);
    const [isStreaming, setisStreaming] = useState(false)
    const alltracks = useRef([])
    const oldTracks = useRef([])
    const [streamDetails, setStreamDetails] = useState({});
    
    const [otherStream, setotherStream] = useState([])
    const [, forceUpdate] = useState();
    const [value, setValue] = useState(null)
    const [open, setOpen] = useState(false)
    const [message_confirm, setMessage_confirm] = useState('Someone wanted to be host')
    const [messages, setMessages] = useState([])
    const [SuperChatmessages, setSuperChatMessages] = useState([])
    const [message, setMessage] = useState('');
    const [callers, setCallers] = useState([]);
    const [callers_audio,setcallers_audio] = useState([]);

    const callersproducerID = useRef([])
    const roomname = searchParams.rooms;
    const [callOpen, setCallOpen] = useState(false);
    const [startStream, setStartStream] = useState(false);
    const { ads } = useSelector(store => store.userReducer);
    const [cameraMute, setCameraMute] = useState(false)
    const [micMute, setmicMute] = useState(false);
    const [likes, setlikes] = useState(0)
    const [dislikes, setdislikes] = useState(0)
    const [views, setViews] = useState(0)
    const [dlike,setDLike] = useState(false);
    const [like,setLike] = useState(false);
    const [isfilterOn, setisfilterOn] = useState(false)
    const router = useRouter();
    const [unfilteredVideoStream, setunfilteredVideoStream] = useState(null)
    

    //new host data
    const waitingHosts = useRef({})

    console.log('ads', ads);

    const inputVideoRef = useRef();
    const inputVideoRef2 = useRef();
    const canvasRef = useRef();
     const [change, setChange] = useState(false)
    let ctx = null;
   
  
  
    const init = () => {
      const selfieSegmentation = new SelfieSegmentation({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
      });
  
      ctx = canvasRef.current.getContext("2d");
  
      const constraints = {
        video: { width: { min: 1280 }, height: { min: 720 } },
      };
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        inputVideoRef.current.srcObject = stream;
        // sendToMediaPipe();
      });
  
      selfieSegmentation.setOptions({
        modelSelection: 1,
        selfieMode: true,
      });
  
      selfieSegmentation.onResults(onResults);
  
      const camera = new Camera(inputVideoRef.current, {
        onFrame: async () => {
          await selfieSegmentation.send({ image: inputVideoRef.current });
        },
        width: 1280,
        height: 720,
      });
      camera.start();
    };



  const onResults = (results) => {
    const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Load the image when the component mounts
        const backgroundImage = new Image();
        backgroundImage.src = '/images/background.jpg'; // Place your image in the public folder or use a proper path

        backgroundImage.onload = () => {
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw segmentation mask
            ctx.drawImage(
                results.segmentationMask,
                0,
                0,
                canvas.width,
                canvas.height
            );

            // Set composite operation to draw the image as background
            ctx.globalCompositeOperation = "source-out";

            // Draw the background image instead of filling with green
            ctx.drawImage(
                backgroundImage,
                0,
                0,
                canvas.width,
                canvas.height
            );

            // Only overwrite missing pixels
            ctx.globalCompositeOperation = "destination-atop";
            ctx.drawImage(
                results.image,
                0,
                0,
                canvas.width,
                canvas.height
            );

            ctx.restore();
};}




const handlerFilterOpen=()=>{
    if(!isfilterOn){
    init()
    var videoStream = canvasRef.current.captureStream();
  
    inputVideoRef2.current.srcObject = videoStream;
    console.log("this is videostream ",inputVideoRef2.current)
    webrtc_client.videoProducer.replaceTrack({ track: inputVideoRef2.current.srcObject.getTracks()[0] });
    const videoTracks =  webrtc_client.mystream.getVideoTracks();
    setunfilteredVideoStream(videoTracks)
    videoTracks.forEach(track => {
        webrtc_client.mystream.removeTrack(track);
      track.stop(); // Stop the removed track to release resources
    });
    webrtc_client.mystream.addTrack(inputVideoRef2.current.srcObject.getTracks()[0])  
    setisfilterOn(true)
}
else{
  
    
    
      webrtc_client.videoProducer.replaceTrack({ track: inputVideoRef.current.srcObject.getTracks()[0] });
      const videoTracks =  webrtc_client.mystream.getVideoTracks();
      setunfilteredVideoStream(videoTracks)
      videoTracks.forEach(track => {
          webrtc_client.mystream.removeTrack(track);
        track.stop(); // Stop the removed track to release resources
      });
      webrtc_client.mystream.addTrack(inputVideoRef.current.srcObject.getTracks()[0])  
      setisfilterOn(true)
  }

}
    


    const handleSendMessageEvent = (data) => {
        if (data.superchat) {
            console.log("go new message",data)

            setSuperChatMessages((prev) => [...prev, { coins: data.coins, message: data.message }])
        }
        else {
            console.log("got message ", data.message)
            setMessages((prev) => [...prev, data.message])
        }
    }

    const handleSendMessage = () => {
        console.log("this is streams ",otherStream)
        console.log("sending message", message)
        socket.emit("send-message", ({ roomName: searchParams.rooms, message: message }))
        setMessages((prev) => [...prev, message])
    }


    const handleConnection = () => {
        webrtc_client.roomName = searchParams.rooms;
        webrtc_client.getLocalStream()
        setTimeout(() => {
            setotherStream((prev) => [...prev, webrtc_client.mystream]);
            setisStreaming(true);
        }, 2000);
    }
    const handleScreenSharingconnection=()=>{
        screenSharingWebrtcClient.roomName = searchParams.rooms;
        screenSharingWebrtcClient.getLocalStream()
     
    }





    const handleNewProducer = useCallback(({ hostData, socketId, viewer }) => {
        if (viewer) {
            console.log("new caller", hostData[0]['producerId'])
            
            if(!callersproducerID.current.includes(hostData[0]['producerId']))
            
            {
                setCallers((prev) => [...prev, { producerId: hostData[0]['producerId'], status: "pending" }])
                callersproducerID.current.push(hostData[0]['producerId'])
            }


        }

        else {
            console.log("new person")
            if (!waitingHosts.current[socketId])
            {
                waitingHosts.current[socketId] = hostData
            }

            if(screenSharingsocket.id==socketId){
                handleAccept()
            }
            else{
                setOpen(true)

            }
        }
    },[])


     // get strea details 
     useEffect(() => {
        (async function () {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/streams/${searchParams.rooms}`, {
                    withCredentials: true
                });
                setStreamDetails(data.stream);

            } catch (error) {
               console.log(error.message)
            }


        })()


    }, [])



    const handleHostDisconnected=({hostData})=>{
        if(hostData){
        delete webrtc_client.mainTracks[hostData.socketId]
        setTimeout(() => {
            setotherStream([webrtc_client.mystream]);
            console.log()
            Object.keys(webrtc_client.mainTracks).forEach(key => {
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
            
        }, 1500);
        console.log("this host is disconencted ",hostData)
    }
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
    //Use effect to handle the Connections,message,new producers.
    useEffect(() => {
        socket.on('connection-success', handleConnection)
        socket.on('new-producer', handleNewProducer)
        socket.on("recive-message", handleSendMessageEvent)
        socket.on("host:disconnected", handleHostDisconnected)
        screenSharingsocket.on('connection-success', handleScreenSharingconnection)
        socket.on("stream:likeDetails", handlelikeEvent)
        socket.on("stream:views", handleViewsEvent)
        return () => {
            socket.off('connection-success', handleConnection)
            socket.off('new-producer', handleNewProducer)
            socket.off('recive-message', handleSendMessageEvent)
            socket.off("host:disconnected", handleHostDisconnected)
            socket.off("stream:likeDetails", handlelikeEvent)
            socket.off("stream:views", handleViewsEvent)
            screenSharingsocket.off('connection-success', handleScreenSharingconnection)

            socket.on('close', () => {
                console.log('Client disconnected');
              });
        }
    }, [socket,handleConnection,handleNewProducer,handleSendMessageEvent,handleScreenSharingconnection]);



    const   handleAccept = () => {

       
            Object.keys(waitingHosts.current).forEach(key => {
                waitingHosts.current[key].forEach(host=>{
                    setTimeout(() => {
                        console.log("tihs is the host i am setngin",host)
                    webrtc_client.signalNewConsumerTransportHost(host,key)
                     }, 100); 
                    
                })
               
    
            })

        setTimeout(() => {
            Object.keys(waitingHosts.current).forEach(key => {
                var combinedStream = new MediaStream();
                console.log(webrtc_client.mainTracks,"this is tracks required","this is key ",key)
                console.log(webrtc_client.mainTracks[key],"this is main")
                let newhostMedia=webrtc_client.mainTracks
                console.log("this is new host media ",newhostMedia)
                newhostMedia[key].map(host=>{
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
                console.log("other stream is ",otherStream)
                setotherStream((prev) => [...prev, combinedStream])
                
                
                
            })
         
            socket.emit("hosts:Accept", { roomName: searchParams.rooms, waitingHosts: waitingHosts.current })
            socket.emit("hosts:shareNewHosts", { roomName: searchParams.rooms, waitingHosts: waitingHosts.current })
            waitingHosts.current = {}
        }, 2000); //
        
  
       
    }

    const handleStreamingStart = async () => {
        if (startStream) {
            try {
                //end stream and set stream status complete
                const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/stream-update/${searchParams.rooms}`, { status: 'complete' }, {
                    withCredentials: true
                });
            } catch (error) {
                console.log(error)
            }
            setStartStream(false);
            router.push('/dashboard');
        } else {
            try {
                //end stream and set stream status complete
                const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/stream-update/${searchParams.rooms}`, { status: 'processing' }, {
                    withCredentials: true
                });
            } catch (error) {
                console.log(error)
            }

            setStartStream(true);
            if (!isStreaming) {
                socket.emit("start-streaming", ({ connected: true }))
            }
        }



    }


    const handleClick = useCallback((e, value) => {
        e.preventDefault()
        if (value) {

            handleAccept()

        }
        setValue(value)
        setOpen(false)
    }, [])

    const handleAcceptCall = (index) => {
        console.log(callers)
        webrtc_client.signalNewConsumerTransport(callers[index]['producerId'], true)


        setTimeout(() => {
            setcallers_audio(webrtc_client.callers)
            let newCallers = callers;

            newCallers[index]['status'] = "accepted"
            setCallers(newCallers)

        }, 2000);
        // forceUpdate("check");
    }
    const handledeclineCall = (index) => {
        setCallers((prevCallers) => {
            let tempCaller = [...prevCallers];
            tempCaller.splice(index, 1);
            return tempCaller;
          });
        
          setcallers_audio((prevCallersAudio) => {
            let tempCallerAudio = [...prevCallersAudio];
            tempCallerAudio.splice(index, 1);
            return tempCallerAudio;
          });
        callersproducerID.current.splice(index,1)
        socket.emit("Call:DeclineCall", { producerId: callersproducerID.current[index], roomName: roomname })

    }

    const handleMainBox = (targetClass) => {
        const videoBoxs = document.querySelectorAll('.video-box');
        videoBoxs.forEach(ele => {
            ele.classList.remove('main');
        })
        console.log(targetClass)
        document.querySelector(targetClass).classList.add('main');

    }


    // useEffect(() => {
    //     return async () => {
    //        const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/stream-update/${searchParams.rooms}`, { status: 'complete' }, {
    //             withCredentials: true
    //         });
    //     } 
    // },[]);

    const handleCopy = () => {
        
        navigator.clipboard.writeText(`${window.location.origin}/host/${searchParams.rooms}`)
        toast.success("Host link Copied");
    }
    const handleCameraMute = () => {
        if(!cameraMute){
            webrtc_client.mystream?.getVideoTracks().forEach(track => track.enabled = false);
            setCameraMute(true);
        }else{
            webrtc_client.mystream?.getVideoTracks().forEach(track => track.enabled = true);
            setCameraMute(false);
        }
        
    }

    const handleMicMute = () => {
        if(!micMute){
            webrtc_client.mystream?.getAudioTracks().forEach(track => track.enabled = false);
            setmicMute(true);
        }else{
            webrtc_client.mystream?.getAudioTracks().forEach(track => track.enabled = true);
            setmicMute(false);
        }
}

const handleshareScreen=async ()=>{
    try {
      // Get user media with screen capture capability
 
     screenSharingsocket.emit("start-streaming", ({ connected: true }))
    } catch (error) {
      console.error('Error accessing screen sharing:', error);
    }
  };
    return (
        <section className='section-live flex relative'>
            <div className='w-[70%] bg-gray-800 relative flex'>
                <div className='options h-full w-24 bg-gray-950 flex flex-col items-center justify-start relative'>
                    <button className='bg-none outline-none border-none py-3 my-2 '><FaRegEye size={30} className='text-white transition-all hover:text-green-500' /></button>
                    <button className='bg-none outline-none border-none py-3 my-2 ' onClick={handleCameraMute}>{cameraMute?<RiCameraOffFill size={30} className='text-white transition-all hover:text-green-500' />:<FaCamera size={30} className='text-white transition-all hover:text-green-500' />}</button>
                    <button className='bg-none outline-none border-none py-3 my-2 ' onClick={handleMicMute}>{micMute?<BsFillMicMuteFill size={30} className='text-white transition-all hover:text-green-500'/>:<FaMicrophone size={30} className='text-white transition-all hover:text-green-500' />}</button>
                    <button className='bg-none outline-none border-none py-3 my-2 'onClick={handleshareScreen}><FaLaptop size={30} className='text-white transition-all hover:text-green-500' /></button>
                    <button className='bg-none outline-none border-none py-3 my-2 ' onClick={handlerFilterOpen}><BsMagic size={30} className={` transition-all hover:text-green-500 ${filterOpen ? 'text-green-500' : 'text-white'}`} /></button>


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


                    <div className='relative'>
                        {callers.length>0 && 
                        <span class="relative left-3 top-4 flex h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-700 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-green-700"></span>

                        </span>}
                        
                        <button className='bg-none outline-none border-none py-3 my-2  ' onClick={() => setCallOpen(!callOpen)}><IoIosCall size={30} className={` transition-all hover:text-green-500 ${filterOpen ? 'text-green-500' : 'text-white'}`} /></button>
                        
                        
                        {
                            callOpen && <div className='absolute  z-50 top-[0%] left-[4rem] w-[11rem] rounded-md bg-gray-900 right-0 flex flex-col items-center h-[30rem]  px-2 py-1 gap-2 overflow-y-auto'>
                                {
                                    callers && callers.map((caller, index) => (
                                        <div className='w-[10rem] flex flex-col justify-center items-center gap-3 bg-gray-800 rounded-md p-3  px-2 relative'>
                                            {
                                                caller['status'] == 'accepted' && callers_audio[index] ?

                                                    <audio ref={(videoRef) => {
                                                        if (videoRef) {
                                                            videoRef.srcObject = callers_audio[index]
                                                        }
                                                    }}  autoPlay></audio> : ""

                                            }
                                            
                                            <div className='flex gap-6 relative justify-between items-center'>
                                                <img src='/images/hero-bg.jpg' className='w-8 h-8  rounded-full inline-block' />
                                               
                                                <div className='flex flex-col items-center gap-2'>
                                                    <h2 className='text-white text-xs'>Ayan Khan</h2>
                                                    {caller['status'] == 'accepted' &&
                                                    <div className="loader">
                                                                             <span className="stroke"></span>
                                                                            <span className="stroke"></span>
                                                                            <span className="stroke"></span>
                                                                            <span className="stroke"></span>
                                                                            <span className="stroke"></span>
                                                    </div>
                                                    }
                                                    <div className='flex justify-center items-center w-full gap-4'>
                                                        {caller['status'] != 'accepted' && <button className='text-green-600 p-1 rounded-full bg-gray-600 transition-all' onClick={() => handleAcceptCall(index)}><IoIosCall size={18} /></button>}

                                                        <button className='text-red-600 p-1 rounded-full bg-gray-600 transition-all' onClick={() => handledeclineCall(index)}><IoIosCall size={18} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    ))
                                }


                            </div>
                        }
                    </div>



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
                    <canvas ref={canvasRef}  class="hidden"/>
                     <video autoPlay ref={inputVideoRef} width={500} height={320}  class="hidden"/>
                     <video autoPlay ref={inputVideoRef2} width={500} height={320}  class="hidden"/>
                        <RenderStream streamDetails={streamDetails} handleMainBox={handleMainBox} otherStream={otherStream} className1={'w-full h-[calc(100vh-7.72rem)] overflow-auto gap-4 stream-container'} className2={'w-full h-[calc(100vh-7.72rem)] relative'} />
                    </div>

                    <div className='flex justify-center items-center p-3 bg-gray-900 gap-2'>
                        <div className='flex justify-center items-center gap-1'>
                            <span className='w-1 h-1 rounded-full bg-green-500'></span>
                            <span className='w-1 h-1 rounded-full bg-green-500'></span>
                            <span className='w-1 h-1 rounded-full bg-white'></span>
                            <span className='w-1 h-1 rounded-full bg-white'></span>
                            <span className='w-1 h-1 rounded-full bg-white'></span>
                        </div>
                        <button className='bg-none border-none outline-none p-2 tex'>{micMute?<BsFillMicMuteFill className='text-white transition-all hover:text-green-500' />:<FaMicrophone className='text-white transition-all hover:text-green-500' />}</button>
                        <button className='bg-none border-none outline-none p-2 tex' onClick={handleCopy}><FaShare className='text-white transition-all hover:text-green-500' /></button>
                        <button className='py-2 px-4 rounded-md text-sm text-white bg-primary uppercase' onClick={handleStreamingStart}>{!startStream ? "Start Stream" : "End Stream"}</button>
                    </div>

                </div>
            </div>
            <div className='w-[30%] bg-gray-950 relative'>
                <div className='py-[1.14rem] flex justify-center bg-gray-900'>
                    <h2 className='text-lg text-primary'>Live Chat</h2>
                </div>
                <div className='h-[4rem] absolute top-14 left-0 right-0 p-1 overflow-x-auto flex items-center super-chat-box pt-3'>
                    {
                        SuperChatmessages.map(msg=>(
                            <SuperChat avatar={'/images/image-1.jpg'} amount={msg.coins} message={msg.message} />

                        ))
                    }


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

            <ConfirmBox handleClick={handleClick} message={message_confirm} open={open} />
        </section>
    )
}

export default page