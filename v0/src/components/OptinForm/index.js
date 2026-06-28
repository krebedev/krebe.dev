import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import validateFormField from './../../utilities/validateFormField'
import { buttonStyles } from '../Button/styles.module.css'
import * as styles from './styles.module.css'

const OptinForm = () => {
  const [email, setEmail] = useState('')
  const [errorFlash, setErrorFlash] = useState(false)

  const handleChange = (event) => {
    setEmail(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const isValidEmail = validateFormField('email', email)
    setErrorFlash((cs) => (isValidEmail ? cs : true))
    if (!isValidEmail) return
    console.log(email)

    // await api call
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      setErrorFlash(false)
    }, 1000)

    return () => clearTimeout(timerId)
  }, [errorFlash])

  return (
    <div className={styles.optin}>
      <h2 className={styles.formTitle}>Subscribe to the Newsletter</h2>
      <p>Subscribe to get my latest content by email.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.formGroup}>
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            onChange={handleChange}
            value={email}
            type='email'
            placeholder='Enter your email address'
            name='email'
            className={`${errorFlash && styles.errorHighlight}`}
          />
        </div>
        <button type='submit' className={buttonStyles}>
          Subscribe
        </button>
      </form>
      <small className={styles.guarantee}>
        I won't send you spam. Unsubscribe at any time.
      </small>
    </div>
  )
}

export default OptinForm
