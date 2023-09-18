import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const NavBar = (props) => {
  console.log(props);
  const { pathname } = useLocation();
  console.log(pathname);
  const [photoURL, setPhotoUrl] = useState("");
  const [userName, setUserName] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const handleUserInfo = () => {
    if (pathname !== "/" && pathname !== "/login") {
      console.log("hi");
      let userInfo = localStorage.getItem("userData");
      userInfo = JSON.parse(userInfo);
      setPhotoUrl(userInfo.photoURL);
      setUserName(userInfo.displayName);
    }
  };
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setPhotoUrl("");
        setUserName("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handleUserInfo();
  });
  return (
    <NavWrapper>
      <Logo>
        {props.color === "white" ? (
          <TextLogo color="white">CLAYING</TextLogo>
        ) : (
          <TextLogo>CLAYING</TextLogo>
        )}
      </Logo>
      {pathname === "/" || pathname === "/login" ? (
        <></>
      ) : (
        <SignOut>
          <UserImg src={photoURL} alt={userName} />
          <DropDown>
            <span onClick={handleLogOut}>Sign Out</span>
          </DropDown>
        </SignOut>
      )}
    </NavWrapper>
  );
};

export default NavBar;

const NavWrapper = styled.nav`
  margin-top: 28px;
  padding: 0 36px;
  position: fixed;
  min-width: 310px;
  display: flex;
  justify-content: space-between;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: flex;
  justify-content: center;
  img {
    display: block;
    width: 100%;
  }
`;
const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  min-width: 80px;
  background: #3c95ff;
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 4px 8px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
  color: white;
`;

const SignOut = styled.div`
  position: relative;
  height: 40px;
  width: 40px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const TextLogo = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@0,700;0,900&display=swap");
  color: ${(props) => (props.color === "white" ? "white" : "#3C95FF")};
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  display: flex;
  align-items: center;
`;
