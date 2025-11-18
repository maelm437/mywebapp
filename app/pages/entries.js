import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Entries() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async () => {
    const user = supabase.auth.user()
    const { data, error } = await supabase
      .from('entries')
      .insert([{ title, content, user_id: user?.id }])
    if (error) alert(error.message)
    else alert('Saved!')
  }

  return (
    <div>
      <h1>Create Entry</h1>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={handleSubmit}>Save</button>
    </div>
  )
}
