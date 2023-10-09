import React from "react";
import { styled } from "styled-components";
import { formatNumber } from "../../utils/formatSubsNumber";
import { getTimeAgo } from "../../utils/timeManipulate";
import category from "../../utils/category_real.json";

const VideoBoxNonModal = (props) => {
  console.log(props);
  return (
    <div>
      <VideoBoxContainer>
        <VideoThumbnail>
          <img
            src={props.likedVideo.videoThumbnail}
            alt={props.likedVideo.videoID}
          />
        </VideoThumbnail>
        <VideoCategory>{category[props.likedVideo.dnatype]}</VideoCategory>

        <ChannelBox>
          <ChannelInfo>
            <VideoTitle>
              {props.likedVideo.videoTitle.length > 20
                ? props.likedVideo.videoTitle.slice(0, 20) + "..."
                : props.likedVideo.videoTitle}
            </VideoTitle>
            <ChannelTitle>
              조회수 {formatNumber(props.likedVideo.viewCount)}회 *{" "}
              {getTimeAgo(props.likedVideo.uploadDate)}
            </ChannelTitle>
          </ChannelInfo>
        </ChannelBox>
      </VideoBoxContainer>
    </div>
  );
};

export default VideoBoxNonModal;

const VideoBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 12px;
  margin-top: 24px;
  margin-left: 6px;
`;

const VideoThumbnail = styled.div`
  width: 150px;
  height: 84px;
  margin-bottom: 10px;
  border-radius: 10px;
  img {
    width: 150px;
    height: 84px;
    border-radius: 10px;
  }
`;

const VideoTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 100% */
  text-align: start;
`;

const ChannelBox = styled.div`
  display: flex;
  max-width: 160px;
  align-items: center;
`;

const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChannelTitle = styled.div`
  display: flex;
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 12px; /* 100% */
  text-align: start;
`;
const VideoCategory = styled.div`
  color: #fff9f9;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 900;
  line-height: 22px; /* 157.143% */
  margin-top: -32px;
  display: flex;
  margin-left: 12px;
  margin-bottom: 4px;
`;
