import React, { useCallback, useState } from "react";
import { styled } from "styled-components";
import AfterRecommendPage from "../../pages/HookingPage/AfterRecommendPage";
import { formatDateAgo } from "../../utils/formatSubsNumber";
import { formatDate, getTimeAgo } from "../../utils/timeManipulate";
import ChannelModal from "../ChannelModal";
import RecommentResultModal from "../RecommmentResultModal";

const SubsChannelBox = (props) => {
  console.log(props);
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
  return (
    <div>
      <SubsChannelContainer
        onClick={() => handleClick(props.subsData)}
        subs={props.subsData.subs}
      >
        <SubsChannelThumbnail>
          <img
            src={
              typeof props.subsData.channelThumbnail === "object"
                ? props.subsData.channelThumbnail.url
                : props.subsData.channelThumbnail
            }
            alt={props.subsData.channelTitle}
          />
        </SubsChannelThumbnail>
        <SubsChannelCategory></SubsChannelCategory>
        <SubsChannelTitle subs={props.subsData.subs}>
          {props.subsData.channelTitle}
        </SubsChannelTitle>
        <SubsChannelSubsCount></SubsChannelSubsCount>
        {props.subsDuring === "true" ? (
          <SubsChannelDate subs={props.subsData.subs}>
            {props.subsData.subs === false
              ? "미구독"
              : "구독기간:" + formatDateAgo(props.subsData.subsDate)}
          </SubsChannelDate>
        ) : (
          <SubsChannelDate subs={props.subsData.subs}>
            {props.subsData.subs === false
              ? "미구독"
              : "구독일:" + formatDate(props.subsData.subsDate)}
          </SubsChannelDate>
        )}
      </SubsChannelContainer>
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

export default SubsChannelBox;

const SubsChannelContainer = styled.div`
  display: flex;
  width: 100px;
  height: 140px;
  padding: 8px 0px 12px 0px;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  background: ${(props) => (props.subs === false ? "#3C95FF" : "#fff")};
  margin-left: 4px;
  margin-right: 4px;
  margin-top: 24px;
  justify-content: center;
`;

const SubsChannelThumbnail = styled.div`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  fill: #d9d9d9;
  border-radius: 30px;
  margin-top: 8px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 30px;
  }
`;

const SubsChannelCategory = styled.div`
  display: inline-flex;
  padding: 3px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: #d6eeff;
  color: #2fa8ff;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px; /* 100% */
`;

const SubsChannelTitle = styled.div`
  color: ${(props) => (props.subs === false ? "#fff" : "#000")};
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 14px; /* 100% */
  margin-top: 8px;
  min-height: 28px;
  max-height: 30px;
  margin-bottom: 8px;
  display: flex;
  align-items: center
  margin-left : 4px;
  margin-right : 4px;
`;

const SubsChannelSubsCount = styled.div`
  color: #97a2b6;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 116.667% */
`;

const SubsChannelDate = styled.div`
  color: ${(props) => (props.subs === false ? "#fff" : "#000")};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 116.667% */
`;
