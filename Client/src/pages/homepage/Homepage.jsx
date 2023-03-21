import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios"
import { useEffect, useState } from "react";


export default function Homepage() {

const[posts,setPosts] = useState([])

const location = useLocation();
console.log(location.search);


useEffect(()=>{
const fetchPosts = async ()=>{
  try{
    const res = await axios.get("/posts"+location.search)
    console.log(res)
    setPosts(res.data)
  }catch(e)
  {
    console.log(e)
  }
}
fetchPosts()
},[])

 
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </>
  );
}
