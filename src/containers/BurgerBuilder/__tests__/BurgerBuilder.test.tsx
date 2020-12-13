import * as React from 'react'
import { screen } from '@testing-library/react'
import { createDummyStore, WrappedRender } from 'tests/testUtils'
import { dummyRootAppState } from 'tests/testObjects/dummyRootState'
import BurgerBuilder from '../BurgerBuilder'
import { dummyOrderIngredients } from 'tests/testObjects/dummyOrderData'
import userEvent from '@testing-library/user-event'

describe('BurgerBuilder', () => {
  const state = dummyRootAppState()
  state.burgerBuilder.ingredients = { ...dummyOrderIngredients }
  state.burgerBuilder.totalPrice = 10
  state.burgerBuilder.error = false
  state.auth.userId = 'xxxAAA'
  state.auth.token = '12345'

  test('renders correctly burger - closed modal and error', () => {
    const newState = { ...state }
    const burgerBuilder = { ...newState.burgerBuilder }

    newState.burgerBuilder = {
      ...burgerBuilder,
      error: true,
      ingredients: {},
    }

    const newStore = createDummyStore(newState)

    WrappedRender(<BurgerBuilder />, newStore)

    const heading = screen.queryByRole('heading', { name: /your order/i })
    const subText = screen.queryByText(
      /a delicious burger with the following ingredients:/i
    )

    const errorMsg = screen.getByText(/ingredients can't be loaded!/i)

    expect(heading).not.toBeInTheDocument()
    expect(subText).not.toBeInTheDocument()
    expect(errorMsg).toBeInTheDocument()
  })

  test('renders correctly burger - open modal', () => {
    const store = createDummyStore(state)

    WrappedRender(<BurgerBuilder />, store)

    const heading = screen.queryByRole('heading', { name: /your order/i })
    const subText = screen.queryByText(
      /a delicious burger with the following ingredients:/i
    )
    const list = screen.queryByRole('list')

    const currentPrice = screen.getByText(/current price:/i)
    const orderNow = screen.getByRole('button', {
      name: /order now/i,
    })

    expect(list).not.toBeInTheDocument()
    expect(heading).not.toBeInTheDocument()
    expect(subText).not.toBeInTheDocument()
    expect(currentPrice).toHaveTextContent(/current Price: 10.00/i)
    expect(orderNow).toBeInTheDocument()
  })

  test('clicks on order now and check the modal content', () => {
    const store = createDummyStore(state)

    WrappedRender(<BurgerBuilder />, store)

    const heading = screen.queryByRole('heading', { name: /your order/i })
    const subText = screen.queryByText(
      /a delicious burger with the following ingredients:/i
    )

    expect(heading).not.toBeInTheDocument()
    expect(subText).not.toBeInTheDocument()

    const orderButton = screen.getByRole('button', { name: /order now/i })
    userEvent.click(orderButton)

    const list = screen.getByRole('list')

    expect(list).toMatchInlineSnapshot(`
      <ul>
        <li>
          <span
            style="text-transform: capitalize;"
          >
            bacon
            :
          </span>
          3
        </li>
        <li>
          <span
            style="text-transform: capitalize;"
          >
            cheese
            :
          </span>
          1
        </li>
        <li>
          <span
            style="text-transform: capitalize;"
          >
            meat
            :
          </span>
          2
        </li>
        <li>
          <span
            style="text-transform: capitalize;"
          >
            salad
            :
          </span>
          1
        </li>
      </ul>
    `)

    const cancelBtn = screen.getByRole('button', { name: /cancel/i })
    const continueBtn = screen.getByRole('button', { name: /continue/i })
    const continueMsg = screen.getByText(/continue to checkout\?/i)
    const totalTxt = screen.getByText(/total price/i)

    expect(cancelBtn).toBeInTheDocument()
    expect(continueBtn).toBeInTheDocument()
    expect(continueMsg).toBeInTheDocument()
    expect(totalTxt).toHaveTextContent('Total Price: $10.00')
  })
})
