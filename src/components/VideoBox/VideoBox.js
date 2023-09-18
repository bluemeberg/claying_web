import React, { useState } from "react";
import { styled } from "styled-components";
import { getTimeAgo } from "../../utils/timeManipulate";
import ChannelModal from "../ChannelModal";

const VideoBox = (props) => {
  console.log(props.likedVideo);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState();
  const handleClick = (channel) => {
    setModalOpen(true);
    setSelectedChannel(channel);
  };
  console.log(modalOpen);
  return (
    <div>
      <VideoBoxContainer onClick={() => handleClick(props.likedVideo)}>
        <VideoThumbnail>
          <img
            src={props.likedVideo.videoThumbnail}
            alt={props.likedVideo.videoID}
          />
        </VideoThumbnail>
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
        />
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
