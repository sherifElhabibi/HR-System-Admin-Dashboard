import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { BiSearchAlt } from 'react-icons/bi';
import Items from './Items';
import { useRouter } from 'next/router';
import { GrSort } from 'react-icons/gr';

import {
  changeOptionData,
  clickDataFetching,
  fetchData,
} from './FetchDaleelItems';
import { useRef } from 'react';
function DaleelSearch({ supplier, item }) {
  const [itemOne, setItemOne] = useState();
  const [itemTwo, setItemTwo] = useState();
  const [itemId, setItemId] = useState();
  const [content, setContent] = useState();
  const [itemIdTwo, setItemIdTwo] = useState();
  const [items, setItems] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [basicItems, setBasicItems] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [disable, setDisable] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const router = useRouter();
  const selectRef = useRef(null);
  const selectTwoRef = useRef(null);

  // useEffect(() => {
  //   selectRef.current.focus();
  //   if (router.query.search) {
  //     selectRef.current.blur();
  //   }
  // }, []);
  useEffect(() => {
    selectTwoRef.current.focus();
  }, [itemOne]);
  // console.log(items);
  useEffect(() => {
    if (router.query.search) {
      setSearchName(router.query.search);
      setDisable(false);
    }
    // setDisable(false);
  }, [router.query.search]);
  function handleLoadingMore() {
    setPageIndex(pageIndex + 1);
  }
  // console.log(basicItems);
  useEffect(() => {
    if (router.query.sub_cat) {
      const fetchDataItems = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/items/DaleelItem?meta=*&filter[sub_cat_id][id][_eq]=${router.query.sub_cat}&sort=${sortOption}&limit=2 &page=${pageIndex}`
        );
        const newPosts = await res.json();
        const x = newPosts;
        setTotalPage(newPosts.meta.filter_count);
        setBasicItems([...basicItems, ...x.data]);
      };
      fetchDataItems();
      setItems([]);
      setItemIdTwo('');
      setItemOne('');
      setItemTwo('');
      setSearchName('');
    } else {
      setBasicItems([]);
    }
  }, [pageIndex, router.query.sub_cat, sortOption]);
  //console.log(Math.ceil(basicItems.length / totalPage) > 1 ? 'true' : 'false');
  // console.log(basicItems);
  // console.log(Math.ceil(basicItems.meta.filter_count / pageIndex));
  useEffect(() => {
    if (itemIdTwo) {
      const fetchDataItemsId = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/items/DaleelItem?meta=*&filter[sub_cat_id][id][_eq]=${itemIdTwo}&sort=${sortOption}&limit=1&page=${pageIndex}`
        );
        const newPosts = await res.json();
        const x = newPosts;
        // console.log(x.filter_count);
        // let it = items;
        setItems([...items, ...x.data]);
      };
      fetchDataItemsId();
    }
  }, [itemIdTwo, pageIndex, sortOption]);

  useEffect(() => {
    if (searchName) {
      const fetchDataItemsName = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/items/DaleelItem?meta=*&search=${searchName}&sort=${sortOption}&limit=2&page=${pageIndex}`
        );
        const newPosts = await res.json();
        setItems([...items, ...newPosts.data]);
      };

      fetchDataItemsName();
    }
  }, [pageIndex, sortOption, searchName]);

  const supplier_list = [];
  supplier.data.map((ele) => {
    supplier_list.push({
      value: ele.supplier_name_ar,
      label: ele.supplier_name_ar,
      id: ele.id,
    });
  });

  const sub_cat = [];
  if (content) {
    content.data.map((el) => {
      sub_cat.push({
        value: el.sub_category_name_ar,
        label: el.sub_category_name_ar,
        id: el.id,
      });
    });
  }
  const handleItemOne = (obj) => {
    setItems([]);
    setItemTwo('');
    setItemOne(obj);
    setItemId(obj.id);
    fetchData(obj.id, setContent);
    setItemIdTwo('');
    setSearchName('');

    if (router.query.sub_cat || router.query.search) {
      router.push('/daleelcom');
      setBasicItems([]);
      setItems([]);
    }
  };

  const handleItemTwo = (obj) => {
    setItemTwo(obj);
    setItemIdTwo(obj.id);
    setDisable(false);
    setSearchName('');
    setItems([]);
  };

  const handleChangeInput = (e) => {
    setSearchName(e.target.value);
    // setItemOne('');
    // setItemTwo('');
    // setItems('');
    setBasicItems('');
    // setItemIdTwo('');
    setDisable(false);
    if (router.query.sub_cat) {
      router.push('/daleelcom');
      setBasicItems([]);
    }
  };

  const handleClick = async ({ itemIdTwo, searchName }) => {
    setIsLoading(true);

    if (itemIdTwo || searchName) {
      window.scrollTo({ left: 0, top: 580, behavior: 'smooth' });
    }
    // if (itemIdTwo) {
    //   setSortOption('-date_created');
    //   setPageIndex(1);

    //   clickDataFetching(
    //     `${process.env.NEXT_PUBLIC_API_URL}/items/DaleelItem?meta=*&filter[sub_cat_id][id][_eq]=${itemIdTwo}&sort=${sortOption}&limit=2&page=${pageIndex}`,
    //     setItems,
    //     setErr,
    //     setIsLoading
    //   );
    // try {
    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_URL}/items/DaleelItem?meta=*&filter[sub_cat_id][id][_eq]=${itemIdTwo}&sort=${sortOption}&limit=2&page=${pageIndex}`,
    //     {
    //       method: 'GET',
    //       headers: {
    //         Accept: 'application/json',
    //       },
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error(`Error! status: ${response.status}`);
    //   }
    //   const result = await response.json();

    //   // setLimit(2);
    //   setItems(result.data);
    //   // setSortOption('-data-created');
    //   console.log('click idtwo', result);
    // } catch (err) {
    //   setErr(err.message);
    // } finally {
    //   setIsLoading(false);
    // }
    // } else if (searchName) {
    //   setItemIdTwo('');
    //   setSortOption('-date_created');
    //   clickDataFetching(
    //     `${process.env.NEXT_PUBLIC_API_URL}/items/DaleelItem?meta=*&search=${searchName}&sort=${sortOption}&limit=2&page=${pageIndex}`,
    //     setItems,
    //     setErr,
    //     setIsLoading
    //   );

    //   // try {
    //   //   const response = await fetch(
    //   //     `${process.env.NEXT_PUBLIC_API_URL}/items/DaleelItem?meta=*&search=${searchName}&sort=${sortOption}&limit=2&page=${pageIndex}`,
    //   //     {
    //   //       method: 'GET',
    //   //       headers: {
    //   //         Accept: 'application/json',
    //   //       },
    //   //     }
    //   //   );

    //   //   if (!response.ok) {
    //   //     throw new Error(`Error! status: ${response.status}`);
    //   //   }
    //   //   const result = await response.json();

    //   //   setItems(result.data);

    //   //   console.log('click search', result);
    //   // } catch (err) {
    //   //   setErr(err.message);
    //   // } finally {
    //   //   setIsLoading(false);
    //   // }
    // }
    if (searchName || itemIdTwo) {
      // setItemIdTwo('');
      setSortOption('-date_created');
      clickDataFetching(
        `${process.env.NEXT_PUBLIC_API_URL}/items/DaleelItem?meta=*&search=${searchName}&filter[sub_cat_id][id][_eq]=${itemIdTwo}&sort=${sortOption}&limit=2&page=${pageIndex}`,
        setItems,
        setErr,
        setIsLoading
      );
    }
  };

  const handleChangeOption = async (e) => {
    //console.log(e.target.value);
    setSortOption(e.target.value);

    if (router.query.sub_cat) {
      setPageIndex(1);
      setBasicItems([]);
      changeOptionData(
        `${process.env.NEXT_PUBLIC_API_URL}/items/DaleelItem?meta=*&filter[sub_cat_id][id][_eq]=${router.query.sub_cat}&sort=${sortOption}&limit=2&page=${pageIndex}`,
        setErr,
        setIsLoading,
        setBasicItems,
        basicItems
      );
      // try {
      //   const response = await fetch(
      //     `${process.env.NEXT_PUBLIC_API_URL}/items/DaleelItem?meta=*&filter[sub_cat_id][id][_eq]=${router.query.sub_cat}&sort=${sortOption}&limit=2&page=${pageIndex}`,
      //     {
      //       method: 'GET',
      //       headers: {
      //         Accept: 'application/json',
      //       },
      //     }
      //   );

      //   if (!response.ok) {
      //     throw new Error(`Error! status: ${response.status}`);
      //   }
      //   const result = await response.json();

      //   // setBasicItems(result.data);
      //   setBasicItems([...basicItems, result.data]);

      //   console.log('results', result);
      // } catch (err) {
      //   setErr(err.message);
      // } finally {
      //   setIsLoading(false);
      // }
    } else if (itemIdTwo) {
      // setPageIndex(1);
      setItems([]);
      changeOptionData(
        `${process.env.NEXT_PUBLIC_API_URL}/items/DaleelItem?meta=*&filter[sub_cat_id][id][_eq]=${itemIdTwo}&sort=${sortOption}&limit=2&page=${pageIndex}`,
        setErr,
        setIsLoading,
        setItems,
        items,
        setPageIndex
      );
      // setSortOption(e.target.value);
      // try {
      //   const response = await fetch(
      //     `${process.env.NEXT_PUBLIC_API_URL}/items/DaleelItem?meta=*&filter[sub_cat_id][id][_eq]=${itemIdTwo}&sort=${sortOption}&limit=2&page=${pageIndex}`,
      //     {
      //       method: 'GET',
      //       headers: {
      //         Accept: 'application/json',
      //       },
      //     }
      //   );

      //   if (!response.ok) {
      //     throw new Error(`Error! status: ${response.status}`);
      //   }
      //   const result = await response.json();

      //   setItems([...items, result.data]);
      //   setPageIndex(1);
      //   console.log(result.data);
      // } catch (err) {
      //   setErr(err.message);
      // } finally {
      //   setIsLoading(false);
      // }
    } else {
      setPageIndex(1);
      setItems([]);
      // setSortOption(e.target.value);
      changeOptionData(
        `${process.env.NEXT_PUBLIC_API_URL}/items/DaleelItem?meta=*&search=${searchName}&sort=${sortOption}&limit=2&page=${pageIndex}`,
        setErr,
        setIsLoading,
        setItems,
        items,
        setPageIndex
      );
      //try {
      //   const response = await fetch(
      //     `${process.env.NEXT_PUBLIC_API_URL}/items/DaleelItem?meta=*&search=${searchName}&sort=${sortOption}&limit=2&page=${pageIndex}`,
      //     {
      //       method: 'GET',
      //       headers: {
      //         Accept: 'application/json',
      //       },
      //     }
      //   );

      //   if (!response.ok) {
      //     throw new Error(`Error! status: ${response.status}`);
      //   }
      //   const result = await response.json();
      //   // setLimit(2);
      //   // setPageIndex(0);

      //   setItems([...items, result.data]);
      //   setPageIndex(1);
      //   console.log('search', result);
      // } catch (err) {
      //   setErr(err.message);
      // } finally {
      //   setIsLoading(false);
      // }
    }
  };

  return (
    <>
      <form className="w-full mb-8 mx-auto mt-4 flex justify-center items-center rounded-md m-auto flex-wrap lg:flex-nowrap border p-5  bg-regal-dark ">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 text-regal-dark lg:w-[calc(100%-108px)] w-full">
          <div>
            <label className="block mb-2 w-full text-sm font-normal text-white">
              اختار نوع الخدمة:-{' '}
            </label>
            <Select
              // ref={selectRef}
              autoFocus
              id="long-value-select"
              instanceId="long-value-select"
              placeholder=" نوع الخدمة"
              value={itemOne}
              options={supplier_list}
              onChange={(e) => handleItemOne(e)}
            />
          </div>

          <div>
            <label className="block mb-2 w-full text-sm font-normal text-white">
              اختار التخصص:-{' '}
            </label>
            <Select
              ref={selectTwoRef}
              isDisabled={!itemOne}
              id="long-value-select"
              instanceId="long-value-select"
              placeholder="التخصص"
              value={itemTwo}
              options={sub_cat}
              onChange={(e) => handleItemTwo(e)}
            />
          </div>
          <div className="mb-2 w-full gap-1 ">
            <label
              htmlFor="search"
              className="block mb-2 w-full text-sm font-normal text-white text-right "
            >
              او ابحث عن الاسم او العنوان او التخصص:-
            </label>
            <input
              type="text"
              name="searchName"
              id="searchName"
              placeholder="ادخل الاسم او العنوان او التخصص"
              value={searchName}
              onChange={(e) => {
                handleChangeInput(e);
              }}
              className="p-1.5 w-full border border-gray-300 rounded bg-gray-50  outline-2 outline-[#2684FF] "
            />
          </div>
        </div>
        {/* <button
          onClick={() => handleClick({ itemIdTwo, searchName })}
          disabled={disable}
          type="button"
          className={`${
            disable ? 'bg-gray-500' : ' bg-regal-green'
          } rounded-md flex mr-2 items-center justify-center text-white p-1.5 mt-5 md:mt-5 font-semibold shadow-md w-[108px] tracking-wide mx-1 `}
        >
          <span>ابحث</span>
          <BiSearchAlt color="white" fontSize="1.3em" className="ml-1" />
        </button> */}
      </form>

      {basicItems && basicItems.length > 0 ? (
        <div
          id="search"
          className="bg-gray-200 p-5 w-full mx-auto mt-10 mb-5 h-[650px] md:h-[400px] overflow-auto shadow-md rounded-sm"
        >
          <h2 className="text-center mb-3 border-b p-3 border-white font-semibold text-regal-green text-3xl">
            نتائج البحث{' '}
          </h2>

          <div className="flex items-center mb-2 mr-1">
            <GrSort />
            <label className="text-sm font-normal text-right mx-2">
              الترتيب:-
            </label>
            <select
              className=" w-48 border border-gray-300 rounded  focus:ring-3 focus:ring-blue-300"
              placeholder="الترتيب حسب"
              onChange={(e) => handleChangeOption(e)}
              value={sortOption}
            >
              <option value="-date_created">التاريخ: الأحدث</option>
              <option value="date_created">التاريخ: الأقدم</option>

              <option value="name">الاسم: تصاعدى</option>
              <option value="-name">الاسم: تنازلى</option>
              {/* <option value={''}>الموقع: الأقرب</option>
              <option value={''}>الموقع: الأبعد</option> */}
            </select>
          </div>
          <div className="grid lg:grid-cols-2 gap-3 px-0.5 ">
            {basicItems.map((item) => {
              return <Items item={item} key={item.id} />;
            })}
          </div>
          <div className="text-center my-3">
            {Math.ceil(totalPage / basicItems.length) > 1 && (
              <button
                onClick={() => setPageIndex(pageIndex + 1)}
                className="bg-regal-dark text-white px-4 py-2 rounded-sm"
              >
                تحميل المزيد
              </button>
            )}
          </div>
        </div>
      ) : null}
      {items && items.length > 0 ? (
        <div
          id="search"
          className="bg-gray-200 p-5 w-full mx-auto mt-10 mb-5 h-[650px] md:h-[400px] overflow-auto shadow-md rounded-sm"
        >
          <h2 className="text-center mb-3 border-b p-3 border-white font-semibold text-regal-green text-3xl">
            نتائج البحث{' '}
          </h2>
          <div className="flex items-center mb-2 mr-1">
            <GrSort />
            <label className="text-sm font-normal text-right mx-2">
              الترتيب:-
            </label>
            <select
              className=" w-48 border border-gray-300 rounded  focus:ring-3 focus:ring-blue-300"
              placeholder="الترتيب حسب"
              onChange={(e) => handleChangeOption(e)}
              value={sortOption}
            >
              <option value="-date_created">التاريخ: الأحدث</option>
              <option value="date_created">التاريخ: الأقدم</option>
              <option value="name">الاسم: تصاعدى</option>
              <option value="-name">الاسم: تنازلى</option>
              {/* <option value={''}>الموقع: الأقرب</option>
              <option value={''}>الموقع: الأبعد</option> */}
            </select>
          </div>
          <div className="grid lg:grid-cols-2 gap-3 px-0.5 ">
            {items.map((item) => {
              return <Items item={item} key={item.id} />;
            })}
          </div>
          <div className="text-center my-3">
            <button
              onClick={() => handleLoadingMore()}
              className="bg-regal-dark text-white px-4 py-2 rounded-sm"
            >
              تحميل المزيد
            </button>

            {/* <button
              onClick={handleLoading}
              className="bg-regal-green text-white px-4 py-3 rounded-sm"
            >
              تحميل المزيد
            </button> */}

            {/* {Math.ceil(items.meta.filter_count / postNum) == 1 && (
              <p>انتهت نتائج التحميل</p>
            )} */}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DaleelSearch;
