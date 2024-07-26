import { createReducer } from "@reduxjs/toolkit";

export const courseReducer = createReducer({courses:[],lectures:[]}, (builder) => {
    builder
        .addCase({type:'allcourseRequest'}, (state) => {
            state.loading = true
        })
        .addCase({type:'allcourseSuccess'}, (state, action) => {
            state.loading = false
            state.courses = action.payload
        })
        .addCase({type:'allcourseFailure'}, (state, action) => {
            state.loading = false
            state.error = action.payload
        }).addCase({type:'addtoPlaylistRequest'}, (state) => {
            state.loading = true
        }).addCase({type:'addtoPlaylistSuccess'}, (state, action) => {
            state.loading = false
            state.message = action.payload
        }).addCase({type:'addtoPlaylistFailure'}, (state, action) => {
            state.loading = false
            state.error = action.payload
        }).addCase({type:'getcourseRequest'}, (state) => {
            state.loading = true
        }).addCase({type:'getcourseSuccess'}, (state, action) => {
            state.loading = false
            state.lectures = action.payload
        }).addCase({type:'getcourseFailure'}, (state, action) => {
            state.loading = false
            state.error = action.payload
//         }).addCase({type:'deletecourseRequest'}, (state) => {
//             state.loading = true
//         }).addCase({type:'deletecourseSuccess'}, (state, action) => {
//             state.loading = false
//             state.message = action.payload
//         }).addCase({type:'deletecourseFailure'}, (state, action) => {
//             state.loading = false
//             state.error = action.payload
//         }).addCase({type:'updatecourseRequest'}, (state) => {
//             state.loading = true
//         }).addCase({type:'updatecourseSuccess'}, (state, action) => {
//             state.loading = false


        
// })

})
})