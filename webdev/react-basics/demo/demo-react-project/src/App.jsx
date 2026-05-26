import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function message() {
  return <h1>HELLO</h1>
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <message />
    </div>
  )
}

export default App
