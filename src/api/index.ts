export const BASE_API_DOMAIN = new URL('http://localhost:8080');

export const fetchJSON = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
