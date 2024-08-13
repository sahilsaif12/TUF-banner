import { useEffect, useState } from 'react'
import './App.css'
import Home from './Components/Home'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Components/Dashboard.jsx'
import axios from 'axios'
// import.meta.env.VITE_SERVER
function App() {
  const [data, setdata] = useState(null)
  const [loading, setloading] = useState(true)
  const [reload, setReload] = useState(false)
  useEffect(() => {
    async function fetchData() {
      console.log("sahilll");
      setloading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/banner`)
        const success = res.data.success
        if (success) {
          setdata(res.data.data[0])
          // console.log(res.data.data);
          setloading(false)
          setReload(false)
        }
      } catch (error) {
        console.log(error);
      }

    }

    fetchData()
  }, [reload])

  return (
    <>
      {
        !loading &&

        <div>
          <Routes>
            <Route path='/' element={<Home data={data} />} />
            <Route path='/dashboard' exact element={<Dashboard data={data} setReload={setReload} />} />
          </Routes>
        </div>
      }

    </>
  )
}

export default App
