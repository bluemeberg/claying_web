import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import NavBar from "../../components/NavBar";
import UnknownVideoBox from "../../components/VideoBox/UnknownVideoBox";
import VideoBoxNonModal from "../../components/VideoBox/VideoBoxNonModal";
import { formatNumber } from "../../utils/formatSubsNumber";

const FindChannel = () => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const ModalChannelBanner = styled.div`
    margin-top: -40px;
    height: 200px;
    width: 100%;
    background-image: url(${location.state.props.props.channel.banner});
  `;
  const handleRecommendClick = useCallback(() => {
    // 추천 데이터 서버 업로드 필요
    // 앱 다운로드 페이지로 이동

    navigate("/app/user");
  }, []);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleContent = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);
  location.state.props.props.videos.sort((a, b) => {
    const dateA = new Date(a.hot_time);
    const dateB = new Date(b.hot_time);
    return dateB - dateA;
  });
  return (
    <Container>
      <NavBar back={true} />
      <ModalChannelBanner>
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
        {location.state.props.props.channel.thumbnail !== undefined ? (
          <img
            src={location.state.props.props.channel.thumbnail}
            alt="modal-channel-thumbnail"
          />
        ) : (
          <img
            src={location.state.props.props.channel.thumbnail}
            alt="modal-channel-thumbnail"
          />
        )}
      </ModalChannelThumbnail>
      {location.state.props.props.channel.title !== undefined ? (
        <ChannelTitle>{location.state.props.props.channel.title}</ChannelTitle>
      ) : (
        <ChannelTitle>{location.state.props.props.channel.title}</ChannelTitle>
      )}
      <ChannelSubsCount>
        {location.state.props.props.channel.subs_date !== undefined ? (
          <span> 구독중 </span>
        ) : (
          <p>미구독 </p>
        )}
        {location.state.props.props.channel.sub_count !== undefined
          ? formatNumber(location.state.props.props.channel.sub_count)
          : ""}
      </ChannelSubsCount>
      <ChannelVideoCount>
        동영상{" "}
        {location.state.props.props.channel.video_count !== undefined
          ? location.state.props.props.channel.video_count
          : location.state.props.props.channel.video_count}
        개
        {/* | 조회수{" "}
            {formatNumber(props.selectedChannel.viewCount)}회 */}
      </ChannelVideoCount>
      {location.state.props.props.users.length !== 0 ? (
        <ChannelRecommendButton
          users="true"
          onClick={() => handleRecommendClick("users")}
        >
          좋아하는 클레잉 유저들 확인하기
        </ChannelRecommendButton>
      ) : (
        <ChannelRecommendButton onClick={() => handleRecommendClick()}>
          관련 크리에이터 더 발견하기
        </ChannelRecommendButton>
      )}
      <ChannelDescritpion>
        {!isExpanded
          ? `${location.state.props.props.channel.description.slice(0, 30)}...`
          : `${location.state.props.props.channel.description}`}
      </ChannelDescritpion>
      <ChannelDescriptionMoreButton onClick={handleToggleContent}>
        {isExpanded ? "접기" : "펼치기"}
      </ChannelDescriptionMoreButton>
      <ChannelBoundary />
      {location.state.props.props.users.length !== 0 ? (
        <LikedVideoSectionTitle>
          클레잉 유저가 좋아한 영상
        </LikedVideoSectionTitle>
      ) : (
        <LikedVideoSectionTitle>인기 급상승 영상 이력</LikedVideoSectionTitle>
      )}
      <VideoContainer>
        {location.state.props.props.videos.map((data, index) => (
          <UnknownVideoBox
            key={index}
            hotVideo={data}
            selectedChannel={location.state.props.props}
          ></UnknownVideoBox>
        ))}
      </VideoContainer>
    </Container>
  );
};

export default FindChannel;

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
  width: 80%;
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
  width: 100%;
`;
