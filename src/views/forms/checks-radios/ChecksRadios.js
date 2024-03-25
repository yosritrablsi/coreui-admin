import React, { useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'

export default function UpdateEvent() {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    date: '',
    location: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `http://localhost:7000/api/updateevent/${formData.id}`,
        formData,
      )
      console.log(response.data)
      // Clear form after successful submission if needed
      setFormData({
        name: '',
        title: '',
        date: '',
        lieu: '',
        description: '',
      })
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Event not found')
      } else {
        console.error('Error:', error)
      }
    }
  }

  return (
    <CContainer xl>
      <form onSubmit={handleSubmit}>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Mettre à jour un événement</strong>
              </CCardHeader>
              <CCardBody>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="ID de l'événement"
                    aria-label="ID de l'événement"
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Titre"
                    aria-label="Titre"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Description"
                    aria-label="Description"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Date"
                    aria-label="Date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Lieu"
                    aria-label="Lieu"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CButton type="submit" color="primary">
                  Mettre à jour
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </form>
    </CContainer>
  )
}
