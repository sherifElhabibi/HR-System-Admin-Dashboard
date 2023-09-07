"use client"
import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { fetchData } from './FetchDaleelItems';
import Items from './Items';
import free from '../public/images/00.jpeg';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BiSearchAlt } from 'react-icons/bi';

function DaleelSearch({ supplier, governorate }) {
  const [itemOne, setItemOne] = useState('');
  const [itemTwo, setItemTwo] = useState();
  const [itemThree, setItemThree] = useState('');
  const [itemId, setItemId] = useState();
  const [content, setContent] = useState();
  const [itemIdTwo, setItemIdTwo] = useState();
  const [searchName, setSearchName] = useState('');
  const [items, setItems] = useState([]);
  const [sortOption, setSortOption] = useState('-date_created');
  const [limit, setLimit] = useState(4);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const selectOneRef = useRef(null);
  const selectTwoRef = useRef(null);
  const inputRef = useRef(null);
  const supplier_list = [];
  const router = useRouter();
  const pathname = usePathname();
  const governorate_list = [];
  const [isData, setIsData] = useState();
  const [filters, setFilters] = useState({
    search: searchName,
    subCat_id: itemIdTwo,
    city: itemThree,
    limit: limit,
    page: pageIndex,
    sort: sortOption,
  });
  governorate_list.push({
    label: '',
    value: '',
    id: '',
  });
  // governorate.data.map((g) => {
  //   governorate_list.push({
  //     label: g.name,
  //     value: g.name,
  //     id: g.id,
  //   });
  // });

  supplier_list.push({
    value: '',
    label: '',
    id: 0,
  });

  supplier?.data.map((ele) => {
    supplier_list.push({
      value: ele.supplier_name_ar,
      label: ele.supplier_name_ar,
      id: ele.id,
    });
  });
  //console.log(supplier)
  function handleLoadingMore(e) {
    e.preventDefault();
    setPageIndex(pageIndex + 1);
    _page(pageIndex + 1);
  }

  const handleItemOne = (obj) => {
    setItemIdTwo('');
    setItemThree('');
    filters.subCat_id = '';
    filters.city = '';
    filters.sort = '-date_created';
    filters.search = '';
    setSearchName('');
    setItemTwo('');
    // console.log('obj', obj)
    setItems([]);
    setIsData(true);
    setTotalCount(0);
    setItemOne(obj);
    setItemId(obj.id);
    fetchData(obj.id, setContent);
    setPageIndex(1);
    setSortOption('-date_created');
    if (pathname.sub_cat || pathname.search) {
      router.push('/daleelcom');
      setItems([]);
      setIsData(true);
    }
  };

  const handleItemTwo = (obj) => {
    setItemThree('');
    filters.city = '';
    setSearchName('');
    setItemTwo(obj);
    setItemIdTwo(obj.id);
    _idTwo(obj.id);
    setItems([]);
    setPageIndex(1);
    setTotalCount(0);
    // setSortOption('-date_created');
  };

  const handleItemThree = (obj) => {
    setItemThree(obj);
    _city(obj.value);
    setSearchName('');
    setItems([]);
    setPageIndex(1);
    if (pathname.sub_cat || pathname.search) {
      router.push('/daleelcom');
      setItems([]);
      setTotalCount('');
    }
  };
  const search = (search) => {
    setFilters({
      ...filters,
      search,
      page: 1,
    });
  };

  const _idTwo = (subCat_id) => {
    setFilters({
      ...filters,
      subCat_id,
      page: 1,
    });
  };
  const _city = (city) => {
    setFilters({
      ...filters,
      city,
      page: 1,
    });
  };
  const _page = (page) => {
    setFilters({
      ...filters,
      page,
    });
  };
  const _sort = (sort) => {
    setFilters({
      ...filters,
      sort,
      page: 1,
    });
  };

  useEffect(() => {
    if ((itemOne && itemIdTwo) || filters.search) {
      (async () => {
        const arr = [];

        if (filters.search) {
          arr.push(`search=${filters.search}`);
        }
        if (filters.subCat_id) {
          arr.push(`filter[sub_category][id][_eq]=${itemIdTwo}`);
        }

        if (filters.city) {
          arr.push(`filter[governorate][name][_eq]=${itemThree.value}`);
        }

        if (filters.sort) {
          arr.push(`sort=${filters.sort}`);
        }
        if (filters.page) {
          arr.push(`page=${filters.page}`);
          //page=${pageIndex}
        }
        if (filters.limit) {
          arr.push(`limit=${filters.limit}`);
          //limit=${itemsPerPage}
        }

        await fetch(
          ` ${
            process.env.NEXT_PUBLIC_API_URL
          }/items/DaleelItem?fields=*,governorate.name&meta=*&${arr.join('&')}`,
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
            //console.log(json);
            const x = json;

            // Whatever you want to do next after fetching - maybe dispatch something?
            //console.log(x.data);
            setTotalCount(x.meta.filter_count);

            setItems(x.data);
            setItems([...items, ...x.data]);
            if (x.data.length == 0) {
              setIsData(false);
            } else {
              setIsData(true);
            }
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
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, itemOne, itemIdTwo, filters.search]);

  // console.log(isData === false ? 'no data' : 'yes data');
  useEffect(() => {
    if (pathname.sub_cat) {
      window.scrollTo({ left: 0, top: 250, behavior: 'smooth' });
      setItemId(pathname.main_cat);
      setItemOne({
        value: pathname.main_name,
        label: pathname.main_name,
      });

      fetchData(pathname.main_cat, setContent);

      setItemIdTwo(pathname.sub_cat);

      setItemTwo({
        value: pathname.sub_name,
        label: pathname.sub_name,
      });
      filters.subCat_id = pathname.sub_cat;
      selectTwoRef.current.blur();
    }
    if (pathname.search) {
      setSearchName(pathname.search);
     // console.log('test', pathname);     
      inputRef.current.focus();
      selectTwoRef.current.blur();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pathname.main_cat,
    pathname.main_name,
    pathname.sub_cat,
    pathname.sub_name,
    pathname.search
  ]);
  // console.log(arr);
  useEffect(() => {
    if (itemOne && itemOne.value !== '') selectTwoRef.current.focus();
  }, [itemOne]);

  const handleChangeOption = async (e) => {
    // console.log(e.target.value);
    setSortOption(e.target.value);
    _sort(e.target.value);
    setPageIndex(1);
    setItems([]);
  
  };
  const handleChangeInput = (e) => {
    e.preventDefault();
    setItemOne('');
    setItemTwo('');
    setItemThree('');
    setTotalCount(0);
    setItems([]);
    setPageIndex(1);
    setSearchName(e.target.value);
    setIsData(true);

    filters.subCat_id = '';
    filters.city = '';
    if (pathname.sub_cat || pathname.search) {
      router.push('/daleelcom');
      setItems([]);
      setIsData(true);
    }
  };

  const handleSearchName = () => {
    setItems([]);
    search(searchName);
    window.scrollTo({ left: 0, top: 250, behavior: 'smooth' });
  };

  const sub_cat = [];
  if (content) {
    content.data.map((el, index) => {
      sub_cat.push({ key: index,
        value: el.sub_category_name_ar,
        label: el.sub_category_name_ar,
        id: el.id,
      });
    });
  }

  //console.log('content',content )

  return (
    <>
      <div className="flex justify-center  flex-col items-center flex-wrap">
        {/* <div className=" text-gray-400 text-base my-2  sm:px-5 text-center flex justify-between sm:justify-center items-center">
          <p className="text-sm sm:text-sm ml-2 whitespace-nowrap">
            هل أنت مقدم الخدمة؟
          </p>{' '}
          <Link href="/register">
            <a className="bg-regal-green px-3 py-1.5 text-white shadow-md rounded-md whitespace-nowrap font-medium ">
              انضم إلينا
            </a>
          </Link>
          <Image src={free} width={'60px'} height={'60px'} alt={'free'} />
        </div> */}
        <div className="mx-auto px-3 text-center md:mx-0 w-[97%] md:w-[35%]  relative mt-12">
          <div className="flex items-center mb-2 md:mb-0 relative rounded rounded-tr-none rounded-br-none  ">
            <input
              ref={inputRef}
              type="text"
              name="searchName"
              id="searchName"
              placeholder=" بحث"
              value={searchName}
              onChange={(e) => handleChangeInput(e)}
              className="p-1.5 h-[38px] w-full border border-gray-300 rounded bg-gray-50 rounded-tl-none  rounded-bl-none  outline-2 outline-[#2684FF]"
            />
            <button
              disabled={!searchName}
              onClick={() => handleSearchName()}
              className="absolute left-0 top-0 bg-regal-dark text-white px-4 h-[38px] rounded rounded-tr-none rounded-br-none disabled:bg-gray-600"
            >
              <BiSearchAlt fontSize="1.3em" />
            </button>
          </div>
        </div>
      </div>
      <div className="h-7 md:px-0 flex justify-center items-center">
        <span className="inline-block w-[calc(50%-48px)] basis-[[calc(50%-48px)]] h-[2px] bg-gray-300"></span>
        <span className="inline-block w-12 text-center ">أو</span>
        <span className="inline-block w-[calc(50%-48px)] basis-[[calc(50%-48px)]] h-[2px] bg-gray-300"></span>
      </div>
      <form className="w-full mb-2 mx-auto  flex justify-center items-center rounded-md m-auto flex-wrap lg:flex-nowrap border p-4  bg-regal-dark ">
        <div className="grid lg:grid-cols-3  gap-2 text-regal-dark  w-full">
          <div>
            <label className="block mb-2 w-full text-sm font-normal text-white">
              اختار نوع الخدمة:-{' '}
            </label>
            <Select
              ref={selectOneRef}
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
          <div>
            <label className="block mb-2 w-full text-sm font-normal text-white">
              اختار المحافظة:-{' '}
            </label>
            <Select
              id="long-value-select"
              instanceId="long-value-select"
              placeholder="المحافظة"
              value={itemThree}
              options={governorate_list}
              onChange={(e) => handleItemThree(e)}
            />
          </div>
        </div>
      </form>
      <div className=" bg-gray-200 border-b p-4 pb-1 border-white mx-auto">
        <h2 className="text-regal-green font-semibold text-3xl text-center mb-2 lg:mb-0">
          نتائج البحث
        </h2>
        <div className="flex justify-between items-center mb-2">
          <select
            className="py-1 lg:w-[120px] border border-gray-300 rounded bg-gray-50  outline-2 outline-[#2684FF] text-sm"
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
          <p> عرض النتائج : {totalCount} </p>
        </div>
      </div>

      {items && items.length > 0 && (
        <div
          id="search"
          className="bg-gray-200 p-5 w-full mx-auto mt-0 mb-5 h-[650px] md:h-[400px] overflow-auto shadow-md rounded-sm"
        >
          <div className="grid lg:grid-cols-2 gap-3 px-0.5 ">
            {items.map((item) => {
              return <Items item={item} key={item.id} />;
            })}
          </div>
          <div className="text-center my-3">
            {Math.ceil(totalCount / limit) >= pageIndex + 1 && (
              <button
                onClick={(e) => handleLoadingMore(e)}
                className="bg-regal-dark text-white px-4 py-2 rounded-sm"
              >
                تحميل المزيد
              </button>
            )}
          </div>
        </div>
      )}
      {isData == false ? (
        <h3 className="bg-gray-200 p-5 w-full mx-auto mt-0 mb-5 text-center overflow-auto shadow-md rounded-sm text-lg font-semibold">
          لا توجد نتائج لعرضها
        </h3>
      ) : null}
    </>
  );
}

export default DaleelSearch;
