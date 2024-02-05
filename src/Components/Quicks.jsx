import React, { useState } from 'react'
import { Modal, Button, Tab, Tabs, Form } from 'react-bootstrap'
import { BsDroplet } from 'react-icons/bs'
import { FaRegMoon } from 'react-icons/fa'  


const Quicks = ({ showModal, handleClose }) => {
  const [activeTab, setActiveTab] = useState('hydration')
  const [hydrationLevel, setHydrationLevel] = useState(1) // 1 to 4 indicating hydration level
  const [mood, setMood] = useState('')
  const [sleepLevel, setSleepLevel] = useState(1) // 1 to 4 indicating sleep level
  const [quote, setQuote] = useState('')

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  }

  const handleHydrationChange = (level) => {
    setHydrationLevel(level);
  }

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  }

  const handleSleepChange = (level) => {
    setSleepLevel(level);
  }

  const handleQuoteChange = (event) => {
    setQuote(event.target.value);
  }

  const handleSubmit = () => {
    // Handle the submission logic here
    // You can gather the state of each category and save it
    handleClose();
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: '#3a7e54', fontSize: 40 }}>Dailies</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Add some styles to the lists */}
        <ul style={{ listStyle: 'none', padding: 0 }}>
  <li>
    <h4 style={{ marginBottom: 20 , color: '#3a7e54' }}>How much water have you drunk?</h4>
    {[0.5, 1, 1.5, 2].map((amount) => (
      <div key={amount} style={{ marginBottom: '10px' }}>
        <BsDroplet
          color={amount <= hydrationLevel ? '#0000FF' : '#808080'}
          size={30}
          style={{ cursor: 'pointer' }}
          onClick={() => handleHydrationChange(amount)}
        />
        <span style={{ marginLeft: '5px' }}>
          {amount === 0.5 && '0.5 liters'}
          {amount === 1 && '1 liter'}
          {amount === 1.5 && '1.5 liters'}
          {amount === 2 && '2 liters'}
        </span>
      </div>
    ))}
  </li>
</ul>
          {/* </Tab> */}
          {/* <Tab eventKey="mood" title="Mood"> */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <h4 style={{ marginTop: 40, marginBottom: 20, color: '#3a7e54' }}>How are you feeling?</h4>
                <select
              value={mood}
              onChange={handleMoodChange}
              style={{ borderRadius: '8px', padding: '5px' }}
            >
                  <option value="😃">😃 Happy</option>
                  <option value="😎">😎 Relaxed</option>
                  <option value="😐">😐 Neutral</option>
                  <option value="😢">😢 Sad</option>
                  <option value="😡">😡 Angry</option>                  
                </select>
              </li>
            </ul>
          {/* </Tab> */}
          {/* <Tab eventKey="sleep" title="Sleep"> */}
           <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
             <h4 style={{ marginTop: 40,marginBottom: 20, color: '#3a7e54' }}>How many hours did you sleep?</h4>
              {[1, 2, 3, 4].map((level) => (
             <div key={level} style={{ marginBottom: '10px' }}>
             <FaRegMoon
            color={level <= sleepLevel ? 'blue' : 'gray'}
            size={30}
            style={{ cursor: 'pointer' }}
            onClick={() => handleSleepChange(level)}
          />
          <span style={{ marginLeft: '5px' }}>
            {level === 1 && '0-4 hours'}
            {level === 2 && '4-6 hours'}
            {level === 3 && '6-8 hours'}
            {level === 4 && '8+ hours'}
          </span>
        </div>
      ))}
    </li>
  </ul>
{/* </Tab> */}
          
          {/* <Tab eventKey="quote" title="Quote"> */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <h4 style={{ marginTop: 40, marginBottom: 20 ,color: '#3a7e54' }}>Enter an inspirational quote:</h4>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Type your quote here..."
                  value={quote}
                  onChange={handleQuoteChange}
                />
              </li>
            </ul>
          {/* </Tab> */}
        {/* </Tabs> */}
      </Modal.Body>      
<Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Close
  </Button>
  <Button variant="primary" onClick={handleSubmit} style={{ backgroundColor: '#3a7e54', borderColor: '#3a7e54' }}>
    Save
  </Button>
</Modal.Footer>
    </Modal>
  )
}

export default Quicks
