import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import { youtubeDataAPIInstacne, youtubeGeneralAPI } from "../../api/axios";
import SubsChannelBox from "../../components/ChannelBox/SubsChannelBox";
import VideoBox from "../../components/VideoBox/VideoBox";
import category from "../../utils/category_compare.json";

const Result3 = (props) => {
  console.log(props);

  // 6개 구독채널에 대한 채널 정보 받아오기
  const handleGetSubsChannelInfo = useCallback(async () => {
    for (let i = 0; i < props.subsData.slice(0, 6).length; i++) {
      const response = await youtubeDataAPIInstacne.get("/channels", {
        params: {
          id: props.subsData[i].channelID,
          part: "snippet, brandingSettings,statistics",
          key: youtubeGeneralAPI,
        },
      });
      console.log(response.data);
      if (response.data.items[0].brandingSettings.image !== undefined) {
        const channelBanner =
          response.data.items[0].brandingSettings.image.bannerExternalUrl;
        props.subsData[i]["banner"] = channelBanner;
      }
      props.subsData[i]["subsCount"] =
        response.data.items[0].statistics.subscriberCount;
      props.subsData[i]["videoCount"] =
        response.data.items[0].statistics.videoCount;
      props.subsData[i]["viewCount"] =
        response.data.items[0].statistics.viewCount;
    }
  }, [props.subsData]);
  console.log(props);
  useEffect(() => {
    handleGetSubsChannelInfo();
  }, []);
  return (
    <Container>
      <SubTitle>{props.userInfo}님이 크리에이터가 된다면 </SubTitle>
      <SubTitle type="rank">1st</SubTitle>
      {/* <Title region="en">{props.topDNAType}</Title> */}
      <Title>{category[props.topDNAType]}</Title>
      <LikedTitle>최근 구독한 채널</LikedTitle>
      <SubsContainer>
        {props.subsData.slice(0, 6).map((data, index) => (
          <SubsChannelBox
            key={index}
            subsData={data}
            setModalOpen={props.setModalOpen}
            videoDataByChannel={props.videoDataByChannel}
            topDNAType={props.topDNAType}
          />
        ))}
      </SubsContainer>
      <LikedTitle>최근 좋아요한 영상</LikedTitle>
      <VideoContainer>
        {props.likedVideos.slice(0, 4).map((data, index) => (
          <VideoBox
            key={index}
            likedVideo={data}
            setModalOpen={props.setModalOpen}
            videoDataByChannel={props.videoDataByChannel}
          />
        ))}
      </VideoContainer>
    </Container>
  );
};

export default Result3;

const Container = styled.div`
  position: relative;
  min-height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1faff;
  overflow-y: scroll;
`;

const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  margin-bottom: 28px;
`;

const SubsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  overflow-x: auto; /* 가로 스크롤을 활성화합니다. */
  width: 100%; /* 가로 스크롤이 나타나도록 부모 요소의 너비를 조절합니다. */
`;

const LikedTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 12px; /* 100% */
  letter-spacing: -0.24px;
  margin-top: 40px;
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
