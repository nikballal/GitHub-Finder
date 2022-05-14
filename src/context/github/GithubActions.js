const GITHUB_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

//Get search results to display (initially we just fetched and displayed directly as part of testing)
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    headers: {
      Authorization: `${GITHUB_TOKEN}`,
    },
  });

  const { items } = await response.json(); //destructuring 'data' to get only the 'items' in the data

  //dispatch replaced with return, as dispatch will be done from the component
  return items;
};
