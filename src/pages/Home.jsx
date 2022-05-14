import React from "react";
import UserResults from "../components/users/UserResults";
import UserSearch from "../components/users/UserSearch";

function Home() {
  return (
    <>
      <UserSearch /> {/* SEARCH COMPONENT */}
      <UserResults />
    </>
  );
}

export default Home;
