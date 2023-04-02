import { combineReducers } from '@reduxjs/toolkit'
import application from './application/reducer'
import web3Context from './global/web3ContextSlice'
import transactions from './transactions/reducer'

const reducer = combineReducers({
  application,
  web3Context,
  transactions
})

export default reducer
