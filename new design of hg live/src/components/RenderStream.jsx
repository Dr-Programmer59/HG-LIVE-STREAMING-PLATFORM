import React, { useEffect, useRef } from 'react'
import { useFileSystemPublicRoutes } from '../../next.config';



const position = {
    0: [0, 0],
    1: [420, 0],
    2: [420, 165],
    3: [0, 330],
    4: [210, 330],
    4: [420, 330],
}

const RenderStream = ({ otherStream, handleMainBox, className1, className2, play, volume,streamDetails, imageClass }) => {
    const streamVideoElementRef = useRef([]);

    useEffect(() => {
        if(otherStream.length > 1 && streamVideoElementRef.current[0].main == true ){
            streamVideoElementRef.current.splice(0,1);
        }
        otherStream.forEach((stream,i) => streamVideoElementRef.current[i].srcObject = stream);
    },[otherStream,streamVideoElementRef]);

    // console.log('other',otherStream)


    // const parentCanvasRef = useRef(null);
    // const timeoutRef = useRef([]);
    // const videoRef = useRef([]);



    // useEffect(() => {
    //     const parentCanvas = parentCanvasRef.current;
    //     const parentCtx = parentCanvas.getContext('2d');
    //     parentCtx.clearRect(0, 0, parentCanvas.width, parentCanvas.height);

    //     timeoutRef.current.forEach((ref) => {
    //         clearInterval(ref);
    //     })
    //     timeoutRef.current = [];
    //     videoRef.current = [];

        

    //     if (otherStream.length == 1) {
    //         const childCanvas = document.createElement('canvas');
    //         childCanvas.className = 'video-canvas';
            
    //         childCanvas.width = parentCanvas.width;
    //         childCanvas.height = parentCanvas.height;
    //         const childCtx = childCanvas.getContext('2d');
    //         childCtx.fillStyle = 'red'
    //         drawVideo(parentCtx, childCanvas, childCanvas.width, childCanvas.height, false, 0);

    //         const video = document.createElement('video');
    //         video.srcObject = otherStream[0];
    //         video.autoplay = true;
    //         video.loop = true;

    //         videoRef.current.push(video);

    //         video.addEventListener('play', function () {
    //             drawVideo(childCtx, video, childCanvas.width, childCanvas.height, true);
    //         });
    //     } else {
    //         otherStream.forEach((stream, index) => {
    //             const childCanvas = document.createElement('canvas');
    //             childCanvas.className = 'video-canvas';
    //             if (index == 0) {
    //                 childCanvas.width = 420;
    //                 childCanvas.height = 330;
    //             } else {
    //                 childCanvas.width = 210;
    //                 childCanvas.height = 165;
    //             }
    //             const childCtx = childCanvas.getContext('2d');
    //             childCtx.fillStyle = 'red'
    //             drawVideo(parentCtx, childCanvas, childCanvas.width, childCanvas.height, false, index);

    //             const video = document.createElement('video');
    //             video.srcObject = stream;
    //             video.autoplay = true;
    //             video.loop = true;
    //             videoRef.current.push(video);

    //             video.addEventListener('play', function () {
    //                 drawVideo(childCtx, video, childCanvas.width, childCanvas.height, true);
    //             });
    //         });
    //     }

    //     var img = new Image();

    //     // Set the image source
    //     img.src = `${process.env.NEXT_PUBLIC_BACKEND_URL}${streamDetails?.banner}`;
    //     img.style.objectFit = 'contain';
    //     console.info(streamDetails,'streamDetails')
    //     console.info('img',img)
    //     img.onload = function() {
    //         drawBanner(parentCtx,img,parentCanvas.width,60,0,parentCanvas.height-60);
    //     };

        

    //     return () => { };
    // }, [otherStream,streamDetails]);

    // function drawVideo(context, video, width, height, isVideotrue, index = 0) {
    //     const ref = setInterval(() => {
    //         if (isVideotrue) {
    //             context.drawImage(video, 0, 0, width, height);
    //         } else {
    //             let [x, y] = position[index];
    //             context.drawImage(video, x, y, width, height);
    //         }
    //     }, 1000 / 30); // Adjust the frame rate as needed
    //     timeoutRef.current.push(ref);
    // }

    // function drawBanner(context, video, width, height,x,y) {
    //     const ref = setInterval(() => {
    //         context.drawImage(video, x, y, width, height);
    //     }, 1); // Adjust the frame rate as needed
    //     timeoutRef.current.push(ref);
    // }

    useEffect(() => {
        if(play == true){
            streamVideoElementRef.current.forEach((ref) => ref?.play());
        }else if(play == false){
            streamVideoElementRef.current.forEach((ref) => ref?.pause());
        }
    },[play]);

    useEffect(() => {
        if(volume != undefined){
            // console.log(volume,videoRef.current[0]?.volume)
            console.log(volume)
            streamVideoElementRef.current.forEach((ref) => ref.volume = volume);
       }
    },[volume])
    console.log(imageClass)
    return (
        <>
            {
                otherStream.length == 1 ? (
                    <div className={className2+" "+ "relative"}>
                        <video className='absolute top-0 bottom-0 w-[100%] h-[100%] object-cover' controls autoPlay ref={(ref) => {if(ref) ref.main = true; streamVideoElementRef.current[0] = ref}}>
                                </video>
                        <div className='absolute bottom-0 left-0 right-0 h-[8rem] bg-red-500'>
                            <div className='relative w-full h-[100%]'>
                                <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${streamDetails?.banner}`} className={"w-full h-[100%]" + " " + imageClass}/>
                            </div>
                        </div>
                    </div>
                )
                :(
                    <div className={className1}>
                        {

                            otherStream.map((stream, i) => (
                            <div className={`relative video-box cursor-pointer video-box-${i} ${i === 0 ? 'main' : ''}`} onClick={(e) => handleMainBox(`.video-box-${i}`)}>
                                <video className='absolute top-0 bottom-0 w-[100%] h-[100%] object-cover' controls autoPlay ref={(ref) => streamVideoElementRef.current[i] = ref}>
                                </video>
                            </div>
                            ))
                        }
                        <div className='absolute bottom-0 left-0 right-0 h-[8rem] bg-red-500'>
                            <div className='relative w-full h-[100%]'>
                                <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${streamDetails?.banner}`} className={"w-full h-[100%]" + " " + imageClass}/>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
        // <>
        //     <>
        //         <canvas ref={parentCanvasRef} width={640} height={480} className={className1}></canvas>
        //     </>
        // </>
    )
}

export default RenderStream