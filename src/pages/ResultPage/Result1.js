import React from "react";
import { styled } from "styled-components";
import category from "../../utils/category_compare.json";
const Result1 = (props) => {
  console.log(props);
  // const tempImages = {
  //   Business/Entrepreneurship : "/images/character / temp / movie.svg",
  //     "/images/character/temp/ittech.svg",
  //   "/images/character/temp/pet.svg",
  //   "/images/character/temp/selfimporvement.svg",
  //   "/images/character/temp/show.svg",
  //   "/images/character/temp/soccer.svg",
  //   "/images/character/temp/business.svg",
  //   "/images/character/temp/car.svg",
  //   "/images/character/temp/comedy.svg",
  //   "/images/character/temp/game.svg",
  //   "/images/character/temp/makeupbeauty.svg",
  // };

  const tempImages = {
    "Business/Entrepreneurship": "/images/character/temp/business.svg",
    Sports: "/images/character/temp/soccer.svg",
    "SelfImprovement/Motivation": "/images/character/temp/selfimporvement.svg",
    "IT/Tech": "/images/character/temp/ittech.svg",
    "Makeup/Beauty": "/images/character/temp/makeupbeauty.svg",
    Car: "/images/character/temp/car.svg",
    Comedy: "/images/character/temp/comedy.svg",
    Gameplay: "/images/character/temp/gameplay.svg",
    Finance: "/images/character/temp/finance.svg",
    "News/Politics": "/images/character/temp/news.svg",
    "Travel Vlogs": "/images/character/temp/travel.svg",
    "Shows&Talk Shows": "/images/character/temp/show.svg",
    "Documentary Movies": "/images/character/temp/movie.svg",
    "Fashion/Style": "/images/character/temp/fashion.svg",
    "Sci-Fi/Fantasy Movies": "/images/character/temp/movie.svg",
    // 다른 특성과 이미지 경로도 추가
  };

  return (
    <Container>
      <Tip>
        내가 좋아하는<br></br> 크리에이터 보러가기
      </Tip>
      <SubTitle>{props.userInfo}님이 크리에이터가 된다면 </SubTitle>
      <SubTitle type="rank">1st</SubTitle>
      {/* <Title region="en">{props.topDNAType}</Title> */}
      <Title>{category[props.topDNAType]}</Title>
      <Banner>
        <img src={tempImages[props.topDNAType]} alt="banner" />
      </Banner>
      {/* <Description>{props.dnaInfoData.dnatitle}</Description> */}
    </Container>
  );
};

export default Result1;

const Container = styled.div`
  position: relative;
  min-height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1faff;
`;

const Tip = styled.div`
  display: flex;
  position: absolute;
  top: 112px;
  right: 0px;
  text-align: end;
  font-size: 8px;
  background-color: #ffbb54;
  padding: 8px;
  border-radius: 10px;
  font-weight: 700;
`;

const Banner = styled.div`
  display: flex;
  margin-top: -100px;
  flex: 1;
  align-items: center;
  img {
    height: 36vh;
  }
`;

const Description = styled.div`
  overflow: hidden;
  color: #000;
  text-align: start;
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 175% */
  margin-top: 24px;
  padding: 0 16px;
`;

const SubTitle = styled.div`
  color: #3c95ff;
  text-align: center;
  font-family: Pretendard;
  font-size: ${(props) => (props.type === "rank" ? "16px" : "18px")};
  font-style: normal;
  font-weight: ${(props) => (props.type === "rank" ? "800" : "400")};
  line-height: "20px"; /* 142.857% */
  letter-spacing: -0.28px;
  margin-top: ${(props) => (props.type === "rank" ? "0px" : "80px")};
  margin-bottom: ${(props) => (props.type === "rank" ? "4px" : "20px")};
`;

const Title = styled.div`
  color: #3c95ff;
  text-align: center;
  font-family: Pretendard;
  font-size: ${(props) => (props.region === "en" ? "18px" : "24px")};
  font-style: normal;
  font-weight: 800;
  line-height: 24px; /* 100% */
  letter-spacing: -0.48px;
  margin-bottom: 8px;
`;
const ResultButton = styled.div`
  display: flex;
  width: 312px;
  height: 52px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #3c95ff;
  color: white;
  margin-bottom: 12px;
`;
