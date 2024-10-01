import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'

function Profile() {
  const {currentUser} = useSelector((state)=>state.user)
  const fileRef= useRef(null)
  const [file , setFile] = useState(undefined)
  const [filePerc , setFilePerc] = useState(0)
  const [fileUploadError , setFileUpladError] = useState(false)
  const [formData , setFormData] = useState({})
  console.log(formData)
  console.log(filePerc)
  // fire base confige
 // allow read;
 // allow write : if 
//  request.resource.size <2 * 1024*1024 &&
//  request.resource.contentType.matches("images/*")

useEffect((()=>{
  if (file){
    handleFileUpload(file)
  }
}),[file])
const handleFileUpload = (file)=>{
const storage = getStorage(app)
const fileName = new Date().getTime() + file.name 
const storageRef = ref(storage,fileName)
const uploadTask = uploadBytesResumable(storageRef , file)
uploadTask.on("state_changed" , 
  (snapshot)=>{
    const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100
    setFilePerc(Math.round(progress))

  },(error)=>{
    setFileUpladError(true)
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then(
      (downloadURL) =>{
          setFormData({...formData  , avatar:downloadURL})
      }
    )
  }

)
}
  
  return (
    <div className=' p-5 mt-7  max-w-lg mx-auto '>
      <h1 className='text-2xl font-semibold text-center '>Profile</h1>
      <form className='flex flex-col gap-4 mt-4 '  action="">
        <input type='file' onChange={(e)=>setFile(e.target.files[0])} hidden accept='image/*' ref={fileRef}/>
        <img onClick={()=>fileRef.current.click()} className='w-24 h-24 rounded-full mt-4 cursor-pointer self-center' 
        src={formData.avatar || currentUser.avatar} alt="" />


        <p className='text-sm self-center'>
        {fileUploadError ? (
        <p className='text-red-600'>Upload is failed</p>
       ): 
       filePerc>0 && filePerc<100 ?
         (<span className=' text-gray-500'>
          {`uploading ${filePerc}%`}</span>
        )  : filePerc === 100 
        ? (<span className='text-green-600'>image successfully uploaded  </span>) : ("")}
        </p>


        <input type="text" id='username' className='rounded-lg border p-3  capitalize' placeholder='username' />
        <input type="email" id='email' className='rounded-lg border p-3 capitalize' placeholder='email' />
        <input type="password" id='password' className='rounded-lg border p-3  capitalize' placeholder='password' />
        <button className='bg-purple-700 hover:bg-purple-600 disabled:opacity-95 p-3 uppercase text-white
         rounded-lg'>Update</button>
      </form>
      <div className='flex justify-between px-4 mt-2'>
        <p className='text-red-700 cursor-pointer'>Delete account </p>
        <p className='text-red-700 cursor-pointer'>Sign Out</p>
      </div>
    </div>
  )
}

export default Profile
