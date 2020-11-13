import React from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { IntlProvider } from 'react-intl'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import translationMessages from './i18n/translationMessages'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { authCheckSate } from './redux/actions/authActions'
import { RootStateTypes } from './redux/rootTypes'
import Spinner from './components/UI/Spinner/Spinner'
import asyncComponent from './hoc/asyncComponent/asynComponent'

interface Props {
  isAuthenticated: boolean
  isAuthInitialized: boolean
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

class App extends React.Component {
  componentDidMount() {
    // @ts-ignore
    this.props.onTryAutoSignup()
  }

  render () {

    let routes: React.ReactNode = <Spinner />

    // @ts-ignore
    if (this.props.isAuthInitialized) {
      routes = (
          <Switch>
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
      )

      // @ts-ignore
      if (this.props.isAuthenticated) {
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

const mapStateToProps = (state: RootStateTypes): Props => ({
  isAuthenticated: state.auth.token !== '',
  isAuthInitialized: state.auth.authInitialized,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // @ts-ignore
  onTryAutoSignup: () => dispatch(authCheckSate())
})

// @ts-ignore
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
