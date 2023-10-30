import React, { useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";
import NavBar from "../../components/NavBar";
import StarRating from "../../components/StarRating";
import VideoBoxNonModal from "../../components/VideoBox/VideoBoxNonModal";
import { formatNumber } from "../../utils/formatSubsNumber";
import category from "../../utils/category_compare.json";
import RecommendVideoBox from "../../components/VideoBox/RecommendVideoBox";

const RecommendVideo = () => {
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
  const location = useLocation();
  console.log(location);
  const params = useParams();
  console.log(params);
  const ModalChannelBanner = styled.div`
    margin-top: -40px;
    height: 200px;
    width: 100%;
    background-image: url(${location.state.video.channel.banner});
  `;
  const handleRecommendClick = useCallback(() => {}, []);
  return (
    <Container>
      <NavBar back={true} />
      <ModalChannelBanner img={location.state.video.channel.banner}>
        {/* {location.state.banner !== undefined ? (
          <img src={location.state.banner} alt="modal-img" />
        ) : location.state.banner === undefined ? (
          <img src="/images/DefaultBanner.svg" alt="banner-default" />
        ) : (
          <img
            src={location.state.selectedChannel.channel.banner}
            alt="modal-img"
          />
        )} */}
      </ModalChannelBanner>
      <ModalChannelThumbnail>
        <img
          src={location.state.video.channel.thumbnail}
          alt="modal-channel-thumbnail"
        />
      </ModalChannelThumbnail>
      <ChannelTitle>{location.state.video.channel.title}</ChannelTitle>
      <ChannelSubsCount>
        {location.state.video.channel.subsDate !== undefined ? (
          <span> 구독중 </span>
        ) : (
          <p>미구독 </p>
        )}
        {formatNumber(location.state.video.channel.sub_count)}
      </ChannelSubsCount>
      <ChannelVideoCount>
        동영상 {location.state.video.channel.video_count}개
        {/* | 조회수{" "}
            {formatNumber(props.selectedChannel.viewCount)}회 */}
      </ChannelVideoCount>
      <RecommendVideoBox likedVideo={location.state.video.video} />
      <StarRating />
      <ChannelRecommendInputBox
        placeholder="영상 추천 한줄 리뷰를 남기고,
클레잉 앱에서 주변 친구들의 추천 영상을 확인하세요!"
      ></ChannelRecommendInputBox>
      <ChannelRecommendInputBoxTextNumber>
        0/50
      </ChannelRecommendInputBoxTextNumber>
      <ChannelRecommendButton onClick={handleRecommendClick}>
        영상 추천하기
      </ChannelRecommendButton>
      {/* <ChannelBoundary />
      <LikedVideoSectionTitle>내가 좋아한 동영상</LikedVideoSectionTitle>
      {location.state.video === null ? (
        <LikeVideoGuide>
          <CategoryTitle>{category[location.state.topDNAType]}</CategoryTitle>
          <img src={tempImages[location.state.topDNAType]} alt="banner" />
          아직 좋아요한 영상이 없습니다! <br></br>구독 중인 크리에이터의 영상에
          좋아요를 눌러주세요!
        </LikeVideoGuide>
      ) : (
        <VideoContainer>
          {location.state.top6 === "yes"
            ? location.state.video.map((data, index) => (
                <VideoBoxNonModal
                  key={index}
                  likedVideo={data}
                ></VideoBoxNonModal>
              ))
            : location.state.video.videos.map((data, index) => (
                <VideoBoxNonModal
                  key={index}
                  likedVideo={data}
                ></VideoBoxNonModal>
              ))}
        </VideoContainer>
      )} */}
    </Container>
  );
};

export default RecommendVideo;

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1faff;
  overflow: scroll;
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
  width: 90%;
`;

const ChannelBoundary = styled.div`
  width: 100%;
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
  font-weight: 900;
  line-height: 12px; /* 100% */
  letter-spacing: -0.24px;
  margin-top: 14px;
  margin-left: 12px;
  width: 100%;
  margin-left: 40px;
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
  line-height: 16px; /* 100% */
  letter-spacing: -0.24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 40px;
  img {
    width: 160px;
  }
`;

const CategoryTitle = styled.div`
  color: #3c95ff;
  text-align: center;
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  margin-top: 28px;
`;
