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
const GITHUB_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

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

  //Get search results to display (initially we just fetched and displayed directly as part of testing)
  const searchUsers = async (text) => {
    setLoading(); //called from the reducer

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json(); //destructuring 'data' to get only the 'items' in the data

    //dispatch to githubreducer as a case in the switch statement
    dispatch({
      type: "GET_USERS",
      payload: items,
    });

    // setUsers(data);
    // setLoading(false);
  };

  //Get single user
  const getUser = async (login) => {
    setLoading(); //called from the reducer

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json(); //destructuring 'data' to get only the 'items' in the data

      //dispatch to githubreducer as a case in the switch statement
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //Get user repos
  const getUserRepos = async (login) => {
    setLoading(); //called from the reducer

    //sort out the top 10 repositories
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `${GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.json(); //destructuring 'data' to get only the 'items' in the data

    //dispatch to githubreducer as a case in the switch statement
    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  //CLEAR USERS
  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  //Set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    //  fetchUsers REMOVED
    <GithubContext.Provider
      value={{
        ...state,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;

//REPLACED WITH ...state in githubcontext provider
//   users: state.users,
// loading: state.loading,
// user: state.user,
// repos: state.repos
