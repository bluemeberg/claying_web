import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { keyframes, styled } from "styled-components";
import NavBar from "../../components/NavBar";
import "./MainPage.css";
import category from "../../utils/category_compare.json";
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

  const tempImages = {
    "Drama Movies": "/images/character/temp2/movie.svg",
    "IT/Tech": "/images/character/temp2/ittech.svg",
    "Pet Video(Vlog)": "/images/character/temp2/pet.svg",
    "SelfImprovement/Motivation": "/images/character/temp2/selfimporvement.svg",
    "Shows/Talk Shows": "/images/character/temp2/show.svg",
    Soccer: "/images/character/temp2/soccer.svg",
    Finance: "/images/character/temp2/finance.svg",
    "Business/Entrepreneurship": "/images/character/temp2/business.svg",
    Car: "/images/character/temp2/car.svg",
    Comedy: "/images/character/temp2/comedy.svg",
    Games: "/images/character/temp2/gameplay.svg",
    "Makeup/Beauty": "/images/character/temp2/makeupbeauty.svg",
  };

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
          console.log(auth);
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

  // const [currentCategory, setCurrentCategory] = useState("Drama Movies");
  // const [currentImage, setCurrentImage] = useState(tempImages[currentCategory]);
  // const [fadeOut, setFadeOut] = useState(false);
  // useEffect(() => {
  //   // 주기적으로 이미지를 변경하는 함수
  //   const changeImage = () => {
  //     setFadeOut(true);
  //     setTimeout(() => {
  //       const categories = Object.keys(tempImages);
  //       const currentIndex = categories.indexOf(currentCategory);
  //       const nextIndex = (currentIndex + 1) % categories.length;
  //       const nextCategory = categories[nextIndex];
  //       setCurrentCategory(nextCategory);
  //       setCurrentImage(tempImages[nextCategory]);
  //       setFadeOut(false);
  //     }, 800); // 1초 후 페이드 아웃 효과 해제
  //   };

  //   // 5초마다 이미지 변경
  //   const intervalId = setInterval(changeImage, 2000);

  //   // 컴포넌트 언마운트 시 clearInterval
  //   return () => clearInterval(intervalId);
  // }, [currentCategory]);

  const [currentCategory, setCurrentCategory] = useState("Drama Movies");
  const [currentImage, setCurrentImage] = useState(tempImages[currentCategory]);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 주기적으로 이미지를 변경하는 함수
    const changeImage = () => {
      setTimeout(() => {
        const categories = Object.keys(tempImages);
        const currentIndex = categories.indexOf(currentCategory);
        const nextIndex = (currentIndex + 1) % categories.length;
        const nextCategory = categories[nextIndex];
        setCurrentCategory(nextCategory);
        setCurrentImage(tempImages[nextCategory]);
        setFadeOut(false);
      }, 1000); // 1초 후 페이드 아웃 효과 해제
      setFadeOut(true);
    };

    // 5초마다 이미지 변경
    const intervalId = setInterval(changeImage, 2000);

    // 컴포넌트 언마운트 시 clearInterval
    return () => clearInterval(intervalId);
  }, [currentCategory, tempImages]);

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
        {/* <CategoryTitle>{category[currentCategory]}</CategoryTitle> */}
        <Banner fade={fadeOut}>
          <img src={currentImage} alt={currentCategory} />
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
          <span>
            {" "}
            더 좋은, 더 많은 크리에이터 들을 <br></br>
            <span>더 빠르게 경험</span>시키기 위한<br></br> 미션을
            가지고있습니다.
          </span>
          <br></br>
          <br></br>전 세계 1000만명이 넘는 <br></br> 수익 창출 크리에이터 중
          <br></br>
          내가 경험한 크리에이터는 몇 명인가요?
        </OverViewSubTitle>
      </OverViewSection>
      <OverViewSection2>
        <OverViewSection2Title>How 클레잉?</OverViewSection2Title>
        <OverViewSubTitle>
          더 좋은, 더 많은 크리에이터를<br></br> 더 빠르게 발견하기 위해서{" "}
          <br></br>
          <br></br>
          <span>
            주변 친구들 그리고<br></br> 콘텐츠 성향이 유사한 유저
          </span>
          들 간의<br></br>
          <span>유튜브 공간</span> 을 <span>연결</span> 하고, <br></br>
          <br></br>그 연결 속에서 <br></br>
          <span>아직 좋아하지 않은</span> <br></br>{" "}
          <span>크리에이터를 발견합니다.</span>
        </OverViewSubTitle>
      </OverViewSection2>
      <OverViewSection3>
        <OverviewSection4Symbol index={1}>1</OverviewSection4Symbol>
        <OverViewSection3SubTitle>콘텐츠 성향 분석</OverViewSection3SubTitle>
        <OverViewSection3Title>
          유튜브 좋아요 영상, 구독 정보를 기반으로 <br></br>클레잉 콘텐츠 성향
          분석 테스트를 통해<br></br> 유튜브 공간을 연결 시킬 준비하기
        </OverViewSection3Title>
        <OverViewSection2SubTitle>
          GPT 3.5를 활용한 클레잉 콘텐츠 성향 분석 알고리즘을 통해
          <br />
          좋아요한 영상 및 구독 정보들을 53개의 상세 카테고리로 <br></br>{" "}
          분석합니다.
        </OverViewSection2SubTitle>
        <OverViewSection2ImgTitle>
          A님이 크리에이터가 된다면
        </OverViewSection2ImgTitle>
        <OverViewSection2Img>
          <img src="/images/HowSection1.svg" alt="how1" />
        </OverViewSection2Img>
        <OverviewSection4Symbol>2</OverviewSection4Symbol>
        <OverViewSection3SubTitle>
          콘텐츠 성향 유사 유저 연결
        </OverViewSection3SubTitle>
        <OverViewSection3Title>
          콘텐츠 성향이 유사한 유저들과의 <br></br>
          연결을 통해 공개 설정한 구독 및 좋아요<br></br> 영상 정보 공유하기
        </OverViewSection3Title>
        <OverViewSection2SubTitle>
          주변 친구들 그리고 콘텐츠 성향이 유사한 유저들과의 <br />
          팔로우 기반 연결을 통해 서로 공개 설정한 크리에이터 구독 및 <br></br>{" "}
          좋아요 영상 정보를 공유합니다.
        </OverViewSection2SubTitle>
        <OverViewSection4Content>
          <OverViewSection4Left>
            <OverViewSection4LeftTop>
              <img src="/images/HowSectionPerson.svg" alt="HowPerson" />
              A님
            </OverViewSection4LeftTop>
            <OverViewSection4LeftBottom>
              <img src="/images/HowSectionShare1.svg" alt="HowSecion2" />
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
              <img src="/images/HowSectionShare2.svg" alt="HowSecion3" />
            </OverViewSection4LeftBottom>
          </OverViewSection4Left>
        </OverViewSection4Content>
        <OverviewSection4Symbol>3</OverviewSection4Symbol>
        <OverViewSection3SubTitle>크리에이터 발견</OverViewSection3SubTitle>
        <OverViewSection3Title>
          유저들간의 연결 속에서 <br></br>
          아직 좋아하지 않은 크리에이터 발견하기
        </OverViewSection3Title>
        <OverViewSection2SubTitle>
          클레잉 크리에이터 발견 알고리즘을 통해 <br />
          유튜브 인기 크리에이터, 유저들의 좋아요한 크리에이터 정보 중 <br></br>{" "}
          내 성향 대비 아직 좋아하지 않는 크리에이터를 발견해서 공유합니다.
        </OverViewSection2SubTitle>
        <OverViewSection4Content>
          <OverViewSection4Img>
            <img src="/images/HowSection3rd.svg" alt="how3" />
          </OverViewSection4Img>
        </OverViewSection4Content>
        <OverviewSection4Symbol>4</OverviewSection4Symbol>
        <OverViewSection3SubTitle>
          크리에이터 추천 피드
        </OverViewSection3SubTitle>
        <OverViewSection3Title>
          좋아하는 크리에이터에 대해 <br></br>
          추천 코멘트 작성하기
        </OverViewSection3Title>
        <OverViewSection2SubTitle>
          내가 좋아하는 크리에이터에 대해 추천 코멘트 작성을 통해 <br></br>{" "}
          클레잉 피드에 크리에이터를 직접 공유하게 되고 해당 피드 노출을{" "}
          <br></br>통해 성향이 유사한 유저들과 더 많이 연결되고<br></br>{" "}
          크리에이터를 더 많이 발견할 수 있는 기회가 발생됩니다.
        </OverViewSection2SubTitle>
        <OverViewSection4Content>
          <OverViewSection4Img sub="bottom">
            <img src="/images/HowSection4th.svg" alt="how4" />
          </OverViewSection4Img>
        </OverViewSection4Content>
      </OverViewSection3>
      <OverViewSection5>
        <OverViewSection5Title>
          더 좋은, 더 많은 크리에이터를 <br></br>더 빠르게 경험하기 위한{" "}
          <br></br>Creative Playing, 클레잉 <br></br>
          <br></br>
          지금 시작하세요
        </OverViewSection5Title>
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
  border-bottom: 1px solid #afd8fe;

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

const Title = styled.h1`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 900;
  line-height: 48px; /* 133.333% */
  letter-spacing: -0.72px;
  margin-top: 112px;
  margin-bottom: 0px;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Banner = styled.div`
  margin-top: 20px;
  animation: ${(props) => (props.fade ? fadeOut : fadeIn)} 1s ease-in-out;

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
  line-height: 24px; /* 142.857% */
  display: flex;
  align-items: center;
  margin-top: 32px;
`;

const CategoryTitle = styled.div`
  color: #3c95ff;
  text-align: center;
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  margin-top: 28px;
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
  background-color: #fff9ee;
  margin-right: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
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
    font-weight: 900;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-top: 1px solid #afd8fe;
  border-bottom: 1px solid #afd8fe;
`;

const OverViewSection2Title = styled.div`
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 200% */
  letter-spacing: -0.24px;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const OverViewSection2SubTitle = styled.div`
  color: var(--black-black-000, #000);
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.24px;
  margin-left: 30px;
  margin-top: 18px;
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
  margin-bottom: 40px;
  img {
  }
`;

const OverViewSection3 = styled.div`
  background-color: #fff9ee;
  display: flex;
  flex-direction: column;
`;

const OverViewSection3SubTitle = styled.div`
  margin-left: 30px;
  color: #000;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 200% */
  letter-spacing: -0.24px;
  margin-top: 12px;
`;

const OverViewSection3Title = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 900;
  line-height: 28px; /* 155.556% */
  letter-spacing: -0.36px;
  margin-left: 30px;
  margin-top: 18px;
`;

const OverViewSection4 = styled.div`
  background-color: #f1faff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OverViewSection4Title = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: ${(props) => (props.sub === "sub" ? "2.7vh" : "2.4vh")};
  font-style: normal;
  font-weight: ${(props) => (props.sub === "sub" ? "900" : "400")};
  line-height: 32px; /* 150% */
  letter-spacing: -0.32px;
  margin-top: ${(props) => (props.sub === "sub" ? "12px" : "80px")};
  margin-bottom: ${(props) => (props.sub === "sub" ? "40px" : "0px")};
  text-align: center;
`;

const OverviewSection4Symbol = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  flex-shrink: 0;
  background-color: var(--_sub-color, #f1faff);
  border: 1px solid #afd8fe;
  color: #000;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
  margin-top: ${(props) => (props.index === 1 ? "60px" : "40px")};
`;

const OverViewSection4Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 32px;
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
  img {
    margin-right: 4px;
  }
`;

const OverViewSection4LeftBottom = styled.div``;

const OverViewShare = styled.div`
  margin-top: -240px;
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
  align-items: center;
  justify-content: center;
  border-top: 1px solid #afd8fe;
  border-bottom: 1px solid #afd8fe;
  background: #f1faff;
`;

const OverViewSection5Title = styled.div`
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: 32px; /* 160% */
  letter-spacing: -0.4px;
  margin-top: 60px;
  margin-bottom: 160px;
`;
