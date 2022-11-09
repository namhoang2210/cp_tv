import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { FC } from "react";

import HeaderBar from "@/components/Layout/Headerbar";
import ImageFade from "@/components/Shared/ImageFade";
import Meta from "@/components/Shared/Meta";
import { getTopSearches, searchWithKeyword } from "@/services/search";

import SearchBox from "../components/Search/SearchBox";
import TopSearches from "../components/Search/TopSearches";

const Search: FC<SearchProps> = ({ result, topSearches, query }) => {
  if (topSearches)
    return (
      <>
        <Meta
          title="ChuppyTV - Tìm kiếm"
          description=""
          image=""
        />
        <HeaderBar />
        <div className="mb-[50px] mx-4">
          <div className="w-full flex flex-col items-center gap-4">
            <div className="flex flex-col items-stretch gap-3 mt-10">
              <SearchBox autoFocus />
            </div>
            <div className="mt-8 w-full">
              <h1 className="text-lg mb-3">Top tìm kiếm</h1>
              <TopSearches topSearches={topSearches} />
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Meta
        title={`ChuppyTV - Tìm kiếm cho '${query}'`}
        description=""
        image=""
      />
      <HeaderBar />
      <div className="flex flex-col items-stretch px-4 md:px-[10%] mt-10 min-h-screen">
        <div>
          <h1 className="mb-6 text-2xl font-semibold">Kết quả tìm kiếm cho {`'${query}'`}</h1>
          {result.length === 0 ? (
            <div className="flex flex-col items-center my-10 gap-6">
              <img className="w-40 h-40 object-cover" src="/cinema.png" alt="" />

              <p className="text-xl">Ẹc! Không tìm thấy gì.</p>

              <Link href="/">
                <a className="text-xl text-primary">Quay lại trang chủ</a>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-sm md:grid-cols-xl">
              {result.map((item) => (
                <Link
                  href={
                    item.domainType === 0
                      ? `/movie/${item.id}`
                      : `/tv/${item.id}/0`
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
      </div>
    </>
  );
};

export default Search;

type SearchProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const q = query.q;

  if (!q || typeof q !== "string") {
    const topSearches = await getTopSearches();

    return {
      props: {
        topSearches,
      },
    };
  }

  const result = await searchWithKeyword(q);

  return {
    props: {
      result,
      query: q.trim(),
    },
  };
};
