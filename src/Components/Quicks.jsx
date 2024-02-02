import React, { useState } from 'react'
import { Modal, Button, Tab, Tabs } from 'react-bootstrap'

const Quicks = ({ showModal, handleClose }) => {
  const [activeTab, setActiveTab] = useState('water')

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Quicks Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={handleTabSelect}>
          <Tab eventKey="water" title="Water">
            {/* Content for Water category */}
            <p>Have you had enough water</p>
          </Tab>
          <Tab eventKey="mood" title="Mood">
            {/* Content for Mood category */}
            <p>How are you feeling</p>
          </Tab>
          <Tab eventKey="sleep" title="Sleep">
            {/* Content for Sleep category */}
            <p>How well did you sleep</p>
          </Tab>
          <Tab eventKey="quote" title="Quote">
            {/* Content for Quote category */}
            <p>"Insert inspirational quote here."</p>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Quicks;
