import React from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { IntlProvider } from 'react-intl'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import translationMessages from './i18n/translationMessages'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { authCheckSate } from './redux/actions/authActions'
import { RootStateTypes } from './redux/rootTypes'

class App extends React.Component {
  componentDidMount() {
    // @ts-ignore
    this.props.onTryAutoSignup()
  }

  render () {
    let routes: React.ReactNode = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
    )

    // @ts-ignore
    if (this.props.isAuthenticated) {
      routes = (
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
      )
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

const mapStateToProps = (state: RootStateTypes) => ({
  isAuthenticated: state.auth.token !== '',
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // @ts-ignore
  onTryAutoSignup: () => dispatch(authCheckSate())
})

// @ts-ignore
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
