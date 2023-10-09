import React, { useCallback, useState } from "react";
import { styled } from "styled-components";
import { getTimeAgo } from "../../utils/timeManipulate";
import ChannelModal from "../ChannelModal";
import category from "../../utils/category_real.json";
import RecommentResultModal from "../RecommmentResultModal";

const VideoBox = (props) => {
  console.log(props.likedVideo);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState();
  const [selectedVideoDataByChannel, setSelectedVideoDataByChannel] =
    useState();
  const [resultModalOpen, setResultModalOpen] = useState(false);

  const handleClick = useCallback(
    (channel) => {
      setModalOpen(true);
      console.log(channel);
      let result = null;
      console.log(props.videoDataByChannel);
      for (let i = 0; i < props.videoDataByChannel.length; i++) {
        console.log(props.videoDataByChannel[i]);
        if (props.videoDataByChannel[i].channelID === channel.channelID) {
          result = props.videoDataByChannel[i];
          console.log(result);
          break;
        }
      }
      console.log(result);
      setSelectedVideoDataByChannel(result);
      setSelectedChannel(channel);
    },
    [props.videoDataByChannel]
  );
  console.log(modalOpen);
  console.log(selectedVideoDataByChannel);
  return (
    <div>
      <VideoBoxContainer onClick={() => handleClick(props.likedVideo)}>
        <VideoThumbnail>
          <img
            src={props.likedVideo.videoThumbnail}
            alt={props.likedVideo.videoID}
          />
        </VideoThumbnail>
        <VideoCategory>{category[props.likedVideo.dnatype]}</VideoCategory>
        <ChannelBox>
          <ChannelThumbnail>
            <img
              src={props.likedVideo.channelThumbnail.url}
              alt={props.likedVideo.channelID}
            />
          </ChannelThumbnail>
          <ChannelInfo>
            <VideoTitle>
              {props.likedVideo.videoTitle.length > 15
                ? props.likedVideo.videoTitle.slice(0, 13) + "..."
                : props.likedVideo.videoTitle}
            </VideoTitle>
            <ChannelTitle>
              {props.likedVideo.channelTitle} *{" "}
              {getTimeAgo(props.likedVideo.uploadDate)}
            </ChannelTitle>
          </ChannelInfo>
        </ChannelBox>
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
