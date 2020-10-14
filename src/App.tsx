import React from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { IntlProvider } from 'react-intl'
import translationMessages from './i18n/translationMessages'

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
              <BurgerBuilder/>
            </Layout>
          </IntlProvider>
        </div>
    )
  }
}

export default App;
