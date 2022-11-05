import {
  Button,
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/router";
import * as React from 'react';
import { useEffect } from "react";

import SearchBox from '../Search/SearchBox';

const HeaderBar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const router = useRouter();
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-start lg:gap-4">
      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className="p-1 font-semibold hover:text-[#44c0c4]"
      >
        <button onClick={()=> router.push("/")}>
          Trang chủ
        </button >
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className="p-1 font-semibold hover:text-[#44c0c4]"
      >
        <button onClick={()=> router.push("/history")}>
          Lịch sử
        </button >
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className="p-1 font-semibold hover:text-[#44c0c4]"
      >
        <button onClick={()=> router.push("/")}>
          Liên hệ
        </button >
      </Typography>
    </ul>
  );

  return (
    <div className="py-3 px-4 md:px-[10%] bg-[#032541] sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center gap-6">
          <Typography
            as="a"
            variant="small"
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#90cea1] to-[#01b4e4] uppercase text-2xl md:text-3xl font-bold"
          >
            <button onClick={()=> router.push("/")}>CHUPPYTV</button>
          </Typography>
          <div className="hidden lg:block">{navList}</div>
        </div>
        <div className="hidden lg:block">
          <SearchBox />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
        {openNav ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </IconButton>
    </div>
    <MobileNav open={openNav}>
      {navList}
      <Button variant="gradient" size="sm" fullWidth className="mb-2 flex items-center gap-2 justify-center bg-white text-gray-800" onClick={()=> router.push("/search")}>
        <span>Tìm kiếm</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </Button>
    </MobileNav>
  </div>
  );
};
export default HeaderBar;