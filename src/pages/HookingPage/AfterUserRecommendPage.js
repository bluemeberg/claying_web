import React from "react";
import { styled } from "styled-components";
import NavBar from "../../components/NavBar";

const AfterUserRecommendPage = () => {
  return (
    <Container>
      <NavBar back={true} />
      <Comment>클레잉 앱 다운받고</Comment>
      <Title>
        클레잉 유저 <br></br> 발견하러가기
      </Title>
      <Banner>
        <img src="/images/MobileMockup.svg" alt="resultMobile" />
      </Banner>
      <SubTitle>Creative 한 Playing, 클레잉</SubTitle>
      <GoogleStoreButton>
        <img src="/images/PlayStoreButton.svg" alt="playstore" />
      </GoogleStoreButton>
      <AppleStoreButton>
        <img src="/images/AppStoreButton.svg" alt="appstore" />
      </AppleStoreButton>
    </Container>
  );
};

export default AfterUserRecommendPage;

const Container = styled.main`
  position: relative;
  min-height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 calc(3.5vw + 5px);
  background-color: #f1faff;
`;

const Comment = styled.div`
  color: #000;
  text-align: center;
  font-family: NanumGothic;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 48px; /* 300% */
  letter-spacing: -0.32px;
  margin-top: 100px;
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-family: NanumGothic;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: 48px; /* 133.333% */
  letter-spacing: -0.72px;
  margin-top: 20px;
  margin-bottom: 20px;
  span {
    color: var(--_brand-sub, #429df2);
    font-family: NanumGothic;
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    line-height: 32px;
    letter-spacing: -0.36px;
  }
`;

const Banner = styled.div`
  img {
  }
`;
const SubTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 900;
  line-height: 20px; /* 142.857% */
  margin-bottom: 40px;
`;
const GoogleStoreButton = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const AppleStoreButton = styled.div`
  display: flex;
`;
