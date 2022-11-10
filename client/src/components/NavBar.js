import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const navBar = () => {


    const navigate = new useNavigate()
    const { state, dispatch } = new useContext(UserContext);


    const Logout = () => {
        localStorage.clear();
        dispatch({ type: "CLEAR" });
        navigate("/login");
    }


    const renderList = () => {
        if (!state) {
            return [
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/register">Register</Link></li>
            ]
        } else {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/createpost">CreatePost</Link></li>,
                <li>
                    <button className="btn #e53935 red darken-1"
                        id="log-out"
                        onClick={() => Logout()}>
                        Logout
                    </button>
                </li>
            ]
        }
    }

    return (
        <nav>
            <div className="nav-wrapper white nav-bar">
                <Link to={state ? "/" : "/login"} className="brand-logo">Textogram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default navBar