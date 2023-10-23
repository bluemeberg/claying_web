import React, { useCallback, useState } from "react";
import { styled } from "styled-components";
import AfterRecommendPage from "../pages/HookingPage/AfterRecommendPage";
import { formatNumber } from "../utils/formatSubsNumber";
import "./ChannelModal.css";
import StarRating from "./StarRating";
import VideoBox from "./VideoBox/VideoBox";
import VideoBoxNonModal from "./VideoBox/VideoBoxNonModal";
const ChannelModal = (props) => {
  // 채널 명
  // 채널 구독자 수
  // 채널 배너
  // 채널 설명
  // 구독 여부
  // 좋아요한 영상 정보
  // 인기 영상 존재 여부
  // 클레잉 성향들
  const [modalOpen, setModalOpen] = useState(false);

  console.log(props);
  const handleCancel = useCallback(() => {
    props.setModalOpen(false);
    setModalOpen(true);
  }, [props]);

  const handleRecommendClick = useCallback(() => {
    // 추천 데이터 서버 업로드 필요
    props.setModalOpen(false);
    props.setResultModalOpen(true);
  }, [props]);

  const tempImages = {
    "Business/Entrepreneurship": "/images/character/temp/business.svg",
    Sports: "/images/character/temp/soccer.svg",
    "SelfImprovement/Motivation": "/images/character/temp/selfimporvement.svg",
    "IT/Tech": "/images/character/temp/ittech.svg",
    "Makeup/Beauty": "/images/character/temp/makeupbeauty.svg",
    Car: "/images/character/temp/car.svg",
    Comedy: "/images/character/temp/comedy.svg",
    Gameplay: "/images/character/temp/gameplay.svg",
    Finance: "/images/character/temp/finance.svg",
    "News/Politics": "/images/character/temp/news.svg",
    "Travel Vlogs": "/images/character/temp/travel.svg",
    "Shows&Talk Shows": "/images/character/temp/show.svg",
    "Documentary Movies": "/images/character/temp/movie.svg",
    "Fashion/Style": "/images/character/temp/fashion.svg",
    "Sci-Fi/Fantasy Movies": "/images/character/temp/movie.svg",
    // 다른 특성과 이미지 경로도 추가
  };

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <ModalChannelBanner>
            {props.selectedChannel.banner !== undefined ? (
              <img src={props.selectedChannel.banner} alt="modal-img" />
            ) : (
              <img src={props.selectedChannel.channel.banner} alt="modal-img" />
            )}
            <CancelButton>
              <img
                src="/images/CancelButton.svg"
                onClick={handleCancel}
                alt="cancel"
              />
            </CancelButton>
          </ModalChannelBanner>
          <ModalChannelThumbnail>
            {props.selectedChannel.channelThumbnail !== undefined ? (
              <img
                src={props.selectedChannel.channelThumbnail}
                alt="modal-channel-thumbnail"
              />
            ) : (
              <img
                src={props.selectedChannel.channel.thumbnail}
                alt="modal-channel-thumbnail"
              />
            )}
          </ModalChannelThumbnail>
          {props.selectedChannel.channelTitle !== undefined ? (
            <ChannelTitle>{props.selectedChannel.channelTitle}</ChannelTitle>
          ) : (
            <ChannelTitle>{props.selectedChannel.channel.title}</ChannelTitle>
          )}
          <ChannelSubsCount>
            {props.selectedVideoDataByChannel === null ||
            props.selectedVideoDataByChannel.subs === true ? (
              <span> 구독중 </span>
            ) : (
              <p>미구독 </p>
            )}
            {props.selectedChannel.subsCount !== undefined
              ? formatNumber(props.selectedChannel.subsCount)
              : formatNumber(props.selectedChannel.channel.sub_count)}
            명
          </ChannelSubsCount>
          <ChannelVideoCount>
            동영상{" "}
            {props.selectedChannel.videoCount !== undefined
              ? props.selectedChannel.videoCount
              : props.selectedChannel.channel.video_count}
            개
            {/* | 조회수{" "}
            {formatNumber(props.selectedChannel.viewCount)}회 */}
          </ChannelVideoCount>
          <StarRating />
          <ChannelRecommendInputBox
            placeholder="채널 추천 한줄 리뷰를 남기고,
클레잉 앱에서 주변 친구들의 추천 채널을 확인하세요!"
          ></ChannelRecommendInputBox>
          <ChannelRecommendInputBoxTextNumber>
            0/50
          </ChannelRecommendInputBoxTextNumber>
          <ChannelRecommendButton onClick={handleRecommendClick}>
            채널 추천하기
          </ChannelRecommendButton>
          <ChannelBoundary />
          <LikedVideoSectionTitle>내가 좋아한 동영상</LikedVideoSectionTitle>
          {/* map 문을 돌면서 확인 좋아하는 영상들 표출 피룡 */}
          {props.selectedVideoDataByChannel === null ? (
            <LikeVideoGuide>
              <img src={tempImages[props.topDNAType]} alt="banner" />
              아직 좋아요한 영상이 없습니다! <br></br>구독 중인 크리에이터의
              영상에 좋아요를 눌러주세요!
            </LikeVideoGuide>
          ) : (
            <VideoContainer>
              {props.selectedVideoDataByChannel.videos.map((data, index) => (
                <VideoBoxNonModal
                  key={index}
                  likedVideo={data}
                  selectedChannel={props.selectedChannel}
                ></VideoBoxNonModal>
              ))}
            </VideoContainer>
          )}
        </div>
      </div>
      {modalOpen && <ChannelModal />}
    </div>
  );
};

export default ChannelModal;

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

const ChannelRecommendInputBox = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  width: 88%;
  overflow: hidden;
  overflow-y: auto; /* 세로 스크롤바가 필요한 경우에만 표시 */
  resize: none; /* 크기 조정 비활성화 */
  white-space: pre-wrap; /* 줄 바꿈 지원 */
  word-wrap: break-word; /* 긴 단어 줄 바꿈 */
  margin-top: 12px;
  font-family: Pretendard;
  &:focus {
    border-color: #007bff;
    /* 추가적인 스타일링을 할 수 있습니다. */
  }
  &::placeholder {
    /* placeholder에 대한 스타일 지정 */
    overflow: hidden;
    text-overflow: ellipsis; /* 텍스트가 넘칠 때 말줄임(...) 표시 */
    font-size: 12px;
  }
`;

const ChannelRecommendInputBoxTextNumber = styled.div`
  color: #97a2b6;
  text-align: end;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 116.667% */
  margin-right: 8px;
  margin-bottom: 8px;
  margin-top: 4px;
`;

const ChannelRecommendButton = styled.div`
  display: flex;
  height: 21px;
  padding: 14px 0px 13px 0px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 4px;
  background: #3c95ff;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 14px; /* 100% */
  margin-left: 8px;
  margin-right: 8px;
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
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  margin-bottom: 28px;
`;

const LikeVideoGuide = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 12px; /* 100% */
  letter-spacing: -0.24px;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  align-items: center;
  img {
    width: 160px;
  }
`;
