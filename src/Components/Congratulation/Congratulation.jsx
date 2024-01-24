import React from "react";
import styles from "./Congratulation.module.css";
import trophyimg from "../../images/trophyimg.png";
import { useSelector } from "react-redux";
const Congratulation = () => {
  const quiz = useSelector((store) => store.quiz.quiz);
  const correctanswer = useSelector((store) => store.quiz.correctanswer)
  return (
    <div className={styles.maincontainer}>
      <div className={styles.congratscard}>
        {quiz?.quiztype == "poll" ? (
          <h1>Thank you for participating in the Poll</h1>
        ) : (
          <>
            <h1>Congrats Quiz is completed</h1>
            <img src={trophyimg} alt="" />
            <h1>
              Your Score is <span>0{correctanswer}/0{quiz?.questionarr?.length}</span>
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Congratulation;
