import React from 'react'

// @ts-ignore
const asyncComponent = (importComponent) => {
	return class extends React.Component {
		state = {
			component: null
		}

		componentDidMount() {
			importComponent()
					// @ts-ignore
					.then(cmp => {
						this.setState({component: cmp.default})
					})
		}

		render () {
			const C = this.state.component

			// @ts-ignore
			return C ? <C {...this.props} /> : null;
		}
	}
}

export default asyncComponent
