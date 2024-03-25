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
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'

export default function AddUser() {
  const [formData, setFormData] = useState({
    idlivre: '',
    disponibilite: '',
    duree: '',
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
      const response = await axios.post('http://localhost:7000/api/getbiblio', formData)
      console.log(response.data) // Log the response if needed
      // Clear form after successful submission if needed
      setFormData({
        idlivre: '',
        disponibilite: '',
        duree: '',
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <CContainer xl>
      <form onSubmit={handleSubmit}>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Ajouter un nouveau utilisateur</strong>
              </CCardHeader>
              <CCardBody>
                <p className="text-medium-emphasis small">
                  Ici vous pouver ajouter un nouveau utilisateur{' '}
                </p>
                <CInputGroup className="mb-3">
                  <CInputGroupText id="basic-addon1">@</CInputGroupText>
                  <CFormInput
                    placeholder="Email"
                    aria-label="Email"
                    type="email"
                    aria-describedby="basic-addon1"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Username"
                    aria-label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Password"
                    aria-label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CFormSelect
                  size="lg"
                  className="mb-3"
                  aria-label="Large select example"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option>Select a role</option>
                  <option value="admin">Modérateur de dashboard</option>
                  <option value="PO">Product owner</option>
                  <option value="Developer">Two</option>
                </CFormSelect>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <div className="flex flex-s-b">
          <div>
            <CButton className="text-bold text-white" color="danger">
              Annuler
            </CButton>
          </div>
          <div>
            <CButton type="submit" className="text-bold text-white" color="primary">
              Envoyer
            </CButton>
          </div>
        </div>
      </form>
    </CContainer>
  )
}
