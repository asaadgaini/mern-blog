import { Button, Navbar, NavbarBrand ,Dropdown, TextInput, Avatar, DropdownHeader, DropdownDivider } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillMoon, AiFillSun, AiOutlineSearch } from "react-icons/ai";
import { useSelector , useDispatch } from "react-redux";
import { toggleTheme } from "./redux/theme/themeSlice";

function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user);
  const {theme} = useSelector((state)=>state.theme)

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
        <button color={"gray"} className="h-10 w-10 border justify-center items-center rounded-full  hidden outline-none sm:flex" onClick={ ()=>dispatch(toggleTheme())}>
          {theme === "light" ? <AiFillMoon/> : <AiFillSun/>}
        </button>
        
          {currentUser ? (
            <Dropdown 
              arrowIcon={false}
              inline
              label = {
              <Avatar 
                alt="user"
                img={currentUser.avatar}
                rounded
              />
          
              }
              >
                <DropdownHeader>
                  <span className="block text-sm ">@{currentUser.username}</span>
                  <span className="block text-sm truncate font-medium">{currentUser.email}</span>
                </DropdownHeader>
                <Link to={"/dashboard?tab=profile"}>
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <DropdownDivider/>
                <Dropdown.Item>Sign Out</Dropdown.Item>


            </Dropdown>
          ) : (
          <Link to={"/sign-in"}>
            <Button color={"purple"}>Sign In</Button>
            </Link>
          )}
        
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/profile"} as={"div"}>
          <Link to={"/projects"}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
