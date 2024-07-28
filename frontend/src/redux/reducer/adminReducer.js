import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer({}, (builder) => {
    builder
        .addCase("CreatecoureRequest", (state, action) => {
            state.loading = true;
        })
        .addCase("CreatecoureSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("CreatecoureFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase("deletecourseRequest", (state, action) => {
            state.loading = true;
        })
        .addCase("deletecourseSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("deletecourseFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase('addlectureRequest', (state, action) => {
            state.loading = true;
        })
        .addCase('addlectureSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('addlectureFailure', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase('getalluserRequest',(state,action)=>{
            state.loading = true
        }).addCase('getalluserSuccess',(state,action)=>{
            state.loading = false;
            state.users = action.payload
        }).addCase('getalluserFailure',(state,action)=>{
            state.loading = false;
            state.error = action.payload
        }).addCase('deleteuserRequest',(state,action)=>{
            state.loading = true
        }).addCase('deleteuserSuccess',(state,action)=>{
            state.loading = false;
            state.message = action.payload
        }).addCase('deleteuserFailure',(state,action)=>{
            state.loading = false;
            state.error = action.payload
        }).addCase('updateroleRequest',(state,action)=>{
            state.loading = true
        }).addCase('updateroleSuccess',(state,action)=>{
            state.loading = false;
            state.message = action.payload
        }).addCase('updateroleFailure',(state,action)=>{
            state.loading = false;
            state.error = action.payload
        }).addCase('getadminstats',(state,action)=>{
            state.loading = true
        }).addCase('getadminstatsSuccess',(state,action)=>{
            state.loading = false;
            state.stats = action.payload
            state.viewcount = action.payload.viewcount
            state.subscribecount = action.payload.subscribecount
            state.usercount = action.payload.usercount
            state.subscriptionpercentage = action.payload.subscriptionpercentage
            state.viewspercentage = action.payload.viewspercentage
            state.userpercentage = action.payload.userpercentage
            state.subscriptionprofit = action.payload.subscriptionprofit
            state.viewsprofit = action.payload.viewsprofit
            state.userprofit = action.payload.userprofit

        }).addCase('getadminstatsFailure',(state,action)=>{
            state.loading = false;
            state.error = action.payload
        }).addCase('deletelectureRequest',(state,action)=>{
            state.loading = true
        }).addCase('deletelectureSuccess',(state,action)=>{
            state.loading = false;
            state.message = action.payload
        }).addCase('deletelectureFailure',(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

    


})