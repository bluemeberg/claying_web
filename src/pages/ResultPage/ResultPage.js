import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Controller,
  Thumbs,
} from "swiper/modules";

import NavBar from "../../components/NavBar";
import category from "../../utils/category_compare.json";
import categoryReal from "../../utils/category_real.json";
import "./ResultPage.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Result1 from "./Result1";
import Result2 from "./Result2";
import Result3 from "./Result3";
import ChannelModal from "../../components/ChannelModal";
import { youtubeDataAPIInstacne, youtubeGeneralAPI } from "../../api/axios";
import { getTimeAgo } from "../../utils/timeManipulate";
import Result4 from "./Result4";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  let dnaTypeCollections = [];
  let subsData = [];
  let unknownResult = [];
  let videoDataByChannel = [];
  if (location.state !== null) {
    dnaTypeCollections = location.state.dnaTypeCollections;
    subsData = location.state.subsData;
    unknownResult = location.state.unknownResult;
    videoDataByChannel = location.state.videoDataByChannel;
  }
  const dnaTypes = dnaTypeCollections.map((item) => ({
    ...item,
    category: categoryReal[item.dna_type],
  }));
  console.log(dnaTypes);
  console.log(window.scrollY);
  // 전체 dnacount 총합 계산
  const totalCount = dnaTypes.reduce((sum, item) => sum + item.count, 0);

  // 각 객체에 dnacount 비중(%) 추가
  const dataArrayWithPercentage = dnaTypes.map((item) => ({
    ...item,
    percentage: ((item.count / totalCount) * 100).toFixed(1),
  }));
  console.log(dataArrayWithPercentage);
  let currentRank = 0;
  let currentRankCount = 1;

  // 순위 정보 추가
  const rankedArray = dataArrayWithPercentage.map((item, index) => {
    if (index > 0 && item.count === dataArrayWithPercentage[index - 1].count) {
      currentRankCount++;
    } else {
      currentRank += currentRankCount;
      currentRankCount = 1;
    }
    return {
      ...item,
      rank: currentRank,
    };
  });
  console.log(rankedArray);
  let userInfo = localStorage.getItem("userData");
  userInfo = JSON.parse(userInfo);
  let videoData = [];
  if (location.state !== null) {
    videoData = location.state.videoData;
  }
  let addCountLikedVideos = videoData.map((data) => {
    data.channelCount = 1;
    return data;
  });
  console.log(addCountLikedVideos);

  let sortLikedVideos = addCountLikedVideos.reduce((result, item) => {
    console.log(item);
    if (item.channel_id) {
      const existingItem = result.find((x) => x.channel_id === item.channel_id);
      if (existingItem) {
        existingItem.channelCount += item.channelCount;
      } else {
        result.push({
          channelID: item.channel_id,
          channelCount: item.channelCount,
          channelTitle: item.channelTitle,
        });
      }
    }
    return result;
  }, []);
  sortLikedVideos = sortLikedVideos.sort(
    (a, b) => b.channelCount - a.channelCount
  );
  console.log(sortLikedVideos);
  const [data, setChannelData] = useState([]);
  // const handleYoutubeChannelData = useCallback(async () => {
  //   const updateAddCountLikedVideos = await Promise.all(
  //     addCountLikedVideos.map(async (channel) => {
  //       const response = await youtubeDataAPIInstacne.get("/channels", {
  //         params: {
  //           id: channel.channelID,
  //           part: "snippet, brandingSettings,statistics",
  //           key: youtubeGeneralAPI,
  //         },
  //       });
  //       console.log(response.data);
  //       const channelThumbnail =
  //         response.data.items[0].snippet.thumbnails.default;
  //       const subsCount = response.data.items[0].statistics.subscriberCount;
  //       const videoCount = response.data.items[0].statistics.videoCount;
  //       const viewCount = response.data.items[0].statistics.viewCount;
  //       let channelDescription = "";
  //       if (response.data.items[0].snippet.description !== undefined) {
  //         channelDescription = response.data.items[0].snippet.description;
  //       }
  //       if (response.data.items[0].brandingSettings.image !== undefined) {
  //         const channelBanner =
  //           response.data.items[0].brandingSettings.image.bannerExternalUrl;
  //         console.log(channelBanner);
  //         return {
  //           ...channel,
  //           channelThumbnail,
  //           channelBanner,
  //           subsCount,
  //           videoCount,
  //           viewCount,
  //           channelDescription,
  //         };
  //       }
  //       return {
  //         ...channel,
  //         channelThumbnail,
  //         subsCount,
  //         videoCount,
  //         viewCount,
  //         channelDescription,
  //       };
  //     })
  //   );
  //   console.log(updateAddCountLikedVideos);
  //   setChannelData(updateAddCountLikedVideos);
  // }, [addCountLikedVideos]);
  console.log(data);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (location.state === null) {
      navigate("/login", {});
    }
  }, []);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const HandleSetting = useCallback(() => {
    // 배열에서 가장 큰 percentage 값을 찾기
    let maxPercentage = 0;
    rankedArray.forEach((item) => {
      const currentPercentage = parseFloat(item.percentage);
      if (currentPercentage > maxPercentage) {
        maxPercentage = currentPercentage;
      }
    });
    // 가장 큰 percentage 값을 가지는 요소들을 모아두는 배열
    const maxPercentageItems = rankedArray.filter(
      (item) => parseFloat(item.percentage) === maxPercentage
    );
    // maxPercentageItems 배열에는 가장 큰 percentage 값을 가지는 요소들이 들어있음
    console.log(maxPercentageItems.length);
    if (maxPercentageItems.length === 1) {
      return (
        <>
          <div className="prev">
            <img src="/images/LeftArrow.svg" alt="leftArrow" />
          </div>
          <div className="next">
            <img src="/images/RightArrow.svg" alt="rightArrow" />
          </div>
          <Swiper
            navigation={{
              nextEl: ".next",
              prevEl: ".prev",
            }}
            modules={[
              Navigation,
              Pagination,
              Scrollbar,
              A11y,
              Controller,
              Thumbs,
            ]}
            className="mySwiper"
            allowTouchMove={false} // 스와이프 기능 끄기
            slidesPerView={1}
            spaceBetween={20}
            onSlideChange={(index) => console.log(index)}
            scrollbar={{ draggable: true }}
          >
            <SwiperSlide>
              {({ isActive }) => (
                <div>Current slide is {isActive ? "active" : "not active"}</div>
              )}
              <Result1
                dnaInfoData={unknownResult}
                dnaMaxCountInfo={maxPercentageItems}
                userInfo={userInfo.displayName}
                topDNAType={rankedArray[0].dna_type}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Result2
                dnaInfoData={rankedArray}
                userInfo={userInfo.displayName}
                topDNAType={rankedArray[0].dna_type}
                videoDataByChannel={videoDataByChannel}
              />
            </SwiperSlide>
            {/* videoDataByChannel 추가 후 채널 모달 창으로 채널 ID 기준 영상 데이터 모달 창으로 넘기기 */}
            <SwiperSlide>
              <Result3
                setModalOpen={setModalOpen}
                likedVideos={addCountLikedVideos}
                userInfo={userInfo.displayName}
                topDNAType={rankedArray[0].dna_type}
                subsData={subsData}
                videoDataByChannel={videoDataByChannel}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Result4
                setModalOpen={setModalOpen}
                likedVideos={data}
                userInfo={userInfo.displayName}
                topDNAType={rankedArray[0].dna_type}
                subsData={subsData}
                videoDataByChannel={videoDataByChannel}
              />
            </SwiperSlide>
          </Swiper>
        </>
      );
    } else {
      // 복수개 최상위 비중 dnaTitle 발생 시 result1 페이지를 복수개로 slide 생성시키고,
      //  상세 결과 확인하기 버튼 depth 추가를 통해 상세 결과 페이지로 이동시키기
      return (
        <>
          <div className="prev">
            <img src="/images/LeftArrow.svg" alt="leftArrow" />
          </div>
          <div className="next">
            <img src="/images/RightArrow.svg" alt="rightArrow" />
          </div>
          <Swiper
            navigation={{
              nextEl: ".next",
              prevEl: ".prev",
            }}
            modules={[
              Navigation,
              Pagination,
              Scrollbar,
              A11y,
              Controller,
              Thumbs,
            ]}
            className="mySwiper"
            allowTouchMove={false} // 스와이프 기능 끄기
            slidesPerView={1}
            spaceBetween={20}
            onSlideChange={(index) => console.log(index)}
            scrollbar={{ draggable: true }}
          >
            <SwiperSlide>
              {({ isActive }) => (
                <div>Current slide is {isActive ? "active" : "not active"}</div>
              )}
              <Result1
                dnaInfoData={unknownResult}
                dnaMaxCountInfo={maxPercentageItems}
                userInfo={userInfo.displayName}
                topDNAType={rankedArray[0].dna_type}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Result2
                dnaInfoData={rankedArray}
                userInfo={userInfo.displayName}
                topDNAType={rankedArray[0].dna_type}
                videoDataByChannel={videoDataByChannel}
              />
            </SwiperSlide>
            {/* videoDataByChannel 추가 후 채널 모달 창으로 채널 ID 기준 영상 데이터 모달 창으로 넘기기 */}
            <SwiperSlide>
              <Result3
                setModalOpen={setModalOpen}
                likedVideos={addCountLikedVideos}
                userInfo={userInfo.displayName}
                topDNAType={rankedArray[0].dna_type}
                subsData={subsData}
                videoDataByChannel={videoDataByChannel}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Result4
                setModalOpen={setModalOpen}
                likedVideos={data}
                userInfo={userInfo.displayName}
                topDNAType={rankedArray[0].dna_type}
                subsData={subsData}
                videoDataByChannel={videoDataByChannel}
              />
            </SwiperSlide>
          </Swiper>
        </>
      );
    }
  }, [
    rankedArray,
    unknownResult,
    userInfo.displayName,
    videoDataByChannel,
    addCountLikedVideos,
    subsData,
    data,
  ]);
  const handleButtonClick = useCallback(() => {
    navigate("/find", { state: location.state });
  }, [location.state, navigate]);

  return (
    <Container>
      <NavBar />
      <HandleSetting />
      <ResultButton onClick={handleButtonClick}>
        나와 유사한 크리에이터 발견하기
      </ResultButton>
    </Container>
  );
};

export default ResultPage;

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1faff;
`;

const SubTitle = styled.div`
  color: #3c95ff;
  text-align: center;
  font-family: Pretendard;
  font-size: ${(props) => (props.type === "rank" ? "16px" : "18px")};
  font-style: normal;
  font-weight: ${(props) => (props.type === "rank" ? "800" : "400")};
  line-height: "20px"; /* 142.857% */
  letter-spacing: -0.28px;
  margin-top: ${(props) => (props.type === "rank" ? "0px" : "100px")};
  margin-bottom: ${(props) => (props.type === "rank" ? "4px" : "20px")};
`;

const Title = styled.div`
  color: #3c95ff;
  text-align: center;
  font-family: Pretendard;
  font-size: ${(props) => (props.region === "en" ? "18px" : "24px")};
  font-style: normal;
  font-weight: 800;
  line-height: 24px; /* 100% */
  letter-spacing: -0.48px;
  margin-bottom: 8px;
`;

const ResultButton = styled.div`
  display: flex;
  width: 312px;
  height: 52px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #3c95ff;
  color: white;
  margin-bottom: 12px;
`;

const Wrap = styled.div`
  width: 95%;
  height: 95%;
`;
