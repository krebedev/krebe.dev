import React from 'react'
import { buttonStyles } from '../Button/styles.module.css'

const Stepper = (props) => {
  const { children, step, nextStepHandler, handleSubmit, isSubmitting } = props
  const fieldsArray = React.Children.toArray(children)
  const currentField = fieldsArray[step]
  const isLastStep = step === fieldsArray.length - 1

  const stepHandler = () => {
    if (isLastStep) return
    nextStepHandler()
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {currentField}

      {!isLastStep && (
        <button onClick={stepHandler} type='button' className={buttonStyles}>
          Next <span>&#8594;</span>
        </button>
      )}

      {isLastStep && (
        <button type='submit' className={buttonStyles} disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      )}
    </form>
  )
}

export default Stepper
