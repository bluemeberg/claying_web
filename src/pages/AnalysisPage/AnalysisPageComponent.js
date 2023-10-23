import { styled } from "styled-components";

export const Caution = styled.div`
  color: #000;
  text-align: start;
  font-family: Pretendard;
  font-size: 1.8vh;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  margin-bottom: 40px;
  max-width: 300px;
  margin-top: 20px;
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
  font-size: 2.4vh;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  letter-spacing: 0.14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;
