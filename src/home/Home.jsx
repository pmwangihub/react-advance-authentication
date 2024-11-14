

import { Link } from "react-router-dom"
import { ROUTES } from "../constants";
import { useSelector } from "react-redux";

const Home = () => {
    const { authData } = useSelector(state => state.AuthLoginReducer);
    return (

        <section id="hero" className="d-flex align-items-center">

            <div className="container">
                <div className="row">
                    <div
                        className="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1"
                        data-aos="fade-up" >
                        <div id="overview">
                            <h1>Advanced authentication system</h1>
                            <h2>Secure, scalable authentication with Django, React, and React Native</h2>


                            <div className="button-container">
                                <span className="start-btn info">
                                    <i className="bx bxl-play-store"></i>
                                    <i className="bx bxl-apple"></i>
                                    Mobile supported
                                </span>
                                {!authData && <Link to={`${ROUTES.AUTH}${ROUTES.LOGIN}`} state={{ next_url: `/` }} className="start-btn link">
                                    <i className='bx bx-link-external' />
                                    Get started
                                </Link>}
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-6 d-lg-flex flex-lg-column align-items-stretch order-1 order-lg-2 hero-img"
                        data-aos="fade-up">
                        <img src="/authentication.png" className="img-fluid" alt="" />
                    </div>
                </div>
            </div>

        </section>
    )
}



export default Home;