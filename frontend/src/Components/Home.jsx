import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import showIcon from '../assets/eye.png'
import hideIcon from '../assets/noeye.png'
import dashboardIcon from '../assets/dash.png'
import { useNavigate } from 'react-router-dom'
function Home({data}) {
    const [show, setshow] = useState(true)
    const navigate=useNavigate()
    useEffect(() => {
      
    
     console.log(data);
     
    }, [])
    
  return (
    <div>
    <button onClick={() =>navigate('dashboard')} className='bg-blue-600/60  absolute right-20 top-5 hover:outline-none  flex gap-3'>
    <span>DashBoard</span>
    
    <img src={dashboardIcon} className="w-6 h-6 bg-red-60 " alt="" />
    
    </button>
    {data?.visible==1 &&
    <button onClick={()=>setshow(!show)} type="button" class="w-10 p-0 focus:outline-none border-2 border-gray-900  h-10 flex justify-center items-center rounded-full absolute right-5 top-5 bg-gray-300">
    
    <img src={show?hideIcon :showIcon} className="w-8 h-8 bg-red-60 " alt="" />
    </button>
    }

    {data?.visible==1 &&
    <Banner tagline={data.tagline} description={data.description} endTime={data.endTime} created_at={data.created_at} link={data.link} show={show}/>
    }

    {data?.visible==0 && <div className="text-center text-gray-300 absolute top-1/2 w-full ">No banner available currently</div>}
    </div>
  )
}

export default Home