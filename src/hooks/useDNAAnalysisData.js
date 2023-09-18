import React, { useCallback, useEffect, useState } from "react";
import { serverInstance } from "../api/axios";
import { useYoutubeAnalysisData } from "./useYoutubeAnalysisData";

export const useDNAAnalysisData = (accessToken, email) => {
  // gpt 분석 결과
  const [progressData, setProgressData] = useState([]);
  // 분석 진행 현황 체크
  const [progressValue, setProgressValue] = useState(0);

  const [videoThumbnail, setVideoThumbnail] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  // 영상 데이터 분석
  const handleLikedVideoProcessBatch = async (videoData, batchSize) => {
    const batches = [];
    const numBatches = Math.ceil(videoData.length / batchSize);
    console.log(numBatches);
    for (let i = 0; i < numBatches; i++) {
      const start = i * batchSize;
      const end = start + batchSize;
      const batch = videoData.slice(start, end);
      // const result = await fetchData(batch);
      const result = await serverInstance.post("/chatgpt/content/dna", {
        dnaData: batch,
      });
      batches.push(result.data);
      setProgressValue((prevValue) => i);
      setProgressData([...progressData, result.data]);
      setVideoThumbnail(videoData[i].videoThumbnail);
      setVideoTitle(videoData[i].videoTitle);
      console.log(videoData);
    }
    return batches;
  };
  const handleSubsChannelProcessBatch = async (subsData, batchSize) => {};
  useEffect(() => {
    handleLikedVideoProcessBatch();
  }, []);
  return {
    videoThumbnail,
    videoTitle,
    handleLikedVideoProcessBatch,
    progressValue,
  };
};
