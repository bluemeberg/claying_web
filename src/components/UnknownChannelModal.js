import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import { youtubeDataAPIInstacne, youtubeGeneralAPI } from "../api/axios";
import AfterRecommendPage from "../pages/HookingPage/AfterRecommendPage";
import { formatNumber } from "../utils/formatSubsNumber";
import "./ChannelModal.css";
import StarRating from "./StarRating";
import UnknownVideoBox from "./VideoBox/UnknownVideoBox";
import VideoBox from "./VideoBox/VideoBox";
import VideoBoxNonModal from "./VideoBox/VideoBoxNonModal";
const UnknownChannelModal = (props) => {
  // 채널 배너
  // 채널 설명
  // 영상 조회수
  const [modalOpen, setModalOpen] = useState(false);

  console.log(props);
  const handleCancel = useCallback(() => {
    props.setModalOpen(false);
    setModalOpen(true);
  }, [props]);

  const handleRecommendClick = useCallback(() => {
    // 추천 데이터 서버 업로드 필요
    props.setModalOpen(false);
    // 앱 다운로드 페이지로 이동
  }, [props]);

  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleContent = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);
  props.selectedChannel.videos.sort((a, b) => {
    const dateA = new Date(a.hot_time);
    const dateB = new Date(b.hot_time);
    return dateB - dateA;
  });
  console.log(props.selectedChannel);
  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <ModalChannelBanner>
            <img src={props.selectedChannel.channel.banner} alt="modal-img" />
            <CancelButton>
              <img
                src="/images/CancelButton.svg"
                onClick={handleCancel}
                alt="cancel"
              />
            </CancelButton>
          </ModalChannelBanner>
          <ModalChannelThumbnail>
            {props.selectedChannel.channel.thumbnail !== undefined ? (
              <img
                src={props.selectedChannel.channel.thumbnail}
                alt="modal-channel-thumbnail"
              />
            ) : (
              <img
                src={props.selectedChannel.channel.thumbnail}
                alt="modal-channel-thumbnail"
              />
            )}
          </ModalChannelThumbnail>
          <ChannelTitle>{props.selectedChannel.channel.title}</ChannelTitle>
          <ChannelSubsCount>
            {formatNumber(props.selectedChannel.channel.sub_count)}명
          </ChannelSubsCount>
          <ChannelVideoCount>
            동영상 {props.selectedChannel.channel.video_count}개
          </ChannelVideoCount>
          {props.selectedChannel.users.length !== 0 ? (
            <ChannelRecommendButton users="true" onClick={handleRecommendClick}>
              좋아하는 클레잉 유저들 확인하기
            </ChannelRecommendButton>
          ) : (
            <ChannelRecommendButton onClick={handleRecommendClick}>
              관련 크리에이터 더 발견하기
            </ChannelRecommendButton>
          )}
          {/* 채널 설명 */}
          <ChannelDescritpion>
            {!isExpanded
              ? `${props.selectedChannel.channel.description.slice(0, 30)}...`
              : `${props.selectedChannel.channel.description}`}
          </ChannelDescritpion>
          <ChannelDescriptionMoreButton onClick={handleToggleContent}>
            {isExpanded ? "접기" : "펼치기"}
          </ChannelDescriptionMoreButton>
          <ChannelBoundary />
          {props.selectedChannel.users.length !== 0 ? (
            <LikedVideoSectionTitle>
              클레잉 유저가 좋아한 영상
            </LikedVideoSectionTitle>
          ) : (
            <LikedVideoSectionTitle>
              인기 급상승 영상 이력
            </LikedVideoSectionTitle>
          )}
          {/* map 문을 돌면서 확인 좋아하는 영상들 표출 피룡 */}
          <VideoContainer>
            {props.selectedChannel.videos.map((data, index) => (
              <UnknownVideoBox
                key={index}
                hotVideo={data}
                selectedChannel={props.selectedChannel}
              ></UnknownVideoBox>
            ))}
          </VideoContainer>
        </div>
      </div>
    </div>
  );
};

export default UnknownChannelModal;

const ModalChannelBanner = styled.div`
  img {
    width: 100%;
    height: 72px;
  }
`;

const ModalChannelThumbnail = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -40px;
  img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }
`;

const CancelButton = styled.div`
  position: absolute;
  top: 12px;
  img {
    width: 20px;
    height: 20px;
  }
  right: 12px;
`;

const ChannelTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 14px; /* 100% */
`;

const ChannelSubsCount = styled.div`
  color: #97a2b6;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 116.667% */
  margin-top: 4px;
  margin-bottom: 4px;
  span {
    color: #429df2;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 14px; /* 116.667% */
    margin-right: 4px;
  }
  p {
    display: inline;
    font-weight: 700;
    color: black;
    margin-right: 4px;
  }
`;

const ChannelVideoCount = styled.div`
  color: #97a2b6;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 116.667% */
`;

const ChannelDescritpion = styled.div`
  overflow: hidden;
  color: #000;
  text-align: center;
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 100% */
  margin-left: 20px;
  margin-right: 20px;
`;

const ChannelDescriptionMoreButton = styled.div`
  color: rgba(0, 0, 0, 0.25);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px; /* 100% */
  letter-spacing: -0.24px;
  margin-top: 8px;
`;

const ChannelRecommendButton = styled.div`
  display: flex;
  padding: 14px 0px 13px 0px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 4px;
  background: ${(props) => (props.users === "true" ? "#FFBB54" : "#3c95ff")};
  color: ${(props) => (props.users === "true" ? "black" : "#fff")};
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 14px; /* 100% */
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 12px;
  margin-bottom: 20px;
`;

const ChannelBoundary = styled.div`
  width: 312px;
  height: 4px;
  flex-shrink: 0;
  background: #f1f1f1;
  margin-top: 12px;
`;

const LikedVideoSectionTitle = styled.div`
  color: #000;
  text-align: start;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px; /* 100% */
  letter-spacing: -0.24px;
  margin-top: 14px;
  margin-left: 12px;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 28px;
`;
