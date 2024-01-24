import React, { useEffect, useState } from "react";
import styles from "./Quizplaycard.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { commonapiurl } from "../../Constant";
import { useGetquiz } from "../../hooks/useGetquiz";
import { useDispatch, useSelector } from "react-redux";
import { increaseanswer, settimer, settimerwithdefault, updatequiz } from "../../redux/quizslice";
const Quizplaycard = ({setshowcongratspage}) => {
  const dispatch = useDispatch()
  const quiz = useGetquiz();
  const timer = useSelector(store=>store.quiz.timer)
  const quizid = useLocation().pathname.split("/")[2];
  const [selectedoption, setselectedoption] = useState(-1);
  const [selectedquestion, setselectedquestion] = useState(-1);
  const [timeoutarr, settimeoutarr] = useState([])
  const [showcongrats, setshowcongrats] = useState(false)
  let interval = ""
  if(showcongrats){
    axios.patch(commonapiurl+"updatequiz/" + quizid, quiz)
    .then((response)=>{
      console.log(response.data);
    })
    .catch(err => {
      console.log("error occured");
    })  
    setshowcongratspage(true)
  }

  useEffect(() => {
    if(timer > 0){
      const timeoutid = setTimeout(() => {
        dispatch(settimer())
      }, 1000)
      settimeoutarr([...timeoutarr, timeoutid])
    }else{
      dispatch(settimerwithdefault())
      setselectedquestion(selectedquestion + 1)
      setselectedoption(-1)
      if(JSON.stringify(quiz) != "{}"){
        dispatch(updatequiz(
          {
            correct : 0,
            selectedquestion : selectedquestion,
            incorrect : 1
          }
        ))
        if(selectedquestion == quiz.questionarr.length - 1){
          setshowcongrats(true)
        }  
      }
    }
  }, [timer]);

  function handlenext(){
    if(selectedoption == -1) return;
    setselectedquestion(selectedquestion + 1)
    setselectedoption(-1)
    if(quiz.quiztype == "poll"){
      dispatch(updatequiz({selectedoption, selectedquestion}))
      if(selectedquestion == quiz.pollarr.length - 1){
        setshowcongrats(true)
      }
      return;
    }
    dispatch(settimerwithdefault())
    for(let i = 0; i < timeoutarr.length; i++){
      clearTimeout(timeoutarr[i])
    }
    if(quiz.questionarr[selectedquestion].correctoption - 1 == selectedoption){
      dispatch(updatequiz(
        {
          correct : 1,
          selectedquestion : selectedquestion,
          incorrect : 0
        }
      ))
      dispatch(increaseanswer())
    }else{
      dispatch(updatequiz(
        {
          correct : 0,
          selectedquestion : selectedquestion,
          incorrect : 1
        }
      ))
    }
    if(selectedquestion == quiz.questionarr.length - 1){
      setshowcongrats(true)
    }
  }
  return (
    <>
    {
    <div className={styles.quizplaycard}>
      <div className={styles.timerquestionnumber}>
        {
          quiz?.quiztype == "qna" ?
          <h3>
            0{selectedquestion + 1}/0{quiz?.questionarr?.length}
          </h3>
          :
          <h3>
            0{selectedquestion + 1}/0{quiz?.pollarr?.length}
          </h3>          
        }
        {
          timer != 0 ? 
          <h3>00:{timer < 10 ? "0" + timer : timer}s</h3>
          :
          <h3></h3>
        }
      </div>
      {
        quiz?.quiztype == "qna" ?
        <h2>{quiz?.questionarr?.[selectedquestion]?.question}</h2>
        :
        <h2>{quiz?.pollarr?.[selectedquestion]?.question}</h2>
      }
      {
        quiz?.quiztype == "qna" ?
      <div className={styles.optioncards}>
        {quiz?.questionarr?.[selectedquestion]?.option.map(
          (optionobj, index) => {
            return (
              (optionobj.text || optionobj.img) && (
                <div
                  className={
                    selectedoption == index
                      ? `${styles.optioncard} ${styles.selectedoption}`
                      : styles.optioncard
                  }
                  onClick={() => setselectedoption(index)}
                >
                  {quiz?.questionarr[selectedquestion].optiontype ==
                    "text" && <p>{optionobj.text}</p>}
                  {quiz?.questionarr[selectedquestion].optiontype ==
                    "img" && <img src={optionobj.img} alt="" />}
                  {quiz?.questionarr[selectedquestion].optiontype ==
                    "textimg" && (
                    <>
                      <img src={optionobj.img} alt="" />
                      <p>{optionobj.text}</p>
                    </>
                  )}
                </div>
              )
            );
          }
          )}
      </div>
      :
      <div className={styles.optioncards}>
      {quiz?.pollarr?.[selectedquestion]?.option.map(
        (optionobj, index) => {
          return (
            (optionobj.text || optionobj.img) && (
              <div
                className={
                  selectedoption == index
                    ? `${styles.optioncard} ${styles.selectedoption}`
                    : styles.optioncard
                }
                onClick={() => setselectedoption(index)}
              >
                {quiz?.pollarr[selectedquestion].optiontype ==
                  "text" && <p>{optionobj.text}</p>}
                {quiz?.pollarr[selectedquestion].optiontype ==
                  "img" && <img src={optionobj.img} alt="" />}
                {quiz?.pollarr[selectedquestion].optiontype ==
                  "textimg" && (
                  <>
                    <img src={optionobj.img} alt="" />
                    <p>{optionobj.text}</p>
                  </>
                )}
              </div>
            )
          );
        }
        )}
    </div>
      }
      {
      quiz?.quiztype == "qna"?
      <button onClick={handlenext}>{selectedquestion != quiz?.questionarr?.length - 1 ? "NEXT" : "SUBMIT"}</button>
      :
      <button onClick={handlenext}>{selectedquestion != quiz?.pollarr?.length - 1 ? "NEXT" : "SUBMIT"}</button>
      }
    </div>
    }
    </>
  )
};

export default Quizplaycard;
