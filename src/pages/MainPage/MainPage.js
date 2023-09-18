import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import NavBar from "../../components/NavBar";

const MainPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = getAuth();
  const initialUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;
  console.log(initialUserData);

  const handleClick = useCallback(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname === "/") {
          console.log(user);
          navigate("/analysis", {
            state: {
              photoUrl: user.photoURL,
              userName: user.displayName,
              email: user.email,
              token: "",
            },
          });
        }
      } else {
        console.log(initialUserData);
        initialUserData !== null
          ? // 이전 분석 결과 존재 여부 확인
            //   이전 분석 결과 존재 시 history 페이지 이동
            //
            navigate("/analysis", {
              state: {
                photoUrl: initialUserData.photoURL,
                userName: initialUserData.displayName,
                email: initialUserData.email,
                token: "",
              },
            })
          : navigate("/login", {});
      }
    });
    // navigate("/login");
  }, [auth, initialUserData, navigate, pathname]);
  return (
    <Container>
      <NavBar />
      <Title>
        내가 유튜버라면<br></br>어떤 크리에이터일까?
      </Title>
      <Banner>
        <img src="/images/TestBanner.svg" alt="banner" />
      </Banner>
      <SubTitle>
        Creative한 Playing, 클레잉에서<br></br>
        유튜브 데이터 분석으로 <br></br>
        당신의 크리에이티브를 발견하세요!
      </SubTitle>
      <Button onClick={handleClick}>시작하기</Button>
    </Container>
  );
};

export default MainPage;

const Container = styled.main`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 calc(3.5vw + 5px);
  background-color: #f1faff;
  &:after {
    background: url("images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 48px; /* 133.333% */
  letter-spacing: -0.72px;
  margin-top: 112px;
`;

const Banner = styled.div`
  margin-top: 28px;
  img {
    width: 192.91px;
    height: 177px;
  }
`;

const SubTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  display: flex;
  flex: 1;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  width: 312px;
  max-height: 18px;
  padding: 18px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #3c95ff;
  color: var(--white-white-100, #fff);
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px; /* 100% */
  margin-top: 18px;
  display: flex;
  flex: 1;
  margin-bottom: 68px;
  cursor: pointer;
`;
