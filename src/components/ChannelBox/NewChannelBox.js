import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import { youtubeDataAPIInstacne, youtubeGeneralAPI } from "../../api/axios";
import ChannelModal from "../ChannelModal";
import UnknownChannelModal from "../UnknownChannelModal";
import category from "../../utils/category_real.json";
import { useNavigate } from "react-router-dom";
const NewChannelBox = (props) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState();
  const handleClick = useCallback((channel) => {
    navigate(`/find/${props.props.channel.id}`, {
      state: {
        props,
      },
    });
    // setModalOpen(true);
    // setSelectedChannel(channel);
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
  console.log(props);
  // 231024 to do list
  // 4번째 데이터만 보여주도록
  //
  return (
    <NewChannelParentContainer>
      {props.props.users.length !== 0 ? (
        <NewChannnelUser>
          {category[props.props.users[0].detail_category]} 성향(20%)의 <br />
          클레잉 유저들이 좋아합니다
        </NewChannnelUser>
      ) : (
        <NewChannnelUser></NewChannnelUser>
      )}
      <NewChannelContainer users={props.props.users.length}>
        {/* <NewChannelContainer subs={props.props.channel.sub_count}> */}
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
        {props.index + 1 === props.length ? (
          <NewChannelBlur>
            <img src="/images/UnknownBlur.svg" alt="unknwonblut" />
          </NewChannelBlur>
        ) : (
          <></>
        )}
        {props.index + 1 === props.length ? (
          <NewChannelTitle>???</NewChannelTitle>
        ) : (
          <NewChannelTitle>{props.props.channel.title}</NewChannelTitle>
        )}
        {props.index + 1 === props.length ? (
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
    </NewChannelParentContainer>
  );
};

export default NewChannelBox;

const NewChannelParentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NewChannnelUser = styled.div`
  font-size: 8px;
  display: flex;
  justify-content: end;
  text-align: end;
  max-width: 140px;
  min-height: 25px;
`;

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
  background: ${(props) => (props.users !== 0 ? "#FFBB54" : "#fff")};
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
    props.subs === "false" ? "" : "rgba(47, 168, 255, 0.15)"};
  color: #2fa8ff;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 900;
  line-height: 10px; /* 100% */
`;
