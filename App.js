import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
    const navigate = useNavigate();

    const questions = [
        "Is AI used in your company?",
        "Is automation applied to daily tasks?",
        "Do you use digital tools for operations?",
        "Are different digital tools integrated together?",
        "Would you rate your company as AI-excellent?",
        "Does your organization follow a structured approach to Vertical Integration?",
        "Has Horizontal Integration been effectively implemented in your processes?",
        "Is Integrated Product Lifecycle Management a part of your workflow?",
        "Do you have a robust system for Shop Floor Automation?",
        "Are digital tools used to track and manage operations in real time?",
        "Do you have AI-driven decision-making in any business processes?",
        "Are cloud-based solutions implemented for data sharing?",
        "Is there predictive analytics for process optimization?",
        "Do you have a cybersecurity framework in place?",
        "Is there an IoT-enabled automation system in place?",
        "Do you use digital twins for process simulation?",
        "Are your supply chain and logistics managed through AI and automation?",
        "Is automated maintenance scheduling part of your workflow?",
        "Do you have an intelligent reporting dashboard?",
        "Are AI-based chatbots used for customer interactions?",
        "Is your company leveraging blockchain for data security?",
        "Are machine learning algorithms used for business forecasting?",
        "Do you have an automated risk assessment framework?",
        "Is your customer experience enhanced through AI personalization?",
        "Do you have a strategy for adopting emerging technologies?"
    ];

    const [answers, setAnswers] = useState(Array(questions.length).fill(null));

    const bandDefinitions = [
        "Undefined", "Defined", "Automated", "Digital", "Integrated", "Excellent"
    ];

    const handleAnswer = (index, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };

    const maxScore = 5; 
    const bandScore = Math.round((answers.filter(answer => answer === "Yes").length / questions.length) * maxScore);
    const bandDefinition = bandDefinitions[bandScore]; 

    const handleNext = () => {
        console.log("Navigating with:", { bandScore, bandDefinition });
        navigate("/sender", { state: { answers, bandScore, bandDefinition } });
    };

    return (
        <div className="container">
            <h1>Survey Questions</h1>
            {questions.map((question, index) => (
                <div key={index} className="question">
                    <p>{question}</p>
                    <button 
                        className={`yes-btn ${answers[index] === "Yes" ? "active" : ""}`}
                        onClick={() => handleAnswer(index, "Yes")}
                    >
                        ✅ Yes
                    </button>
                    <button 
                        className={`no-btn ${answers[index] === "No" ? "active" : ""}`}
                        onClick={() => handleAnswer(index, "No")}
                    >
                        ❌ No
                    </button>
                </div>
            ))}

            <div className="score-container">
                <h2>Band Score: {bandScore} - {bandDefinition}</h2>
            </div>

            <button className="next-btn" onClick={handleNext}>
                ➡ Next
            </button>
        </div>
    );
}

export default App;

