import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Post from "../post/Post";
import "./singlePost.css";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  // getting the id of the post which uses this page
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setupdateMode] = useState(false);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async (e) => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (e) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
     setupdateMode(false)
    } catch (e) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setupdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        ) : (
          <p
            className="singlePostDesc"
            onChange={(e) => setDesc(e.target.value)}
          >
            {desc}
          </p>
        )}
        {
          updateMode &&  <button className="singlePostButton" onClick={handleUpdate}>
          Update
        </button>
        }
        
      </div>
    </div>
  );
}
