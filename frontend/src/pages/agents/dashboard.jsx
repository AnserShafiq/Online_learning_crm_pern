import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import UserDetails from "../../component/userdetails";
import {useNavigate} from 'react-router-dom';
import LectureOne from "../../component/Lectures/One";

const AgentDashboard = () => {
    const {checkAuth} = useUserStore();
    useEffect(() => {
      checkAuth()
    },[checkAuth])
    const navigate = useNavigate();
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [quizVisible, setQuizVisible] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000); // Update time every second

    return () => clearInterval(timer); // Cleanup timer when component unmounts
  }, []);

  useEffect(() => {
    if (timeElapsed >= 900) { // 15 minutes (900 seconds)
      setQuizVisible(true);
    }
  }, [timeElapsed]);

  const handleQuizSubmit = () => {
    setQuizCompleted(true);
  };
  return (
    <div className="flex flex-col w-full gap-1">
      <h3>Welcome Agent</h3>

      <div style={{ position: "relative", padding: "20px" }}>
      {/* Timer Display (Top Right) */}
      <div style={{
        position: "absolute",
        top: "10px",
        right: "20px",
        padding: "10px",
        backgroundColor: "black",
        color: "white",
        borderRadius: "5px",
        fontSize: "18px",
        fontWeight: "bold"
      }}>
        ⏳ {Math.floor(timeElapsed / 60)} min {timeElapsed % 60} sec
      </div>

      <h1>Chapter </h1>
      <p>Read the content for at least 15 minutes before taking the quiz.</p>

      {!quizVisible && <p>You must wait 15 minutes before taking the quiz.</p>}

      {quizVisible && !quizCompleted && (
        <div>
          <h2>Chapter Quiz</h2>
          <p>Q1: What is the main topic of this chapter?</p>
          <button onClick={handleQuizSubmit}>Submit Quiz</button>
        </div>
      )}

      {quizCompleted && (
        <button onClick={() => navigate(`/chapter`)}>
          Go to Next Chapter
        </button>
      )}
    </div>

      <LectureOne />
      <UserDetails />

    </div>
  )
}

export default AgentDashboard