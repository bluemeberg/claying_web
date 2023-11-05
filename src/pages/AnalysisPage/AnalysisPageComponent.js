import { styled } from "styled-components";

export const Caution = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
  margin-top: 12px;
  margin-left: 30px;
  margin-bottom: 32px;
`;

export const AnalysisCount = styled.div`
  color: #fff;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 100% */
  margin-top: -32px;
  width: 80%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 6px;
`;

export const Button = styled.div`
  width: 312px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${(props) => (props.flag === "true" ? "#3C95FF" : "#bdbdbd")};
  color: #fff;
  text-align: center;
  /* Mobile_Font/Footnote_14_R */
  font-family: Pretendard;
  font-size: 2.2vh;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  letter-spacing: 0.14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: fixed;
  bottom: 0px;
  cursor: pointer;
`;

export const ResultLogBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const ResultLogThumbnail = styled.div`
  img {
    width: 100px;
    border-radius: 10px;
  }
`;

export const ResultLogTitle = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  min-width: 50%;
  max-width: 50%;
  line-height: 12px; /* 100% */
  margin-left: 8px;
`;

export const ResultLogCategory = styled.div`
  color: #429df2;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 12px; /* 100% */
  margin-left: 8px;
`;

export const ResultLogBoxContainer = styled.div`
  margin-bottom: 100px;
`;
