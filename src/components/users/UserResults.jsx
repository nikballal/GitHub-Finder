import { useEffect, useContext } from "react";
import Spinner from "../layouts/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

//empty array on line 8, since no dependencies, just want the component to load

function UserResults() {
  const { users, loading, fetchUsers } = useContext(GithubContext); //bring in all the values from Github Context Provider, refer line 25 of GithubContext.js

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!loading) {
    // if loading is 'false', return the data
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
