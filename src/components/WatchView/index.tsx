import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";

import { MovieInfo } from "@/types/movie";
import { trpc } from "@/utils/trpc";

import Footer from "../Layout/Footer";
import HeaderBar from "../Layout/Headerbar";
import MetaData from "./Metadata";
import Similar from "./Similar";

const Player = dynamic(() => import("./Player"), { ssr: false });

type WatchViewProps = MovieInfo & {
  episodeIndex?: number;
};

const WatchView: FC<WatchViewProps> = ({
  data,
  sources,
  subtitles,
  episodeIndex,
}) => {
  const mediaType = typeof episodeIndex === "undefined" ? "movie" : "tv";
  const playerKey = `${mediaType}-${data?.id}${
    episodeIndex ? `-${episodeIndex}` : ""
  }`;

  const [willFetchLatestSource, setWillFetchLatestSource] = useState(false);

  const { data: newData } = trpc.useQuery(
    [
      "video.info",
      {
        id: data.id,
        category: typeof episodeIndex === "undefined" ? 0 : 1,
        episodeIndex,
      },
    ],
    { enabled: willFetchLatestSource }
  );

  useEffect(() => {
    // @ts-ignore
    if (window.xhrModified) return;
    const oldMethod = XMLHttpRequest.prototype.open;
    // @ts-ignore
    XMLHttpRequest.prototype.open = function (
      method,
      url,
      async,
      username,
      password
    ) {
      if (typeof url === "string" && url.includes("m3u8")) {
        this.addEventListener("error", () => {
          setWillFetchLatestSource(true);
        });
        this.addEventListener("loadend", () => {
          if (this.status >= 300) {
            setWillFetchLatestSource(true);
          }
        });
      }
      return oldMethod.call(this, method, url, async, username, password);
    };

    // @ts-ignore
    window.xhrModified = true;
  }, []);

  useEffect(() => {
    if (!data) return;
    let existing = JSON.parse(
      localStorage.getItem("filmhot-recent") || "[]"
    ) as {
      id: string;
      category: number;
      coverVerticalUrl: string;
      name: string;
    }[];

    if (!Array.isArray(existing)) return;

    existing = existing.filter((item) => item.id !== data.id);

    existing.unshift({
      id: data.id,
      category: data.category,
      coverVerticalUrl: data.coverVerticalUrl,
      name: data.name,
    });

    localStorage.setItem("filmhot-recent", JSON.stringify(existing));
  }, [data]);

  return (
    <>
      <HeaderBar />
      <div className="bg-black px-4 md:mx-[10%]">
      <div className="max-w-[1000px] max-h-[560px] mx-auto mt-4 md:mt-10 px-4">
        <Player
          key={playerKey}
          playerKey={playerKey}
          primaryColor="#0D90F3"
          src={newData?.sources || sources}
          subtitles={
            subtitles?.map((subtitle: any) => ({
              ...subtitle,
              url: `/api/subtitle?url=${encodeURIComponent(
                subtitle.url
              )}`,
            })) || []
          }
        ></Player>
      </div>
      </div>
      <div className="px-4 md:px-[10%] md:smt-4">
        <MetaData data={data} episodeIndex={episodeIndex} />
        <Similar data={data} />
      </div>
      <Footer />     
    </>
  );
};

export default WatchView;
