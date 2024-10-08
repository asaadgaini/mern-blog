
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sidebar , } from "flowbite-react"
import { HiArrowSmRight, HiUser} from "react-icons/hi"

function DashSidebar() {
    const location = useLocation()
    const [tab , setTab] = useState('')
    useEffect(()=>{
      const urlParams = new URLSearchParams (location.search)
      const tabFromUrl = urlParams.get("tab")
      console.log(tabFromUrl)
      if(tabFromUrl){
  
        setTab(tabFromUrl)
      }
    },[location.search])
  return (
    <Sidebar className='w-full'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to={"/dashboard?tab=profile"}>
                <Sidebar.Item active={tab === 'profile'}  icon={HiUser} label={"User"} labelColor={"dark"} >
                    Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item   icon={HiArrowSmRight} className=" cursor-pointer" >
                    Sign Out 
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>

    </Sidebar>
  )
}

export default DashSidebar
