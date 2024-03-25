import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CRow,
} from '@coreui/react'

export default function UpdateEvent() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    // Effect to fetch events when component mounts
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/getevent')
        setEvents(response.data) // Set events state with data from API response
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }
    fetchEvents()
  }, []) // Empty dependency array to ensure this effect runs only once

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
                </div>
              ))}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}
