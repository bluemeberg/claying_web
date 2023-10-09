import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { serverInstance } from "../../api/axios";
import NavBar from "../../components/NavBar";
import ProgressBar from "../../components/ProgressBar";
import { useDNAAnalysisData } from "../../hooks/useDNAAnalysisData";
import { useYoutubeAnalysisData } from "../../hooks/useYoutubeAnalysisData";
import { AnalysisCount, Button, Caution } from "./AnalysisPageComponent";
import category from "../../utils/category_real.json";
const AnalysisPage = () => {
  const location = useLocation();
  console.log(location);
  const result = useYoutubeAnalysisData(
    location.state.token,
    location.state.email
  );
  console.log(result);
  let subsCount = result.subsData.length;
  let likedVideoCount = result.longLikedVideoData.length;

  return (
    <Container>
      <NavBar data={location} />
      <Title>유튜브 활동 데이터 읽는 중</Title>
      <CountInfo>
        최근 구독한 채널 0 / {subsCount}개 <br></br>
        최근 좋아요한 영상 {result.videoAnalysisCount} / {likedVideoCount}개
      </CountInfo>
      <DNAType>{category[result.videoDNA]}</DNAType>
      <SubContainer>
        {result.videoThumbnail !== "" && (
          <img src={result.videoThumbnail} alt={result.videoTitle} />
        )}
      </SubContainer>
      <AnalysisCount>{result.progressValue} %</AnalysisCount>
      <ProgressBar value={result.progressValue} max={100} />
      <Caution>
        최대 1분 소요. 잠시 기다려주세요!<br></br>(멈출 시 다시 시작을
        누르세요!)
      </Caution>
      <Button>다시 시작하기</Button>
    </Container>
  );
};

export default AnalysisPage;

const Container = styled.main`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 calc(3.5vw + 5px);
  background-color: #f1faff;
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 100% */
  margin-top: 114px;
`;

const CountInfo = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 100% */
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DNAType = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap");
  width: 232px;
  height: 32px;
  flex-shrink: 0;
  border: 6px solid #3c95ff;
  background: #7b61ff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 12px; /* 100% */
  margin-bottom: 24px;
`;

const SubContainer = styled.div`
  width: 240px;
  height: 135px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }
`;
