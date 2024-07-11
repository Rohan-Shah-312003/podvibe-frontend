import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  FaBars,
  FaHeart,
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaMicrophoneAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = styled.div`
  background-color: #252525;
  color: #fffff0;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  align-items: flex-start;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: width 0.3s ease;
  overflow: hidden;
  height: 100vh;
  width: ${(props) => (props.isOpen ? "250px" : "80px")};

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: static;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  color: #fffff0;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: space-between;
    margin-bottom: 10px;
  }
`;

const LogoText = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #fffff0;
  cursor: pointer;
  &:hover {
    color: #007bff;
    transition: color 0.2s ease-in-out;
  }
`;

const NavItem = styled(NavLink)`
  font-size: 18px;
  color: #fffff0;
  padding: 10px 10px 10px 4px;
  width: 100%;
  text-decoration: none;
  display: flex;
  align-items: center;
  border-radius: 7px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    background-color: #007bff;
    color: #ffffff;
  }

  &.active {
    background-color: #004c8c;
    color: #ffffff;
    font-weight: bold;

    ${(props) =>
      !props.isOpen &&
      css`
        padding: 5px 0px 5px 10px;
      `}
  }
`;

const NavIcon = styled.div`
  margin-right: ${(props) => (props.isOpen ? "10px" : "0")};
`;

const HamburgerIcon = styled(FaBars)`
  margin-right: 16px;
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    flex-direction: column;
    width: 100%;
  }
`;

const NavItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["flag"]);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleNavbar = () => {
    if (window.innerWidth > 768) {
      setIsOpen(!isOpen);
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleNavItemClicked = () => {
    if (window.innerWidth <= 768) {
      setIsDropdownOpen(false);
    }
  };

  const logout = () => {
    setCookies("flag", false);
    window.localStorage.clear();
    window.location.reload();
    navigate("/auth");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
        setIsDropdownOpen(false);
      } else {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderNavItems = () => (
    <>
      <NavItem
        exact
        to="/"
        activeClassName="active"
        onClick={handleNavItemClicked}
        isOpen={isOpen}>
        <NavIcon isOpen={isOpen}>
          <FaHome />
        </NavIcon>
        {(isOpen || isDropdownOpen) && "Home"}
      </NavItem>
      <NavItem
        to="/createpodcasts"
        activeClassName="active"
        onClick={handleNavItemClicked}
        isOpen={isOpen}>
        <NavIcon isOpen={isOpen}>
          <FaUser />
        </NavIcon>
        {(isOpen || isDropdownOpen) && "Create Podcast"}
      </NavItem>
      <NavItem
        to="/savedpodcasts"
        activeClassName="active"
        onClick={handleNavItemClicked}
        isOpen={isOpen}>
        <NavIcon isOpen={isOpen}>
          <FaHeart />
        </NavIcon>
        {(isOpen || isDropdownOpen) && "Saved Podcasts"}
      </NavItem>
      <NavItem
        to="/mypodcasts"
        activeClassName="active"
        onClick={handleNavItemClicked}
        isOpen={isOpen}>
        <NavIcon isOpen={isOpen}>
          <FaMicrophoneAlt />
        </NavIcon>
        {(isOpen || isDropdownOpen) && "My Podcasts"}
      </NavItem>
      <NavItem
        to="/auth"
        activeClassName="active"
        onClick={handleNavItemClicked}
        isOpen={isOpen}>
        <NavIcon isOpen={isOpen}>
          <FaSignOutAlt />
        </NavIcon>
        {(isOpen || isDropdownOpen) &&
          (!cookies.flag ? (
            "Login/Register"
          ) : (
            <span onClick={logout}>Logout</span>
          ))}
      </NavItem>
    </>
  );

  return (
    <Sidebar isOpen={isOpen}>
      <LogoContainer>
        <LogoText onClick={toggleNavbar}>
          <HamburgerIcon />
        </LogoText>
        {(isOpen || window.innerWidth <= 768) && <LogoText>PodVibe</LogoText>}
      </LogoContainer>
      {window.innerWidth > 768 ? (
        <NavItemsContainer isOpen={isOpen}>
          {renderNavItems()}
        </NavItemsContainer>
      ) : (
        <DropdownContainer isOpen={isDropdownOpen}>
          {renderNavItems()}
        </DropdownContainer>
      )}
    </Sidebar>
  );
};

export default Navbar;
