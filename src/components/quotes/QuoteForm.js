import { useRef, useState } from 'react'
import { Prompt } from 'react-router'

import Card from '../UI/Card'
import LoadingSpinner from '../UI/LoadingSpinner'
import classes from './QuoteForm.module.css'

const QuoteForm = ({ onAddQuote, isLoading }) => {
  const [isEntering, setIsEntering] = useState(false)
  const authorInputRef = useRef()
  const textInputRef = useRef()

  const submitFormHandler = event => {
    event.preventDefault()

    const enteredAuthor = authorInputRef.current.value
    const enteredText = textInputRef.current.value

    // optional: Could validate here

    onAddQuote({ author: enteredAuthor, text: enteredText })
  }

  const formFocusedHandler = () => {
    setIsEntering(true)
  }

  const finishEnteringHandler = () => {
    setIsEntering(false)
  }

  return (
    <>
      <Prompt
        when={isEntering}
        message={location => 'are you sure you want to leave?'}
      />
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor='author'>Author</label>
            <input type='text' id='author' ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='text'>Text</label>
            <textarea id='text' rows='5' ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className='btn'>
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  )
}

export default QuoteForm
