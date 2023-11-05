import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { serverInstance } from "../../api/axios";
import NavBar from "../../components/NavBar";
import ProgressBar from "../../components/ProgressBar";
import { useDNAAnalysisData } from "../../hooks/useDNAAnalysisData";
import { useYoutubeAnalysisData } from "../../hooks/useYoutubeAnalysisData";
import {
  AnalysisCount,
  Button,
  Caution,
  ResultLogBox,
  ResultLogBoxContainer,
  ResultLogCategory,
  ResultLogThumbnail,
  ResultLogTitle,
} from "./AnalysisPageComponent";
import category from "../../utils/category_real.json";
const AnalysisPage = () => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  let [token, setToken] = useState("");
  let [email, setEmail] = useState("");

  if (location.state !== null) {
    email = location.state.email;
    token = location.state.token;
  }

  useEffect(() => {
    if (location.state === null) {
      navigate("/login", {});
    } else if (location.state.token === "") {
      navigate("/login", {});
    } else {
    }
  }, [location.state, navigate]);

  const result = useYoutubeAnalysisData(token, email);
  console.log(result);
  let subsCount = result.subsData.length;
  let likedVideoCount = result.longLikedVideoData.length;
  console.log(token);

  const handleRestart = useCallback(() => {
    result.handleAnalysisResult(result.longLikedVideoData, result.subsData, 1);
    result.setTimeoutFlag(false);
    result.setVideoAnalysisCount(0);
    result.setProgressValue(0);
    result.setProgressData([]);
  }, [result]);

  return (
    <Container>
      {location.state !== null ? <NavBar data={location} /> : <></>}
      <Title>유튜브 활동 데이터 읽는 중</Title>
      <CountInfo>
        최근 좋아요한 영상 {result.videoAnalysisCount} / {likedVideoCount}개{" "}
        <br></br>
        최근 구독한 채널 {subsCount} / {subsCount}개
      </CountInfo>
      <DNAType>{category[result.videoDNA]}</DNAType>
      <SubContainer>
        {result.videoThumbnail !== "" && (
          <img src={result.videoThumbnail} alt={result.videoTitle} />
        )}
      </SubContainer>
      <AnalysisCount>{result.progressValue.toFixed(2)} %</AnalysisCount>
      <ProgressBar value={result.progressValue} max={100} />
      {result.progressValue === 100 ? (
        <>
          <Loading>
            <img src="/images/loading.gif" alt="loading" width={60} />
            분석 결과를 불러오고 있습니다. <br></br>잠시만 기다려주세요.
          </Loading>
          <Caution></Caution>
        </>
      ) : (
        <Caution>
          OpenAI GPT 3.5 기반의 클레잉 알고리즘을 통해 <br></br> 해당 영상의
          카테고리를 분석하고 있습니다.<br></br>
          (최대 1~2분 정도 소요되며 분석 지연 시 다시 시작히기 버튼이 활성화
          되고, 지연 된 영상 부터 재 시작됩니다.)
        </Caution>
      )}
      {/* 언노운 채널 불러오는 로딩 바 */}
      {/* 분석 로그 for 유저 인터랙션 */}
      <ResultLogBoxContainer>
        {result.totalAnalysistResult.map((data) => {
          return (
            <ResultLogBox>
              <ResultLogThumbnail>
                <img src={data.video.thumbnail} alt="resultImg" />
              </ResultLogThumbnail>
              <ResultLogTitle>
                {data.video.title.slice(0, 20)}...
              </ResultLogTitle>
              <ResultLogCategory>
                {category[data.video.detail_category]}
              </ResultLogCategory>
            </ResultLogBox>
          );
        })}
      </ResultLogBoxContainer>
      {result.timeoutFlag === true ? (
        <Button flag="true" onClick={handleRestart}>
          다시 시작하기
        </Button>
      ) : (
        <Button>다시 시작하기</Button>
      )}
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
  font-size: 3vh;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 100% */
  margin-top: 114px;
`;

const CountInfo = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 1.8vh;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 100% */
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DNAType = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap");
  width: 80%;
  height: 32px;
  flex-shrink: 0;
  border: 6px solid #3c95ff;
  background: #7b61ff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Poppins;
  font-size: 2vh;
  font-style: normal;
  font-weight: 700;
  line-height: 12px; /* 100% */
  margin-bottom: 24px;
`;

const SubContainer = styled.div`
  width: 90%;
  height: 55%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }
`;
