import React, {useEffect, useState} from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db, auth } from '../firebase'

export default function Profile(){
  const [videos, setVideos] = useState([])
  const uid = auth.currentUser?.uid

  useEffect(()=>{
    if(!uid) return
    const q = query(collection(db,'videos'), where('userId','==',uid))
    const unsub = onSnapshot(q, snap=> setVideos(snap.docs.map(d=>({id:d.id,...d.data()}))))
    return ()=>unsub()
  },[uid])

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">My Profile</h2>
      {videos.map(v=> <div key={v.id} className="mb-4"><video src={v.url} controls className="w-full max-w-md"/></div>)}
    </div>
  )
}
