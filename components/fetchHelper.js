// fetchHelper.js
const pubAPI = process.env.NEXT_PUBLIC_API_URL;

const fetchData = async (query, getToken, urlAdd, variables) => {
  const token = await getToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  var urlAPI = pubAPI;
  if (urlAdd !== undefined) urlAPI = urlAPI + urlAdd;

  const res = await fetch(urlAPI, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  const json = await res.json();

  return json;
};

export default fetchData;
