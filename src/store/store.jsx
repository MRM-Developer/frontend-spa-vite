// Importing the createStore function from Redux to create a Redux store
import { configureStore } from '@reduxjs/toolkit';
// Importing persistStore and persistReducer from redux-persist for state persistence across sessions
import { persistStore, persistReducer } from 'redux-persist';
// Importing the default storage engine from redux-persist, which uses localStorage for web applications
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// Importing the rootReducer which combines all the individual reducers for the Redux store
// import rootReducer from './reducers';


// Dummy reducer that just returns state as is
/* eslint-disable-next-line no-unused-vars */
const dummyReducer = (state = {}, action) => state;

// Configuration object for redux-persist
const persistConfig = {
    // The key for the storage, used to identify the persisted data
    key: 'root',
    // Specifying the storage engine to use for persistence
    storage,
};

// Creating a persisted reducer using the rootReducer and the persistConfig
const persistedReducer = persistReducer(persistConfig, dummyReducer);

// Configure the store using Redux Toolkit
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        })
});

// Creating the persistor, which will manage the persistence of the Redux store
export const persistor = persistStore(store);


// Logic to clear persistor if we close the tab/browser. In case of reload in keeps the data from persist:root
document.addEventListener('DOMContentLoaded', function() {
    // Check if the sessionStorage marker exists
    var isTabActive = sessionStorage.getItem('isTabActive');
    if (!isTabActive) {
        // Set sessionStorage marker
        sessionStorage.setItem('isTabActive', true);
    }
});
window.addEventListener('beforeunload', () => {
    // Check if the sessionStorage marker exists
    const isTabActive = sessionStorage.getItem('isTabActive');
    if (!isTabActive) {
        // Clear persist:root if isTabActive is missing
        localStorage.removeItem('persist:root');
    }
    // Remove the session marker
    sessionStorage.removeItem('isTabActive');
});