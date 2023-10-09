import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  serverInstance,
  youtubeDataAPIInstacne,
  youtubeOauthAPI,
} from "../api/axios";

export const useYoutubeAnalysisData = (accessToken, email) => {
  const [subsData, setSubsData] = useState([]);
  const [subsChannels, setSubsChannels] = useState([]);
  // 좋아하는 긴 영상 데이터 모음
  const [longLikedVideoData, setLongLikedVideoData] = useState([]);
  // 좋아하는 쇼츠 데이터 모음
  const [shortLikedVideoData, setShortLikedVideoData] = useState([]);
  // gpt 분석 결과
  const [progressData, setProgressData] = useState([]);
  // 분석 진행 현황 체크 (영상, 채널 정보 포함)
  const [progressValue, setProgressValue] = useState(0);
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoAnalysisCount, setVideoAnalysisCount] = useState(0);
  const [videoDNA, setVideoDNA] = useState("");
  const [channelThumbnail, setChannelThumbnail] = useState("");
  const [channelTitle, setChannelTitle] = useState("");
  const [channelSubsDate, setChannelSubsDate] = useState("");
  const [dnaTypeCollections, setDnaTypeCollections] = useState([]);
  const [totalAnalysistResult, setTotalAnalysistResult] = useState([]);
  const navigate = useNavigate();
  const handleYoutubeSubsData = useCallback(async () => {
    // 채널 설명이 존재하는 구독 채널 정보(채널ID 포함)
    let userSubsData = [];
    // 구독 채널 ID만 존재
    let userSubsChannels = [];
    try {
      const resultSubs = await youtubeDataAPIInstacne.get("/subscriptions", {
        params: {
          key: youtubeOauthAPI,
          part: "snippet, contentDetails",
          //   order: "unread",
          mine: true,
          maxResults: 50,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      let nextSubsPageToken = resultSubs.data.nextPageToken;
      console.log(nextSubsPageToken);
      console.log("subs", resultSubs.data);
      // channelID, channelThumbnail

      for (let i = 0; i < resultSubs.data.items.length; i++) {
        // channelID, channelThumbnail, channelTitle, channelSubscribers, subsDuration, channelDescription
        let channelID = resultSubs.data.items[i].snippet.resourceId.channelId;
        userSubsChannels = [...userSubsChannels, channelID];
        // 채널 설명 존재 여부 확인
        if (resultSubs.data.items[i].snippet.description !== "") {
          let channelID = resultSubs.data.items[i].snippet.resourceId.channelId;
          let channelDescription = resultSubs.data.items[i].snippet.description;
          let channelTitle = resultSubs.data.items[i].snippet.title;
          let channelThumbnail =
            resultSubs.data.items[i].snippet.thumbnails.default.url;
          let subsDate = resultSubs.data.items[i].snippet.publishedAt;
          userSubsData = [
            ...userSubsData,
            {
              channelID: channelID,
              channelDescription: channelDescription,
              channelTitle: channelTitle,
              channelThumbnail: channelThumbnail,
              subsDate: subsDate,
            },
          ];
        }
        // 구독자 수는 channels api가 필요
        // let channelSubscribers =
      }
      if (nextSubsPageToken !== undefined) {
        while (true) {
          const resultSubs = await youtubeDataAPIInstacne.get(
            "/subscriptions",
            {
              params: {
                key: youtubeOauthAPI,
                part: "snippet, contentDetails",
                mine: true,
                maxResults: 50,
                pageToken: nextSubsPageToken,
                // order: "unread",
              },
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          nextSubsPageToken = resultSubs.data.nextPageToken;
          for (let i = 0; i < resultSubs.data.items.length; i++) {
            // channelID, channelThumbnail, channelTitle, channelSubscribers, subsDuration
            let channelID =
              resultSubs.data.items[i].snippet.resourceId.channelId;
            userSubsChannels = [...userSubsChannels, channelID];

            if (resultSubs.data.items[i].snippet.description !== "") {
              let channelID =
                resultSubs.data.items[i].snippet.resourceId.channelId;
              let channelDescription =
                resultSubs.data.items[i].snippet.description;
              let channelTitle = resultSubs.data.items[i].snippet.title;
              let channelThumbnail =
                resultSubs.data.items[i].snippet.thumbnails.default.url;
              let subsDuration = resultSubs.data.items[i].snippet.publishedAt;
              userSubsData = [
                ...userSubsData,
                {
                  channelID: channelID,
                  channelDescription: channelDescription,
                  channelTitle: channelTitle,
                  channelThumbnail: channelThumbnail,
                  subsDuration: subsDuration,
                },
              ];
            }
          }
          console.log(resultSubs.data);
          if (!resultSubs.data.nextPageToken) {
            break;
          }
        }
      }
      console.log(userSubsData);
      console.log(userSubsChannels);
      setSubsData(userSubsData);
      return { userSubsData: userSubsData, userSubsChannels: userSubsChannels };
      // setSubsChannels(userSubsChannels);
    } catch (e) {
      console.log(e);
    }
  }, [accessToken]);

  const handleYoutubeLikedVideo = useCallback(async () => {
    let allVideos = [];
    let allDNAData = [];
    let shortVideos = [];
    let allShortDNAData = [];
    try {
      const result = await youtubeDataAPIInstacne.get("/videos", {
        params: {
          key: youtubeOauthAPI,
          part: "snippet, statistics, status,contentDetails",
          myRating: "like",
          maxResults: 50,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      for (let i = 0; i < result.data.items.length; i++) {
        console.log(result.data.items[i].snippet.categoryId);
        if (result.data.items[i].snippet.categoryId !== "10") {
          if (result.data.items[i].snippet.tags != null) {
            // To do list
            // 1. 영상 길이를 통해 쇼츠 영상 구분
            console.log("hi zoo");
            console.log(
              result.data.items[i].contentDetails.duration.includes("M")
            );
            if (
              (result.data.items[i].contentDetails.duration.includes("M") ===
                true ||
                result.data.items[i].contentDetails.duration.includes("H") ===
                  true) &&
              result.data.items[i].contentDetails.duration.includes("PT1M") ===
                false
            ) {
              console.log("hi zoo non filtering");
              allVideos = [...allVideos, result.data.items[i]];
              const tags = result.data.items[i].snippet.tags.slice(0, 10);
              let data = {
                agentId: email,
                videoID: result.data.items[i].id,
                videoTitle: result.data.items[i].snippet.title,
                videoThumbnail:
                  result.data.items[i].snippet.thumbnails.medium.url,
                videoDuration: result.data.items[i].contentDetails.duration,
                uploadDate: result.data.items[i].snippet.publishedAt,
                categoryID: result.data.items[i].snippet.categoryId,
                channelID: result.data.items[i].snippet.channelId,
                channelTitle: result.data.items[i].snippet.channelTitle,
                description: result.data.items[i].snippet.description,
                videoTags: tags,
                viewCount: result.data.items[i].statistics.viewCount,
                likeCount: result.data.items[i].statistics.likeCount,
                commentCount: result.data.items[i].statistics.commentCount,
              };
              allDNAData = [...allDNAData, data];
            } else {
              console.log("hi zoo filtering");
              shortVideos = [...shortVideos, result.data.items[i]];
              const tags = result.data.items[i].snippet.tags.slice(0, 10);
              let data = {
                agentId: email,
                videoID: result.data.items[i].id,
                videoTitle: result.data.items[i].snippet.title,
                videoThumbnail:
                  result.data.items[i].snippet.thumbnails.medium.url,
                videoDuration: result.data.items[i].contentDetails.duration,
                uploadDate: result.data.items[i].snippet.publishedAt,
                categoryID: result.data.items[i].snippet.categoryId,
                channelID: result.data.items[i].snippet.channelId,
                channelTitle: result.data.items[i].snippet.channelTitle,
                description: result.data.items[i].snippet.description,
                videoTags: tags,
                viewCount: result.data.items[i].statistics.viewCount,
                likeCount: result.data.items[i].statistics.likeCount,
                commentCount: result.data.items[i].statistics.commentCount,
              };
              allShortDNAData = [...allShortDNAData, data];
            }
          }
        }
      }
      // allVideos = [...allVideos, result.data.items];
      let nextPageToken = result.data.nextPageToken;
      console.log(nextPageToken);
      let cnt = 0;
      if (nextPageToken !== undefined) {
        while (true) {
          const result = await youtubeDataAPIInstacne.get("/videos", {
            params: {
              key: youtubeOauthAPI,
              part: "snippet, statistics, status,contentDetails",
              myRating: "like",
              maxResults: 50,
              pageToken: nextPageToken,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          for (let i = 0; i < result.data.items.length; i++) {
            if (result.data.items[i].snippet.categoryId !== "10") {
              if (result.data.items[i].snippet.tags != null) {
                // To do list
                // 1. 영상 길이를 통해 쇼츠 영상 구분
                console.log("hi zoo");
                console.log(
                  result.data.items[i].contentDetails.duration.includes("M")
                );
                if (
                  (result.data.items[i].contentDetails.duration.includes(
                    "M"
                  ) === true ||
                    result.data.items[i].contentDetails.duration.includes(
                      "H"
                    ) === true) &&
                  result.data.items[i].contentDetails.duration.includes(
                    "PT1M"
                  ) === false
                ) {
                  console.log("hi zoo non filtering");
                  allVideos = [...allVideos, result.data.items[i]];
                  const tags = result.data.items[i].snippet.tags.slice(0, 10);
                  let data = {
                    agentId: email,
                    videoID: result.data.items[i].id,
                    videoTitle: result.data.items[i].snippet.title,
                    videoThumbnail:
                      result.data.items[i].snippet.thumbnails.medium.url,
                    videoDuration: result.data.items[i].contentDetails.duration,
                    uploadDate: result.data.items[i].snippet.publishedAt,
                    categoryID: result.data.items[i].snippet.categoryId,
                    channelID: result.data.items[i].snippet.channelId,
                    channelTitle: result.data.items[i].snippet.channelTitle,
                    description: result.data.items[i].snippet.description,
                    videoTags: tags,
                    viewCount: result.data.items[i].statistics.viewCount,
                    likeCount: result.data.items[i].statistics.likeCount,
                    commentCount: result.data.items[i].statistics.commentCount,
                  };
                  allDNAData = [...allDNAData, data];
                } else {
                  console.log("hi zoo filtering");
                  shortVideos = [...shortVideos, result.data.items[i]];
                  const tags = result.data.items[i].snippet.tags.slice(0, 10);
                  let data = {
                    agentId: email,
                    videoID: result.data.items[i].id,
                    videoTitle: result.data.items[i].snippet.title,
                    videoThumbnail:
                      result.data.items[i].snippet.thumbnails.medium.url,
                    videoDuration: result.data.items[i].contentDetails.duration,
                    uploadDate: result.data.items[i].snippet.publishedAt,
                    categoryID: result.data.items[i].snippet.categoryId,
                    channelID: result.data.items[i].snippet.channelId,
                    channelTitle: result.data.items[i].snippet.channelTitle,
                    description: result.data.items[i].snippet.description,
                    videoTags: tags,
                    viewCount: result.data.items[i].statistics.viewCount,
                    likeCount: result.data.items[i].statistics.likeCount,
                    commentCount: result.data.items[i].statistics.commentCount,
                  };
                  allShortDNAData = [...allShortDNAData, data];
                }
              }
            }
          }
          console.log(result.data.nextPageToken);
          console.log(result.data.items);
          if (!result.data.nextPageToken) {
            break;
          } else if (allDNAData.length > 50) {
            // cnt 3 범위가 200개 영상
            break;
          }
          nextPageToken = result.data.nextPageToken;
          cnt += 1;
        }
      }
    } catch (e) {
      console.log(e);
    }
    setLongLikedVideoData(allDNAData);
    setShortLikedVideoData(allShortDNAData);
    return allDNAData;
  }, [accessToken, email]);

  // 영상 데이터 분석
  const handleLikedVideoProcessBatch = useCallback(
    async (videoData, batchSize) => {
      const batches = [];
      const numBatches = Math.ceil(videoData.length / batchSize);
      for (let i = 0; i < numBatches; i++) {
        const start = i * batchSize;
        const end = start + batchSize;
        const batch = videoData.slice(start, end);
        // const result = await fetchData(batch);
        const result = await serverInstance.post("/chatgpt/content/dna", {
          dnaData: batch,
        });
        batches.push(result.data);
        setVideoAnalysisCount((prevValue) => prevValue + 1);
        let a = (1 / videoData.length) * 100;
        setProgressValue((prevValue) => prevValue + a);
        setProgressData([...progressData, result.data]);
        setVideoThumbnail(videoData[i].videoThumbnail);
        setVideoTitle(videoData[i].videoTitle);
        setVideoDNA(result.data.dna[0].dnatype);
        console.log(videoData);
      }
      return batches;
    },
    [progressData]
  );

  // 채널 데이터 분석
  const handleSubsChannelProcessBatch = useCallback(
    async (channelData, batchSize) => {
      const batches = [];
      const numBatches = Math.ceil(channelData.length / batchSize);
      for (let i = 0; i < numBatches; i++) {
        const start = i * batchSize;
        const end = start + batchSize;
        const batch = channelData.slice(start, end);
        // const result = await fetchData(batch);
        const result = await serverInstance.post("/chatgpt/content/dna", {
          dnaData: batch,
        });
        batches.push(result.data);
        setProgressValue((prevValue) => i);
        setProgressData([...progressData, result.data]);
        setChannelThumbnail(channelData[i].channelThumbnail);
        setChannelTitle(channelData[i].channelTitle);
        setChannelSubsDate(channelData[i].subsDate);
        console.log(channelData);
      }
    },
    [progressData]
  );

  const handleResultTuning = useCallback(
    async (videoResult, subsResult, subsChannel) => {
      console.log(videoResult);
      // dna 분석 결과 모음
      let dnaTypeCollections = [];
      // 내가 좋아하는 채널 ID + 구독 채널 ID
      let userChannelIDs = [];
      // dna 종류 명 모음
      let dnaTypeNames = [];
      // 좋아하는 영상 분석 결과에서 튜닝하기
      for (let i = 0; i < videoResult.length; i++) {
        // 분석된 dna 모으기
        for (let j = 0; j < videoResult[i].dna.length; j++) {
          dnaTypeCollections = [...dnaTypeCollections, videoResult[i].dna[j]];
        }

        // 좋아요한 영상 정보에서 채널 정보 뽑아서 모으기
        for (let j = 0; j < videoResult[i].videoList.length; j++) {
          userChannelIDs = [
            ...userChannelIDs,
            videoResult[i].videoList[j].channelID,
          ];
        }

        // dnaType 별 누적 카운트 처리하기
        dnaTypeCollections = dnaTypeCollections.reduce((result, item) => {
          if (item.dnatype) {
            const existingItem = result.find((x) => x.dnatype === item.dnatype);
            if (existingItem) {
              existingItem.dnacount += item.dnacount;
            } else {
              result.push({
                dnatype: item.dnatype,
                dnacount: item.dnacount,
              });
            }
          }
          return result;
        }, []);

        // dnaType 별 카운트 누적 순으로 정렬하기
        dnaTypeCollections = dnaTypeCollections.sort(
          (a, b) => b.dnacount - a.dnacount
        );
      }
      console.log(dnaTypeCollections);
      setDnaTypeCollections(dnaTypeCollections);
      // const result = await handleYoutubeSubsData();
      console.log(subsChannel);
      // console.log(result);
      // 구독 채널도 추가하기
      for (let i = 0; i < subsChannel.length; i++) {
        userChannelIDs = [...userChannelIDs, subsChannel[i]];
      }
      console.log(userChannelIDs);
      let uniqueUserChannelIDs = new Set(userChannelIDs);
      uniqueUserChannelIDs = Array.from(uniqueUserChannelIDs);
      console.log(uniqueUserChannelIDs);
      for (let i = 0; i < dnaTypeCollections.length; i++) {
        dnaTypeNames = [...dnaTypeNames, dnaTypeCollections[i].dnatype];
      }
      console.log(dnaTypeNames);
      dnaTypeNames = dnaTypeNames.join(",");
      uniqueUserChannelIDs = uniqueUserChannelIDs.join(",");
      console.log(uniqueUserChannelIDs);
      console.log(dnaTypeNames);
      return {
        userChannelIDs: uniqueUserChannelIDs,
        dnaTypeNames: dnaTypeNames,
        dnaTypeCollections: dnaTypeCollections,
      };
    },
    []
  );

  // 언노운 채널 불러오기
  const handleGetUnknownChannelList = useCallback(
    async (channelIDList, DNATypeList) => {
      const result = await serverInstance.get("/chatgpt/unknown", {
        params: {
          DNATypeList,
          channelIDList,
        },
      });
      console.log(result.data);
      const channelsOver10000 = result.data.unknown[0].channelList.filter(
        (channel) =>
          channel.channelSubscribeCount >= 10000 &&
          channel.channelSubscribeCount <= 100000
      );
      const channelsOver100000 = result.data.unknown[0].channelList.filter(
        (channel) =>
          channel.channelSubscribeCount >= 100000 &&
          channel.channelSubscribeCount <= 500000
      );
      const channelsOver500000 = result.data.unknown[0].channelList.filter(
        (channel) =>
          channel.channelSubscribeCount >= 500000 &&
          channel.channelSubscribeCount <= 1000000
      );
      const channelsOver1000000 = result.data.unknown[0].channelList.filter(
        (channel) => channel.channelSubscribeCount >= 1000000
      );
      console.log(channelsOver10000);
      console.log(channelsOver100000);
      console.log(channelsOver500000);
      console.log(channelsOver1000000);
      setTotalAnalysistResult(result.data);

      // count per dna type
      // 최근 구독한 채널 3개, 좋아요한 영상 4개
      // 내가 좋아요한 채널 top6 (구독 채널 중 top3, 비구독 채널 중 top3)
      // unknown 채널 결과
      return result.data;
    },
    []
  );

  const handleYoutubeDataSortByChannel = useCallback(
    (videoData, userSubsData, userSubsChannels) => {
      // 채널 ID 별 좋아요한 영상 누적 포맷으로 변경
      const videoDataByChannel = videoData.reduce((acc, currentValue) => {
        console.log(acc);
        console.log(currentValue);
        const existingItem = acc.find(
          (item) => item.channelID === currentValue.channelID
        );
        console.log(existingItem);
        // video의 모든 정보가 저장될 수 있도록 수정
        if (existingItem) {
          existingItem.videoID.push(currentValue);
        } else {
          acc.push({
            channelID: currentValue.channelID,
            videoID: [currentValue],
          });
        }
        return acc;
      }, []);
      console.log(videoDataByChannel);
      // 채널 ID 별 구독 여부 확인
      videoDataByChannel.map((video) => {
        console.log(video);
        if (userSubsChannels.includes(video.channelID)) {
          video["subs"] = true;
        } else {
          video["subs"] = false;
        }
        return video;
      });
      console.log(videoDataByChannel);
      return videoDataByChannel;
    },
    []
  );
  const handleAnalysisResult = useCallback(
    async (video, channel, batch) => {
      console.log(longLikedVideoData);
      // 유저가 좋아요한 영상 데이터 불러오기
      const videoData = await handleYoutubeLikedVideo();
      // 좋아요한 영상 카테고리 분석 결과
      const videoAnalysisResult = await handleLikedVideoProcessBatch(
        videoData,
        batch
      );
      for (let i = 0; i < videoData.length; i++) {
        videoData[i].dnatype = videoAnalysisResult[i].dna[0].dnatype;
      }
      console.log(videoAnalysisResult);
      const { userSubsData, userSubsChannels } = await handleYoutubeSubsData();
      console.log(userSubsData);
      userSubsData.sort((a, b) => new Date(b.subsDate) - new Date(a.subsDate));
      console.log(userSubsData);
      const videoDataByChannel = handleYoutubeDataSortByChannel(
        videoData,
        userSubsData,
        userSubsChannels
      );
      const subsAnalysisResult = await handleSubsChannelProcessBatch([], batch);
      const { userChannelIDs, dnaTypeNames, dnaTypeCollections } =
        await handleResultTuning(videoAnalysisResult, [], userSubsChannels);
      console.log(userChannelIDs);
      const result = await handleGetUnknownChannelList(
        userChannelIDs,
        dnaTypeNames
      );
      console.log(videoAnalysisResult);
      console.log(subsAnalysisResult);
      console.log(longLikedVideoData);
      console.log(videoData);
      console.log(subsChannels);
      console.log(dnaTypeCollections);
      console.log(result);
      console.log(videoDataByChannel);
      navigate(`/complete`, {
        state: {
          videoData: videoData,
          subsData: userSubsData,
          dnaTypeCollections: dnaTypeCollections,
          unknownResult: result,
          videoDataByChannel: videoDataByChannel,
        },
      });
    },
    [
      handleGetUnknownChannelList,
      handleLikedVideoProcessBatch,
      handleResultTuning,
      handleSubsChannelProcessBatch,
      handleYoutubeDataSortByChannel,
      handleYoutubeLikedVideo,
      handleYoutubeSubsData,
      longLikedVideoData,
      navigate,
      subsChannels,
    ]
  );

  useEffect(() => {
    // handleYoutubeSubsData();
    // handleYoutubeLikedVideo();
    handleAnalysisResult(longLikedVideoData, subsData, 1);
    // handleLikedVideoProcessBatch(longLikedVideoData, 1);
    console.log(longLikedVideoData);
    console.log(subsChannels);
    console.log(dnaTypeCollections);
  }, []);

  return {
    subsData,
    longLikedVideoData,
    shortLikedVideoData,
    videoThumbnail,
    videoTitle,
    videoAnalysisCount,
    videoDNA,
    channelThumbnail,
    channelSubsDate,
    channelTitle,
    progressValue,
    dnaTypeCollections,
    totalAnalysistResult,
  };
};
