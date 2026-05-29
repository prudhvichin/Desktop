import { useState } from 'react'
import RandomPokemon from './RandomPokemon'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <RandomPokemon />
  )
}

export default App
