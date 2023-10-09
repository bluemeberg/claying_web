import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import NavBar from "../../components/NavBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import FindChannelCategory from "./FindChannelCategory";

const FindPage = () => {
  const location = useLocation();
  console.log(location.state);

  console.log(location.state.unknownResult.unknown);

  // 영상 카테고리 비중
  for (let i = 0; i < location.state.unknownResult.unknown.length; i++) {
    if (location.state.unknownResult.unknown[i].channelList !== null) {
      location.state.unknownResult.unknown[i].channelList.forEach((item) => {
        let count = 0;
        item.videoList.forEach((video) => {
          if (video.detailCategory === "News & Politics") {
            video.detailCategory = "News/Politics";
          } else if (
            video.detailCategory === "Sports Highlights" ||
            video.detailCategory === "Sports Event Reviews" ||
            video.detailCategory === "Sports Interviews and Inside Stories" ||
            video.detailCategory === "Sports News and Analysis"
          ) {
            video.detailCategory = "Sports";
          }
          if (
            video.detailCategory ===
            location.state.unknownResult.unknown[i].detailCategory
          ) {
            count++;
          }
          const totalItems = item.videoList.length;
          const percentage = (count / totalItems) * 100;
          item["detailCategoryRate"] = percentage;
          item["detailCategoryCount"] = totalItems;
          if (totalItems >= 2 && percentage === 100) {
            item["findPriority"] = 1;
          } else if (totalItems >= 2 && percentage > 50 && percentage < 100) {
            item["findPriority"] = 2;
          } else if (totalItems === 1) {
            item["findPriority"] = 3;
          } else if (totalItems >= 2 && percentage <= 50) {
            item["findPriority"] = 4;
          } else {
            item["findPriority"] = null;
          }
        });
      });
    }
  }
  console.log(location.state.unknownResult.unknown);
  // 데이터를 분류
  for (let i = 0; i < location.state.unknownResult.unknown.length; i++) {
    if (location.state.unknownResult.unknown[i].channelList !== null) {
      location.state.unknownResult.unknown[i]["a"] = [];
      location.state.unknownResult.unknown[i]["b"] = [];
      location.state.unknownResult.unknown[i]["c"] = [];
      location.state.unknownResult.unknown[i]["d"] = [];
      location.state.unknownResult.unknown[i].channelList.forEach((item) => {
        if (
          item.channelSubscribeCount >= 10000 &&
          item.channelSubscribeCount < 50000
        ) {
          location.state.unknownResult.unknown[i]["a"].push(item);
        } else if (
          item.channelSubscribeCount >= 50000 &&
          item.channelSubscribeCount < 100000
        ) {
          location.state.unknownResult.unknown[i]["b"].push(item);
        } else if (
          item.channelSubscribeCount >= 100000 &&
          item.channelSubscribeCount <= 500000
        ) {
          location.state.unknownResult.unknown[i]["c"].push(item);
        } else {
          location.state.unknownResult.unknown[i]["d"].push(item);
        }
      });
    }
  }
  console.log(location.state.unknownResult.unknown);
  const customSortVideo = useCallback((a, b) => {
    // hotTime을 날짜로 변환하여 비교
    const dateA = new Date(a.hotTime);
    const dateB = new Date(b.hotTime);

    // 날짜를 비교하여 최신순으로 정렬
    return dateB - dateA;
  }, []);
  const customSort = useCallback(
    (a, b) => {
      if (a.findPriority === b.findPriority) {
        if (a.detailCategoryRate === b.detailCategoryRate) {
          if (b.detailCategoryCount === a.detailCategoryCount) {
            b.videoList.sort(customSortVideo);
            a.videoList.sort(customSortVideo);
            const hotTimeA = new Date(a.videoList[0].hotTime);
            const hotTimeB = new Date(b.videoList[0].hotTime);
            return hotTimeB - hotTimeA;
          }
          return b.detailCategoryCount - a.detailCategoryCount;
        }
        // 만약 findPriority 값이 같으면 detailCategoryCount 값을 비교하여 내림차순으로 정렬
        return b.detailCategoryRate - a.detailCategoryRate;
      } else {
        // findPriority 값이 다르면 findPriority 값으로 정렬
        return a.findPriority - b.findPriority;
      }
    },
    [customSortVideo]
  );

  for (let i = 0; i < location.state.unknownResult.unknown.length; i++) {
    if (location.state.unknownResult.unknown[i].channelList !== null) {
      if (location.state.unknownResult.unknown[i]["a"].length !== 0) {
        location.state.unknownResult.unknown[i]["a"].sort(customSort);
      }
      if (location.state.unknownResult.unknown[i]["b"].length !== 0) {
        location.state.unknownResult.unknown[i]["b"].sort(customSort);
      }
      if (location.state.unknownResult.unknown[i]["c"].length !== 0) {
        location.state.unknownResult.unknown[i]["c"].sort(customSort);
      }
      if (location.state.unknownResult.unknown[i]["d"].length !== 0) {
        location.state.unknownResult.unknown[i]["d"].sort(customSort);
      }
    }
  }
  console.log(location.state.unknownResult.unknown);

  // 2. 유저 성향에 해당하는 영상이 많은 채널에 발견 우선순위 부여
  // 3. 또는 채널 별 전체 인기 영상 중 해당 카테고리 영상의 비중이 높은 순으로 채널 정렬
  // 3. 채널 비중이 같은 경우 영상 갯수가 많은 순으로 정렬
  // 4. 같은 구독자 수 섹션(ex, +50만)에 최우선순위 발견 채널 후보군(ex, 유저 성향에 해당하는 영상 2개)이 여러개일 경우
  // 해당 영상 최신 순으로 채널 발견
  // 5. 영상 인기 급상승 날짜까지 같은 경우 전일 대비 성장률(구독자 수 + 조회수 증감율)이 우수한 채널 발견
  return (
    <Container>
      <NavBar back={true} />
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {location.state.unknownResult.unknown.slice(0, 4).map((data, index) => (
          <SwiperSlide>
            <FindChannelCategory unknown={data} key={index} />
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <div></div>
        </SwiperSlide>
      </Swiper>
      <GoToAppButton>앱 다운받고 8개 채널 더 발견하기</GoToAppButton>
    </Container>
  );
};

export default FindPage;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 calc(3.5vw + 5px);
  background-color: #f1faff;
`;

const GoToAppButton = styled.div`
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
