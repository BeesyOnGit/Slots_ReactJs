import { configureStore } from '@reduxjs/toolkit'
import betSlice from './betSlice'
import slots3statehandlerSlice from './slots3statehandlerSlice'
import slots4statehandlerSlice from './slots4statehandlerSlice'
import interactionsSlice from './interactionsSlice'
import userinformationsSlice from './userinformations'
/* import  profileSlice  from './profileSlice' */


export default configureStore({
    reducer: {
        betSlice: betSlice,
        userinformationsSlice : userinformationsSlice,
        slots3statehandlerSlice: slots3statehandlerSlice,
        slots4statehandlerSlice : slots4statehandlerSlice,
        interactionsSlice : interactionsSlice,
/*         profileSlice : profileSlice */
    }
})