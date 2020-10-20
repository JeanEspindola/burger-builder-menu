import React from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { IntlProvider } from 'react-intl'
import { Route, Switch } from 'react-router-dom'
import translationMessages from './i18n/translationMessages'
import Checkout from './containers/Checkout/Checkout'

class App extends React.Component {
  render () {
    return (
        <div>
          <IntlProvider
              key="en"
              locale="en"
              defaultLocale="en"
              messages={translationMessages['en']}
          >
            <Layout>
              <Switch>
                <Route path="/checkout" component={Checkout} />
                <Route path="/" exact component={BurgerBuilder} />
              </Switch>
            </Layout>
          </IntlProvider>
        </div>
    )
  }
}

export default App;
