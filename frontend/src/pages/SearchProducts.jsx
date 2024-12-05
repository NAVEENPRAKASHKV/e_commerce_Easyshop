import React, { useState, useEffect } from "react";
import Header from "../componets/Header";
import Footer from "../componets/Footer";
import Products from "../componets/products/Products";
import { BsGridFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import ShopProducts from "../componets/products/ShopProducts";
import Pagination from "../componets/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  price_range_product,
  query_proudcts,
} from "../store/reducers/homeReducer";
import PageHeading from "../componets/PageHeading";
import PriceRange from "../componets/shops/PriceRange";
import FilterRating from "../componets/shops/FilterRating";
import { useSearchParams } from "react-router-dom";

const SearchProducts = () => {
  const [filter, setFilter] = useState(true);
  const [rating, setRating] = useState("");
  const [styles, setStyles] = useState("grid");
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const { latest_product, priceRange, totalProducts, totalCount, perPage } =
    useSelector((store) => store.home);
  const [state, setState] = useState({
    values: priceRange ? [priceRange.low, priceRange.high] : [0, 100],
  });
  const [sortPrice, setSortPrice] = useState();
  // setting based on the url
  let [searchParams, setSearchParams] = useSearchParams();
  let category = searchParams.get("category");
  let searchValue = searchParams.get("searchValue");

  // useEffect
  useEffect(() => {
    dispatch(price_range_product());
  }, []);

  useEffect(() => {
    setState({
      values: [priceRange.low, priceRange.high],
    });
  }, [priceRange]);
  useEffect(() => {
    const query = {
      low: state.values[0],
      high: state.values[1],
      category,
      rating,
      sortPrice,
      pageNumber,
      searchValue,
    };
    dispatch(query_proudcts(query));
  }, [
    state.values[0],
    state.values[1],
    category,
    rating,
    sortPrice,
    pageNumber,
    searchValue,
  ]);

  return (
    <div className=" ">
      <Header />

      {/* page Heading  */}
      <div>
        <PageHeading
          heading="Category"
          breadcrumbs={{
            Home: "/",
            shop: "/shops",
          }}
        />
      </div>
      {/* filter layout and product side layout */}
      <section className="py-16  overflow-x-hidden ">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          {/* button for filter in the medium screen responsive */}
          <div className={` md:block hidden ${!filter ? "mb-6" : "mb-0"} `}>
            <button
              onClick={() => setFilter(!filter)}
              className="text-center w-full py-2 px-3 bg-indigo-500 text-white"
            >
              Filter Product
            </button>
          </div>
          {/* shop page sidebar and product layout*/}
          <div className="w-full flex flex-wrap ">
            {/* responsive hidden sidebar layout */}
            <div
              className={`w-3/12 md-lg:w-4/12 md:w-full pr-8  ${
                filter
                  ? "md:h-0 md:overflow-hidden md:mb-6"
                  : "md:h-auto md:overflow-auto md:mb-0"
              } `}
            >
              {/* price range */}
              <div className="mb-5">
                <PriceRange
                  state={state}
                  setState={setState}
                  priceRange={priceRange}
                />
              </div>
              {/* rating */}
              <div className="mb-5">
                <FilterRating setRating={setRating} />
              </div>
              {/* latest product  */}
              <div className="mb-5">
                {latest_product && (
                  <Products title="Latest Products" products={latest_product} />
                )}
              </div>
            </div>
            {/* product side layout */}
            <div className="w-9/12 md-lg:w-8/12 md:w-full  ">
              {/* sorting and view change feature */}
              <div className="mb-7">
                <div className="border-[1px] border-slate-500 flex justify-between items-center px-3 py-2 ">
                  <div>{totalCount} Products Available</div>
                  <div className="flex justify-center items-center gap-4">
                    {/* sort option */}
                    <div>
                      <select
                        className="outline-none border-2 px-2"
                        onChange={(e) => setSortPrice(e.target.value)}
                      >
                        <option>--Sort By--</option>
                        <option value="high-to-low">Higher to Lower</option>
                        <option value="low-to-high">Lower to Higher</option>
                      </select>
                    </div>
                    {/* grid view */}
                    <div
                      onClick={() => setStyles("grid")}
                      className={`cursor-pointer text-xl ${
                        styles === "grid" ? "bg-slate-800 text-white" : ""
                      } h-[35px] w-[35px] rounded-full flex justify-center items-center`}
                    >
                      <BsGridFill />
                    </div>
                    {/* list view */}
                    <div
                      onClick={() => setStyles("list")}
                      className={`cursor-pointer text-xl ${
                        styles === "list" ? "bg-slate-800 text-white" : ""
                      } h-[35px] w-[35px] rounded-full flex justify-center items-center`}
                    >
                      <FaListUl />
                    </div>
                  </div>
                </div>
              </div>
              {/* product list */}
              <div className="">
                <ShopProducts styles={styles} products={totalProducts} />
              </div>
              {/* pagination */}
              {totalCount > perPage && (
                <div className="w-full flex justify-end mt-4 pr-7 overflow-x-hidden">
                  <Pagination
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalItem={totalCount}
                    perPage={perPage}
                    showItem={3}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SearchProducts;