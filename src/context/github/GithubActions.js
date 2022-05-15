import axios from "axios";
const GITHUB_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `${GITHUB_TOKEN}`,
  },
});

//Get search results to display (initially we just fetched and displayed directly as part of testing)
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  //REPLACE BELOW WITH
  const response = await github.get(`/search/users?${params}`);
  return response.data.items;

  //   const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
  //     headers: {
  //       Authorization: `${GITHUB_TOKEN}`,
  //     },
  //   });

  //   const { items } = await response.json(); //destructuring 'data' to get only the 'items' in the data

  //   //dispatch replaced with return, as dispatch will be done from the component
  //   return items;
};

//REPLACING GET USER AND GET USER REPOS WITH A SINGLE FUNCTION, using Promise.All  to make the requests, i.e /user/login/ & /user/login/repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};

//Get single user
// export const getUser = async (login) => {
//   const response = await fetch(`${GITHUB_URL}/users/${login}`, {
//     headers: {
//       Authorization: `${GITHUB_TOKEN}`,
//     },
//   });

//   if (response.status === 404) {
//     window.location = "/notfound";
//   } else {
//     const data = await response.json(); //destructuring 'data' to get only the 'items' in the data

//     return data;
//   }
// };

// //Get user repos
// export const getUserRepos = async (login) => {
//   //sort out the top 10 repositories
//   const params = new URLSearchParams({
//     sort: "created",
//     per_page: 10,
//   });

//   const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
//     headers: {
//       Authorization: `${GITHUB_TOKEN}`,
//     },
//   });

//   const data = await response.json(); //destructuring 'data' to get only the 'items' in the data

//   return data;
// };
