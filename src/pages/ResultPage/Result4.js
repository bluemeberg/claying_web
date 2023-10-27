import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import { youtubeDataAPIInstacne, youtubeGeneralAPI } from "../../api/axios";
import SubsChannelBox from "../../components/ChannelBox/SubsChannelBox";
import category from "../../utils/category_compare.json";

// 구독 영상 중 좋아하는 영상 갯수 TOP3
// 미구독 영상 중 좋아하는 영상 갯수 TOP3
// 영상 갯수가 겹칠 경우 영상 업로드 날짜 최신 순으로 채널을 표출한다.
// 좋아요 누른 시점은 모르지만 업로드 날짜가 최신이라는 것은 확률적으로 가까운 시일에 좋아요를 눌렀다는 의미

const Result4 = (props) => {
  console.log(props);
  const [subsData, setSubsData] = useState();
  const [nonSubsData, setNonSubsData] = useState();
  const handleVideoChannelDataSort = useCallback(() => {
    const trueSubs = props.videoDataByChannel.filter(
      (item) => item.subs === true
    );
    const falseSubs = props.videoDataByChannel.filter(
      (item) => item.subs === false
    );

    // 배열을 정렬하는 비교 함수
    function compareByUploadDate(a, b) {
      // uploadDate를 Date 객체로 변환하여 비교
      const dateA = new Date(a.uploadDate);
      const dateB = new Date(b.uploadDate);
      return dateB - dateA; // 내림차순 정렬
    }

    // 미구독 채널들 분류
    // videoID 배열의 길이가 같은 요소들을 그룹화
    const groupedFalseSubs = falseSubs.reduce((groups, item) => {
      const key = item.videos.length.toString(); // videoID 갯수를 그룹화 키로 사용
      groups[key] = groups[key] || []; // 그룹이 없으면 생성
      groups[key].push(item);
      return groups;
    }, {});
    console.log(groupedFalseSubs);

    // 그룹별로 uploadDate를 기준으로 정렬
    for (const key in groupedFalseSubs) {
      if (groupedFalseSubs.hasOwnProperty(key)) {
        groupedFalseSubs[key].sort(compareByUploadDate);
        groupedFalseSubs[key].sort((a, b) => {
          // 가장 최신 video의 uploadDate를 비교
          const latestDateA = new Date(a.videos[0].upload_date);
          const latestDateB = new Date(b.videos[0].upload_date);
          return latestDateB - latestDateA; // 내림차순 정렬
        });
      }
    }
    // 정렬된 데이터를 합침
    const sortedFalseData = Object.values(groupedFalseSubs).flat();
    console.log(sortedFalseData);
    // 배열을 videoID 갯수가 많은 순으로 정렬
    sortedFalseData.sort((a, b) => b.videos.length - a.videos.length);
    // 결과 확인
    console.log(sortedFalseData);

    // 구독
    // //  정렬된 채널 정보 추가
    // const mergedTop3FalseData = sortedFalseData.reduce((acc, curr) => {
    //   console.log(curr);
    //   // videoID 키 이름을 videoIDs로 변경
    //   const newObj = {
    //     ...curr, // 기존 객체를 복사
    //     videoIDs: curr.videoID, // videoID를 videoIDs로 복사
    //   };
    //   console.log(newObj);
    //   const subsDataItem = props.likedVideos.find(
    //     (item) => item.channelID === newObj.channelID
    //   );
    //   console.log(subsDataItem);
    //   if (subsDataItem) {
    //     acc.push({ ...newObj, ...subsDataItem });
    //     console.log(acc);
    //   }
    //   return acc;
    // }, []);
    // console.log(mergedTop3FalseData);
    setNonSubsData(sortedFalseData);

    //  구독 채널 분류
    // videoID 배열의 길이가 같은 요소들을 그룹화
    const groupedTrueSubs = trueSubs.reduce((groups, item) => {
      const key = item.videos.length.toString(); // videoID 갯수를 그룹화 키로 사용
      groups[key] = groups[key] || []; // 그룹이 없으면 생성
      groups[key].push(item);
      return groups;
    }, {});
    console.log(groupedTrueSubs);
    // 그룹별로 uploadDate를 기준으로 정렬
    for (const key in groupedTrueSubs) {
      if (groupedTrueSubs.hasOwnProperty(key)) {
        groupedTrueSubs[key].sort(compareByUploadDate);
        groupedTrueSubs[key].sort((a, b) => {
          // 가장 최신 video의 uploadDate를 비교
          const latestDateA = new Date(a.videos[0].upload_date);
          const latestDateB = new Date(b.videos[0].upload_date);
          return latestDateB - latestDateA; // 내림차순 정렬
        });
      }
    }
    // 정렬된 데이터를 합침
    const sortedTrueData = Object.values(groupedTrueSubs).flat();
    console.log(sortedTrueData);
    // 배열을 videoID 갯수가 많은 순으로 정렬
    sortedTrueData.sort((a, b) => b.videos.length - a.videos.length);
    // 결과 확인
    console.log(sortedTrueData);
    // 231023 to do
    // 여기서 props.subsData 배열에서 sortedTrueData 상위 3개의 구독 데이터에 맞는 채널들을 타겟에서 subsData를 가져온다.
    sortedTrueData.forEach((channel) => {
      const matchedSubsData = props.subsData.find(
        (subsData) => subsData.channelID === channel.channel.id
      );
      if (matchedSubsData) {
        channel.channel["subsDate"] = matchedSubsData.subsDate;
      }
    });
    console.log(sortedTrueData);
    // const mergedTop3TrueData = sortedTrueData.reduce((acc, curr) => {
    //   console.log(curr);
    //   const subsDataItem = props.subsData.find(
    //     (item) => item.channelID === curr.channelID
    //   );
    //   console.log(subsDataItem);
    //   if (subsDataItem) {
    //     acc.push({ ...curr, ...subsDataItem });
    //     console.log(acc);
    //   }
    //   return acc;
    // }, []);
    // console.log(mergedTop3TrueData);
    setSubsData(sortedTrueData);
  }, [props.videoDataByChannel]);

  useEffect(() => {
    handleVideoChannelDataSort();
  }, []);

  console.log(subsData);
  console.log(nonSubsData);
  return (
    <Container>
      <SubTitle>{props.userInfo}님이 크리에이터가 된다면 </SubTitle>
      <SubTitle type="rank">1st</SubTitle>
      {/* <Title region="en">{props.topDNAType}</Title> */}
      <Title>{category[props.topDNAType]}</Title>
      <LikedTitle>내가 좋아요한 채널 TOP6</LikedTitle>
      <SubsContainer>
        {subsData !== undefined &&
          subsData
            .slice(0, 3)
            .map((data, index) => (
              <SubsChannelBox
                key={index}
                subsData={data}
                setModalOpen={props.setModalOpen}
                videoDataByChannel={props.videoDataByChannel}
                topDNAType={props.topDNAType}
                subsDuring="true"
                number={4}
              />
            ))}
        {subsData !== undefined &&
          nonSubsData
            .slice(0, 3)
            .map((data, index) => (
              <SubsChannelBox
                key={index}
                subsData={data}
                setModalOpen={props.setModalOpen}
                videoDataByChannel={props.videoDataByChannel}
                topDNAType={props.topDNAType}
                number={4}
              />
            ))}
      </SubsContainer>
    </Container>
  );
};

export default Result4;

const Container = styled.div`
  position: relative;
  min-height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1faff;
  overflow-y: scroll;
`;

const LikedTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 12px; /* 100% */
  letter-spacing: -0.24px;
  margin-top: 40px;
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
  margin-top: ${(props) => (props.type === "rank" ? "0px" : "80px")};
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

const SubsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  margin-bottom: 40px;
`;
