'use client'

import React,{useState,useEffect} from 'react'
import DashboardCard from '@/components/DashboardCard';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement,LineElement } from "chart.js";
import { Line } from 'react-chartjs-2';
import {FaRegClock} from 'react-icons/fa6'
import {useSelector} from 'react-redux';


ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement,LineElement);



const page = () => {
  const [time,setTime] = useState('all');
  const [vtime,setVTime] = useState('all');
  const [vdata,setVdata] = useState({
    labels: ['Sunday','Monday','Tuesday','Wednesday','Thusday','Friday','Saturday'],
    datasets: [{
      label: 'Listeners',
      data: [100,3000,780008,78788,87,876,99878,87],
      borderColor: '#FF7F0B'
    }]
  })
  
  

  const {user} = useSelector(store => store.userReducer);
 
  useEffect(() => {
    (async function(){
      try{
        const {data:svdata} = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/views-graph?time=${vtime}`,{
          withCredentials: true
        });
        setVdata(svdata?.data)

      }catch(err){
        console.log(err.message,"d98ewd98wegtdgw987egt")
      }
    })()
  },[vtime])


  const data = {
    labels: ['Sunday','Monday','Tuesday','Wednesday','Thusday','Friday','Saturday'],
    datasets: [{
      label: 'Listeners',
      data: [100,3000,780008,78788,87,876,99878,87],
      borderColor: '#FF7F0B'
    }]
  }

  return (
    <section className="w-full py-5 px-4 reletive">
      <div className="flex justify-center items-center">
        <h1 className='main-heading my-10'>Dashboard</h1>
      </div>

      <div className="w-full flex flex-wrap justify-center">
        <DashboardCard count={4} name={'Videos'}/>
        <DashboardCard count={2} name={'Views'}/>
        <DashboardCard count={56} name={'Subscriber'}/>
        <DashboardCard count={4} name={'Active User'}/>
      </div>

      <div className="mt-10">

        <div className="m-auto max-w-[50rem] p-4 shadow-md border border-gray-100 rounded-md">
          <div className="mb-5 flex justify-between items-center">
              <h2 className="text-xl text-black">Viewers</h2>
             
                <div className='flex items-center relative py-2 px-1 border-gray-400  border-2 hover:border-indigo-500 rounded-md'>
                    <FaRegClock size={20} className='text-gray-400'/>
                    <select value={vtime} onChange={(e) => setVTime(e.target.value)} className='w-[95%] outline-none ml-1' placeholder='Enter your password' id='password' name='password'>
                      <option value="all">ALL</option>
                      <option value="lastWeek">Last Week</option>
                      <option value="lastMonth">Last Month</option>
                      <option value="lastYear">Last Year</option>
                    </select>  
                </div>
          </div>
          <Line
            data={vdata}
          />
        </div>
      </div>

      <div className="mt-10">

        <div className="m-auto max-w-[50rem] p-4 shadow-md border border-gray-100 rounded-md">
          <div className="mb-5 flex justify-between items-center">
              <h2 className="text-xl text-black">Subscriber</h2>
             
                <div className='flex items-center relative py-2 px-1 border-gray-400  border-2 hover:border-indigo-500 rounded-md'>
                    <FaRegClock size={20} className='text-gray-400'/>
                    <select value={time} onChange={(e) => setTime(e.target.value)} className='w-[95%] outline-none ml-1' placeholder='Enter your password' id='password' name='password'>
                      <option value="today">Today</option>
                      <option value="lastWeek">Last Week</option>
                      <option value="lastMonth">Last Month</option>
                      <option value="lastYear">Last Year</option>
                    </select>  
                </div>
          </div>
          <Line
            data={data}
          />
        </div>
      </div>
    </section>
  )
}

export default page