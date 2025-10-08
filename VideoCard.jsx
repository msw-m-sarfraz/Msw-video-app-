import React, {useRef, useState} from 'react'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase'

export default function VideoCard({video}){
  const ref = useRef()
  const [playing, setPlaying] = useState(true)

  const toggle = () =>{
    if(ref.current.paused) { ref.current.play(); setPlaying(true) }
    else { ref.current.pause(); setPlaying(false) }
  }

  const like = async ()=>{
    const d = doc(db, 'videos', video.id)
    await updateDoc(d, { likes: arrayUnion('user_placeholder') })
  }

  return (
    <div className="relative h-full w-full flex items-end">
      <video ref={ref} src={video.url} className="object-cover w-full h-full" autoPlay loop muted playsInline/>
      <div className="absolute right-4 bottom-12 text-white space-y-4">
        <button onClick={like} className="block">❤️ {video.likes?.length||0}</button>
      </div>
      <div onClick={toggle} className="absolute inset-0" />
      <div className="p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
        <div className="text-sm">@{video.userName} • {video.caption}</div>
      </div>
    </div>
  )
}
