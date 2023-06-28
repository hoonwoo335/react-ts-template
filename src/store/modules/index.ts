//import { combineReducers } from 'redux';
import { combineReducers } from '@reduxjs/toolkit'
import toastReducer from './toast.module';


const rootReducer = combineReducers({
  // for hooks
  
  // old reducer
  toastReducer,

});

/*const rootReducer = combineReducers({
  // for hooks
  mypage: mypageReducer,
  stat: statReducer,
  header: headerReducer,
  account: accountReducer,
  auction: auctionReducer,
  search: searchReducer,
  exchange: exchangeReducer,
  extra: extraReducer,
  nft: nftReducer,
  
  // old reducer
  toast: toastReducer,

});*/

export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;