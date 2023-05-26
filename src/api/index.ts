const BASE_API_DOMAIN = new URL('http://localhost:3000');

const fetchJSON = async (url: URL) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const fetchNewsList = async () => {
  const TREND_API_PATH = new URL('trend', BASE_API_DOMAIN);
  const trendNewsData = await fetchJSON(TREND_API_PATH);

  return { left: trendNewsData.slice(0, 5), right: trendNewsData.slice(5, 10) };
};
