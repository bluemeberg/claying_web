import React from "react";
import { styled } from "styled-components";
import NewChannelBox from "../../components/ChannelBox/NewChannelBox";
import SubsChannelBox from "../../components/ChannelBox/SubsChannelBox";
import category from "../../utils/category_real.json";
const FindChannelCategory = (props) => {
  console.log(props.unknown);
  let unknownChannelList = [];
  // 0. 0to1, 1to10, 10to100, to100 배열 길이 확인
  // 1. 모든 배열의 길이 총합이 2보다 작으면 패스
  // 2. 모든 배열의 길이 총합이 2일 경우
  // 2.1 길이가 2인 배열이 있는 경우 해당 배열의 모든 원소를 푸쉬
  // 2.2 길이가 1인 배열 씩
  // 2.2 그 4개의
  // 없다면 각 배열의 첫 원소를 unknownChannelList에 푸쉬
  // 배열의 길이가 2일때
  // 배열의 길이가 3일때
  // 배열의 길이가
  // 모든 배열의 길이가 2보다 작으면 패스
  // to100 배열 길이가 2라면 push 하고 끝
  // to100 배열 길이가 1보다 크고 2보다 작으면 unknownChannelList 배열 push
  // 10to100 배열 길이가
  //   for (
  //     let i = 0;
  //     i <
  //     Math.max(
  //       props.unknown.a.length,
  //       props.unknown.b.length,
  //       props.unknown.c.length,
  //       props.unknown.d.length
  //     );
  //     i++
  //   ) {
  //     if (props.unknown.d[i] !== undefined) {
  //       if (unknownChannelList.length > 3) {
  //         break;
  //       }
  //       unknownChannelList.push(props.unknown.d[i]);
  //     }
  //     if (props.unknown.c[i] !== undefined) {
  //       if (unknownChannelList.length > 3) {
  //         break;
  //       }
  //       unknownChannelList.push(props.unknown.c[i]);
  //     }
  //     if (props.unknown.b[i] !== undefined) {
  //       if (unknownChannelList.length > 3) {
  //         break;
  //       }
  //       unknownChannelList.push(props.unknown.b[i]);
  //     }
  //     if (props.unknown.a[i] !== undefined) {
  //       if (unknownChannelList.length > 3) {
  //         break;
  //       }
  //       unknownChannelList.push(props.unknown.a[i]);
  //     }
  //   }
  //   console.log(unknownChannelList);
  // 결과를 저장할 빈 배열
  const selectedElements = [];

  // 각 배열에서 조건에 맞게 요소를 선택
  if (props.unknown.a.some((item) => item.findPriority <= 2)) {
    selectedElements.push(
      props.unknown.a.find((item) => item.findPriority <= 2)
    );
  }

  if (props.unknown.b.some((item) => item.findPriority <= 2)) {
    selectedElements.push(
      props.unknown.b.find((item) => item.findPriority <= 2)
    );
  }

  if (props.unknown.c.some((item) => item.findPriority <= 2)) {
    selectedElements.push(
      props.unknown.c.find((item) => item.findPriority <= 2)
    );
  }

  if (props.unknown.d.some((item) => item.findPriority <= 2)) {
    selectedElements.push(
      props.unknown.d.find((item) => item.findPriority <= 2)
    );
  }

  // 결과 출력
  console.log(selectedElements);
  if (selectedElements.length < 4) {
    for (
      let i = 0;
      i <
      Math.max(
        props.unknown.a.length,
        props.unknown.b.length,
        props.unknown.c.length,
        props.unknown.d.length
      );
      i++
    ) {
      if (props.unknown.a[i] !== undefined) {
        if (selectedElements.length > 3) {
          break;
        }
        if (props.unknown.a[i].findPriority > 2) {
          selectedElements.push(props.unknown.a[i]);
        }
      }
      if (props.unknown.b[i] !== undefined) {
        if (selectedElements.length > 3) {
          break;
        }
        if (props.unknown.b[i].findPriority > 2) {
          selectedElements.push(props.unknown.b[i]);
        }
      }
      if (props.unknown.c[i] !== undefined) {
        if (selectedElements.length > 3) {
          break;
        }
        if (props.unknown.c[i].findPriority > 2) {
          selectedElements.push(props.unknown.c[i]);
        }
      }
      if (props.unknown.d[i] !== undefined) {
        if (selectedElements.length > 3) {
          break;
        }
        if (props.unknown.d[i].findPriority > 2) {
          selectedElements.push(props.unknown.d[i]);
        }
      }
    }
  }
  console.log(selectedElements);
  selectedElements.sort((a, b) => {
    return a.channelSubscribeCount - b.channelSubscribeCount;
  });

  console.log(selectedElements);
  return (
    <Container>
      <Title>이 채널, 좋아하실 것 같아요!</Title>
      <CategoryTitle>{category[props.unknown.detailCategory]}</CategoryTitle>
      <SubsContainer>
        {selectedElements.map((data, idex) => (
          <NewChannelBox props={data} />
        ))}
      </SubsContainer>
    </Container>
  );
};

export default FindChannelCategory;

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

const CategoryTitle = styled.div`
  width: 232px;
  height: 32px;
  flex-shrink: 0;
  border: 6px solid #3c95ff;
  background: #7b61ff;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 14px; /* 100% */
  letter-spacing: -0.28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  margin-bottom: 8px;
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 100% */
  margin-top: 80px;
`;

const SubsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
