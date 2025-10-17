import { useState } from 'react'
import { Button, Card, Input, Badge, Modal, Toggle, ProgressBar } from './components'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toggleValue, setToggleValue] = useState(false)
  const [progress, setProgress] = useState(45)

  const handleButtonClick = () => {
    setCount(count + 1)
    // Update progress as well
    setProgress(Math.min(progress + 10, 100))
  }

  return (
    <div className="app">
      <Card variant="highlight" className="demo-section">
        <h2>Kawa Design System Demo</h2>
        <p>A collection of beautiful, animated components</p>

        <div className="component-grid">
          {/* Buttons */}
          <Card variant="default">
            <h3>Buttons</h3>
            <div className="component-row">
              <Button onClick={handleButtonClick} variant="primary">
                {count > 0 ? `Clicked ${count} times!` : 'Press Me!'}
              </Button>
              <Button variant="secondary">
                Secondary Button
              </Button>
            </div>
          </Card>

          {/* Badges */}
          <Card variant="default">
            <h3>Badges</h3>
            <div className="component-row">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary" size="small">Secondary</Badge>
              <Badge variant="success" size="large">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </Card>

          {/* Inputs */}
          <Card variant="default">
            <h3>Input Field</h3>
            <Input
              label="Enter your name"
              placeholder="Type something..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              variant="primary"
            />
          </Card>

          {/* Toggle */}
          <Card variant="default">
            <h3>Toggle Switch</h3>
            <div className="component-row">
              <Toggle
                label="Enable notifications"
                checked={toggleValue}
                onChange={setToggleValue}
                variant="primary"
              />
              <Toggle
                checked={toggleValue}
                onChange={setToggleValue}
                variant="success"
                size="small"
              />
              <Toggle
                checked={toggleValue}
                onChange={setToggleValue}
                variant="secondary"
                size="large"
              />
            </div>
          </Card>

          {/* Progress Bar */}
          <Card variant="default">
            <h3>Progress Bars</h3>
            <ProgressBar
              value={progress}
              label="Loading progress"
              showValue
              variant="primary"
              animated
            />
            <br />
            <ProgressBar
              value={75}
              variant="success"
              size="small"
            />
          </Card>

          {/* Modal Trigger */}
          <Card variant="default">
            <h3>Modal Dialog</h3>
            <Button onClick={() => setIsModalOpen(true)} variant="secondary">
              Open Modal
            </Button>
          </Card>
        </div>

        <div className="stats-section">
          <Badge variant="info">Count: {count}</Badge>
          <Badge variant={toggleValue ? 'success' : 'warning'}>
            Toggle: {toggleValue ? 'ON' : 'OFF'}
          </Badge>
          <Badge variant="primary">Progress: {progress}%</Badge>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Welcome to Kawa!"
        variant="primary"
        size="medium"
      >
        <p>This is a beautiful modal component built with the same design system.</p>
        <p>It features smooth animations and consistent styling across all components.</p>
        <div style={{ marginTop: '1rem' }}>
          <Button onClick={() => setIsModalOpen(false)} variant="primary">
            Close Modal
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default App
