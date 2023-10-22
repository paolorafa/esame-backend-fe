import React, { useState, useEffect } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

export default function LatestRelais() {
  const [dataPosts, setPosts] = useState([]);
  const [loanding, setLoanding] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [tokenItem, setTokenItem]=useState([])

  const getAuthors = async () => {
    setLoanding(true);
    

    if (tokenItem) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/posts?page=${pageCurrent}`,{
            headers: {       
                "Authorization": `${tokenItem}`
              }
          });
        const data = await response.json();
        console.log(data);
        setPosts(data);
        setLoanding(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handlePaginations = (value) => {
    setPageCurrent(value);
  };

  useEffect(() => {
    
    const items = JSON.parse(localStorage.getItem('loggedIn'));
    if (items){
      setTokenItem(items)
     getAuthors(); 
    }
  }, [pageCurrent, tokenItem]);

  return (
    <>
      <div>
        {loanding && <h1>caricamento</h1>}
        {!loanding &&
          dataPosts &&
          
          dataPosts.posts?.map((post) => {
            return <li key={post._id}>{post.name}</li>;
          })}
      </div>
      <div>
        <ResponsivePagination
          current={pageCurrent}
          total={dataPosts && dataPosts.totalPages}
          onPageChange={handlePaginations}
        />
      </div>
    </>
  );
}
