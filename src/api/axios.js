import axios from "axios";

export const localServerInstance = axios.create({
  baseURL: "http://192.168.155.56:8080/",
});

export const serverInstance = axios.create({
  baseURL: "https://uncrapi.link",
});

export const youtubeDataAPIInstacne = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
});

export const youtubeOauthAPI = "AIzaSyAIK1F6M0svPbrwL_QELpGD4Dfpt9sY8GM";
export const youtubeGeneralAPI = "AIzaSyDcjksYS7Mf-VCHjsIaBY4o8JpRC9Hm2Mk";
