import {createSlice} from "@reduxjs/toolkit"

const quizSlice = createSlice({
    name : "quiz",
    initialState : {
        quiz : {},
        defaultimer : 0,
        timer : 0,
        correctanswer : 0,
        impression : false
    },
    reducers : {
        addquiz : (state, action) =>{
            state.quiz = action.payload
            state.quiz.impression += 1
            state.impression = true
        },
        increaseanswer : (state) => {
            state.correctanswer += 1
        },
        settimer : (state, action) =>{
            state.timer = state.timer - 1
        },
        setdefaulttimer : (state, action) =>{
            state.defaultimer = action.payload
            state.timer = action.payload
        },
        settimerwithdefault : (state, action) =>{
            state.timer = state.defaultimer
        }, 
        updatequiz : (state, action) =>{
            let selectedoption = action.payload.selectedoption
            let selectedquestion = action.payload.selectedquestion
            if(state.quiz.quiztype == "poll"){
                if(selectedoption == 0) state.quiz.pollarr[selectedquestion].optionA += 1
                if(selectedoption == 1) state.quiz.pollarr[selectedquestion].optionB += 1
                if(selectedoption == 2) state.quiz.pollarr[selectedquestion].optionC += 1
                if(selectedoption == 3) state.quiz.pollarr[selectedquestion].optionD += 1          
            }
            else{
                state.quiz.questionarr[action.payload.selectedquestion].correct += action.payload.correct
                state.quiz.questionarr[action.payload.selectedquestion].incorrect += action.payload.incorrect
            }
        }
    }
})

export const {addquiz, settimer, setdefaulttimer, settimerwithdefault, updatequiz, increaseanswer} = quizSlice.actions
export default quizSlice.reducer