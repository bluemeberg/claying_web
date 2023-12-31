import React from "react";
import { styled } from "styled-components";
import { getTimeAgo } from "../../utils/timeManipulate";
import category from "../../utils/category_real.json";

const UnknownVideoBox = (props) => {
  console.log(props);
  // 영상 카테고리
  // 영상 썸네일
  // 영상 제목
  // 영상 조회수
  // top100 선정된 날짜
  return (
    <VideoContainer>
      <VideoCategory>{category[props.hotVideo.detail_category]}</VideoCategory>
      <VideoThumbnail>
        <iframe
          width="95%"
          height="200px"
          src={`https://www.youtube.com/embed/${props.hotVideo.id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </VideoThumbnail>
      <VideoTitle>{props.hotVideo.title}</VideoTitle>
      {props.selectedChannel.users.length !== 0 ? (
        <VideoInformation>
          업로드 {getTimeAgo(props.hotVideo.upload_date)}
        </VideoInformation>
      ) : (
        <VideoInformation>
          인기급상승 {getTimeAgo(props.hotVideo.hot_time)}
        </VideoInformation>
      )}
    </VideoContainer>
  );
};

export default UnknownVideoBox;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const VideoCategory = styled.div`
  color: var(--_brand-sub, var(--_sub-color, #429df2));
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 900;
  line-height: 12px; /* 100% */
  letter-spacing: -0.24px;
  text-align: start;
  margin-left: 12px;
  margin-top: 16px;
`;

const VideoThumbnail = styled.div`
  margin-top: 8px;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  img {
    border-radius: 12px;
  }
`;

const VideoTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 14px; /* 100% */
  text-align: start;
  margin-left: 12px;
  margin-top: 8px;
`;

const VideoInformation = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 12px; /* 100% */
  text-align: start;
  margin-left: 12px;
  margin-top: 8px;
`;
