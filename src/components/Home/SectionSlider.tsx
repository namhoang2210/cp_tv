import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import ImageFade from "../Shared/ImageFade";

interface SliderProps {
  images: {
    title: string;
    image: string;
    link: string;
  }[];
  coverType: 0 | 1;
}

const Slider: FC<SliderProps> = ({ images }) => {
  return (
    <div>
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView="auto"
        slidesPerGroupAuto
        className="hidden lg:block"
      >
        {images.map((item, index) => (
          <SwiperSlide
            style={{
              width: "150px",
            }}
            className={classNames({
              "!ml-[26px]": index !== 0,
            })}
            key={item.image}
          >
            <Link href={item.link} prefetch={false} >
              <a className="block rounded-lg overflow-hidden group ">
                <ImageFade
                  className="group-hover:brightness-75 transition duration-300 object-cover rounded-xl"
                  src={item.image}
                  width="150px"
                  height="240px"
                  alt=""
                />
                <h1 className="group-hover:text-[#48c1c4] transition duration-300 pt-4 text-sm font-semibold px-2 m-0 max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.title}
                </h1>
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        slidesPerGroupAuto
        className="lg:hidden"
      >
        {images.map((item, index) => (
          <SwiperSlide
            style={{
              width: "130px",
            }}
            className={classNames({
              "!ml-[20px]": index !== 0,
            })}
            key={item.image}
          >
            <Link href={item.link} prefetch={false} >
              <a className="block rounded-lg overflow-hidden group ">
                <ImageFade
                  className="group-hover:brightness-75 transition duration-300 object-cover rounded-xl"
                  src={item.image}
                  width="130px"
                  height="200px"
                  alt=""
                />
                <h1 className="group-hover:text-[#48c1c4] transition duration-300 pt-4 text-sm font-semibold px-1.5 lg:px-2 m-0 max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.title}
                </h1>
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
