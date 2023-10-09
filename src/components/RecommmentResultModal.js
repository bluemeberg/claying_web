import React, { useCallback, useState } from "react";
import { styled } from "styled-components";
import AfterRecommendPage from "../pages/HookingPage/AfterRecommendPage";
import { formatNumber } from "../utils/formatSubsNumber";
import "./ChannelModal.css";
import VideoBox from "./VideoBox/VideoBox";
import VideoBoxNonModal from "./VideoBox/VideoBoxNonModal";
const RecommentResultModal = (props) => {
  // 채널 명
  // 채널 구독자 수
  // 채널 배너
  // 채널 설명
  // 구독 여부
  // 좋아요한 영상 정보
  // 인기 영상 존재 여부
  // 클레잉 성향들
  let userInfo = localStorage.getItem("userData");
  userInfo = JSON.parse(userInfo);

  console.log(props);
  const handleCancel = useCallback(() => {
    props.setResultModalOpen(false);
  }, [props]);

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span className="modal-close" onClick={handleCancel}>
            X
          </span>
          <Container>
            <Comment>
              {userInfo.displayName}님의 한줄 리뷰가 클레잉 앱에 업로드
              되었습니다.
            </Comment>
            <Title>
              클레잉 앱에서 <span>주변 친구</span>들이{" "}
              <span>좋아하는 채널</span> 리뷰도 같이 확인해보세요!
            </Title>
            <Banner>
              <img src="/images/MobileMockup.svg" alt="resultMobile" />
            </Banner>
            <SubTitle>Creative 한 Playing, 클레잉</SubTitle>
            <GoogleStoreButton>Play Store에서 다운로드</GoogleStoreButton>
            <AppleStoreButton>App Store에서 다운로드</AppleStoreButton>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default RecommentResultModal;

const Container = styled.main`
  position: relative;
  min-height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 calc(3.5vw + 5px);
  background-color: #f1faff;
`;

const Comment = styled.div``;

const Title = styled.div``;

const Banner = styled.div`
  img {
  }
`;
const SubTitle = styled.div``;
const GoogleStoreButton = styled.div`
  display: flex;
  padding: 14px 75px 14px 14px;
  align-items: center;
  gap: 37px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  background: #fff;
`;

const AppleStoreButton = styled.div`
  display: flex;
  padding: 14px 75px 14px 14px;
  align-items: center;
  gap: 38px;
  border-radius: 8px;
  background: #000;
  color: white;
`;
