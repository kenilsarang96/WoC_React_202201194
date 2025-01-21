import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    files:[
        {
            id: 1,
            name : "main",
            language :"javascript",
            code : "console.log('Hello, World!');",
        },
    ],
    selectedFileId : 1
}

const fileSlice = createSlice({
    name : "file",
    initialState,
    reducers :{
         addFile : (state,action) =>{
            const {name,language,code} = action.payload;
            const newFile = {
                id : nanoid(),
                name,
                language,
                code,
            }
            state.files.push(action.payload);
         },
         deleteFile : (state,action)=>{
            state.files = state.files.filter((file)=> file.id !== action.payload);
            if(state.selectedFileId == action.payload){
                state.selectedFileId = state.files[0].id;
            }
         },
         updateFileCode : (state,action)=>{
            const {id,code} = action.payload;
            state.files.map((file)=>{
                if(file.id == id){
                    file.code = code;
                }
            })
         },
         selectFile : (state,action)=>{
            state.selectedFileId = action.payload;
         },
         updateFileName : (state,action)=>{
            const {id,name} = action.payload;
            state.files.map((file)=>{
                if(file.id == id){
                    file.name = name;
                }
            })
         }
    }
})


export const {addFile,deleteFile,updateFileCode,selectFile,updateFileName} = fileSlice.actions;
export default fileSlice.reducer;