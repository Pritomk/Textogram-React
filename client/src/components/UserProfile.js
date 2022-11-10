import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";



const UserProfile = () => {

    const { state, dispatch } = useContext(UserContext);
    const [userProfile, setProfile] = useState(null);
    const { userId } = useParams();
    const [showfollow, setShowFollow] = useState(state ? !state.following.includes(userId) : true)

    useEffect(() => {

        console.log(userId);

        fetch(`http://localhost:5000/profile/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("auth_token")
            }
        })
            .then(res => res.json())
            .then(data => {

                console.log(data);
                setProfile(data);
            })
    }, [])

    const followUser = () => {
        
        fetch(`http://localhost:5000/profile/follow`, {
            method: "put",
            headers: {
                "Authorization": localStorage.getItem("auth_token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                followId: userId
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                dispatch({type: "UPDATE", payload:{following:data.following, followers: data.followers}});
                localStorage.setItem("user", JSON.stringify(data));
                setProfile((prevState)=> {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers:[...prevState.user.followers, data._id]
                        }
                    }
                })
                
            })
            .catch(err => console.log(err))
            setShowFollow(false);

    }

    const unFollowUser = () => {
        fetch(`http://localhost:5000/profile/unfollow`, {
            method: "put",
            headers: {
                "Authorization": localStorage.getItem("auth_token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                unFollowId: userId
            })
        })
            .then(res => res.json())
            .then(data => {
                dispatch({type: "UPDATE", payload:{following:data.following, followers: data.followers}});
                localStorage.setItem("user", JSON.stringify(data));
                setProfile((prevState)=> {
                    const newFollower = prevState.user.followers.filter(item=>item !== data._id )
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers:newFollower
                        }
                    }
                })
                
            })
            .catch(err => console.log(err))
            setShowFollow(true);

    }

    return (
        (userProfile == null) ? <div><h2 className="brand-logo">Loading....</h2></div> :
            <div className="profile-body">
                <div className="card">

                    <div className="details">
                        <img src="https://picsum.photos/200/200" className="display-picture" alt="Profile Pic" />
                        <div className="name-details">
                            <h1>{userProfile.user.name}</h1>
                            <div className="ac-details">
                                <div className="number-details" id="post-number">{userProfile.posts.length} posts</div>
                                <div className="number-details" id="follower-number">{userProfile.user.followers.length} followers</div>
                                <div className="number-details" id="following-number">{userProfile.user.following.length} following</div>
                            </div>
                            {
                                showfollow?
                                <button className="btn waves-effect waves-light login-btn"
                                    onClick={() => followUser(userProfile.user._id)}>
                                    Follow
                                </button>
                                :
                                <button className="btn waves-effect waves-light login-btn"
                                    onClick={() => unFollowUser()}>
                                    Unfollow
                                </button>
                            }

                        </div>
                    </div>
                    <hr />
                    <div className="posts-image-body">
                        {
                            userProfile.posts.map(item => {
                                return (
                                    <img key={item._id} src={item.pic} alt={item.title} className="post-image" />
                                )
                            })
                        }
                    </div>

                </div>

            </div>
    )
}

export default UserProfile;