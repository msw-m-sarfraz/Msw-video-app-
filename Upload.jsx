import React, {useState} from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { storage, db, auth } from '../firebase'

export default function Upload(){
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [progress, setProgress] = useState(0)

  const submit = async (e)=>{
    e.preventDefault()
    if(!file) return alert('Choose a video')
    const storageRef = ref(storage, `videos/${Date.now()}_${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed', snapshot=>{
      const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setProgress(Math.round(pct))
    }, err=>{console.error(err)}, async ()=>{
      const url = await getDownloadURL(uploadTask.snapshot.ref)
      await addDoc(collection(db,'videos'), {
        url,
        caption,
        userId: auth.currentUser?.uid||'anon',
        userName: auth.currentUser?.displayName||'Anonymous',
        likes: [],
        createdAt: serverTimestamp()
      })
      setFile(null); setCaption(''); setProgress(0); alert('Uploaded!')
    })
  }

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Upload Video</h2>
      <form onSubmit={submit} className="space-y-4">
        <input type="file" accept="video/*" onChange={e=>setFile(e.target.files[0])} />
        <input value={caption} onChange={e=>setCaption(e.target.value)} placeholder="Caption" className="w-full p-2" />
        <button className="px-4 py-2 bg-blue-600 rounded">Upload</button>
      </form>
      {progress>0 && <div className="mt-2">Progress: {progress}%</div>}
    </div>
  )
}
