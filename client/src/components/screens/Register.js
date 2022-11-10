import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(undefined);

    useEffect(() => {
        if (image) {
            uploadFields();
        }
    },[image])

    const uploadFields = () => {
        console.log(image);
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return M.toast({ html: `Invalid email`, classes: 'rounded #ef5350 red lighten-1' });

        }
        fetch("http://localhost:5000/auth/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
                pic:image
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.error);
                if (data.error) {
                    M.toast({ html: `${data.error}`, classes: 'rounded #ef5350 red lighten-1' });
                    console.log(data);
                } else {
                    M.toast({ html: `${data.msg}`, classes: 'rounded #76ff03 light-green accent-3 mtoast' });
                    navigate('/login');
                }

            })
            .catch(err => console.log(err))

    }

    const PostData = () => {
        console.log(image,name,email);
        if (image) {
            uploadImage();
        } else {
            uploadFields();
        }
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
        .then(data=>setImage(data.secure_url))
        .catch(err=>console.error(`Error is ${err}`))
    }

    return (
        <div className="whole-card">
            <div className="card auth-card">
                <h2>Textogram</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
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
                <button className="btn waves-effect waves-light auth-btn"
                    onClick={() => PostData()}>
                    Register
                </button>

                <h5>
                    <Link to="/login">Already have an account?</Link>
                </h5>
            </div>

        </div>
    )
}

export default Register;