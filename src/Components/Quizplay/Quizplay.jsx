import React, { useEffect, useState } from 'react'
import styles from "./Quizplay.module.css"
import Quizplaycard from '../Quizplaycard/Quizplaycard'
import { commonapiurl } from '../../Constant'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Congratulation from '../Congratulation/Congratulation'
const Quizplay = () => {
  const impression = useSelector(store => store.quiz.impression)
  const quiz = useSelector(store => store.quiz.quiz)
  const quizid = useLocation().pathname.split("/")[2];
  const [showcongratspage, setshowcongratspage] = useState(false)
  useEffect(() =>{
    axios.patch(commonapiurl + "updatequiz/" + quizid, quiz)
    .then((response) => {
      console.log(response.data);
    })
    .catch(err => {
      console.log("some error occured");
    })
  },[impression])
  return (
    <div className={styles.quiz_playcontainer}>
        {
          showcongratspage ? <Congratulation/> : <Quizplaycard
          setshowcongratspage={setshowcongratspage}
          />
        }
    </div>
  )
}

export default Quizplay