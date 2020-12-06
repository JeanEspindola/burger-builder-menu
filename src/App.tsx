import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { IntlProvider } from 'react-intl'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import translationMessages from './i18n/translationMessages'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { authCheckState } from './redux/actions/authActions'
import { RootStateType } from './redux/rootTypes'
import Spinner from './components/UI/Spinner/Spinner'

type Props = {
  isAuthenticated: boolean
  isAuthInitialized: boolean
}

type DispatchProps = {
  onTryAutoSignup: () => void
}

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
})

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
})

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
})

const App = (props: Props & DispatchProps) => {
  const { onTryAutoSignup , isAuthInitialized, isAuthenticated} = props
  useEffect(() => {
    onTryAutoSignup()
  }, [onTryAutoSignup])

  let routes: React.ReactNode = <Spinner />

  if (isAuthInitialized) {
    routes = (
        <Switch>
          {/*@ts-ignore*/}
          <Route path="/auth" render={(props) => <Auth {...props }/>}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
    )

    if (isAuthenticated) {
      routes = (
          <Switch>
            {/*@ts-ignore*/}
            <Route path="/checkout" render={(props) => <Checkout {...props }/>}/>
            {/*@ts-ignore*/}
            <Route path="/orders" render={(props) => <Orders {...props } />}/>
            <Route path="/logout" component={Logout}/>
            {/*@ts-ignore*/}
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

const mapStateToProps = (state: RootStateType): Props => ({
  isAuthenticated: state.auth.token !== '',
  isAuthInitialized: state.auth.authInitialized,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  // @ts-ignore
  onTryAutoSignup: () => dispatch(authCheckState())
})

// @ts-ignore
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
