import React, { useEffect, Suspense, useCallback } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { IntlProvider } from 'react-intl'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import translationMessages from './i18n/translationMessages'
import Logout from './containers/Auth/Logout/Logout'
import { useDispatch, useSelector } from 'react-redux'
import { authCheckState } from './redux/actions/authActions'
import { RootStateType } from './redux/rootTypes'
import Spinner from './components/UI/Spinner/Spinner'

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
})

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
})

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
})

const App = () => {
  const isAuthenticated = useSelector((state: RootStateType) => state.auth.token !== '')
  const isAuthInitialized = useSelector((state: RootStateType) => state.auth.authInitialized)

  const dispatch = useDispatch()

  const onTryAutoSignup = useCallback(() => dispatch(authCheckState()), [dispatch])

  useEffect(() => {
    onTryAutoSignup()
  }, [onTryAutoSignup])

  let routes: React.ReactNode = <Spinner />

  if (isAuthInitialized) {
    routes = (
        <Switch>
          <Route path="/auth" render={(props) => <Auth {...props }/>}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
    )

    if (isAuthenticated) {
      routes = (
          <Switch>
            <Route path="/checkout" render={(props) => <Checkout {...props }/>}/>
            {/* @ts-ignore*/}
            <Route path="/orders" render={(props) => <Orders {...props } />}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/auth" render={(props) => <Auth {...props }/>}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/"/>
          </Switch>
      )
    }
  }

  return (
      <div>
        <IntlProvider
            key="en"
            locale="en"
            defaultLocale="en"
            messages={translationMessages['en']}
        >
          <Layout>
            <Suspense fallback={<p>Loading...</p>}>
              {routes}
            </Suspense>
          </Layout>
        </IntlProvider>
      </div>
  )
}

export default withRouter(App)
