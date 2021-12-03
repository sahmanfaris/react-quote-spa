import { Redirect, Route, Switch } from 'react-router'
import Layout from './components/layout/Layout'
import AllQuotes from './pages/AllQuotes'
import NewQuote from './pages/NewQuote'
import QuoteDetail from './pages/QuoteDetail'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/quotes' />
        </Route>
        <Route exact path='/quotes'>
          <AllQuotes />
        </Route>
        <Route path='/quotes/:id'>
          <QuoteDetail />
        </Route>
        <Route path='/new-quote'>
          <NewQuote />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
