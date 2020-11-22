import Head from 'next/head'
import {useState,useEffect} from "react"
import LeaderList from "../components/leaderLists"
import axios from 'axios'
import Pusher from 'pusher-js'

var pusher = new Pusher('510318c8d0c6b32e86b9', {
  cluster: 'ap2',
  encrypted: true
})
const channel = pusher.subscribe('watch-leaderboard')

export default function Home() {
  const [data, setData] = useState(null)

  const fetchLeaders = async () => {
    try {
      const _res= await axios.get('http://localhost:5000/fetch-leaders')
      if (_res) {
        return _res.data
      }
    } catch (error) {
      console.log('Unable to fetch data',error)
    }
    
  }

  useEffect(async () => {
    await fetchLeaders()
  },[])

  useEffect(() => {
      receiveGetAllLeadersFromPusher() 
  }, [data])
  


  /*  
  Seems like having different bind methods for open channel can be a better approach 
  */
  
  // function receiveAddLeaderFromPusher() {
  //   console.log('recieving add leader change')
  //   channel.bind('watch-add-leader', data => {
  //     console.log('add leader watcher triggered...',data)
     
  //   }),
  //   console.log('app subscription to event successful')
  // }

  // function receiveUpdateLeaderFromPusher() {
  //   console.log('recieving update leader change')
  //   channel.bind('watch-update-leader', data => {
  //     console.log('update leader watcher triggered...',data)
     
  //   }),
  //   console.log('app subscription to event successful')
  // }

  function receiveGetAllLeadersFromPusher() {
    channel.bind('watch-all-leaders', data => {
      console.log('get all leaders watcher trigger...', data)
        const _finalData = data.sort((a, b) => b.point - a.point)
        setData(_finalData) // setting state here is the main logic that i could come across
      
    })
  }


  return (
    <div>
      <Head>
        <title>vloop</title>
      </Head>
      <main>
        <LeaderList data={data} setData={setData}/>
      </main>
    </div>
  )
}
