import moment from "moment";
import { useRouter } from "next/router";


const Footer = () => {
  const router = useRouter();
  return (
  <footer className="p-4 bg-[#032541] md:flex md:items-center md:justify-between md:py-6 md:px-[10%] mt-10">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a onClick={()=> router.push("/")} className="hover:underline">ChuppyTV™</a>. All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
              <a className="mr-4 hover:underline md:mr-6 ">About</a>
          </li>
          <li>
              <a  className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
          </li>
          <li>
              <a className="mr-4 hover:underline md:mr-6">Licensing</a>
          </li>
          <li>
              <a href="https://www.facebook.com/profile.php?id=100026220224092" className="hover:underline">Contact</a>
          </li>
      </ul>
  </footer>
  );
};
export default Footer;
