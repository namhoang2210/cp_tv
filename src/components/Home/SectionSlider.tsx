import 'react-circular-progressbar/dist/styles.css';

import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import ImageFade from "../Shared/ImageFade";

interface SliderProps {
  images: {
    title: string;
    image: string;
    link: string;
    point: number;
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
              <a className="relative block rounded-lg overflow-hidden group ">
                <ImageFade
                  className="group-hover:brightness-75 transition duration-300 object-cover rounded-lg"
                  src={item.image}
                  width="150px"
                  height="240px"
                  alt=""
                />
                <h1 className="group-hover:text-[#48c1c4] transition duration-300 pt-4 text-sm font-semibold px-2 m-0 max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.title}
                </h1>
                {item.point && 
                  <CircularProgressbar
                    className={`h-[32px] w-[32px] absolute bottom-7 left-2.5 rounded-full border-[2px] ${item.point >= 8 ? "bg-green-600 border-green-600" : item.point >= 5 ? "bg-[#e0a82e] border-[#e0a82e]" : "bg-red-400 border-red-400"}`}
                    value={item.point * 10} 
                    text={`${item.point.toFixed(1)}`}/>
                }
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
                  className="group-hover:brightness-75 transition duration-300 object-cover rounded-lg"
                  src={item.image}
                  width="130px"
                  height="200px"
                  alt=""
                />
                <h1 className="group-hover:text-[#48c1c4] transition duration-300 pt-4 text-sm font-semibold px-1.5 lg:px-2 m-0 max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.title}
                </h1>
                {item.point && 
                  <CircularProgressbar
                    className={`h-[32px] w-[32px] absolute bottom-7 left-2.5 rounded-full border-[2px] ${item.point >= 8 ? "bg-green-600 border-green-600" : item.point >= 5 ? "bg-[#e0a82e] border-[#e0a82e]" : "bg-red-400 border-red-400"}`}
                    value={item.point * 10} 
                    text={`${item.point.toFixed(1)}`}/>
                }
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
