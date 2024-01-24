import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizslice";

const store = configureStore({
    reducer : {
        quiz : quizReducer
    }
})

export default store