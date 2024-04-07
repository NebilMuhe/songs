import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

// import reducer from '../reducers/reducer'
import sagaSong from '../redux-saga/saga'
import slice from '../slice/slice'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer:{
    songs: slice,
  }, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({  serializableCheck: false}).concat(sagaMiddleware),
})

sagaMiddleware.run(sagaSong)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
