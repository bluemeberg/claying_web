import { getAuth, signOut } from "firebase/auth";
import React, { useCallback, useEffect, useState } from "react";
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
        localStorage.removeItem("userData");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleGoHome = useCallback(() => {
    navigate("/");
  }, []);

  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleSignout = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);
  useEffect(() => {
    handleUserInfo();
  });
  return (
    <NavWrapper color={props.color}>
      {props.back === true ? (
        <>
          <BackButton onClick={handleGoBack}>
            <img src="/images/BackButton.svg" alt="back" />
          </BackButton>
          <Logo onClick={handleGoHome}>
            {props.color === "white" || props.color === "blue" ? (
              <img src="/images/Logo_white.svg" alt="logo" />
            ) : (
              <img src="/images/Logo_blue.svg" alt="logo" />
            )}
          </Logo>
        </>
      ) : (
        <Logo onClick={handleGoHome}>
          {props.color === "white" || props.color === "blue" ? (
            <img src="/images/Logo_white.svg" alt="logo" />
          ) : (
            <img src="/images/Logo_blue.svg" alt="logo" />
          )}
        </Logo>
      )}
      {pathname === "/" || pathname === "/login" ? (
        <></>
      ) : (
        <SignOut>
          <UserImg
            src={photoURL}
            alt={userName}
            onClick={handleToggleSignout}
          />
          {isExpanded ? (
            <DropDown>
              <span onClick={handleLogOut}>Sign Out</span>
            </DropDown>
          ) : (
            <></>
          )}
        </SignOut>
      )}
    </NavWrapper>
  );
};

export default NavBar;

const NavWrapper = styled.nav`
  height: 60px;
  padding: 0 36px;
  position: fixed;
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 3;
  background-color: ${(props) => (props.color === "blue" ? "" : "#f1faff")};
  color: ${(props) => (props.color === "white" ? "white" : "#3C95FF")};
  align-items: center;
`;

const BackButton = styled.div`
  display: flex;
  margin-left: 20px;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: flex;
  justify-content: center;
  margin-left: 20px;
  img {
    display: block;
    width: 100%;
  }
`;
const DropDown = styled.div`
  position: absolute;
  top: 40px;
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
  height: 32px;
  width: 32px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  margin-right: 20px;
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
  color: ${(props) => (props.color === "white" ? "white" : "#3C95FF")};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  display: flex;
  align-items: center;
  margin-left: -12px;
`;
