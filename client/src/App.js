import React, { useEffect, createContext, useContext, useReducer } from "react";
import NavBar from "./components/NavBar";
import "./App.css";
import "./NewUi.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import Profile from "./components/screens/Profile";
import Home from "./components/screens/Home";
import Header  from "./components/Header";
import CreatePost from "./components/screens/CreatePost";
import SideNavBar from "./components/SideNavBar";
import UserProfile from "./components/UserProfile";
import SubscribedPost from "./components/screens/SubscribedPost";
import { initialState, reducer } from './reducers/useReducer';
export const UserContext = createContext();

const Routing = () => {
	const navigate = useNavigate();
	const { state, dispatch } = useContext(UserContext)
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			dispatch({ type: "USER", payload: user })
			navigate("/")
		} else {
			navigate("/login")
		}
	}, [])

	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route exact path="/profile" element={<Profile />} />
			<Route path="/createpost" element={<CreatePost />} />
			<Route path="/profile/:userId" element={<UserProfile />} />
			<Route path="/subposts" element={<SubscribedPost />} />
		</Routes>
	)
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Header/>
				{
					state ?
					<SideNavBar/> :
					<div></div>

				}
				<Routing />
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
