import React from 'react';


function Logout() {
    const handleLogout = () => {
      // Rimuovi il token di autenticazione (dai cookie/local storage o dallo stato dell'app)
      localStorage.clear('loggedIn');
      
      // Reindirizza l'utente alla pagina di login (o a qualsiasi altra pagina desiderata) usando window.location.href
      window.location.href = '/';
    };
  

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;