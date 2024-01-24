import axios from "axios";
import { commonapiurl } from "../Constant";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addquiz, settimer, setdefaulttimer} from "../redux/quizslice";

export const useGetquiz = () =>{
    const quizid = useLocation().pathname.split("/")[2];
    const quiz = useSelector(store => store.quiz.quiz)
    const dispatch = useDispatch()
    useEffect(() => {
        axios
          .get(commonapiurl + "getsinglequiz/" + quizid)
          .then((response) => {
            dispatch(addquiz(response.data.quiz))
            dispatch(setdefaulttimer(response.data.quiz.timer))
            console.log(response.data.quiz);
          })
          .catch(() => {
            console.log("something went wrong");
          });
    }, []);
    return quiz
}