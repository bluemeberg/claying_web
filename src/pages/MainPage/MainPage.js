import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import NavBar from "../../components/NavBar";
import "./MainPage.css";
const MainPage = () => {
  const images = [
    "/images/character/basketball.svg",
    "/images/character/car.svg",
    "/images/character/fitness.svg",
    "/images/character/motivation.svg",
    "/images/character/petsLover.svg",
    "/images/character/petVlog.svg",
    "/images/character/playlistMania.svg",
    "/images/character/traveller.svg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadein] = useState(true);

  const handleNextImage = useCallback(() => {
    setFadein(false);
    setTimeout(() => {
      setCurrentImageIndex((prevInex) =>
        prevInex === images.length - 1 ? 0 : prevInex + 1
      );
      setFadein(true);
    }, 500);
  }, [images.length]);

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
            // 이전 분석 결과 존재 시 history 페이지 이동
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
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextImage();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [currentImageIndex]);

  const [showButton, setShowButton] = useState(true);
  const [showBottomButton, setShowBottomButton] = useState(false);
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      console.log(currentScrollPos);
      const isScrollingDown = currentScrollPos > prevScrollPos;
      const isScrollingUp = currentScrollPos < prevScrollPos;
      setShowButton(!isScrollingDown);
      setShowBottomButton(isScrollingUp);
      prevScrollPos = currentScrollPos;
      if (currentScrollPos < 700) {
        setShowBottomButton(!isScrollingUp);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(showButton);
  return (
    <>
      <Container>
        <NavBar />
        <Title>
          내가 유튜버라면<br></br>어떤 크리에이터일까?
        </Title>
        <Banner>
          <img
            src={images[currentImageIndex]}
            alt={`Image${currentImageIndex}`}
          />
        </Banner>
        <SubTitle>
          Creative한 Playing, 클레잉에서<br></br>
          유튜브 데이터 분석으로 <br></br>
          당신의 크리에이티브를 발견하세요!
        </SubTitle>
        {showButton && <Button onClick={handleClick}>시작하기</Button>}
        {!showButton && (
          <BottomButton onClick={handleClick}>시작하기</BottomButton>
        )}
        {showBottomButton && (
          <BottomButton onClick={handleClick}>시작하기</BottomButton>
        )}
      </Container>
      <OverViewSection>
        <OverViewTitle>
          <span>클레잉</span>은
        </OverViewTitle>
        <OverViewSubTitle>
          월 평균 4000만명이 넘는 유저가 <br></br>30시간 넘게 사용하는 유튜브
          공간 속에서
          <br></br>
          <br></br>
          <span> 더 좋은, 더 많은 크리에이터</span>들을 <br></br>
          <span>더 빠르게 경험</span>시키기 위한 미션을 가지고있습니다.<br></br>
          <br></br>전 세계 <span>1000만개</span>가 넘는 수익 창출 채널 중
          <br></br>내가 즐겨보는 채널은 몇 개인가요?
        </OverViewSubTitle>
      </OverViewSection>
      <OverViewSection2>
        <OverViewSubTitle>
          저희는 더 좋은, 더 많은 크리에이터를<br></br> 더 빠르게 발견하기
          위해서 <br></br>
          <br></br>
          <span>주변 친구들, 콘텐츠 성향이 유사한 유저</span>들 간의<br></br>{" "}
          <span>유튜브 좋아요, 구독 정보</span>를 기반으로<br></br>{" "}
          <span>유튜브 공간</span> 을 <span>연결</span>
          시키고 있습니다.
        </OverViewSubTitle>
      </OverViewSection2>
      <OverViewSection3>
        <OverViewSubTitle>
          1st. <br></br>콘텐츠 성향 분석 테스트를 통해<br></br> 유튜브 공간을
          연결시킬 준비를 마칩니다.
        </OverViewSubTitle>
        <OverViewSection2SubTitle>
          좋아요한 유튜브 영상,구독 채널을
          <br />
          GPT 3.5를 활용하여 53개의 상세 카테고리로 분석합니다.
        </OverViewSection2SubTitle>
        <OverViewSection2ImgTitle>
          A님이 크리에이터가 된다면
        </OverViewSection2ImgTitle>
        <OverViewSection2Img>
          <img src="/images/HowSection1.svg" alt="how1" />
        </OverViewSection2Img>
      </OverViewSection3>
      <OverViewSection4>
        <OverViewSection4Title>
          분석 결과를 통해 무엇을 할 수 있나요?
        </OverViewSection4Title>
        <OverviewSection4Symbol>1</OverviewSection4Symbol>
        <OverViewSection4Title sub="sub">
          콘텐츠 성향 주변 친구들과 공유하기
        </OverViewSection4Title>
        <OverViewSection4Content>
          <OverViewSection4Left>
            <OverViewSection4LeftTop>
              <img src="/images/HowSectionPerson.svg" alt="HowPerson" />
              A님
            </OverViewSection4LeftTop>
            <OverViewSection4LeftBottom>
              <img src="/images/HowSection2.svg" alt="HowSecion2" />
            </OverViewSection4LeftBottom>
          </OverViewSection4Left>
          <OverViewShare>
            <img src="/images/HowSectionShare.svg" alt="HowShare" />
          </OverViewShare>
          <OverViewSection4Left>
            <OverViewSection4LeftTop>
              <img src="/images/HowSectionPerson.svg" alt="HowPerson" />
              B님
            </OverViewSection4LeftTop>
            <OverViewSection4LeftBottom>
              <img src="/images/HowSection3.svg" alt="HowSecion3" />
            </OverViewSection4LeftBottom>
          </OverViewSection4Left>
        </OverViewSection4Content>
        <OverviewSection4Symbol>2</OverviewSection4Symbol>
        <OverViewSection4Title sub="sub">
          좋아요 및 구독한 채널에 대해<br></br> 별점 및 한줄 추천 코멘트
          작성하기
        </OverViewSection4Title>
        <OverViewSection4Img>
          <img src="/images/HowSection4.svg" alt="how2" />
        </OverViewSection4Img>
        <OverviewSection4Symbol>3</OverviewSection4Symbol>
        <OverViewSection4Title sub="sub">
          콘텐츠 성향이 유사한 유저들이 <br></br> 좋아한 채널들 중 <br></br>{" "}
          내가 아직 좋아하지 않은 채널 발견하기
        </OverViewSection4Title>
        <OverViewSection4Img sub="bottom">
          <img src="/images/HowSection5.svg" alt="how3" />
        </OverViewSection4Img>
      </OverViewSection4>
      <OverViewSection5>
        더 많은 크리에이터 발견을 위한 <br></br>
        Creative Playing, 클레잉의 시작 <br></br>
        <br></br>
        유튜브 공간을 연결 시키기 위한<br></br>
        콘텐츠 성향 분석 테스트 <br></br>
        지금 바로 시작하세요.
      </OverViewSection5>
    </>
  );
};

export default MainPage;

const Container = styled.main`
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 calc(3.5vw + 5px);
  background-color: #f1faff;
  min-height: 700px;
  max-height: 100vh;
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
    height: 30vh;
  }
`;

const SubTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 2vh;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  display: flex;
  align-items: center;
  margin-top: 32px;
`;

const Button = styled.div`
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
  margin-bottom: 68px;
  cursor: pointer;
  margin-top: 28px;
`;

const BottomButton = styled.div`
  position: fixed;
  bottom: 0;
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
  cursor: pointer;
  margin-bottom: 24px;
`;

const OverViewSection = styled.div`
  background-color: white;
  margin-left: 30px;
  margin-right: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OverViewTitle = styled.div`
  color: #000;
  font-family: NanumGothic;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 36px;
  letter-spacing: -0.48px;
  margin-top: 52px;
  margin-bottom: 12px;
  min-width: 315px;
  span {
    color: var(--_brand-sub, #429df2);
  }
`;

const OverViewSubTitle = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.32px;
  margin-bottom: 44px;
  min-width: 310px;
  span {
    color: #429df2;
    font-weight: 900;
  }
`;

const OverViewSection2 = styled.div`
  flex-shrink: 0;
  background: #f1faff;
  color: #000;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  padding-top: 65px;
  padding-bottom: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    color: #429df2;
    font-weight: 900;
  }
`;

const OverViewSection2SubTitle = styled.div`
  color: #677389;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.24px;
  min-width: 310px;
`;

const OverViewSection2ImgTitle = styled.div`
  display: flex;
  color: #3c95ff;
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  justify-content: center;
  margin-left: -10px;
  margin-top: 32px;
`;

const OverViewSection2Img = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  img {
  }
`;

const OverViewSection3 = styled.div`
  background-color: white;
  margin-top: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const OverViewSection4 = styled.div`
  background-color: #f1faff;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const OverViewSection4Title = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: ${(props) => (props.sub === "sub" ? "400" : "400")};
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  margin-top: ${(props) => (props.sub === "sub" ? "12px" : "52px")};
  margin-bottom: ${(props) => (props.sub === "sub" ? "40px" : "0px")};
  text-align: center;
`;

const OverviewSection4Symbol = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  flex-shrink: 0;
  background-color: var(--_sub-color, #429df2);
  color: #fff;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
`;

const OverViewSection4Content = styled.div`
  display: flex;
`;
const OverViewSection4Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -10px;
  margin-right: -10px;
`;

const OverViewSection4LeftTop = styled.div`
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 100% */
  letter-spacing: -0.32px;
  display: flex;
  margin-bottom: 12px;
`;

const OverViewSection4LeftBottom = styled.div``;

const OverViewShare = styled.div`
  margin-top: -10px;
`;

const OverViewSection4Img = styled.div`
  display: flex;
  img {
    border-radius: 10px;
  }
  margin-bottom: ${(props) => (props.sub === "bottom" ? "60px" : "0px")};
`;

const OverViewSection5 = styled.div`
  display: flex;
  color: #000;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 100% */
  letter-spacing: -0.32px;
  display: flex;
  margin-left: 32px;
  margin-top: 60px;
  margin-bottom: 160px;
`;
