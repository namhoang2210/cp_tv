import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

import HeaderBar from "@/components/Layout/Headerbar";
import ImageFade from "@/components/Shared/ImageFade";
import Meta from "@/components/Shared/Meta";

const getHistory = () => {
  try {
    const existing = JSON.parse(localStorage.getItem("filmhot-recent") || "[]");
    return existing;
  } catch {
    return [];
  }
};

const History: FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getHistory());
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("filmhot-recent");
    setData(getHistory());
  };

  return (
    <>
      <Meta
        title="ChuppyTV - Lịch sử xem"
        description=""
        image=""
      />
      <HeaderBar />
      <div className="flex flex-col items-stretch px-4 md:px-[10%] min-h-screen">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold mt-12">Lịch sử </h1>

          <button
            onClick={clearHistory}
            className="text-primary flex items-center gap-1"
          >
            <FaTrash /> <span>Xóa</span>
          </button>
        </div>
        {data.length === 0 ? (
          <div className="flex flex-col items-center my-10 gap-6">
            <img className="w-40 h-40 object-cover" src="/cinema.png" alt="" />

            <p className="text-xl">Bạn chưa có lịch sử xem</p>

            <Link href="/">
              <a className="text-xl text-primary">Xem ngay nào!!!</a>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-sm md:grid-cols-xl">
            {data.map((item: any) => (
              <Link
                href={
                  item.category === 0 ? `/movie/${item.id}` : `/tv/${item.id}/0`
                }
                key={item.id}
              >
                <a className="relative h-0 pb-[163%] rounded overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-stretch">
                    <div className="relative w-full h-0 pb-[140%] flex-shrink-0 group-hover:brightness-[80%] transition duration-300">
                      <ImageFade
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                        src={item.coverVerticalUrl}
                        alt=""
                      />
                    </div>

                    <div className="flex-grow flex items-center">
                      <h1 className="w-full whitespace-nowrap overflow-hidden text-ellipsis text-sm p-2 group-hover:text-[#37beca] transition duration-300">
                        {item.name}
                      </h1>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default History;
