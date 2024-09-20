import { Button, Navbar, NavbarBrand, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillMoon, AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";

function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Navbar className=" border-b-2">
      <Link
        to={"/"}
        className="self-center whitespace-nowrap text-sm sm:text-xl 
         font-bold dark:text-white"
      >
        <span className="px-2 py-1">AS-Blog</span>
      </Link>
      <form>
        <TextInput
          type="text "
          className="hidden lg:inline"
          rightIcon={AiOutlineSearch}
          placeholder="search"
        />
      </form>
      <Button className="w-12 h-10 " pill color={"gray"}>
        {" "}
        <AiOutlineSearch />{" "}
      </Button>
      <div className="flex gap-2 items-center md:order-2">
        <Button color={"gray"} className="h-10 w-12 hidden sm:inline">
          <AiFillMoon />
        </Button>
        <Link to={"/sign-in"}>
          {currentUser ? (
            <img className=" rounded-full h-7 w-7 bg-cover" src={currentUser.avatar} alt="profile" />
          ) : (
            <Button color={"purple"}>Sign In</Button>
          )}
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to={"/projects"}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
