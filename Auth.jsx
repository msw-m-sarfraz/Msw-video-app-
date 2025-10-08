import React, {useState} from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'

export default function Auth(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async ()=>{ await signInWithEmailAndPassword(auth, email, password); window.location.href='/' }
  const register = async ()=>{ await createUserWithEmailAndPassword(auth, email, password); window.location.href='/' }
  const google = async ()=>{ await signInWithPopup(auth, provider); window.location.href='/' }

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Sign in / Register</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="block p-2 mb-2" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="block p-2 mb-2" />
      <div className="space-x-2">
        <button onClick={login} className="px-3 py-2 bg-green-600 rounded">Login</button>
        <button onClick={register} className="px-3 py-2 bg-yellow-600 rounded">Register</button>
        <button onClick={google} className="px-3 py-2 bg-red-600 rounded">Google</button>
      </div>
    </div>
  )
}
