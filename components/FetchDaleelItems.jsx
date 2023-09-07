export default async function fetchItems(setItems, setIsLoading) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/items/main_category`
  );

  const data = await response.json();
  setItems(data);
  console.log("data",data)
  setIsLoading(false);
}

export const fetchData = async (itemId, setContent) => {
  //console.log('itemId', itemId)
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/items/sub_category?fields=*,supplier_id.supplier_id.id&filter[supplier_id][supplier_id][id][_eq]=${itemId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => Promise.all([response, response.json()]))
    .then(([response, json]) => {
      // console.log('response', response);
      if (!response.ok) {
        // We should get a 200 (OK) status code if everything is fine/working
        throw Error(
          `Respsonse status ${response.status} (${response.statusText}): ${json.message}`
        );
      }
      setContent(json);
    })

    .catch((exception) => {
      console.log(
        new Map([
          [TypeError, 'There was a problem fetching the response.'],
          [SyntaxError, 'There was a problem parsing the response.'],
          [Error, exception.message],
        ]).get(exception.constructor())
      );
    });
};

export const changeOptionData = async (
  url,
  setErr,
  setIsLoading,
  resultItem,
  setResultItem,
  setPageIndex
) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();

    // setBasicItems(result.data);
    setResultItem([...resultItem, result.data]);
    setPageIndex(1);
    //console.log('results', result);
  } catch (err) {
    setErr(err.message);
  } finally {
    setIsLoading(false);
  }
};

export const clickDataFetching = async (
  url,
  setItems,
  setErr,
  setIsLoading
) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();

    // setLimit(2);
    setItems(result.data);
    // setSortOption('-data-created');
   // console.log('click idtwo', result);
  } catch (err) {
    setErr(err.message);
  } finally {
    setIsLoading(false);
  }
};
