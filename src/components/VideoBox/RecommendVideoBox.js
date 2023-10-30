import React from "react";
import { styled } from "styled-components";
import category from "../../utils/category_real.json";
import { getTimeAgo } from "../../utils/timeManipulate";

const RecommendVideoBox = (props) => {
  console.log(props);
  return (
    <VideoBoxContainer>
      <VideoCategory>
        {category[props.likedVideo.detail_category]}
      </VideoCategory>
      <VideoContentBox>
        <VideoThumbnail>
          <img src={props.likedVideo.thumbnail} alt={props.likedVideo.id} />
        </VideoThumbnail>
        <ChannelBox>
          <ChannelInfo>
            <VideoTitle>{props.likedVideo.title}</VideoTitle>
            <ChannelTitle>
              {getTimeAgo(props.likedVideo.upload_date)}
            </ChannelTitle>
          </ChannelInfo>
        </ChannelBox>
      </VideoContentBox>
    </VideoBoxContainer>
  );
};

export default RecommendVideoBox;

const VideoBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 12px;
  margin-top: 40px;
  margin-left: 6px;
`;

const VideoThumbnail = styled.div`
  width: 150px;
  height: 84px;
  margin-bottom: 10px;
  border-radius: 10px;
  margin-right: 20px;
  img {
    width: 150px;
    height: 84px;
    border-radius: 10px;
  }
`;

const VideoContentBox = styled.div`
  display: flex;
`;

const VideoTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 100% */
  text-align: start;
  margin-bottom: 8px;
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
  color: #3c95ff;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 900;
  line-height: 22px; /* 157.143% */
  margin-top: -32px;
  display: flex;
  margin-bottom: 4px;
`;
