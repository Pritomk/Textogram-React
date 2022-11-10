import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Header = () => {

    const navigate = new useNavigate()
    const { state, dispatch } = useContext(UserContext);

    const Logout = () => {
        localStorage.clear();
        dispatch({ type: "CLEAR" });
        navigate("/login");
    }

    return (
        <div className="header">
            <div className="nav-open-container">
                <div className="nav-open-span" onclick="nav_open()">
                    <hr className="nav-open-line" />
                    <hr className="nav-open-line" />
                    <hr className="nav-open-line" />
                </div>
            </div>
            <Link to={"/"}>
                <Link to={state ? "/" : "/login"}>
                    <img className="" id="site-logo" src="https://res.cloudinary.com/do87gdwir/image/upload/v1668113820/logo_x0o5i4.png" alt="Textogram" />
                </Link>

            </Link>
            <div className="search-header">
                <form id="search-form">
                    <input type="text" id="new-task-input" placeholder="Search..." />
                </form>
            </div>

            <Link to={"/profile"}>
                {
                    state ?
                        <div className="profile-item">
                            <img src={state ? state.pic : ""}
                                width="50rem" height="50rem" alt="Profile pic" id="profile-pic" onClick={() => { navigate("/profile") }} />

                            <div className="profile-item-details">
                                <div className="name">{state ? state.name : ""}</div>
                            </div>
                        </div> :
                        <div></div>

                }

            </Link>
            {
                state ?
                    <div>
                        <i className="material-icons logout-btn"
                            onClick={() => Logout()}>power_settings_new</i>
                    </div>
                    :
                    <div></div>

            }
        </div>
    )
}

export default Header