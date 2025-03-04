import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./SenderForm.css";

function SenderForm() {
    const location = useLocation();
    const { answers, bandScore, bandDefinition } = location.state || {};
    const navigate = useNavigate();

    const [senderDetails, setSenderDetails] = useState({
        name: "",
        city: "",
        state: "",
        country: "",
        profession: "",
        contact: "",
        email: ""
    });

    const handleChange = (e) => {
        setSenderDetails({ ...senderDetails, [e.target.name]: e.target.value });
    };

    const handleBack = () => {
        navigate("/");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailParams = {
            user_answers: JSON.stringify(answers, null, 2),
            bandScore,
            bandDefinition,
            senderName: senderDetails.name,
            senderCity: senderDetails.city,
            senderState: senderDetails.state,
            senderCountry: senderDetails.country,
            senderProfession: senderDetails.profession,
            senderContact: senderDetails.contact,
            senderEmail: senderDetails.email
        };

        try {
            // ✅ Email 1: Send Confirmation Email to Sender (Including Band Score & Category)
            await emailjs.send(
                "service_gfvbbox",
                "template_m1njtq2", 
                {
                    to_email: senderDetails.email,
                    sender_name: senderDetails.name,
                    band_score: bandScore.toString(),  // ✅ Ensure it's sent correctly
                    band_category: bandDefinition       // ✅ Ensure it's sent correctly
                },
                "LA3osmKRtSZUIryHb"
            );
            

            // ✅ Email 2: Send Notification Email to Admin (Including Sender Details)
            await emailjs.send(
                "service_gfvbbox", // Replace with your EmailJS Service ID
                "template_7hu8b68", // Admin Notification Template ID
                emailParams,
                "LA3osmKRtSZUIryHb" // Replace with your Public Key
            );

            alert("Survey details sent successfully!");
        } catch (error) {
            console.error("Email sending failed", error);
            alert("Error sending email!");
        }
    };

    return (
        <div className="sender-container">
            <h2>Sender Details</h2>
            <h3>Band Score: {bandScore} - {bandDefinition}</h3>

            <form onSubmit={handleSubmit} className="sender-form">
                <input type="text" name="name" placeholder="Enter your name" value={senderDetails.name} onChange={handleChange} required />
                <input type="text" name="city" placeholder="Enter your city" value={senderDetails.city} onChange={handleChange} required />
                <input type="text" name="state" placeholder="Enter your state" value={senderDetails.state} onChange={handleChange} required />
                <input type="text" name="country" placeholder="Enter your country" value={senderDetails.country} onChange={handleChange} required />
                <input type="text" name="profession" placeholder="Enter your profession" value={senderDetails.profession} onChange={handleChange} required />
                <input type="number" name="contact" placeholder="Enter your contact number" value={senderDetails.contact} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Enter your email" value={senderDetails.email} onChange={handleChange} required />

                <div className="button-container">
                    <button type="submit" className="submit-btn">📩 Submit</button>
                    <button type="button" className="back-btn" onClick={handleBack}>⬅ Back</button>
                </div>
            </form>
        </div>
    );
}

export default SenderForm;
