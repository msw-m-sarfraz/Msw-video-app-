import React, {useEffect, useState} from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import VideoCard from './VideoCard'

export default function VideoFeed(){
  const [videos, setVideos] = useState([])

  useEffect(()=>{
    const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, snap=>{
      setVideos(snap.docs.map(d=>({id:d.id,...d.data()})))
    })
    return ()=>unsub()
  },[])

  return (
    <div className="h-[80vh] overflow-hidden flex flex-col items-center">
      {videos.length===0 ? (
        <div className="p-6">No videos yet. Upload one!</div>
      ) : (
        <div className="w-full max-w-md h-full overflow-y-auto snap-y snap-mandatory">
          {videos.map(v=> (
            <div key={v.id} className="snap-start h-[80vh]">
              <VideoCard video={v} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
