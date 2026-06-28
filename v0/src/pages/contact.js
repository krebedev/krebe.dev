import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { send } from 'emailjs-com'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserAlt,
  faEnvelope,
  faEdit,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'
import Layout from './../components/Layout'
import Stepper from './../components/Stepper'
import validateFormField from '../utilities/validateFormField'
import * as styles from '../pages-styles/contact.module.css'

const Contact = ({ data }) => {
  const initialState = {
    name: '',
    email: '',
    message: '',
  }
  const [formData, setFormData] = useState(initialState)

  const [step, setStep] = useState(0)
  const [errorFlash, setErrorFlash] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sendStatus, setSendStatus] = useState('')

  const formFields = Object.keys(formData)

  const handleChange = (event) => {
    const { name, value } = event.target
    const formDataClone = { ...formData }
    formDataClone[name] = value
    setFormData(formDataClone)
  }

  const handleValidation = () => {
    const field = formFields[step]
    const value = formData[field]
    const isValid = validateFormField(field, value)
    setErrorFlash((currentState) => (!isValid ? true : currentState))
    return isValid
  }

  const nextStepHandler = () => {
    const isValidField = handleValidation()
    if (!isValidField) return
    setStep((currentStep) => currentStep + 1)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const isValidField = handleValidation()
    if (!isValidField) return

    // make api call
    setIsSubmitting(true)
    const payload = {
      from_name: formData.name,
      to_name: 'krebeDev',
      message: formData.message,
      reply_to: formData.email,
    }

    try {
      const sendMessage = await send(
        process.env.GATSBY_EMAILJS_SERVICE_ID,
        process.env.GATSBY_EMAILJS_TEMPLATE_ID,
        payload,
        process.env.GATSBY_EMAILJS_USER_ID
      )
      setSendStatus(() => sendMessage.status)
      setFormData(initialState)
    } catch (error) {
      setSendStatus(() => error.status)
    } finally {
      setIsSubmitting(false)
      setStep(0)
    }
  }

  const socialIcons = {
    twitter: <FontAwesomeIcon icon={faTwitter} />,
    linkedIn: <FontAwesomeIcon icon={faLinkedinIn} />,
    github: <FontAwesomeIcon icon={faGithub} />,
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      setErrorFlash(false)
    }, 1000)

    return () => clearTimeout(timerId)
  }, [errorFlash])

  const { siteMetadata } = data.site

  return (
    <Layout>
      <Helmet title={`Contact | ${siteMetadata.title}`} />
      <section className={styles.contact}>
        <div className={`${styles.contactInner}`}>
          <h1>Get in touch</h1>
          <p>
            Thanks for taking the time to reach out. Got any question or an
            idea?{' '}
            <a href='mailto:solomon@krebe.dev' className={styles.emailLink}>
              send me an email
            </a>{' '}
            or drop a note in the form below.
          </p>

          <div className={styles.userEntries}>
            {formData.name && step > 0 && (
              <button
                onClick={() => setStep(0)}
                className={styles.editButton}
                disabled={isSubmitting}
              >
                <FontAwesomeIcon icon={faUserAlt} />
                <span className={styles.fieldValue}>{formData.name}</span>
              </button>
            )}
            {formData.email && step > 1 && (
              <button
                onClick={() => setStep(1)}
                className={styles.editButton}
                disabled={isSubmitting}
              >
                <FontAwesomeIcon icon={faEnvelope} />
                <span className={styles.fieldValue}>{formData.email}</span>
              </button>
            )}
          </div>
          <Stepper {...{ step, nextStepHandler, handleSubmit, isSubmitting }}>
            <div className={styles.formGroup}>
              <label htmlFor='name'>Name</label>
              <FontAwesomeIcon icon={faUserAlt} />
              <input
                onChange={handleChange}
                value={formData.name}
                type='text'
                name='name'
                id='name'
                placeholder='Enter your name'
                className={`${errorFlash && styles.errorHighlight}`}
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor='email'>Email Address</label>
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                onChange={handleChange}
                value={formData.email}
                type='email'
                placeholder='Enter your email address'
                name='email'
                id='email'
                className={`${errorFlash && styles.errorHighlight}`}
                disabled={isSubmitting}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.messageGroup}`}>
              <label htmlFor='message'>Message</label>
              <FontAwesomeIcon icon={faEdit} className={styles.editIcon} />
              <textarea
                onChange={handleChange}
                name='message'
                id='message'
                value={formData.message}
                placeholder='Enter your message'
                rows={5}
                className={`${errorFlash && styles.errorHighlight}`}
                disabled={isSubmitting}
              />
            </div>
          </Stepper>
          {Boolean(sendStatus) && (
            <div className={styles.toastNotif}>
              <div className={styles.toastNotifInner}>
                <p>
                  {sendStatus === 200
                    ? "I've got your message. I'll get back to you within 24hrs. Thank you."
                    : 'Sorry, your message could not be sent. Please try again later.'}
                </p>

                <button
                  className={styles.notifBtn}
                  onClick={() => setSendStatus('')}
                >
                  OK
                </button>
              </div>
            </div>
          )}

          <div className={styles.socials}>
            <h2>Let's get social</h2>
            <p>Connect with me on social media.</p>
            <ul className={styles.profileLinks}>
              {Object.entries(siteMetadata.author.socialProfiles).map(
                ([key, value]) => (
                  <li key={key} className={styles.profile}>
                    <a
                      href={value}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`${styles.profileLink} ${styles[key]}`}
                    >
                      <span>{socialIcons[key]}</span>
                      <span className={styles.networkName}>{key}</span>
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Contact

export const query = graphql`
  query ContactPageQuery {
    site {
      siteMetadata {
        title
        author {
          socialProfiles {
            twitter
            linkedIn
            github
          }
        }
      }
    }
  }
`
