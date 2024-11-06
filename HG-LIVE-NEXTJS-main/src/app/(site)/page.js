"use client"
import LiveStreams from "@/components/LiveStreams"
import Swipper from "@/components/Swipper";
import Link from "next/link";
import { motion } from 'framer-motion';
import PlanCard from "@/components/PlanCard";
import { plansData } from "@/constants";
import { useState } from "react";
import { whyUsData } from "@/constants";
import WhyusCard from "@/components/WhyusCard";
import { SiMaxplanckgesellschaft } from "react-icons/si";

export default function Home() {
  const [viewMore, setViewMore] = useState(false);
  return (
    <>
<div className='logo z-20 fixed bottom-10 right-10'>
  <Link href={'/'}>
    <img src='/images/live-chat.png' className='w-20 h-20' alt="Live Chat"/>
  </Link>
</div>

      <main className="h-[calc(100vh-4rem)] w-100 relative z-10">
    
      <video autoPlay loop muted playsInline src="/videos/video1.mp4" className="absolute -z-1 w-full h-full object-cover"/>
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="absolute bg-gradient-to-b from-black/0 to-black/90 left-0 right-0 bottom-0 h-52 z-10"></div>
        <div className='h-full absolute left-10'>
   

          <div className='container mx-auto flex items-center justify-center gap-5 h-[calc(100vh-6.50rem)] flex-col'>
                        <h1 className=' !text-white !text-7xl  font-bold  '>The Best  Live streaming platform for Churches + Businesses etc</h1>
                        <h3 className='w-[100%] text-2xl text-white mr-15 mt-10 '>Simplify your website and live streaming with one flexible ministry platform. Get a free demo to learn how.</h3>
                        <Link href={'/streams'} className='bg-secondary text-white text-lg py-3 px-4 rounded self-start mt-4 '>Join Today</Link>
                    </div> 
       
        </div>
      </main>

      <section className="bg-primary body-font pt-10">
            <h2 className="main-heading !text-white">
                Why HG Vibe Live ?
            </h2>
            <div className="max-w-[70rem] pt-10 mt-10 text-lg  mx-auto">
                <div className="flex flex-wrap -m-20">

                  
                {
                    !viewMore ? whyUsData.slice(0,3).map((data,i) => (
                              <WhyusCard {...data} index={i}/>
                          ))
                      
                    :
                    whyUsData.map((data,i) => (
                      <WhyusCard {...data} index={i}/>
                  ))
                  }
                </div>
                <div className="flex justify-center items-center  pb-10 mt-1">
                <button href="/why-us" className="bg-secondary text-white text-lg py-2 px-6 rounded mt-2" onClick={() => setViewMore(prev => !prev)}>{viewMore ? "View Less" : "View More"}</button>
              </div>
            </div>
        </section>

        <section className="bg-[url('/images/bg.jpeg')] bg-position-center bg-no-repeat body-font p-10 " style={{backgroundPosition: 'center',backgroundSize: 'cover'}}>
           <div className="max-w-[70rem] mx-auto grid" style={{gridTemplateColumns: '3fr 3fr'}}>
                  <div>
                    
                  </div>
                  <div>
                    <h3 className='w-[100%] text-3xl text-white mr-15 mt-10 '>Add your personalize Banner <br/> For Streams, <span className="text-[#FFEF00]">Unlock Now.</span> <br/> Get 40% Off</h3>
                    <div className="pt-10">
                    <Link href={'/streams'} className='bg-secondary text-white text-lg py-3 px-4 rounded'>Get Your Deal</Link>
                    </div>
                  </div>
           </div>
        </section>

        <section className='section section-plans bg-gray-100'>
          <div className='max-w-[70rem] px-5 py-28 pb-16 pt-10 mx-auto'>
              <div className='flex justify-center items-center mb-8'>
                  <h1 className='main-heading'>Select Plans</h1>
              </div>

              <div className='flex price-section -m-4'>
              {
                  plansData.map((data) => <PlanCard {...data}/>)
              }
              </div>
          </div>
        </section>

      <section className="px-5 py-10 ">
            <div className="container mx-auto">
                <h2 className="main-heading mb-5" initial={{y: '-100%', opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{delay: .2}}>
                  Reliable live streaming
                </h2>
           
              <div className="">
                      <p className="para max-w-[60rem] mx-auto" initial={{ opacity: 0}} whileInView={{ opacity: 1}} transition={{delay: .2}}>
                      Extend your reach by live-streaming your talks, conferences, seminars, worship services, concerts, stage shows, and much more to those who can’t attend in person. Broadcast live videos from your iOS device or web browser using our platform, Spark, or Pro hardware encoder, or via Web Real-Time Communication (SFU) from the hardware or software encoder of your choice. We’ve got you covered — however you want to stream.

                      </p>
              </div>
              <div className="mt-5">
                <h2 className="sub-heading mb-5 !text-center !font-semibold">
                    Live streaming software
                </h2>

                <div  className="flex flex-col md:flex-row relative mt-5 gap-10 md:gap-0">
                    <div className="w-full md:w-[50%] flex items-center justify-center" initial={{y: '-100%', opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{delay: .2}}>
                      <div className="flex flex-col gap-3 justify-center items-center">
                        <img className="w-[12rem] h-[12rem]" src="https://www.boxcast.com/hs-fs/hubfs/2022%20Website/Home/Home_Software-Broadcaster-1.jpg?width=200&height=200&name=Home_Software-Broadcaster-1.jpg"/>

                        <h2 className="flex items-center text-xl to-black/90">
                          <strong className="text-primary mr-2">Broadcaster:</strong>
                          <span>Our live streaming app</span>
                        </h2>
                      </div>
                    </div>
                    


                    <div className="w-full md:w-[50%] flex items-center justify-center" initial={{y: '100%', opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{delay: .2}}>
                      <div className="flex flex-col gap-3 justify-center items-center">
                        <img className="w-[12rem] h-[12rem] rounded-sm" src="/images/producer.png"/>

                        <h2 className="flex items-center text-xl to-black/90">
                          <strong className="text-primary mr-2">Producer:</strong>
                          <span>Our live streaming app</span>
                        </h2>
                      </div>
                    </div>
                </div>
              </div>
            </div>
      </section>
     


      <section className="px-5 py-20 ">
        <div className="container  mx-auto flex flex-col md:flex-row gap-5">
          <img initial={{x: '-100%', opacity: 0}} whileInView={{x: 0, opacity: 1}} transition={{delay: .2}} src="https://www.boxcast.com/hs-fs/hubfs/Support-Module-Home2.png?width=1024&height=600&name=Support-Module-Home2.png" className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5"/>
          <div className="md:w-3/5 md:pl-6" initial={{x: '100%', opacity: 0}} whileInView={{x: 0, opacity: 1}}>
            <h2 className="sub-heading">Unmatched live support</h2>
            <p className="leading-relaxed text-base para">Experience unparalleled assistance with our live support team. Our dedicated experts are available
              around the clock to promptly address any inquiries, technical issues, or troubleshooting needs,
              ensuring smooth and uninterrupted live-streaming experiences for you and your audience.</p>
            <div className="flex md:mt-4 mt-6">
              <button className="inline-flex text-white bg-primary border-0 py-1 px-4 focus:outline-none hover:bg-primary rounded">Chat with us!</button>
              
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 bg-gray-100">
        <div className="container  mx-auto flex flex-col md:flex-row gap-5">
          
          <div className="md:w-3/5 md:pl-6" initial={{x: '-100%', opacity: 0}} whileInView={{x: 0, opacity: 1}} transition={{delay: .2}}>
            <h2 className="sub-heading">Education + resources</h2>
            <p className="leading-relaxed text-base para">Taxidermy bushwick celiac master cleanse microdosing seitan. Fashion axe four dollar toast truffaut, direct trade kombucha brunch williamsburg keffiyeh gastropub tousled squid meh taiyaki drinking vinegar tacos.</p>
            <div className="flex md:mt-4 mt-6">
              <button className="inline-flex text-white bg-primary border-0 py-1 px-4 focus:outline-none hover:bg-primary rounded">Learn More</button>
            </div>
          </div>

          <img initial={{x: '100%', opacity: 0}} whileInView={{x: 0, opacity: 1}} src="https://www.boxcast.com/hs-fs/hubfs/2022%20Website/Learn/Learn-Overview_Blog.jpg?width=1024&height=580&name=Learn-Overview_Blog.jpg" className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5"/>
        </div>
      </section>
      
      <section className="px-5 py-20">
                <div className="max-w-[80rem]  mx-auto flex flex-col md:flex-row gap-5 relative justify-center items-center">
                    <div className='w-[50%]'>
                        <h2 className="main-heading !text-left">
                            Who is HG Vibe Live for?
                        </h2>
                        <p className='para'>
                            At HG Vibe Live, we believe everyone has a message worth sharing. We are your trusted microphone, your stable podium, your elevated stage - built to provide you with the easiest way to reach your audience.
                        </p>
                        <button type='submit' className='bg-secondary text-white text-lg py-2 px-6 rounded'>Try For Free</button>
                    </div>
                    <div className="w-[50%] relative" initial={{ x: '100%', opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}>
                        <div className='w-full'>
                            <div className='flex flex-wrap'>

                                <div className='flex flex-col w-[15rem] mx-9 my-5'>
                                    <h2 className='flex items-center font-bold text-xl'>
                                        <span className='-ml-7'>
                                            <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g clip-path="url(#clip0)"><g clip-path="url(#clip1)"><path d="M11.8333 14.6667C15.055 14.6667 17.6667 12.055 17.6667 8.83333C17.6667 5.61167 15.055 3 11.8333 3C8.61167 3 6 5.61167 6 8.83333C6 12.055 8.61167 14.6667 11.8333 14.6667Z" fill="#FBAF00" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.00833 14.675L6 22.2667L10.1667 19.7667L14.3333 22.2667L13.325 14.6667" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></g><defs><clipPath id="clip0"><rect width="24" height="41" fill="white" transform="translate(0 -18)"></rect></clipPath><clipPath id="clip1"><rect width="19.6667" height="21.2667" fill="white" transform="translate(2 2)"></rect></clipPath></defs></svg>
                                        </span>
                                        <span className='ml-1'>
                                            Brands
                                        </span>
                                    </h2>
                                    <p className='para !my-1'>
                                        Connect with your global community.
                                    </p>
                                </div>
                                <div className='flex flex-col w-[15rem] mx-9 my-5'>
                                    <h2 className='flex items-center font-bold text-xl'>
                                        <span className='-ml-7'>
                                            <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g clip-path="url(#clip0)"><path d="M19.612 6.41452C19.1722 5.96607 18.65 5.61034 18.0752 5.36763C17.5005 5.12492 16.8844 5 16.2623 5C15.6401 5 15.0241 5.12492 14.4493 5.36763C13.8746 5.61034 13.3524 5.96607 12.9126 6.41452L11.9998 7.34476L11.087 6.41452C10.1986 5.50912 8.99364 5.00047 7.73725 5.00047C6.48085 5.00047 5.27591 5.50912 4.38751 6.41452C3.4991 7.31992 3 8.5479 3 9.82833C3 11.1088 3.4991 12.3367 4.38751 13.2421L5.30029 14.1724L11.9998 21L18.6992 14.1724L19.612 13.2421C20.0521 12.7939 20.4011 12.2617 20.6393 11.676C20.8774 11.0902 21 10.4624 21 9.82833C21 9.19428 20.8774 8.56645 20.6393 7.9807C20.4011 7.39494 20.0521 6.86275 19.612 6.41452Z" fill="#FE5E41" stroke="#151516" stroke-width="2" stroke-linecap="round"></path></g><defs><clipPath id="clip0"><rect width="24" height="41" fill="white" transform="translate(0 -18)"></rect></clipPath></defs></svg>
                                        </span>
                                        <span className='ml-1'>
                                            Influencers
                                        </span>
                                    </h2>
                                    <p className='para !my-1'>
                                        Inspire your followers..
                                    </p>
                                </div>

                                <div className='flex flex-col w-[15rem] mx-9 my-5'>
                                    <h2 className='flex items-center font-bold text-xl'>
                                        <span className='-ml-7'>
                                            <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none"><path d="M29.0013 30.3729L34.6953 9.12252C35.1241 7.52212 36.7691 6.57238 38.3695 7.0012L40.3014 7.51884C41.9018 7.94767 42.8515 9.59268 42.4227 11.1931L36.7287 32.4434C36.2999 34.0438 34.6548 34.9936 33.0545 34.5648L31.1226 34.0471C29.5222 33.6183 28.5725 31.9733 29.0013 30.3729Z" stroke="#151516" stroke-width="2"></path><path d="M32.976 15.539L34.6953 9.12252C35.1241 7.52212 36.7691 6.57238 38.3695 7.0012L40.3014 7.51884C41.9018 7.94767 42.8515 9.59268 42.4227 11.1931L40.7034 17.6095C40.2746 19.2099 38.6296 20.1597 37.0292 19.7309L35.0973 19.2132C33.4969 18.7844 32.5472 17.1394 32.976 15.539Z" fill="#8AABFF" stroke="#151516" stroke-width="2"></path><path d="M42.1321 27L45.0685 15.8859C45.3456 14.8368 44.7357 13.758 43.6939 13.4547L42.1317 12.9999" stroke="#151516" stroke-width="2" stroke-linecap="round"></path><path d="M32 35L30.811 38.8192" stroke="#151516" stroke-width="2" stroke-linecap="round"></path><path d="M3 43.2366C6.54542 40.6514 10.7944 37.7756 15.3804 38.0139C17.0297 38.0995 17.9074 39.0733 18.6367 40.4758C19.0843 41.3365 19.5692 43.0602 20.5008 43.5119C22.5641 44.5123 24.4799 42.1293 26.5494 42.4972C26.8822 42.5564 27.114 42.7752 27.4619 42.8433C28.0855 42.9653 28.7008 42.9534 29.3339 42.9534" stroke="#151516" stroke-width="2" stroke-linecap="round"></path></svg>
                                        </span>
                                        <span className='ml-1'>
                                            Creators
                                        </span>
                                    </h2>
                                    <p className='para !my-1'>
                                        Engage with your audience.
                                    </p>
                                </div>

                                <div className='flex flex-col w-[15rem] mx-9 my-5'>
                                    <h2 className='flex items-center font-bold text-xl'>
                                        <span className='-ml-7'>
                                            <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15.4766 11.993L16.243 12.6353L15.4766 11.993C15.1442 12.3896 14.9786 12.8995 15.0143 13.4157L15.3576 18.3742L10.748 16.5154L10.374 17.4428L10.748 16.5154C10.2681 16.3219 9.73191 16.3219 9.25204 16.5154L4.64236 18.3742L4.98571 13.4157C5.02145 12.8995 4.85576 12.3896 4.52345 11.993L1.33115 8.18332L6.15304 6.97761C6.655 6.8521 7.08878 6.53694 7.36326 6.09834L10 1.88503L12.6367 6.09834C12.9112 6.53694 13.345 6.8521 13.847 6.97761L18.6688 8.18332L15.4766 11.993Z" fill="#FFDA00" stroke="#151516" stroke-width="2"></path></svg>
                                        </span>
                                        <span className='ml-1'>
                                            Leaders
                                        </span>
                                    </h2>
                                    <p className='para !my-1'>
                                        Create a movement.
                                    </p>
                                </div>

                                <div className='flex flex-col w-[15rem] mx-9 my-5'>
                                    <h2 className='flex items-center font-bold text-xl'>
                                        <span className='-ml-7'>
                                            <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none"><title>Thumbs up</title><path d="M6 24C6 22.8954 6.89543 22 8 22H15V43H8C6.89543 43 6 42.1046 6 41V24Z" fill="#8AABFF"></path><path d="M14.6532 42.9998H8.86127C7.8372 42.9998 6.85507 42.5889 6.13094 41.8575C5.40681 41.1261 5 40.1341 5 39.0998V25.4499C5 24.4155 5.40681 23.4236 6.13094 22.6922C6.85507 21.9608 7.8372 21.5499 8.86127 21.5499H14.6532M28.1676 17.6499V9.84996C28.1676 8.29846 27.5574 6.8105 26.4712 5.71341C25.385 4.61633 23.9118 4 22.3757 4L14.6532 21.5499V42.9998H36.4307C37.3619 43.0104 38.2656 42.6807 38.9751 42.0716C39.6847 41.4624 40.1524 40.6147 40.292 39.6848L42.9563 22.1349C43.0403 21.5759 43.0029 21.0052 42.8469 20.4623C42.6908 19.9193 42.4198 19.4172 42.0525 18.9906C41.6852 18.5639 41.2304 18.2231 40.7198 17.9916C40.2091 17.7601 39.6547 17.6435 39.095 17.6499H28.1676Z" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                        </span>
                                        <span className='ml-1'>
                                            Media
                                        </span>
                                    </h2>
                                    <p className='para !my-1'>
                                        Host virtual events.
                                    </p>
                                </div>

                                <div className='flex flex-col w-[15rem] mx-9 my-5'>
                                    <h2 className='flex items-center font-bold text-xl'>
                                        <span className='-ml-7'>
                                            <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g clip-path="url(#clip0)"><path d="M11.4998 12.5H6.49976L8.49976 4L11.4998 12.5Z" fill="#63CC60"></path><path d="M21.7422 12H17.7422L14.7422 21L8.74219 3L5.74219 12H1.74219" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>
                                        </span>
                                        <span className='ml-1'>
                                            Marketers
                                        </span>
                                    </h2>
                                    <p className='para !my-1'>
                                        Reach more prospects.
                                    </p>
                                </div>
                                <div className='flex flex-col w-[15rem] mx-9 my-5'>
                                    <h2 className='flex items-center font-bold text-xl'>
                                        <span className='-ml-7'>
                                            <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9.49092 9.67499C9.9212 10.0995 10.2633 10.605 10.4974 11.1623C10.7315 11.7196 10.8531 12.3177 10.8551 12.9222C10.8571 13.5267 10.7396 14.1256 10.5092 14.6844C10.2788 15.2433 9.94014 15.751 9.51271 16.1784C9.08528 16.6059 8.57752 16.9445 8.01867 17.1749C7.45982 17.4053 6.86092 17.5229 6.25645 17.5208C5.65197 17.5188 5.05387 17.3972 4.49658 17.1631C3.93928 16.929 3.43381 16.5869 3.00925 16.1567C2.17436 15.2922 1.71239 14.1345 1.72283 12.9327C1.73327 11.731 2.2153 10.5814 3.06508 9.73165C3.91487 8.88187 5.06443 8.39984 6.26616 8.3894C7.4679 8.37896 8.62566 8.84093 9.49009 9.67582L9.49092 9.67499ZM12.9159 6.24999L15.4159 8.74999L18.3326 5.83332L15.8326 3.33332L12.9159 6.24999Z" fill="#FBAF00"></path><path d="M17.4993 1.66666L15.8326 3.33332M15.8326 3.33332L18.3326 5.83332L15.4159 8.74999L12.9159 6.24999M15.8326 3.33332L12.9159 6.24999M9.49092 9.67499C9.9212 10.0995 10.2633 10.605 10.4974 11.1623C10.7315 11.7196 10.8531 12.3177 10.8551 12.9222C10.8571 13.5267 10.7396 14.1256 10.5092 14.6844C10.2788 15.2433 9.94014 15.751 9.51271 16.1784C9.08528 16.6059 8.57752 16.9445 8.01867 17.1749C7.45982 17.4053 6.86092 17.5229 6.25645 17.5208C5.65197 17.5188 5.05387 17.3972 4.49658 17.1631C3.93928 16.929 3.43381 16.5869 3.00925 16.1567C2.17436 15.2922 1.71239 14.1345 1.72283 12.9327C1.73327 11.731 2.2153 10.5814 3.06508 9.73165C3.91487 8.88187 5.06443 8.39984 6.26616 8.3894C7.4679 8.37896 8.62566 8.84093 9.49009 9.67582L9.49092 9.67499ZM9.49092 9.67499L12.9159 6.24999" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                        </span>
                                        <span className='ml-1'>
                                            Entrepreneurs
                                        </span>
                                    </h2>
                                    <p className='para !my-1'>
                                        Grow your business.
                                    </p>
                                </div>

                                <div className='flex flex-col w-[15rem] mx-9 my-5'>
                                    <h2 className='flex items-center font-bold text-xl'>
                                        <span className='-ml-7'>
                                            <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M16.625 18.375L10.5 14L4.375 18.375V4.375C4.375 3.91087 4.55937 3.46575 4.88756 3.13756C5.21575 2.80937 5.66087 2.625 6.125 2.625H14.875C15.3391 2.625 15.7842 2.80937 16.1124 3.13756C16.4406 3.46575 16.625 3.91087 16.625 4.375V18.375Z" fill="#63CC60" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                        </span>
                                        <span className='ml-1'>
                                            Politicians
                                        </span>
                                    </h2>
                                    <p className='para !my-1'>
                                        Launch social media campaigns.
                                    </p>
                                </div>

                                <div className='flex flex-col w-[15rem] mx-9 my-5'>
                                    <h2 className='flex items-center font-bold text-xl'>
                                        <span className='-ml-7'>
                                            <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g clip-path="url(#clip0)"><path d="M10.5 14.875C12.9162 14.875 14.875 12.9162 14.875 10.5C14.875 8.08375 12.9162 6.125 10.5 6.125C8.08375 6.125 6.125 8.08375 6.125 10.5C6.125 12.9162 8.08375 14.875 10.5 14.875Z" fill="#FFCC34" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.5 0.875V2.625" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.5 18.375V20.125" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.69336 3.69254L4.93586 4.93504" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.0645 16.065L17.307 17.3075" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M0.875 10.5H2.625" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.375 10.5H20.125" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.69336 17.3075L4.93586 16.065" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.0645 4.93504L17.307 3.69254" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0"><rect width="21" height="21" fill="white"></rect></clipPath></defs></svg>
                                        </span>
                                        <span className='ml-1'>
                                            Religious services
                                        </span>
                                    </h2>
                                    <p className='para !my-1'>
                                        Reach people at home.
                                    </p>
                                </div>

                                <div className='flex flex-col w-[15rem] mx-9 my-5'>
                                    <h2 className='flex items-center font-bold text-xl'>
                                        <span className='-ml-7'>
                                            <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none"><path d="M22 35.5C22 29.1487 27.1487 24 33.5 24H34.5C40.8513 24 46 29.1487 46 35.5C46 35.7761 45.7761 36 45.5 36H22.5C22.2239 36 22 35.7761 22 35.5Z" fill="#F2A8CB" stroke="#131315" stroke-width="2"></path><circle cx="18" cy="19" r="7" stroke="#131315" stroke-width="2"></circle><circle cx="34" cy="15" r="6" stroke="#131315" stroke-width="2"></circle><path d="M3 42.2857C3 34.9482 8.94822 29 16.2857 29H18.7143C26.0518 29 32 34.9482 32 42.2857C32 42.6802 31.6802 43 31.2857 43H3.71429C3.3198 43 3 42.6802 3 42.2857Z" fill="white" stroke="#131315" stroke-width="2"></path><path d="M38 5.66667V3M41.1304 6.33333L43.2174 3.66667M43.2174 9H46" stroke="#131315" stroke-width="2" stroke-linecap="round"></path></svg>
                                        </span>
                                        <span className='ml-1'>
                                            People Teams
                                        </span>
                                    </h2>
                                    <p className='para !my-1'>
                                        Organize awesome all hands.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

     
            <section className="px-5 py-28 bg-gray-100 connect-section my-10">
                    <div className="container mx-auto">
                        <h2 className="main-heading mb-2" initial={{y: '-200%', opacity: 0}} whileInView={{y: 0, opacity: 1}}  transition={{delay: .4}}>
                          Connect your community with HG VIBE LIVE
                        </h2>
                  
                      <div className="mx-auto max-w-[60rem] flex justify-center flex-col items-center">
                        <p initial={{ opacity: 0}} whileInView={{opacity: 1}}  transition={{delay: .4}} className="para !text-center">
                          Get a free demo to learn how HG VIBE LIVE can help you streamline, engage, and grow your reach.
                        </p>
                        <div initial={{y: '200%', opacity: 0}} whileInView={{y: 0, opacity: 1}}  transition={{delay: .4}}>
                          <Link href="/register" className="bg-primary text-white text-lg py-2 px-6 rounded mt-2">Become a Streamer</Link>
                        </div>
                      </div>
                    </div>
              </section>
              <section className="px-5 py-20">
                <div className="max-w-[80rem]  mx-auto flex flex-col md:flex-row gap-5 relative">
                    <div className='w-[50%]'>
                        <h2 className="main-heading !text-left">
                            We've become known for certain features
                        </h2>
                        <p className='para'>
                            HG Vibe Live is the #1 rated live stream software on G2. Here's why:
                        </p>

                        <ul className='mt-5'>
                            <li className='flex items-center gap-3'>
                                <span>
                                    <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none"><path d="M2 13C2 10.2386 4.23858 8 7 8H33C35.7614 8 38 10.2386 38 13V33C38 35.7614 35.7614 38 33 38H7C4.23858 38 2 35.7614 2 33V13Z" stroke="#131315" stroke-width="2"></path><path d="M38 29.323V16.677L43.2572 14.5741C44.5709 14.0487 46 15.0162 46 16.4311V29.5689C46 30.9838 44.5709 31.9513 43.2572 31.4259L38 29.323Z" stroke="#131315" stroke-width="2"></path><path d="M16 18.6056C16 17.0082 17.7803 16.0554 19.1094 16.9414L25.7011 21.3359C26.8885 22.1275 26.8885 23.8725 25.7011 24.6641L19.1094 29.0585C17.7803 29.9446 16 28.9918 16 27.3944V18.6056Z" fill="#FFCC34" stroke="#131315" stroke-width="2"></path></svg>
                                </span>
                                <p className='para'>Easy live streaming and recording</p>
                            </li>
                            <li className='flex items-center gap-3'>
                                <span>
                                    <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none"><path d="M37 38L10 24L37 10" stroke="#151516" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="10" cy="24" r="8" fill="#FFCC34" stroke="#151516" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></circle><circle cx="37" cy="10" r="4" fill="white" stroke="#151516" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></circle><circle cx="37" cy="38" r="6" fill="white" stroke="#151516" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></circle></svg>
                                </span>
                                <p className='para'>Multistreaming to many platforms at once</p>
                            </li>
                            <li className='flex items-center gap-3'>
                                <span>
                                    <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 20V18.3333C17 17.4493 16.6313 16.6014 15.9749 15.9763C15.3185 15.3512 14.4283 15 13.5 15H6.5C5.57174 15 4.6815 15.3512 4.02513 15.9763C3.36875 16.6014 3 17.4493 3 18.3333V20" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 11C12.2091 11 14 9.20914 14 7C14 4.79086 12.2091 3 10 3C7.79086 3 6 4.79086 6 7C6 9.20914 7.79086 11 10 11Z" fill="#8ACB88" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 8V14M16 11H22" stroke="#151516" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                </span>
                                <p className='para'>Easily bring in guests</p>
                            </li>
                            
                            <li className='flex items-center gap-3'>
                                <span>
                                    <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 17.51 6.49 22 12 22C13.38 22 14.5 20.88 14.5 19.5C14.5 18.89 14.27 18.3 13.86 17.83C13.78 17.73 13.73 17.62 13.73 17.5C13.73 17.22 13.95 17 14.23 17H16C19.31 17 22 14.31 22 11C22 6.04 17.51 2 12 2C6.49 2 2 6.49 2 12ZM4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.14 20 11C20 13.21 18.21 15 16 15H14.23C12.85 15 11.73 16.12 11.73 17.5C11.73 18.1 11.95 18.69 12.36 19.15C12.42 19.22 12.5 19.34 12.5 19.5C12.5 19.78 12.28 20 12 20C7.59 20 4 16.41 4 12Z" fill="#151516"></path><path d="M6.5 10C5.67157 10 5 10.6716 5 11.5C5 12.3284 5.67157 13 6.5 13C7.32843 13 8 12.3284 8 11.5C8 10.6716 7.32843 10 6.5 10Z" fill="#5F4BB6"></path><path d="M9.5 6C8.67157 6 8 6.67157 8 7.5C8 8.32843 8.67157 9 9.5 9C10.3284 9 11 8.32843 11 7.5C11 6.67157 10.3284 6 9.5 6Z" fill="#5F4BB6"></path><path d="M14.5 6C13.6716 6 13 6.67157 13 7.5C13 8.32843 13.6716 9 14.5 9C15.3284 9 16 8.32843 16 7.5C16 6.67157 15.3284 6 14.5 6Z" fill="#5F4BB6"></path><path d="M17.5 10C16.6716 10 16 10.6716 16 11.5C16 12.3284 16.6716 13 17.5 13C18.3284 13 19 12.3284 19 11.5C19 10.6716 18.3284 10 17.5 10Z" fill="#5F4BB6"></path></svg>
                                </span>
                                <p className='para'>On-brand and professional streams</p>
                            </li>
                            <li className='flex items-center gap-3'>
                                <span>
                                    <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 17.3333V16.3333H6.55464L6.25671 16.6644L7 17.3333ZM19 16.3333C18.4477 16.3333 18 16.781 18 17.3333C18 17.8856 18.4477 18.3333 19 18.3333V16.3333ZM7.66667 18.3333C8.21895 18.3333 8.66667 17.8856 8.66667 17.3333C8.66667 16.781 8.21895 16.3333 7.66667 16.3333V18.3333ZM4.87165 19.6982L4.12835 19.0292L4.87165 19.6982ZM19 3H5.66667V5H19V3ZM5.66667 3C4.19772 3 3 4.19772 3 5.66667H5C5 5.30228 5.30228 5 5.66667 5V3ZM3 5.66667V19.3637H5V5.66667H3ZM5.61494 20.3671L7.74329 18.0023L6.25671 16.6644L4.12835 19.0292L5.61494 20.3671ZM19 18.3333C20.469 18.3333 21.6667 17.1356 21.6667 15.6667H19.6667C19.6667 16.031 19.3644 16.3333 19 16.3333V18.3333ZM21.6667 15.6667V5.66667H19.6667V15.6667H21.6667ZM21.6667 5.66667C21.6667 4.19772 20.469 3 19 3V5C19.3644 5 19.6667 5.30228 19.6667 5.66667H21.6667ZM7 18.3333H7.66667V16.3333H7V18.3333ZM3 19.3637C3 20.7384 4.6953 21.389 5.61494 20.3671L4.12835 19.0292C4.4349 18.6886 5 18.9054 5 19.3637H3Z" fill="#151516"></path><path d="M16.4602 14.5304C16.2892 14.3623 16.0861 14.2289 15.8626 14.1379C15.6391 14.0468 15.3995 14 15.1576 14C14.9156 14 14.676 14.0468 14.4525 14.1379C14.229 14.2289 14.0259 14.3623 13.8549 14.5304L13.4999 14.8793L13.1449 14.5304C12.7994 14.1909 12.3309 14.0002 11.8423 14.0002C11.3537 14.0002 10.8851 14.1909 10.5396 14.5304C10.1941 14.87 10 15.3305 10 15.8106C10 16.2908 10.1941 16.7513 10.5396 17.0908L10.8946 17.4396L13.4999 20L16.1053 17.4396L16.4602 17.0908C16.6314 16.9227 16.7671 16.7231 16.8597 16.5035C16.9523 16.2838 17 16.0484 17 15.8106C17 15.5729 16.9523 15.3374 16.8597 15.1178C16.7671 14.8981 16.6314 14.6985 16.4602 14.5304Z" fill="#F2A8CB" stroke="#151516" stroke-width="2" stroke-linecap="round"></path></svg>
                                </span>
                                <p className='para'>Interact with viewers and show comments on screen</p>
                            </li>
                        </ul>

                    </div>
                    <div className="w-[50%] relative" initial={{ x: '100%', opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}>
                        <div className='w-full rounded-xl shadow-md p-5 bg-white'>

                            <h2 className="sub-heading p-2 bg-gray-50 rounded-md">Unmatched live support</h2>
                            <div className='flex flex-wrap'>
                                <div className='flex items-center gap-3 py-2 px-4 mx-4 border-b border-gray-50 w-[15rem]'>
                                    <span>
                                        <svg focusable="false" aria-hidden="true" data-testid="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1461E1"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                                    </span>
                                    <p className='para'>10 people on screen</p>
                                </div>
                                <div className='flex items-center gap-3 py-2 px-4 mx-4 border-b border-gray-50 w-[15rem]'>
                                    <span>
                                        <svg focusable="false" aria-hidden="true" data-testid="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1461E1"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                                    </span>
                                    <p className='para'>Logos and lower thirds</p>
                                </div>
                                <div className='flex items-center gap-3 py-2 px-4 mx-4 border-b border-gray-50 w-[15rem]'>
                                    <span>
                                        <svg focusable="false" aria-hidden="true" data-testid="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1461E1"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                                    </span>
                                    <p className='para'>Multistream to up to 8 destinations</p>
                                </div>
                                <div className='flex items-center gap-3 py-2 px-4 mx-4 border-b border-gray-50 w-[15rem]'>
                                    <span>
                                        <svg focusable="false" aria-hidden="true" data-testid="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1461E1"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                                    </span>
                                    <p className='para'>Stream pre-recorded clips</p>
                                </div>
                                <div className='flex items-center gap-3 py-2 px-4 mx-4 border-b border-gray-50 w-[15rem]'>
                                    <span>
                                        <svg focusable="false" aria-hidden="true" data-testid="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1461E1"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                                    </span>
                                    <p className='para'>7 video layout templates</p>
                                </div>
                                <div className='flex items-center gap-3 py-2 px-4 mx-4 border-b border-gray-50 w-[15rem]'>
                                    <span>
                                        <svg focusable="false" aria-hidden="true" data-testid="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1461E1"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                                    </span>
                                    <p className='para'>Full HD (1080p)</p>
                                </div>
                                <div className='flex items-center gap-3 py-2 px-4 mx-4 border-b border-gray-50 w-[15rem]'>
                                    <span>
                                        <svg focusable="false" aria-hidden="true" data-testid="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1461E1"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                                    </span>
                                    <p className='para'>Green screen</p>
                                </div>
                                <div className='flex items-center gap-3 py-2 px-4 mx-4 border-b border-gray-50 w-[15rem]'>
                                    <span>
                                        <svg focusable="false" aria-hidden="true" data-testid="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1461E1"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                                    </span>
                                    <p className='para'>Downloadable recordings</p>
                                </div>
                                <div className='flex items-center gap-3 py-2 px-4 mx-4 border-b border-gray-50 w-[15rem]'>
                                    <span>
                                        <svg focusable="false" aria-hidden="true" data-testid="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1461E1"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                                    </span>
                                    <p className='para'>User voice calling</p>
                                </div>
                                <div className='flex items-center gap-3 py-2 px-4 mx-4 border-b border-gray-50 w-[15rem]'>
                                    <span>
                                        <svg focusable="false" aria-hidden="true" data-testid="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1461E1"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                                    </span>
                                    <p className='para'>24/7 support</p>
                                </div>
                                <div className='flex items-center gap-3 py-2 px-4 mx-4 border-b border-gray-50 w-[15rem]'>
                                    <span>
                                        <svg focusable="false" aria-hidden="true" data-testid="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1461E1"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                                    </span>
                                    <p className='para'>Separate audio files</p>
                                </div>
                                <div className='flex items-center gap-3 py-2 px-4 mx-4 border-b border-gray-50 w-[15rem]'>
                                    <span>
                                        <svg focusable="false" aria-hidden="true" data-testid="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1461E1"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>
                                    </span>
                                    <p className='para'>Separate audio files</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
      
           

    </>
  )
}
