import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import NavBar from "../../components/NavBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import FindChannelCategory from "./FindChannelCategory";
import "./FindPage.css";
const FindPage = () => {
  const location = useLocation();
  console.log(location.state);

  console.log(location.state.unknownResult.found_dnas);

  // 데이터 배열을 순회하면서 채널 ID를 기준으로 비디오 데이터를 모읍니다.
  const resultUnknownResult = [];
  location.state.unknownResult.found_dnas.forEach((item) => {
    console.log(item.found_videos);
    const result = [];
    item.found_videos.forEach((item) => {
      const channel = item.channel;
      const video = item.video;
      // 결과 배열에서 채널 정보가 같은 항목 찾기
      if (channel.region === "KR") {
        const existingChannel = result.find(
          (entry) => entry.channel.id === channel.id
        );
        // 찾은 경우 비디오를 해당 채널의 videos 배열에 추가, 없으면 새로운 채널 생성
        if (existingChannel) {
          existingChannel.videos.push(video);
        } else {
          result.push({ channel, videos: [video] });
        }
      }
    });
    console.log(result);
    resultUnknownResult.push({ dna_type: item.dna_type, found_videos: result });
  });
  console.log(resultUnknownResult);

  // const foundVideoChannelByData =
  //   location.state.unknownResult.found_dnas.reduce((acc, item, index) => {
  //     const dna_type = item.dna_type;
  //     item.found_videos.forEach((videoInfo) => {
  //       const channelData = videoInfo.channel;
  //       const videoData = videoInfo.video;
  //       // 이미 같은 채널 ID로 묶인 경우 해당 배열에 추가, 아니면 새로운 배열 생성
  //       const existingIndex = acc.findIndex(
  //         (entry) => entry.id === channelData.id
  //       );
  //       if (existingIndex !== -1) {
  //         acc[existingIndex].videos.push(videoData);
  //       } else {
  //         acc.push({ dna_type, channel: channelData, videos: [videoData] });
  //       }
  //     });
  //     return acc;
  //   }, []);
  // console.log(foundVideoChannelByData);

  // 영상 카테고리 비중
  for (let i = 0; i < resultUnknownResult.length; i++) {
    if (resultUnknownResult[i].found_videos !== null) {
      resultUnknownResult[i].found_videos.forEach((item) => {
        item["users"] = [];
        let count = 0;
        item.videos.forEach((video) => {
          if (video.detail_category === resultUnknownResult[i].dna_type) {
            count++;
          }
          if (video.is_hot === false) {
            item["users"].push(video);
          }
        });
        const totalItems = item.videos.length;
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
    }
  }
  console.log(resultUnknownResult);
  // 데이터를 분류
  for (let i = 0; i < resultUnknownResult.length; i++) {
    if (resultUnknownResult[i].found_videos !== null) {
      resultUnknownResult[i]["a"] = [];
      resultUnknownResult[i]["b"] = [];
      resultUnknownResult[i]["c"] = [];
      resultUnknownResult[i]["d"] = [];
      resultUnknownResult[i]["user"] = [];
      resultUnknownResult[i].found_videos.forEach((item) => {
        if (item.users.length !== 0) {
          resultUnknownResult[i]["user"].push(item);
        } else {
          if (
            item.channel.sub_count >= 10000 &&
            item.channel.sub_count < 50000
          ) {
            resultUnknownResult[i]["a"].push(item);
          } else if (
            item.channel.sub_count >= 50000 &&
            item.channel.sub_count < 100000
          ) {
            resultUnknownResult[i]["b"].push(item);
          } else if (
            item.channel.sub_count >= 100000 &&
            item.channel.sub_count <= 500000
          ) {
            resultUnknownResult[i]["c"].push(item);
          } else {
            resultUnknownResult[i]["d"].push(item);
          }
        }
      });
    }
  }
  console.log(resultUnknownResult);
  const customSortVideo = useCallback((a, b) => {
    // hotTime을 날짜로 변환하여 비교
    const dateA = new Date(a.hot_time);
    const dateB = new Date(b.hot_time);
    // 날짜를 비교하여 최신순으로 정렬
    return dateB - dateA;
  }, []);
  const usersCustomSortVideo = useCallback((a, b) => {
    const dateA = new Date(a.upload_date);
    const dateB = new Date(a.upload_date);
    return dateB - dateA;
  }, []);
  const customSort = useCallback(
    (a, b) => {
      if (a.findPriority === b.findPriority) {
        if (a.detailCategoryRate === b.detailCategoryRate) {
          if (b.detailCategoryCount === a.detailCategoryCount) {
            b.videos.sort(customSortVideo);
            a.videos.sort(customSortVideo);
            const hotTimeA = new Date(a.videos[0].hot_time);
            const hotTimeB = new Date(b.videos[0].hot_time);
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

  const userCustomSort = useCallback(
    (a, b) => {
      a.users.sort(usersCustomSortVideo);
      b.users.sort(usersCustomSortVideo);
      const uploadDateA = new Date(a.users[0].upload_date);
      const uploadDateB = new Date(b.users[0].upload_date);
      return uploadDateB - uploadDateA;
    },
    [usersCustomSortVideo]
  );

  for (let i = 0; i < resultUnknownResult.length; i++) {
    if (resultUnknownResult[i].channelList !== null) {
      if (resultUnknownResult[i]["a"].length !== 0) {
        resultUnknownResult[i]["a"].sort(customSort);
      }
      if (resultUnknownResult[i]["b"].length !== 0) {
        resultUnknownResult[i]["b"].sort(customSort);
      }
      if (resultUnknownResult[i]["c"].length !== 0) {
        resultUnknownResult[i]["c"].sort(customSort);
      }
      if (resultUnknownResult[i]["d"].length !== 0) {
        resultUnknownResult[i]["d"].sort(customSort);
      }
      if (resultUnknownResult[i]["user"].length !== 0) {
        resultUnknownResult[i]["user"].sort(userCustomSort);
      }
    }
  }
  console.log(resultUnknownResult);
  // 2. 유저 성향에 해당하는 영상이 많은 채널에 발견 우선순위 부여
  // 3. 또는 채널 별 전체 인기 영상 중 해당 카테고리 영상의 비중이 높은 순으로 채널 정렬
  // 3. 채널 비중이 같은 경우 영상 갯수가 많은 순으로 정렬
  // 4. 같은 구독자 수 섹션(ex, +50만)에 최우선순위 발견 채널 후보군(ex, 유저 성향에 해당하는 영상 2개)이 여러개일 경우
  // 해당 영상 최신 순으로 채널 발견
  // 5. 영상 인기 급상승 날짜까지 같은 경우 전일 대비 성장률(구독자 수 + 조회수 증감율)이 우수한 채널 발견
  return (
    <Container>
      <NavBar back={true} />
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
        modules={[Navigation]}
        className="mySwiper"
        allowTouchMove={false} // 스와이프 기능 끄기
        slidesPerView={1}
        spaceBetween={20}
      >
        {resultUnknownResult.slice(0, 4).map((data, index) => (
          <SwiperSlide>
            <FindChannelCategory unknown={data} key={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default FindPage;

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
