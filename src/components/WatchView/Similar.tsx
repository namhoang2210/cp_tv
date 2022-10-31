import Link from "next/link";
import { FC } from "react";

import ImageFade from "@/components/Shared/ImageFade";
import { MovieDetail } from "@/types/movie";

interface SimilarProps {
  data: MovieDetail;
}

const Similar: FC<SimilarProps> = ({ data }) => {
  return (
    <div className="mt-10">
      {data?.refList &&
        data.refList.filter((item) => item.id !== data.id).length > 0 && (
          <>
            <h1 className="text-2xl my-3">In the series</h1>
            <div className="max-h-[60vh] overflow-x-hidden overflow-y-auto flex flex-col items-stretch gap-2">
              {data?.refList
                .filter((item) => item.id !== data.id)
                .map((ref) => (
                  <Link
                    key={ref.id}
                    href={`/${ref.category === 0 ? "movie" : "tv"}/${ref.id}`}
                  >
                    <a className="flex gap-3 pr-2 hover:brightness-[85%] transition duration-300">
                      <div className="flex-shrink-0 h-[100px] w-[70px]">
                        <ImageFade
                          height={100}
                          width={70}
                          className="h-full w-full object-cover"
                          src={ref.coverVerticalUrl}
                          alt=""
                        />
                      </div>
                      <div className="my-2 flex-grow">
                        <p>{ref.name}</p>
                      </div>
                    </a>
                  </Link>
                ))}
            </div>
          </>
        )}

      {data?.likeList && data.likeList.length > 0 && (
        <>
          <h1 className="text-2xl my-3">Phim cùng thể loại</h1>
          <div className="flex flex-wrap gap-8 mt-4">
            {data?.likeList.map((like) => (
              <Link
                key={like.id}
                href={`/${like.category === 0 ? "movie" : "tv"}/${like.id}`}
              >
                <a className="w-[150px] ">
                  <div className="bg-white h-[240px] rounded-xl">
                    <ImageFade
                      className="h-[240px] rounded-xl w-full object-cover"
                      src={like.coverVerticalUrl}
                      alt=""
                    />
                  </div>
                   
                  <div className="whitespace-nowrap px-2 pt-4  text-sm font-semibold">
                    <div className="text-ellipsis overflow-hidden">{like.name}</div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Similar;
