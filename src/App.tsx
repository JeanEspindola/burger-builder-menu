import React from 'react';
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
import asyncComponent from './hoc/asyncComponent/asynComponent'

type Props = {
  isAuthenticated: boolean
  isAuthInitialized: boolean
}

type DispatchProps = {
  onTryAutoSignup: () => void
}

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})

class App extends React.Component<Props & DispatchProps> {
  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render () {
    const { isAuthInitialized, isAuthenticated} = this.props

    let routes: React.ReactNode = <Spinner />

    if (isAuthInitialized) {
      routes = (
          <Switch>
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
      )

      if (isAuthenticated) {
        routes = (
            <Switch>
              <Route path="/checkout" component={asyncCheckout} />
              <Route path="/orders" component={asyncOrders} />
              <Route path="/logout" component={Logout} />
              <Route path="/auth" component={asyncAuth} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
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
              {routes}
            </Layout>
          </IntlProvider>
        </div>
    )
  }
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
