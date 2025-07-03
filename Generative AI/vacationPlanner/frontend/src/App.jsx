// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App


//   import React from "react";
//   import TravelForm from "./components/TravelForm";
//   import "./App.css";

//   function App() {
//     return (
//       <div className="container">
//         <TravelForm />
//       </div>
//     );
//   }

//   export default App;



import React from "react";
import TravelForm from "./components/TravelForm";
import { useAuth0 } from "@auth0/auth0-react";
import ChatBot from "./components/Chatbot";

const App = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    // <div className="container">
      <div>
        <header className="main-header">
          <h1>
            <span role="img" aria-label="plane">✈️</span> Travel Assistant
          </h1>
          <div className="auth-buttons">
            {!isAuthenticated ? (
              <button onClick={loginWithRedirect}>Login</button>
            ) : (
              <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
            )}
          </div>
        </header>

        <main className="main-content">
          {/* <TravelForm /> */}
          <ChatBot/>
        </main>
      </div>
  );
};

export default App;
