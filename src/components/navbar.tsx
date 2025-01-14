import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="h-[70px] bg-zinc-950 rounded-full border-nav flex items-center justify-between max-w-[1200px] m-auto mt-5">
        <h1 className="text-zinc-400 text-2xl ml-10 hover:text-white duration-500 ease-in-out cursor-default">
          {" "}
          Al Décor
        </h1>

        <svg
        className="mr-10 icon-hover"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 10.9384C2.5 9.71422 3.06058 8.55744 4.02142 7.79888L9.52142 3.45677C10.9747 2.30948 13.0253 2.30948 14.4786 3.45677L19.9786 7.79888C20.9394 8.55744 21.5 9.71422 21.5 10.9384V17.5C21.5 19.7091 19.7091 21.5 17.5 21.5H16C15.4477 21.5 15 21.0523 15 20.5V17.5C15 16.3954 14.1046 15.5 13 15.5H11C9.89543 15.5 9 16.3954 9 17.5V20.5C9 21.0523 8.55228 21.5 8 21.5H6.5C4.29086 21.5 2.5 19.7091 2.5 17.5L2.5 10.9384Z"
            stroke="#A1A1AA"
            stroke-width="1.5"
          />
        </svg>
      </nav>
    </>
  );
};

export default Navbar;
