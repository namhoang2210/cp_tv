import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";

import { MovieDetail } from "@/types/movie";

interface MetaDataProps {
  data: MovieDetail;
  episodeIndex: number | undefined;
}

const MetaData: FC<MetaDataProps> = ({ data, episodeIndex }) => {
  const router = useRouter();

  const lastEpisodeRef = useRef<HTMLAnchorElement | null>(null);

  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsExpanded(false);
    if (lastEpisodeRef.current) {
      if (lastEpisodeRef.current.offsetTop > 0) {
        setShowLoadMoreButton(true);
      }
    }
  }, [router.asPath]);

  return (
    <div className="flex flex-col gap-[10px] text-gray-400">
      <h1 className="text-2xl mt-8 font-semibold text-gray-50">{data?.name}</h1>

      <div className="flex gap-4 ">
        <div className="flex items-center gap-1 text-sm">
          <p>Năm ra mắt: {data?.year}</p>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-yellow-400">
          <div>{data?.score?.toFixed(1)}</div>
          <div className="bg-yellow-600 text-white rounded px-1">Point</div>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap items-center text-sm">
        <div>Thể loại: </div>
        {data.tagList.map((tag) => (
          <span key={tag.id} className="bg-gray-600 text-gray-200 rounded px-2 text-[13px] ">
            {tag.name}
          </span>
        ))}
      </div>
      <div className="text-sm">
        <div>Giói thiệu:</div>
        <p>{data.introduction}</p>
      </div>

      {data.episodeVo > 1 && (
        <>
          <h1 className="text-lg mt-3 font-medium">Tập phim</h1>
          <div
            className={classNames("flex flex-wrap gap-3 relative", {
              "before:absolute before:bg-gradient-to-b before:from-[#00000000] before:to-dark before:top-10 before:w-full before:left-0 before:h-8 max-h-[50px] overflow-hidden":
                showLoadMoreButton && !isExpanded,
            })}
          >
            {new Array(data.episodeVo).fill("").map((_, index) => (
              <Link
                prefetch={false}
                href={`/tv/${data.id}/${index}`}
                key={index}
              >
                <a
                  {...(index === data.episodeVo - 1
                    ? { ref: lastEpisodeRef }
                    : {})}
                  className={classNames(
                    "p-4 h-[42px] flex items-center bg-dark-lighten rounded-lg hover:brightness-125 transition duration-300",
                    {
                      "!bg-[#08b5e1] text-white": index === episodeIndex,
                    }
                  )}
                >
                  {index + 1}
                </a>
              </Link>
            ))}
          </div>
          {showLoadMoreButton && (
            <div>
              <button
                className="text-primary"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MetaData;
