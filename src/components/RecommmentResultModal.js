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
              클레잉 앱에서 <span>주변 친구</span>들이<br></br>
              <span>좋아하는 채널</span> 리뷰도 같이 확인해보세요!
            </Title>
            <Banner>
              <img src="/images/MobileMockup.svg" alt="resultMobile" />
            </Banner>
            <SubTitle>Creative 한 Playing, 클레잉</SubTitle>
            <GoogleStoreButton>
              <img src="/images/PlayStoreButton.svg" alt="playstore" />
            </GoogleStoreButton>
            <AppleStoreButton>
              <img src="/images/AppStoreButton.svg" alt="appstore" />
            </AppleStoreButton>
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

const Comment = styled.div`
  color: #000;
  font-family: NanumGothic;
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
  line-height: 32px; /* 266.667% */
  letter-spacing: -0.24px;
  text-align: flex-start;
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const Title = styled.div`
  color: #000;
  font-family: NanumGothic;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: 32px; /* 177.778% */
  letter-spacing: -0.36px;
  margin-bottom: 32px;
  span {
    color: var(--_brand-sub, #429df2);
    font-family: NanumGothic;
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    line-height: 32px;
    letter-spacing: -0.36px;
  }
`;

const Banner = styled.div`
  img {
  }
`;
const SubTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 900;
  line-height: 20px; /* 142.857% */
  margin-bottom: 40px;
`;
const GoogleStoreButton = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const AppleStoreButton = styled.div`
  display: flex;
`;
