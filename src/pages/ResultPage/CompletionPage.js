import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import NavBar from "../../components/NavBar";

const CompletionPage = () => {
  const location = useLocation();
  console.log(location.state);
  const navigate = useNavigate();
  const handleButtonClick = useCallback(() => {
    navigate("/result", { state: location.state });
  }, [location.state, navigate]);
  return (
    <Container>
      <NavBar color="white" />
      <SubTitle>분석을 완료했어요!</SubTitle>
      <Title>
        내가 유튜버라면<br></br> 어떤 크리에이터일까?
      </Title>
      <Banner>
        <img src="/images/TestBanner.svg" alt="banner" />
      </Banner>
      <Button onClick={handleButtonClick}>결과 확인하기</Button>
    </Container>
  );
};

export default CompletionPage;

const Container = styled.main`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 calc(3.5vw + 5px);
  background-color: #7b61ff;
`;

const SubTitle = styled.div`
  color: #f5f5f5;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  margin-top: 112px;
  margin-bottom: 24px;
`;
const Title = styled.div`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 48px; /* 133.333% */
  letter-spacing: -0.72px;
`;

const Banner = styled.div`
  margin-top: 28px;
  img {
    width: 192.91px;
    height: 177px;
  }
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
