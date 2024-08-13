import React, { useEffect, useRef, useState } from 'react'
import { Switch } from '@headlessui/react'
import DateTimePicker from 'react-datetime-picker';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DashBoard({data,setReload}) {
    const [isSwitchOn, setIsSwitchOn] = useState(data?.visible==1?true:false);
    const [endTime, setendTime] = useState(new Date(data?.endTime));
    const [tagline, settagline] = useState(data?.tagline)
    const [link, setlink] = useState(data?.link)
    const [desc, setdesc] = useState(data?.description)
    const [update, setupdate] = useState(false)
    const [btnText, setbtnText] = useState('Save')
    const navigate=useNavigate()

    const handleChange=(e,setvalue) => {
        setvalue(e.target.value)
        setupdate(true)
    }

    const handleSave=async() => {
        setbtnText("Saving...")
        try {
            const res = await axios.patch(`${import.meta.env.VITE_SERVER}/banner`, {
                tagline,description:desc,link,visible:isSwitchOn,
                endTime:`${endTime.getFullYear()}-${endTime.getMonth()+1}-${endTime.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()}`
            })
            if (res.data.success) {
                setbtnText("Saved")
                setupdate(false)
            }
        } catch (error) {
            console.log(error);
            
        }

        setTimeout(() => {
            setbtnText("Save")
        }, 1500);
    }

    const [isFirstRender, setIsFirstRender] = useState(true);
    
    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false)
            return;
          }
          else{
              setupdate(true)
          }
    //   console.log(`${endTime.getFullYear()}-${endTime.getMonth()+1}-${endTime.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()}`);
      
    }, [endTime,isSwitchOn])
    

    const handlePreview=() => {
        navigate('/')
        setReload(true)

    }
    return (
        <div class="container mx-auto my-5 w-1/3 outline outline-offset-8 outline-purple-500 border-purple-800  rounded-lg border-4 bg-slate-800">
            <div class="p-5 space-y-5 shadow-xl">
                <h4 class="text-center font-serif  text-2xl">Control your Banner</h4>

                <div>
                    <div class="flex flex-col  px-10 gap-5">
                    <span className='text-left  text-gray-300/90'>Tag line</span>
                        <input
                            type="text"
                            name='tagline'
                            class="border bg-slate-900 rounded-md -m-2  border-gray-600 px-4 py-2 focus:outline-none focus:border-gray-700"
                            placeholder=" Banner Tag line"
                            value={tagline}
                            onChange={(e)=>handleChange(e,settagline)}
                        />

                    <span className='text-left  text-gray-300/90'>Description</span>
                        <textarea
                            cols="10"
                            rows="7"
                            class="border resize-none -m-2 bg-slate-900 rounded-md  border-gray-600 px-4 py-2 focus:outline-none focus:border-gray-700"
                            placeholder="Write banner description"
                            name='desc'
                            value={desc}
                            onChange={(e)=>handleChange(e,setdesc)}
                        ></textarea>

                        <div className="flex text-gray-300 gap-3 ">
                            Visibility
                            <Switch
                                checked={isSwitchOn}
                                onChange={() => setIsSwitchOn(!isSwitchOn)}
                                className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-gray-400/50 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-gray-600"
                            >
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-red-500 ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7 group-data-[checked]:bg-green-500"
                                />
                            </Switch>
                        </div>
                        
                        <div className="text-left text-gray-300 p- pb-0 ">
                            Banner end time
                        </div>
                        <DateTimePicker className="bg-gray-900 -m-2  border-1 rounded-xl "
                        calendarClassName="bg-black"
                         onChange={setendTime} 
                         format="dd-MM-yyyy h:mm a"
                        value={endTime} 
                        minDate={new Date()} 
                        
                         />

<span className='text-left  text-gray-300/90'>Link</span>
                        <input
                            type="text"
                            name='input'
                            class="border bg-slate-900 rounded-md -m-2 border-gray-600 px-4 py-2 focus:outline-none focus:border-gray-700"
                            placeholder=" Redirect Link"
                            value={link}
                            onChange={(e)=>handleChange(e,setlink)}
                        />
                    </div>
                    <button
                        // type="submit"
                        disabled={!update}
                        onClick={handleSave}
                        class="focus:outline-none w-2/5 rounded-md mt-5 disabled:bg-purple-700/40 disabled:cursor-not-allowed disabled:text-gray-300 bg-purple-700 px-4 py-2 text-white font-semibold "
                    >{btnText}</button>
                    <input
                        type="button"
                        value="preview"
                        onClick={handlePreview}
                        class="focus:outline-none w-2/5 rounded-md mt-5 disabled:bg-purple-900 bg-teal-600 px-4 py-2 ml-4  "
                    />
                </div>
            </div>
        </div>
    )
}

export default DashBoard