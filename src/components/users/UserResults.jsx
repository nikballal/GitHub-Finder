import { useEffect, useState } from "react";
import Spinner from "../layouts/Spinner";

//empty array on line 8, since no dependencies, just want the component to load

function UserResults() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("https://api.github.com/users", {
      headers: {
        Authorization: `token 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`,
      },
    });

    const data = await response.json();

    setUsers(data);
    setLoading(false);
  };

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <h3>{user.login}</h3>
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
