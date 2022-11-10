import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const SubscribedPost = () => {

    const { state, dispatch } = useContext(UserContext);

    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:5000/post/getsubposts", {
            headers: {
                "Authorization": localStorage.getItem("auth_token")
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data);
            })
    }, [])

    const likePost = (id) => {
        console.log(id);
        fetch("http://localhost:5000/post/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("auth_token")
            },
            body: JSON.stringify({
                postId: id
            })
        })
            .then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            }).catch(err => console.log(err))
    }
    const unLikePost = (id) => {
        fetch("http://localhost:5000/post/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("auth_token")
            },
            body: JSON.stringify({
                postId: id
            })
        })
            .then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            }).catch(err => console.log(err))
    }

    const makeComment = (text, postId) => {
        fetch("http://localhost:5000/post/comment", {
            method: "put",
            headers: {
                "Authorization": localStorage.getItem("auth_token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text,
                postId
            })
        })
            .then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            })
            .catch(err => console.log(err));
    }

    const deletePost = (postId) => {
        fetch(`http://localhost:5000/post/delete/${postId}`, {
            method:"delete",
            headers: {
                "Authorization": localStorage.getItem("auth_token")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result);
            const newData = data.filter(item => {
                return item._id !== result._id;
            });
            setData(newData);
        })
    }

    return (
        <div className="post-body">
            {
                data.map(item => {
                    return (
                        <div className="card home-card">
                            <h5 className="post-user"> <Link to={item.postedBy._id !== state._id ? `/profile/${item.postedBy._id}` : `/profile`}>{item.postedBy.name}</Link>
                                {item.postedBy._id === state._id &&
                                    <i class="material-icons" style={{ float: "right", cursor: "pointer" }} onClick={() => deletePost(item._id)}>delete</i>
                                }
                            </h5>
                            <div className="card-image">
                                <img src={item.pic} alt="Example pic" className="post-image" id="post-1" />
                            </div>
                            <hr />
                            <div className="post-btns">
                                <i className="material-icons like-btn">favorite</i>
                                {
                                    (item.likes.includes(state._id)) ?
                                        <i className="material-icons thumb"
                                            onClick={() => unLikePost(item._id)}>thumb_down</i> :
                                        <i className="material-icons thumb"
                                            onClick={() => likePost(item._id)}>thumb_up</i>
                                }

                            </div>
                            <div className="card-content">
                                <h6>{item.likes.length} likes</h6>
                                <h6 className="post-title">{item.title}</h6>
                                <p className="post-desc">{item.body}</p>
                                {
                                    item.comments.map(record => {
                                        console.log(record.postedBy);
                                        return (
                                            <h6 className="comment-body"><span className="comment-user">{record.postedBy.name}</span>
                                             <span className="comment-text">{record.text}</span></h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    let text = e.target[0].value;
                                    makeComment(text, item._id);
                                    e.target[0].value = "";
                                }}>
                                    <input type="text" placeholder="comment" />
                                </form>
                            </div>
                        </div>

                    )

                })
            }
        </div>


    )
}

export default SubscribedPost;