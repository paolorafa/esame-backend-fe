import React, {  createContext, useEffect, useState } from "react";

export const PosteProvider = createContext();

export const DocsContex = ({children}) => {
  const [post, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tokenItem, setTokenItem]=useState([])

  console.log(post);

  const getPoste = async () => {
    setLoaded(true);
    if (tokenItem) {
     
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/posts`,{
        headers: {     
            "Authorization": ` ${tokenItem}`
          }
      });
      const dataResponse = await response.json(); 
      setPosts(dataResponse);
      setLoaded(false);
    } catch (err) {
      console.log(err);
    }
  };
}

  useEffect(() => {
    
    const items = JSON.parse(localStorage.getItem('loggedIn'));
    if (items){
      setTokenItem(items)
      getPoste();
    }
  }, [tokenItem]);


  return (
    <PosteProvider.Provider value={{post, loaded}}>
    {children}
    </PosteProvider.Provider>
  )
};
