import { Action, Dispatch as ReduxDispatch } from 'redux';
import { AxiosError } from 'axios'

export interface DisableInfoType {
	[key: string]: boolean,
}

export interface IngredientsType {
	[key: string]: number,
}

export interface withErrorHandlerStateType {
	error: AxiosError | null
}

export type Dispatch = ReduxDispatch<Action>
