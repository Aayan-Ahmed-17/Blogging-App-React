import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import { getAllData } from "../configs/firebase/firebasemethods";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState('view')

  const navigate = useNavigate()

  useEffect(() => {
    getAllData("blogs", setData);
  }, []);

  const handleUserRedirect = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <Navbar />
      <Header title={"Home"} />
      <div className="grid place-items-center mt-28">
        <div className="w-3/5 -ml-16">
      <h2 className="place-self-start -ml-6 text-2xl mb-2 font-semibold">All Blogs</h2>
          {/* <h2 className='text-2xl mb-2 font-semibold'>My Blogs</h2> */}
          {data.length > 0 &&
            data.map((e, i) => {
              return (
                <Blog key={i} mode={mode} title={e.title} description={e.description} handleUserRedirect={handleUserRedirect} e={e}/>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
