// import { useContext } from "react";
// import Spinner from "../layouts/Spinner";
// import UserItem from "./UserItem";
// import GithubContext from "../../context/github/GithubContext";

// //empty array on line 8, since no dependencies, just want the component to load

// function UserResults() {
//   const { users, loading } = useContext(GithubContext); //bring in all the values from Github Context Provider, refer line 25 of GithubContext.js

//   if (!loading) {
//     // if loading is 'false', return the data
//     return (
//       <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
//         {users.map((user) => (
//           <UserItem key={user.id} user={user} />
//         ))}
//       </div>
//     );
//   } else {
//     return <Spinner />;
//   }
// }

// export default UserResults;

import { useContext } from "react"; //useEffect removed
import Spinner from "../layouts/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

function UserResults() {
  const { users, loading } = useContext(GithubContext);

  //fetchUsers REMOVED
  //MOVED TO CONTEXT
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true); //to add a spinner when loading page

  //SINCE THE DATA IS TO BE RETURNED FROM A FORM
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // MOVED TO CONTEXT
  // const fetchUsers = async () => {
  //   const response = await fetch("https://api.github.com/users", {
  //     headers: {
  //       Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
  //     },
  //   });

  //   const data = await response.json();

  //   setUsers(data);
  //   setLoading(false);
  // };

  return loading ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

export default UserResults;
