import { useEffect } from 'react'
import { Route, useParams, useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'
import Comments from '../components/comments/Comments'
import HiglightedQuote from '../components/quotes/HighlightedQuote'
import NoQuotesFound from '../components/quotes/NoQuotesFound'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'

const QuoteDetail = () => {
  const { path, url } = useRouteMatch()
  const { id } = useParams()

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true)

  useEffect(() => {
    sendRequest(id)
  }, [sendRequest, id])

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }

  if (status === 'error') {
    return <p className='centered'>{error}</p>
  }

  if (!loadedQuote.text) {
    return <NoQuotesFound />
  }
  // use nested routes to conditionally render some components
  return (
    <div>
      <HiglightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route exact path={`${path}`}>
        <div className='centered'>
          <Link className='btn--flat' to={`${url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${path}/comments`}>
        <Comments />
      </Route>
    </div>
  )
}

export default QuoteDetail

{
  /* or this since it is just route and not the link*/
}
{
  /* <Route path='/quotes/:id/comments'}> */
}
