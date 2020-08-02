import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'

const FormikErrorHandleFocus = () => {
  // Get the context for the Formik form this component is rendered into.
  const { isSubmitting, isValidating, errors } = useFormikContext()
  console.log('errors:', errors)

  useEffect(() => {
    // Get all keys of the error messages.
    const keys = Object.keys(errors)

    // Whenever there are errors and the form is submitting but finished validating.
    if (keys.length > 0 && isSubmitting && !isValidating) {
      // We grab the first input element that error by its name.
      const errorElementInput = document.querySelector(`input[name="${keys[0]}"]`)
      const errorElementTextarea = document.querySelector(`textarea[name="${keys[0]}"]`)
      console.log('errorElementInput:', errorElementInput)

      if (errorElementInput) {
        // When there is an input, scroll this input into view.
        errorElementInput.scrollIntoView({ behavior: "smooth" })
      }

      if (errorElementTextarea) {
        errorElementTextarea.scrollIntoView({ behavior: "smooth" })

      }
    }
  }, [isSubmitting, isValidating, errors])

  // This component does not render anything by itself.
  return null
}


export default FormikErrorHandleFocus;