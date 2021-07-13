import React from "react"; 
import "../styling/aboutUs.css";

const AboutUs = () => {

    return (
        <div className="about-us">
            <div className="about">
                <h1>Saas1 - AskMeAnything</h1>
                <p>This is a project created for "Software Service Technologies" lesson which is part of the  curriculum of "Electrical Engineer And Computer Engineer" school.</p>
                <p>It's a full stack project for a quenstions and answers management system. </p>
            </div>

            <div className="contact">
                <h1>Saas1 - Team</h1>
                <div className="contributors" >
                    <div className="contributor">
                        <h2>Ευσταθία Σταθά</h2>
                        <h3>fay.statha@gmail.com</h3>
                    </div>

                    <div className="contributor">
                        <h2>Ιάσων Παπαδημητρακόπουλος</h2>
                        <h3>i.papadimitrakopoulos@gmail.com</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;