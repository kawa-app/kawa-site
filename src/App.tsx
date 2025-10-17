import { useState } from 'react'
import Button from './components/Button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleButtonClick = () => {
    setCount(count + 1)
  }

  return (
    <div className="app">
      <Button onClick={handleButtonClick}>
        {count > 0 ? `Clicked ${count} times!` : 'Press Me!'}
      </Button>
    </div>
  )
}

export default App
