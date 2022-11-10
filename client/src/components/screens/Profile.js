import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { json, useNavigate } from "react-router-dom";



const Profile = () => {

    const { state, dispatch } = useContext(UserContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {

        fetch("http://localhost:5000/post/myposts", {
            headers: {
                "Authorization": localStorage.getItem("auth_token")
            }
        })
            .then(res => res.json())
            .then(data => {
                setProfile(data);
            })
    }, [])

    const updatePhoto = (pic) => {
        const data = new FormData();
        data.append("file", pic)
        data.append("upload_preset", "textogram")
        data.append("cloud_name", "do87gdwir")

        fetch("https://api.cloudinary.com/v1_1/do87gdwir/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                fetch("http://localhost:5000/profile/updatepic", {
                    method:"put",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("auth_token")
                    },
                    body: JSON.stringify({
                        pic: data.secure_url
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem("user", JSON.stringify({ ...state, pic: data.pic }))
                        dispatch({ type: "UPDATEPIC", payload: data.pic })
                    })
            })
            .catch(err => console.error(`Error is ${err}`))

    }

    return (

        (profile == null) ? <div><h2 className="brand-logo">Loading....</h2></div> :
            <div className="profile-body">
                <div className="card">

                    <div className="details">
                        <img src={state ? state.pic : ""} className="display-picture" alt="Profile Pic" onChange={(e) => updatePhoto(e.target.files[0])} />

                        <div className="name-details">
                            <h1>{state.name}</h1>
                            <div className="ac-details">
                                <div className="number-details" id="post-number">{profile.posts.length} posts</div>
                                <div className="number-details" id="follower-number">{profile.user.followers.length} followers</div>
                                <div className="number-details" id="following-number">{profile.user.following.length} following</div>
                            </div>
                        </div>
                        <div className="file-field input-field">
                    <div className="btn #ff8f00 amber darken-3 update-pic-btn">
                        <span>Update Image</span>
                        <input type="file"
                            accept="image/*"
                            onChange={e => updatePhoto(e.target.files[0])} />
                    </div>


                </div>
                    </div>
                    <hr />
                    <div className="posts-image-body">
                        {
                            profile.posts.map(item => {
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

export default Profile;