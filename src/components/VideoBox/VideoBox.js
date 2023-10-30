import React, { useCallback, useState } from "react";
import { styled } from "styled-components";
import { getTimeAgo } from "../../utils/timeManipulate";
import ChannelModal from "../ChannelModal";
import category from "../../utils/category_real.json";
import RecommentResultModal from "../RecommmentResultModal";
import { useNavigate } from "react-router-dom";

const VideoBox = (props) => {
  console.log(props.likedVideo);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState();
  const [selectedVideoDataByChannel, setSelectedVideoDataByChannel] =
    useState();
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = useCallback(
    (channel) => {
      setModalOpen(true);
      console.log(channel);
      let result = null;
      console.log(props.videoDataByChannel);
      for (let i = 0; i < props.videoDataByChannel.length; i++) {
        console.log(props.videoDataByChannel[i]);
        if (props.videoDataByChannel[i].channel.id === channel.channel.id) {
          result = props.videoDataByChannel[i];
          console.log(result);
          break;
        }
      }
      console.log(result);
      // setSelectedVideoDataByChannel(result);
      // setSelectedChannel(channel);

      navigate(`/result/video/${channel.video.id}`, {
        state: {
          video: channel,
        },
      });
    },
    [navigate, props.videoDataByChannel]
  );
  console.log(modalOpen);
  console.log(selectedVideoDataByChannel);
  return (
    <div>
      <VideoBoxContainer onClick={() => handleClick(props.likedVideo)}>
        <VideoCategory>
          {category[props.likedVideo.video.detail_category]}
        </VideoCategory>
        <VideoThumbnail>
          <img
            src={props.likedVideo.video.thumbnail}
            alt={props.likedVideo.video.id}
          />
        </VideoThumbnail>
        <ChannelBox>
          <ChannelThumbnail>
            <img
              src={props.likedVideo.channel.thumbnail}
              alt={props.likedVideo.channel.id}
            />
          </ChannelThumbnail>
          <ChannelInfo>
            <VideoTitle>
              {props.likedVideo.video.title.length > 15
                ? props.likedVideo.video.title.slice(0, 13) + "..."
                : props.likedVideo.video.title}
            </VideoTitle>
            <ChannelTitle>
              {props.likedVideo.channel.title} *{" "}
              {getTimeAgo(props.likedVideo.video.upload_date)}
            </ChannelTitle>
          </ChannelInfo>
        </ChannelBox>
        <RecommendButton>추천하기</RecommendButton>
      </VideoBoxContainer>
      {modalOpen && (
        <ChannelModal
          setModalOpen={setModalOpen}
          selectedChannel={selectedChannel}
          selectedVideoDataByChannel={selectedVideoDataByChannel}
          setResultModalOpen={setResultModalOpen}
        />
      )}
      {resultModalOpen && (
        <RecommentResultModal setResultModalOpen={setResultModalOpen} />
      )}
    </div>
  );
};

export default VideoBox;

const VideoBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 12px;
  margin-top: 24px;
  align-items: center;
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

const ChannelThumbnail = styled.div`
  display: flex;
  img {
    width: 36px;
    height: 36px;
    border-radius: 18px;
  }
`;

const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
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
  margin-top: -10px;
  display: flex;
  margin-bottom: 4px;
`;

const RecommendButton = styled.div`
  width: 132px;
  height: 29px;
  flex-shrink: 0;
  border-radius: 4px;
  background: var(--Orange, #ffbb54);
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 900;
  line-height: 12px; /* 100% */
  letter-spacing: -0.24px;
  margin-top: 8px;
`;
