"use client";
import { MdDelete, MdEdit } from 'react-icons/md'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux';
import { getAds } from '@/lib/actions/user';

export default function page() {

	const [ads, setAds] = useState([]);
	const dispatch = useDispatch();


	useEffect(() => {
		(async function(){
			const ads = await dispatch(getAds());
			setAds(ads);
		})()
	},[])

	const deleteTeam = async (id) => {
	// 	try{
	// 		const {data} = await axios.delete(`/api/v1/dj?id=${id}`);
	// 		console.log(data.message);
	// 		await dispatch(showMessage(data.message));
	//   await dispatch(clearMessage());
	//   getTeam();
	// 	}catch(error){
	// 			await dispatch(showError(error.response.data.message));
	//     await dispatch(clearError());
	// 			console.log(error.message)
	// 	}
	}

	return (
		<section className="w-full py-5 px-4 reletive">
			<div className="flex justify-center items-center mb-6">
				<h1 className='main-heading mt-10'>Manage Ads</h1>
			</div>
			<div className="flex justify-end items-center mb-5">
				<Link href="/admin/dashboard/ads/create" className="py-2 px-4 rounded-md bg-primary text-white">Add Team</Link>
			</div>
			<div className="reletive overflow-x-auto">
				<table className="w-full text-sm text-left">
					<thead className="text-sx text-white uppercase bg-primary">
						<tr>
							<th scope='col' className="px-6 py-3">Title</th>
							<th scope='col' className="px-6 py-3">Description</th>
							<th scope='col' className="px-6 py-3">Image</th>
							<th scope='col' className="px-6 py-3 text-center">Action</th>
						</tr>
					</thead>

					<tbody>
						{ads?.map(data => <TableRow {...data} deleteTeam={deleteTeam}/>)}
					</tbody>
				</table>
			</div>
		</section>
	)
}


const TableRow = ({ title,description,banner,_id }) => (
	<tr className="bg-gray-50 font-midium border-b text-sm">
		<td className="px-6 py-4 whitespace-nowarp">{title}</td>
		<td className="px-6 py-4 whitespace-nowarp">{description}</td>
		<td className="px-6 py-4 whitespace-nowarp">
			<img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${banner}`} className='w-20 h-18'/>
		</td>
		<td className="px-16 py-4 whitespace-nowarp flex gap-7 justify-center">
			<button onClick={() => deleteTeam(_id)} className="p-2 rounded-full flex items-center text-red-400 hover:text-white hover:bg-red-400"><MdDelete size={20} /><span className='ml-3 text-gray-700'>delete</span></button>
			<Link href={`/dashboard/team/${_id}`} className="p-2 rounded-full flex items-center text-green-400 hover:text-white hover:bg-green-400"><MdEdit size={20} /><span className='ml-3 text-gray-700'>edit</span></Link>
		</td>
	</tr>
)