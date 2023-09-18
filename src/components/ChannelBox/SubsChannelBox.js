import React from "react";
import { styled } from "styled-components";
import { formatDate, getTimeAgo } from "../../utils/timeManipulate";

const SubsChannelBox = (props) => {
  console.log(props.subsData);
  return (
    <SubsChannelContainer>
      <SubsChannelThumbnail>
        <img
          src={props.subsData.channelThumbnail}
          alt={props.subsData.channelTitle}
        />
      </SubsChannelThumbnail>
      <SubsChannelCategory></SubsChannelCategory>
      <SubsChannelTitle>{props.subsData.channelTitle}</SubsChannelTitle>
      <SubsChannelSubsCount></SubsChannelSubsCount>
      <SubsChannelDate>
        구독일:{formatDate(props.subsData.subsDate)}
      </SubsChannelDate>
    </SubsChannelContainer>
  );
};

export default SubsChannelBox;

const SubsChannelContainer = styled.div`
  display: flex;
  width: 100px;
  height: 150px;
  padding: 8px 0px 12px 0px;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  background: #fff;
  margin-left: 4px;
  margin-right: 4px;
  margin-top: 24px;
`;

const SubsChannelThumbnail = styled.div`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  fill: #d9d9d9;
  border-radius: 30px;
  margin-top: 8px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 30px;
  }
`;

const SubsChannelCategory = styled.div`
  display: inline-flex;
  padding: 3px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: #d6eeff;
  color: #2fa8ff;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px; /* 100% */
`;

const SubsChannelTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 14px; /* 100% */
  margin-top: 8px;
  min-height: 28px;
  max-height: 30px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;

const SubsChannelSubsCount = styled.div`
  color: #97a2b6;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 116.667% */
`;

const SubsChannelDate = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 116.667% */
`;
