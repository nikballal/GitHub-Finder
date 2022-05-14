// const githubReducer = (state, action) => {
//   switch (action.type) {
//     case "GET_USERS":
//       return {
//         ...state,
//         users: action.payload,
//         loading: false,
//       };

//     case "SET_LOADING":
//       return {
//         ...state,
//         loading: true,
//       };

//     case "CLEAR_USERS":
//       return {
//         ...state,
//         users: [],
//       };
//     default:
//       return state;
//   }
// };

// export default githubReducer;

const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload, //return whatever is in the state and then update the 'users' to whatever is in the payload
        loading: false,
      };
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "GET_REPOS":
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case "CLEAR_USERS":
      return {
        ...state,
        users: [], //return whatever is in the state and then update the 'users' to whatever is in the payload
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default githubReducer;
