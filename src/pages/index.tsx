import { createSSGHelpers } from "@trpc/react/ssg";
import type { InferGetStaticPropsType, NextPage } from "next";
import { InView } from "react-intersection-observer";
import ScrollToTop from "react-scroll-to-top";
import superjson from "superjson";

import BannerSlider from "@/components/Home/BannerSlider";
import InfiniteLoader from "@/components/Home/InfiniteLoader";
import SectionSlider from "@/components/Home/SectionSlider";
import Footer from "@/components/Layout/Footer";
import HeaderBar from "@/components/Layout/Headerbar";
import TopSearches from "@/components/Search/TopSearches";
import Meta from "@/components/Shared/Meta";
import { appRouter } from "@/server/createRouter";
import { getTopSearches } from "@/services/search";
import { trpc } from "@/utils/trpc";

const Home: NextPage<HomeProps> = ({ topSearches }) => {

  const { data, fetchNextPage, isFetchingNextPage } = trpc.useInfiniteQuery(
    ["home.infinite", {}],
    {
      getNextPageParam: (_, allPages) => allPages.length,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <>
      <Meta
        title="ChuppyTV - Trang chủ"
        description=""
        image="/preview.png"
      />
      <HeaderBar />
      <div className="flex mx-4 md:mx-[10%]">
        <div className="flex-grow pb-8 pt-0 overflow-hidden flex flex-col items-stretch">
          {data?.pages?.flat().map((section) =>
            section.homeSectionType === "BANNER" ? (
              <div
                key={section.homeSectionId}
                className="overflow-hidden w-full mt-8"
              >
                <BannerSlider
                  images={
                    (section.recommendContentVOList
                      .map((item) => {
                        const searchParams = new URLSearchParams(
                          new URL(item.jumpAddress).search
                        );

                        if (!searchParams.get("id")) return null;

                        return {
                          title: item.title,
                          image: item.imageUrl,
                          link:
                            searchParams.get("type") === "0"
                              ? `/movie/${searchParams.get("id")}`
                              : `/tv/${searchParams.get("id")}/0`,
                        };
                      })
                      .filter(Boolean) as {
                      title: string;
                      image: string;
                      link: string;
                    }[]) || []
                  }
                />
              </div>
            ) : (
              <div key={section.homeSectionId}>
                <div className="text-xl flex items-center gap-2 md:text-2xl mb-3 mt-12">
                  <div className="font-medium md:font-semibold">{section.homeSectionName.replace("Loklok", "trên ChuppyTV")}</div>
                </div>
                <SectionSlider
                  images={section.recommendContentVOList.map((item) => {
                    const searchParams = new URLSearchParams(
                      new URL(item.jumpAddress).search
                    );

                    return {
                      title: item.title,
                      image: item.imageUrl,
                      link:
                        searchParams.get("type") === "0"
                          ? `/movie/${searchParams.get("id")}`
                          : `/tv/${searchParams.get("id")}/0`,
                      point: item.score,    
                    };
                  })}
                  coverType={section.coverType}
                />
              </div>
            )
          )}

          {data?.pages?.slice(-1)?.[0]?.length !== 0 && (
            <InView
              onChange={(inView) => {
                if (
                  inView &&
                  !isFetchingNextPage &&
                  data?.pages?.slice(-1)?.[0]?.length !== 0
                ) {
                  fetchNextPage();
                }
              }}
              rootMargin="0px 0px 1000px 0px"
              threshold={[0, 0.25, 0.5, 0.75, 1]}
            >
              {({ ref }) => <InfiniteLoader forwardedRef={ref} />}
            </InView>
          )}
        </div>

        <div className="flex-shrink-0 w-[350px] pl-10 pb-8 sticky top-16 h-screen scrollbar overflow-hidden overflow-y-auto hidden lg:block">
          <h1 className="text-2xl font-semibold my-6">Top tìm kiếm</h1>
          <TopSearches topSearches={topSearches!} />
        </div>
      </div>
      <ScrollToTop className="hidden md:flex justify-center pt-1" smooth />
      <Footer />
    </>
  );
};

export default Home;

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  try {
    const ssg = createSSGHelpers({
      router: appRouter,
      ctx: {
        req: undefined,
        res: undefined,
      },
      transformer: superjson,
    });

    const [topSearches] = await Promise.all([
      getTopSearches(),
      ssg.fetchInfiniteQuery("home.infinite", {}),
    ]);

    return {
      props: {
        topSearches,
        trpcState: ssg.dehydrate(),
      },
      revalidate: 300,
    };
  } catch (error) {
    return {
      props: {},
      revalidate: 60,
      notFound: true,
    };
  }
};
