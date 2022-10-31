import Link from "next/link";
import { FC } from "react";

import { TopSearches } from "@/types/search";

import ImageFade from "../Shared/ImageFade";

interface TopSearchesProps {
  topSearches: TopSearches;
}

const TopSearches: FC<TopSearchesProps> = ({ topSearches }) => {
  return (
    <div className="flex flex-col gap-3">
      {topSearches.slice(0, 6).map((item) => (
        <Link
          href={
            item.domainType === 0 ? `/movie/${item.id}` : `/tv/${item.id}/0`
          }
          key={item.id}
        >
          <a className="flex gap-2 transition duration-300 mb-2 group">
            <div className="w-[120px] h-[70px] flex-shrink-0 group-hover:brightness-75 ">
              <ImageFade
                src={item.cover}
                className="w-[120px] h-[70px] object-cover rounded-lg"
                width={120}
                height={70}
                alt=""
              />
            </div>

            <div>
              <h1 className="text-sm font-semibold group-hover:text-[#48c1c4]">{item.title}</h1>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default TopSearches;
