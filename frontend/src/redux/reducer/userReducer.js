import { createReducer } from '@reduxjs/toolkit';


const initialstate = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  message: null
}

export const userReducer = createReducer(initialstate, (builder) => {
  builder
    .addCase('loginRequest', (state) => {
      state.loading = true;
    })
    .addCase('loginSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    })
    .addCase('loginFailure', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    })
    .addCase('clearError', (state) => {
      state.error = null;
    })
    .addCase('clearMessage', (state) => {
      state.message = null;
    })
    .addCase('loadUserRequest', (state) => {
      state.loading = true;
    })
    .addCase('loadUserSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.message = action.payload.message;
    })
    .addCase('loadUserFailure', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    })
    .addCase('logoutRequest', (state) => {
      state.loading = true;
    })
    .addCase('logoutSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload.message;
    })
    .addCase('logoutFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    }).addCase('RegisterRequest', (state) => {
      state.loading = true;
    })
    .addCase('RegisterSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.message = action.payload.message;
    })
    .addCase('RegisterFailure', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    })
});


export const updateprofileReducer = createReducer({}, (builder) => {
  builder
    .addCase('updateprofileRequest', (state) => {
      state.loading = true;
    })
    .addCase('updateprofileSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      
      state.message = action.payload;
    })
    .addCase('updateprofileFailure', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    }).addCase('clearError', (state) => {
      state.error = null;
    })
    .addCase('clearMessage', (state) => {
      state.message = null;
    }).addCase('changePasswordRequest', (state) => {
      state.loading = true;
    })
    .addCase('changePasswordSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      
      state.message = action.payload;
    })
    .addCase('changePasswordFailure', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    }).addCase('updatepictureRequest', (state) => {
      state.loading = true;
    })
    .addCase('updatepictureSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      
      state.message = action.payload;
    })
    .addCase('updatepictureFailure', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    }).addCase('forgetpasswordRequest', (state) => {
      state.loading = true;
    })
    .addCase('forgetpasswordSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      
      state.message = action.payload;
    })
    .addCase('forgetpasswordFailure', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    }).addCase('resetpasswordRequest', (state) => {
      state.loading = true;
    })
    .addCase('resetpasswordSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      
      state.message = action.payload;
    })
    .addCase('resetpasswordFailure', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    }).addCase({type:'removeFromPlaylistRequest'},(state)=>{
      state.loading = true
    }).addCase({type:'removeFromPlaylistSuccess'},(state,action)=>{
      state.loading = false
      state.message = action.payload
    }).addCase({type:'removeFromPlaylistFailure'},(state,action)=>{
      state.loading = false
      state.error = action.payload
    })
})

export const subscriptionreducer = createReducer({}, (builder) => {
  builder
    .addCase({type:'buysubscribeRequest'},(state)=>{
      state.loading = true
    }).addCase({type:'buysubscribeSuccess'},(state,action)=>{
      state.loading = false
      state.subscriptionId = action.payload
    }).addCase({type:'buysubscribeFailure'},(state,action)=>{
      state.loading = false
      state.error = action.payload
    }).addCase({type:'clearError'},(state)=>{
      state.error = null
    }).addCase({type:'clearMessage'},(state)=>{
      state.message = null
    }).addCase({type:'cancelsubscribeRequest'},(state)=>{
      state.loading = true
    }).addCase({type:'cancelsubscribeSuccess'},(state,action)=>{
      state.loading = false
      state.message = action.payload
    }).addCase({type:'cancelsubscribeFailure'},(state,action)=>{
      state.loading = false
      state.error = action.payload
    })
})