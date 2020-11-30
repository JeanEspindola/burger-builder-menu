import { FormInputValidation } from '../../containers/Checkout/ContactData/ContactDataTypes'
import { checkValidity } from '../helper'

describe('helper', () => {
	describe('checkValidity', () => {
		const formValidityZipCode: FormInputValidation = {
			required: true,
			isEmail: false,
			minLength: 5,
			maxLength: 5,
		}

		const formValidityEmail: FormInputValidation = {
			required: true,
			isEmail: true,
		}

		it('validate zipcode truthy', () => {
			expect(checkValidity('80000', formValidityZipCode)).toBeTruthy()
		})

		it('validate zipcode falsy', () => {
			expect(checkValidity('8000', formValidityZipCode)).toBeFalsy()
		})

		it('validate email truthy', () => {
			expect(checkValidity('aaa@bb.com', formValidityEmail)).toBeTruthy()
		})

		it('validate email falsy', () => {
			expect(checkValidity('aaa@ddd', formValidityEmail)).toBeFalsy()
		})
	})
})
