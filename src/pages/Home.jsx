import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import { getAllData } from "../configs/firebase/firebasemethods";
import Header from "../components/Header";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllData("blogs", setData);
  }, []);

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <Header title={"Home"} />
      <div className="grid place-items-center">
        <div className="w-3/5 mt-4 -ml-16">
      <h2 className="place-self-start -ml-6 text-2xl mb-2 font-semibold">All Blogs</h2>
          {/* <h2 className='text-2xl mb-2 font-semibold'>My Blogs</h2> */}
          {data.length > 0 &&
            data.map((e, i) => {
              return (
                <Blog key={i} title={e.title} description={e.description} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
