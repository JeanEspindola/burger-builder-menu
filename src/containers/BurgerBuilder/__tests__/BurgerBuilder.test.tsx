import * as React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { createDummyStore, WrappedRender } from 'tests/testUtils'
import { dummyRootAppState } from 'tests/testObjects/dummyRootState'
import BurgerBuilder from '../BurgerBuilder'
import { dummyOrderIngredients } from 'tests/testObjects/dummyOrderData'
import userEvent from '@testing-library/user-event'
import { addIngredient, removeIngredient } from '../../../redux/actions/burgerBuilderActions'
import { IngredientsEnum } from '../../../utils/constants'
import { setAuthRedirectPath } from '../../../redux/actions/authActions'
import { purchaseInit } from '../../../redux/actions/orderActions'

describe('BurgerBuilder', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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

  test('clicks on order now, check the modal content and close the modal', () => {
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

    const cancelBtn = screen.getByRole('button', { name: /cancel/i })
    const continueBtn = screen.getByRole('button', { name: /continue/i })
    const continueMsg = screen.getByText(/continue to checkout\?/i)
    const totalTxt = screen.getByText(/total price/i)

    expect(cancelBtn).toBeInTheDocument()
    expect(continueBtn).toBeInTheDocument()
    expect(continueMsg).toBeInTheDocument()
    expect(totalTxt).toHaveTextContent('Total Price: $10.00')

    userEvent.click(cancelBtn)

    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  test('clicks on order now, check the modal content and proceed with the order', async () => {
    const store = createDummyStore(state)

    WrappedRender(<BurgerBuilder />, store)

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

    const continueBtn = screen.getByRole('button', { name: /continue/i })

    await waitFor(() => {
      userEvent.click(continueBtn)
    })

    expect(store.dispatch).toHaveBeenCalledWith(
      purchaseInit()
    )
  })

  test('clicks on order now when not authenticated', async () => {
    const newState = { ...state }
    const auth = { ...newState.auth }

    newState.auth = {
      ...auth,
      token: '',
    }

    const store = createDummyStore(newState)

    WrappedRender(<BurgerBuilder />, store)

    const orderButton = screen.queryByRole('button', { name: /order now/i })
    expect(orderButton).not.toBeInTheDocument()

    const signUpToOrder = screen.getByRole('button', { name: /sign up to order/i })

    await waitFor(() => {
      userEvent.click(signUpToOrder)
    })

    expect(store.dispatch).toHaveBeenCalledWith(
      setAuthRedirectPath('/checkout')
    )
  })

  test('add an remove ingredients to the burger', () => {
    const store = createDummyStore(state)

    WrappedRender(<BurgerBuilder />, store)

    const baconLess = screen.getByTestId('less-Bacon')
    const baconMore = screen.getByTestId('more-Bacon')

    expect(baconLess).toBeInTheDocument()
    expect(baconMore).toBeInTheDocument()

    userEvent.click(baconLess)

    expect(store.dispatch).toHaveBeenCalledWith(
      removeIngredient(IngredientsEnum.bacon)
    )

    userEvent.click(baconMore)

    expect(store.dispatch).toHaveBeenCalledWith(
      addIngredient(IngredientsEnum.bacon)
    )
  })
})
