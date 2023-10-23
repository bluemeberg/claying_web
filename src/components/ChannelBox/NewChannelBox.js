import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import { youtubeDataAPIInstacne, youtubeGeneralAPI } from "../../api/axios";
import ChannelModal from "../ChannelModal";
import UnknownChannelModal from "../UnknownChannelModal";

const NewChannelBox = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState();
  const handleClick = useCallback((channel) => {
    setModalOpen(true);
    setSelectedChannel(channel);
  }, []);
  const handleGetChannelInfo = useCallback(async () => {
    const response = await youtubeDataAPIInstacne.get("/channels", {
      params: {
        id: props.props.channelID,
        part: "snippet, brandingSettings,statistics",
        key: youtubeGeneralAPI,
      },
    });
    console.log(response.data);
    if (response.data.items[0].brandingSettings.image !== undefined) {
      const channelBanner =
        response.data.items[0].brandingSettings.image.bannerExternalUrl;
      props.props["channelBanner"] = channelBanner;
    }
    props.props["videoCount"] = response.data.items[0].statistics.videoCount;
    props.props["viewCount"] = response.data.items[0].statistics.viewCount;
    props.props["description"] = response.data.items[0].snippet.description;
  }, [props.props]);
  // useEffect(() => {
  //   handleGetChannelInfo();
  // }, []);
  console.log(props.props);

  return (
    <>
      <NewChannelContainer subs={props.props.channelSubscribeCount}>
        <NewChannelSubsNumber>
          {props.props.channel.sub_count >= 10000 &&
          props.props.channel.sub_count < 50000
            ? "+1만"
            : props.props.channel.sub_count >= 50000 &&
              props.props.channel.sub_count < 100000
            ? "+5만"
            : props.props.channel.sub_count >= 100000 &&
              props.props.channel.sub_count < 500000
            ? "+10만"
            : "+50만"}
        </NewChannelSubsNumber>
        <NewChannelThumbanil filter={props.props.channel.sub_count}>
          <img
            src={props.props.channel.thumbnail}
            alt={props.props.channel.title}
          />
        </NewChannelThumbanil>
        {props.props.channel.sub_count >= 500000 ? (
          <NewChannelBlur></NewChannelBlur>
        ) : (
          <></>
        )}
        {props.props.channel.sub_count >= 500000 ? (
          <NewChannelTitle>???</NewChannelTitle>
        ) : (
          <NewChannelTitle>{props.props.channel.title}</NewChannelTitle>
        )}
        {props.props.channel.sub_count >= 500000 ? (
          <DetailButton subs="false"></DetailButton>
        ) : (
          <DetailButton onClick={() => handleClick(props.props)}>
            자세히 보기
          </DetailButton>
        )}
      </NewChannelContainer>
      {modalOpen && (
        <UnknownChannelModal
          setModalOpen={setModalOpen}
          selectedChannel={selectedChannel}
        />
      )}
    </>
  );
};

export default NewChannelBox;

const NewChannelContainer = styled.div`
  display: flex;
  width: 140px;
  padding: 12px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 12px;
  background: ${(props) => (props.subs >= 500000 ? "" : "#fff")};
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  margin-top: 8px;
`;

const NewChannelSubsNumber = styled.div`
  color: #3c95ff;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;

const NewChannelThumbanil = styled.div`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  img {
    border-radius: 30px;
  }
`;

const NewChannelBlur = styled.div`
  width: 72px;
  height: 72px;
  fill: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  position: absolute;
  border-radius: 36px;
  margin-bottom: 24px;
`;

const NewChannelCategoryBox = styled.div`
  display: inline-flex;
  padding: 3px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: #d6eeff;
  color: #2fa8ff;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px; /* 100% */
`;

const NewChannelTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 14px; /* 100% */
`;

const DetailButton = styled.div`
  display: flex;
  width: 100px;
  height: 12px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: ${(props) =>
    props.subs === "false"
      ? "rgba(241, 250, 255, 1)"
      : "rgba(47, 168, 255, 0.15)"};
  color: #2fa8ff;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 900;
  line-height: 10px; /* 100% */
`;
