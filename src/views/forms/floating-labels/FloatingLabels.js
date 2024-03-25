import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'

export default function UpdateEvent() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/getevent')
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:7000/api/deleteevent/${eventId}`)
      setEvents(events.filter((event) => event._id !== eventId))
      console.log('Event deleted successfully')
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  return (
    <CContainer>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Liste des événements</strong>
            </CCardHeader>
            <CCardBody>
              {events.map((event, index) => (
                <div key={index}>
                  <p>Nom: {event.name}</p>
                  <p>Date: {event.date}</p>
                  <p>Lieu: {event.lieu}</p>
                  <p>Description: {event.description}</p>
                  <p>Durée: {event.duree}</p>
                  <CButton color="danger" onClick={() => handleDeleteEvent(event._id)}>
                    Supprimer
                  </CButton>
                </div>
              ))}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}
