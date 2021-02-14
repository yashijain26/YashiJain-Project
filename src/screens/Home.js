import React from 'react'
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <>
            <section id="home">
                <div className="container">
                    <center>
                        <h1>Yashi Jain React Project</h1>
                    </center>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-6">
                            <Link to="/contact">
                                <div className="link-box">
                                    Contact & Helpline Information
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-6">
                            <Link to="/notification">
                                <div className="link-box">
                                    Notifications & advisories
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-6">
                            <Link to="/hospitals">
                                <div className="link-box">
                                    Hospitals & beds
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-6">
                            <Link to="/medical">
                                <div className="link-box">
                                    Medical Colleges & beds
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-6">
                            <Link to="/comparision">
                                <div className="link-box">
                                    Comparison of daily sample tests and confirmed cases of the patients
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home
