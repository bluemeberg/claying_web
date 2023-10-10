import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

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
const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  const dnaTypes = location.state.dnaTypeCollections.map((item) => ({
    ...item,
    category: categoryReal[item.dnatype],
  }));
  console.log(dnaTypes);
  console.log(window.scrollY);
  // 전체 dnacount 총합 계산
  const totalCount = dnaTypes.reduce((sum, item) => sum + item.dnacount, 0);

  // 각 객체에 dnacount 비중(%) 추가
  const dataArrayWithPercentage = dnaTypes.map((item) => ({
    ...item,
    percentage: ((item.dnacount / totalCount) * 100).toFixed(1),
  }));
  console.log(dataArrayWithPercentage);
  let currentRank = 0;
  let currentRankCount = 1;

  // 순위 정보 추가
  const rankedArray = dataArrayWithPercentage.map((item, index) => {
    if (
      index > 0 &&
      item.dnacount === dataArrayWithPercentage[index - 1].dnacount
    ) {
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
  let addCountLikedVideos = location.state.videoData.map((data) => {
    data.channelCount = 1;
    return data;
  });
  console.log(addCountLikedVideos);

  let sortLikedVideos = addCountLikedVideos.reduce((result, item) => {
    if (item.channelID) {
      const existingItem = result.find((x) => x.channelID === item.channelID);
      if (existingItem) {
        existingItem.channelCount += item.channelCount;
      } else {
        result.push({
          channelID: item.channelID,
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
  const handleYoutubeChannelData = useCallback(async () => {
    const updateAddCountLikedVideos = await Promise.all(
      addCountLikedVideos.map(async (channel) => {
        const response = await youtubeDataAPIInstacne.get("/channels", {
          params: {
            id: channel.channelID,
            part: "snippet, brandingSettings,statistics",
            key: youtubeGeneralAPI,
          },
        });
        console.log(response.data);
        const channelThumbnail =
          response.data.items[0].snippet.thumbnails.default;
        const subsCount = response.data.items[0].statistics.subscriberCount;
        const videoCount = response.data.items[0].statistics.videoCount;
        const viewCount = response.data.items[0].statistics.viewCount;
        let channelDescription = "";
        if (response.data.items[0].snippet.description !== undefined) {
          channelDescription = response.data.items[0].snippet.description;
        }
        if (response.data.items[0].brandingSettings.image !== undefined) {
          const channelBanner =
            response.data.items[0].brandingSettings.image.bannerExternalUrl;
          console.log(channelBanner);
          return {
            ...channel,
            channelThumbnail,
            channelBanner,
            subsCount,
            videoCount,
            viewCount,
            channelDescription,
          };
        }
        return {
          ...channel,
          channelThumbnail,
          subsCount,
          videoCount,
          viewCount,
          channelDescription,
        };
      })
    );
    console.log(updateAddCountLikedVideos);
    setChannelData(updateAddCountLikedVideos);
  }, [addCountLikedVideos]);
  console.log(data);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    handleYoutubeChannelData();
  }, []);
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
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          <SwiperSlide>
            <Result1
              dnaInfoData={location.state.unknownResult}
              dnaMaxCountInfo={maxPercentageItems}
              userInfo={userInfo.displayName}
              topDNAType={rankedArray[0].dnatype}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Result2
              dnaInfoData={rankedArray}
              userInfo={userInfo.displayName}
              topDNAType={rankedArray[0].dnatype}
            />
          </SwiperSlide>
          {/* videoDataByChannel 추가 후 채널 모달 창으로 채널 ID 기준 영상 데이터 모달 창으로 넘기기 */}
          <SwiperSlide>
            <Result3
              setModalOpen={setModalOpen}
              likedVideos={data}
              userInfo={userInfo.displayName}
              topDNAType={rankedArray[0].dnatype}
              subsData={location.state.subsData}
              videoDataByChannel={location.state.videoDataByChannel}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Result4
              setModalOpen={setModalOpen}
              likedVideos={data}
              userInfo={userInfo.displayName}
              topDNAType={rankedArray[0].dnatype}
              subsData={location.state.subsData}
              videoDataByChannel={location.state.videoDataByChannel}
            />
          </SwiperSlide>
        </Swiper>
      );
    } else {
      // 복수개 최상위 비중 dnaTitle 발생 시 result1 페이지를 복수개로 slide 생성시키고,
      //  상세 결과 확인하기 버튼 depth 추가를 통해 상세 결과 페이지로 이동시키기
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {maxPercentageItems.map((item, index) => (
          <SwiperSlide key={index}>
            <Result1 />
          </SwiperSlide>
        ))}
        <SwiperSlide>Slide 2</SwiperSlide>
      </Swiper>;
    }
  }, [
    data,
    location.state.subsData,
    location.state.unknownResult,
    location.state.videoDataByChannel,
    rankedArray,
    userInfo.displayName,
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
  position: fixed;
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
