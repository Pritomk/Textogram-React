import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";

const CreatePost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [picUrl, setPicUrl] = useState("");

    useEffect(()=> {

        if (picUrl) {
            let token = localStorage.getItem("auth_token");

            console.log(token);    
            fetch("http://localhost:5000/post/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic:picUrl
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data.error);
                    if (data.error) {
                        M.toast({ html: `${data.error}`, classes: 'rounded #ef5350 red lighten-1' });
                        console.log(data);
                    } else {
                        M.toast({ html: `Successfully created post`, classes: 'rounded #76ff03 light-green accent-3 mtoast' });
                        navigate('/');
                    }
    
                })
                .catch(err => console.log(err))
    
        }
    },[body, navigate, picUrl, title])

    const postDetails = () => {
        
        uploadImage();


    }

    function uploadImage() {

        const data = new FormData();
        data.append("file", image)
        data.append("upload_preset", "textogram")
        data.append("cloud_name","do87gdwir")

        fetch("https://api.cloudinary.com/v1_1/do87gdwir/image/upload", {
            method: "post",
            body: data
        })
        .then(res=>res.json())
        .then(data=>setPicUrl(data.secure_url))
        .catch(err=>console.error(`Error is ${err}`))
    }


    return (
        <div className="card input-field"
            style={{
                margin: "30px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center"
            }}>

            <input 
            type="text" 
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}/>

            <input 
            type="text" 
            placeholder="description"
            value={body}
            onChange={(e) => setBody(e.target.value)} />

            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file"
                    accept="image/*"
                     onChange={e => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>

            </div>
            <button className="btn waves-effect waves-light auth-btn #64b5f6 blue darken-1"
            onClick={()=>postDetails()}>
                Post
            </button>


        </div>
    )
}

export default CreatePost;