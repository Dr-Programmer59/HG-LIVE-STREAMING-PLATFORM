"use client"
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {getAds, loadme} from '@/lib/actions/user';


const UserProvider = ({children}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadme());
        dispatch(getAds());
    },[])
  return (children)
}

export default UserProvider