import React from "react";
import { styled } from "styled-components";
import category from "../../utils/category_compare.json";
const Result1 = (props) => {
  console.log(props);

  return (
    <Container>
      <SubTitle>{props.userInfo}님이 크리에이터가 된다면 </SubTitle>
      <SubTitle type="rank">1st</SubTitle>
      {/* <Title region="en">{props.topDNAType}</Title> */}
      <Title>{category[props.topDNAType]}</Title>
      <Banner>
        <img src="/images/Travel Vlogs.svg" alt="banner" />
      </Banner>
      <Description>{props.dnaInfoData.dnatitle}</Description>
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

const Banner = styled.div`
  img {
    width: 192.91px;
    height: 177px;
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
