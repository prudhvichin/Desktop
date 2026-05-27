import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import DiceRolled3 from './components/DiceRolled3'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <DiceRolled3 />
      <DiceRolled3 />
    </div>

  )
}

export default App
