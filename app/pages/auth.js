import { supabase } from '../lib/supabaseClient'
import { useState } from 'react'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) alert(error.message)
    else alert('Check your email for confirmation link!')
  }

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else alert('Logged in!')
  }

  return (
    <div>
      <h1>Login / Signup</h1>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
