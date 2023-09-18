import React from "react";
import { styled } from "styled-components";
import { formatNumber } from "../utils/formatSubsNumber";
import "./ChannelModal.css";
const ChannelModal = (props) => {
  // 채널 명
  // 채널 구독자 수
  // 채널 배너
  // 채널 설명
  // 구독 여부
  // 좋아요한 영상 정보
  // 인기 영상 존재 여부
  // 클레잉 성향들

  console.log(props);
  const handleCancel = () => props.setModalOpen(false);
  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span
            className="modal-close"
            onClick={() => props.setModalOpen(false)}
          >
            X
          </span>
          <ModalChannelBanner>
            <img src={props.selectedChannel.channelBanner} alt="modal-img" />
          </ModalChannelBanner>
          <ModalChannelThumbnail>
            <img
              src={props.selectedChannel.channelThumbnail.url}
              alt="modal-channel-thumbnail"
            />
          </ModalChannelThumbnail>
          <ChannelTitle>{props.selectedChannel.channelTitle}</ChannelTitle>
          <ChannelSubsCount>
            {formatNumber(props.selectedChannel.subsCount)}명
          </ChannelSubsCount>
          <ChannelVideoCount>
            동영상 {props.selectedChannel.videoCount}개 * 조회수{" "}
            {formatNumber(props.selectedChannel.viewCount)}회
          </ChannelVideoCount>
          <ChannelRecommendInputBox
            placeholder="채널 추천 한줄 리뷰를 남기고,
클레잉 앱에서 주변 친구들의 추천 채널을 확인하세요!"
          ></ChannelRecommendInputBox>
          <ChannelRecommendInputBoxTextNumber>
            0/50
          </ChannelRecommendInputBoxTextNumber>
          <ChannelRecommendButton>채널 추천하기</ChannelRecommendButton>
          <ChannelBoundary />
          <LikedVideoSectionTitle>내가 좋아한 동영상</LikedVideoSectionTitle>
        </div>
      </div>
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
