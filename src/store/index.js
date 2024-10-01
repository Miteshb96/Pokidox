import {configureStore, createSlice} from "@reduxjs/toolkit";

const initialState = {
    pokemonList: {},
    offset: 0,
    pageOffset: 0,
    maleList: [],
    femaleList: [],
    genderLessList: []
};

const insertData = createSlice({
    name: "insert",
    initialState,
    reducers: {
        put(state, action){
            state.pokemonList = action.payload
        },
        setoffset(state, action){
            state.offset = action.payload;
        },
        setPageOffset(state, action){
            state.pageOffset = action.payload;
        },
        setMaleList(state, action) {
            state.maleList = action.payload;
        },
        setFemaleList(state, action) {
            state.femaleList = action.payload;
        },
        setGenderLessList(state, action) {
            state.genderLessList = action.payload;
        }
    }
})

const store = configureStore({reducer: insertData.reducer});

export const storeActions = insertData.actions;

export default store;