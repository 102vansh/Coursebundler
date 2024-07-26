// // import {configureStore} from '@reduxjs/toolkit';
// // import { subscriptionreducer, updateprofileReducer, userReducer } from './reducer/userReducer';
// // import { courseReducer } from './reducer/courseReducer';
// // import { adminReducer } from './reducer/adminReducer';

// // const store = configureStore({

// //     reducer: {
// // user:userReducer,
// // profile: updateprofileReducer,
// // course:courseReducer,
// // subscription:subscriptionreducer,
// // admin:adminReducer
// //     },
// // })   

// // export default store


// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import { PersistGate } from 'redux-persist/integration/react';
// import { subscriptionreducer, updateprofileReducer, userReducer } from './reducer/userReducer';
// import { courseReducer } from './reducer/courseReducer';
// import { adminReducer } from './reducer/adminReducer';
// import { combineReducers } from 'redux';

// // Combine your reducers
// const rootReducer = combineReducers({
//     user: userReducer,
//     profile: updateprofileReducer,
//     course: courseReducer,
//     subscription: subscriptionreducer,
//     admin: adminReducer,
// });

// // Persist configuration
// const persistConfig = {
//     key: 'root',
//     storage,
//     version:1,
// };

// // Create a persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure the store with the persisted reducer
// const store = configureStore({
//     reducer: persistedReducer,
//     middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
//         serializableCheck:false
//     })
// });

// // Create a persistor
// const persistor = persistStore(store);

// export { store, persistor };


import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { subscriptionreducer, updateprofileReducer, userReducer } from './reducer/userReducer';
import { courseReducer } from './reducer/courseReducer';
import { adminReducer } from './reducer/adminReducer';
import { combineReducers } from 'redux';

// Combine your reducers
const rootReducer = combineReducers({
    user: userReducer,
    profile: updateprofileReducer,
    course: courseReducer,
    subscription: subscriptionreducer,
    admin: adminReducer,
});

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    whitelist: ['user', 'profile', 'course', 'subscription', 'admin'], // Optional: specify which reducers to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
