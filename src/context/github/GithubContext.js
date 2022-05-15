// import { createContext, useReducer } from "react";
// import githubReducer from "./GithubReducer";

// const GithubContext = createContext();
// const GITHUB_URL = "https://api.github.com";
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// export const GithubProvider = ({ children }) => {
//   const initialState = {
//     users: [],
//     loading: false,
//   };

//   const [state, dispatch] = useReducer(githubReducer, initialState);

//   //Get search results
//   const searchUsers = async (text) => {
//     setLoading(); //from line 34

//     const params = new URLSearchParams({
//       q: text,
//     });

//     const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
//       headers: {
//         Authorization: `${GITHUB_TOKEN}`,
//       },
//     });

//     const { items } = await response.json();
//     dispatch({
//       type: "GET_USERS",
//       payload: items,
//     });
//   };

//   //clear users from state
//   const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

//   //Set loading
//   const setLoading = () => dispatch({ type: "SET_LOADING" });
//   return (
//     <GithubContext.Provider
//       value={{
//         users: state.users,
//         loading: state.loading,
//         searchUsers,
//         clearUsers,
//       }}
//     >
//       {children}
//     </GithubContext.Provider>
//   );
// };

// export default GithubContext;

import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  //REPLACE WITH REDUCER
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true); //to add a spinner when loading page

  const initialState = {
    users: [],
    user: {}, //from user.jsx
    repos: [],
    loading: false,
  };

  //useReducer
  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    //  fetchUsers REMOVED
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;

//REPLACED WITH ...state in githubcontext provider
// users: state.users,
// loading: state.loading,
// user: state.user,
// repos: state.repos
