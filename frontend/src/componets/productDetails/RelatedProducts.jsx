import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import Ratings from "../Ratings";
const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div>
      <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto mb-10">
        <h2 className="text-2xl py-8 text-slate-600">Related Products </h2>
        <div>
          <Swiper
            slidesPerView="auto"
            breakpoints={{
              1280: {
                slidesPerView: 4,
              },
              565: {
                slidesPerView: 2,
              },
            }}
            spaceBetween={25}
            loop={true}
            pagination={{
              clickable: true,
              el: ".custom_bullet",
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {relatedProducts.map((relatedPro) => {
              return (
                <SwiperSlide key={relatedPro._id}>
                  <Link
                    to={`/product/details/${relatedPro.slug}`}
                    className="block "
                  >
                    <div className="relative h-[270px] flex flex-col ">
                      {/* image */}
                      <div className="w-full h-[270px]">
                        <img
                          className="h-[270px] w-full"
                          src={`${relatedPro.images[0]}`}
                          alt=""
                        />
                        <div className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-500"></div>
                      </div>
                      {/* discount */}
                      {relatedPro.discount !== 0 && (
                        <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                          {relatedPro.discount}%
                        </div>
                      )}
                    </div>
                    <div>
                      {/* product details */}
                      <div className="p-4 flex flex-col gap-1 text-black ">
                        <h2 className="text-slate-600 text-sm ">
                          {relatedPro.name}
                        </h2>
                        <div className="flex justify-start items-center gap-3 ">
                          <h2 className="text-lg font-bold text-slate-600">
                            ₹
                            {relatedPro.discount
                              ? relatedPro.price -
                                Math.floor(
                                  (relatedPro.price * relatedPro.discount) / 100
                                )
                              : relatedPro.price}
                          </h2>
                          <div className="flex">
                            <Ratings ratings={relatedPro.rating} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="w-full flex justify-center items-center py-8">
          <div className="custom_bullet justify-center gap-3 !w-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
