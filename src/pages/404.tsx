import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import Meta from "@/components/Shared/Meta";

const Error: FC = () => {
  const router = useRouter();

  return (
    <>
      <Meta
        title="Not Found - Filmhot"
        description="FilmHot - AdFree Movie / Anime Watching Website"
        image="/preview.png"
      />
      <div className="flex flex-col min-h-screen justify-center items-center gap-4">
        <img className="w-full max-w-[200px] h-auto" src="/cinema.png" alt="" />
        <p className="text-xl">Có lỗi rồi bạn ơi!!!</p>

        {router.pathname !== "/" && (
          <Link href="/">
            <a className="text-primary">Quay về trang chủ</a>
          </Link>
        )}
      </div>
    </>
  );
};

export default Error;
