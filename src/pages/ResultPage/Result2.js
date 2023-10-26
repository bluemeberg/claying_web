import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { css, styled } from "styled-components";
import category from "../../utils/category_compare.json";
import categoryReal from "../../utils/category_real.json";
import "./Result2.css";

const Result2 = (props) => {
  console.log(props);
  const totalVideoCount = props.dnaInfoData.reduce((accumulator, item) => {
    return accumulator + item.count;
  }, 0);
  console.log(totalVideoCount);

  const data = props.dnaInfoData.map((item) => {
    return {
      name: category[item.dna_type],
      value: item.count,
      category: item.category,
      percentage: item.percentage,
      rank: item.rank,
      customLabel: item.category + item.percentage + "%",
    };
  });
  console.log(data);
  const data9 = data.slice(0, 8);
  const remainData = data.slice(3, 7);
  console.log(remainData);
  const CHART_COLORS = [
    "#2FA8FF",
    "#63C7FF",
    "#F96C4C",
    "#73E9FF",
    "#62FCDE",
    "#F987FF",
    "F9C8FF",
  ];

  const RADIAN = Math.PI / 180;

  // 커스텀 바 그래프 모양을 정의하는 컴포넌트
  const CustomBarShape = (props) => {
    const { x, y, width, height, fill } = props;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={5}
        ry={5}
      />
    );
  };
  // YAxis의 각 tick에 배경색을 주는 함수
  const renderYAxisTick = (props) => {
    const { x, y, payload, index } = props;
    console.log(props);
    // 상위 3개 데이터에 대한 스타일 적용
    let backgroundColor = "transparent";
    if (index === 0 || index === 1 || index === 2) {
      backgroundColor = "yellow"; // 원하는 배경색 설정
    }

    return (
      <g transform={`translate(${x},${y})`}>
        <rect x={-15} y={-5} width={20} height={20} fill={backgroundColor} />
        <text
          x={100}
          y={-5}
          dy={16}
          textAnchor="end"
          fill="#666"
          fontSize={12}
          width={100}
        >
          {payload.value}
        </text>
      </g>
    );
  };

  // 커스텀 레이블 컴포넌트 정의
  const CustomLabel = ({ customText }) => (
    <text x={0} y={0} dy={-16} textAnchor="middle" fill="#666">
      {customText}
    </text>
  );

  console.log(window.innerHeight);
  return (
    <Container>
      <div>
        {/* <h1>Favorite Beverages - technostuf.com</h1> */}
        {/* <hr /> */}
        <SubTitle>{props.userInfo}님이 크리에이터가 된다면 </SubTitle>
        <SubTitle type="rank">1st</SubTitle>
        {/* <Title region="en">{props.topDNAType}</Title> */}
        <Title>{category[props.topDNAType]}</Title>
        <Tip>총 {totalVideoCount}개의 좋아요한 영상 분석한 결과, %</Tip>
        <div className="col-md-8">
          <YLabel>
            {data.map((entry, index) => {
              if (index === 0) {
                return (
                  <YLabelElement1>
                    1. {entry.name}
                    <br />
                    <YLabelSubElement>
                      ({entry.category}, {entry.percentage}%)
                    </YLabelSubElement>
                  </YLabelElement1>
                );
              } else if (index === 1) {
                return (
                  <YLabelElement2>
                    2. {entry.name} <br />
                    <YLabelSubElement>
                      ({entry.category}, {entry.percentage}%)
                    </YLabelSubElement>
                  </YLabelElement2>
                );
              } else if (index === 2) {
                return (
                  <YLabelElement3>
                    3. {entry.name} <br />
                    <YLabelSubElement>
                      ({entry.category}, {entry.percentage}%)
                    </YLabelSubElement>
                  </YLabelElement3>
                );
              } else {
                return (
                  <YLabelElement>
                    {entry.name}
                    <br />
                    <YLabelSubElement>
                      ({entry.category}, {entry.percentage}%)
                    </YLabelSubElement>
                  </YLabelElement>
                );
              }
            })}
          </YLabel>
          <ChartComponent>
            <BarChart width={300} height={420} data={data9} layout="vertical">
              <XAxis
                type="number"
                dataKey="percentage"
                interval={0} // 간격을 0으로 설정
                orientation="top"
                hide={true}
                domain={[0, 50]}
              />
              <YAxis
                dataKey="name"
                type="category"
                hide={true}
                label={{
                  angle: -90,
                  position: "insideLeft",
                  width: 100,
                }}
                tick={renderYAxisTick} // 모든 눈금 레이블의 폰트 크기를 12px로 설정
              />
              <Bar
                dataKey="percentage"
                barSize={32}
                shape={<CustomBarShape />}
                fill="#8884d8"
                label={{ position: "right" }}
              >
                {data.map((entry, index) => (
                  <>
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % 20]}
                    />
                  </>
                ))}
              </Bar>
            </BarChart>
            <BarChart
              width={300}
              height={400}
              data={data.slice(8, data.length)}
              layout="vertical"
            >
              <XAxis
                type="number"
                dataKey="percentage"
                interval={0} // 간격을 0으로 설정
                orientation="top"
                hide={true}
                domain={[0, 50]}
              />
              <YAxis
                dataKey="name"
                type="category"
                hide={true}
                label={{
                  angle: -90,
                  position: "insideLeft",
                  width: 100,
                }}
                tick={renderYAxisTick} // 모든 눈금 레이블의 폰트 크기를 12px로 설정
              />
              <Bar
                dataKey="percentage"
                barSize={32}
                shape={<CustomBarShape />}
                fill="#8884d8"
                label={{ position: "right" }}
              >
                {data.map((entry, index) => (
                  <>
                    <Cell key={`cell-${index}`} fill="F9C8FF" />
                  </>
                ))}
              </Bar>
            </BarChart>
          </ChartComponent>
        </div>
      </div>
    </Container>
  );
};

export default Result2;

const Container = styled.div`
  position: relative;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1faff;
  &::-webkit-scrollbar {
    display: none; /* Webkit 브라우저 스크롤바 */
  }
`;
const ChartComponent = styled.div`
  display: flex;
  flex-direction: column;
`;
const YLabel = styled.div`
  margin-left: 40px;
`;

const YLabelElement = styled.div`
  font-size: 14px;
  min-height: 52px;
  min-width: 140px;
  display: flex;
  max-height: 60px;
  align-items: start;
  flex-direction: column;
  justify-content: center;
`;

const YLabelElement1 = styled(YLabelElement)`
  font-weight: 900;
`;
const YLabelElement2 = styled(YLabelElement)`
  font-weight: 900;
`;
const YLabelElement3 = styled(YLabelElement)`
  font-weight: 900;
`;

const YLabelSubElement = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

const DetailTop3 = styled.div`
  display: flex;
  margin-top: 20px;
`;
const DetailTop3BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DetailTop3Box = styled.div`
  border-radius: 12px;
  padding: 3px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  background-color: ${(props) => props.bgcolor};
  margin-right: 10px;
  margin-left: 10px;
  font-size: 12px;
  ${({ screenheight, screenwidth }) =>
    screenheight > 700 &&
    screenwidth > 380 &&
    css`
      font-size: 14px;
    `}
  font-style: normal;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.12px;
`;

const DetailTop3BoxNumber = styled.div`
  color: #000;
  text-align: center;
  font-size: 10px;
  ${({ screenheight }) =>
    screenheight > 700 &&
    css`
      font-size: 12px;
    `}
  font-style: normal;
  font-weight: 400;
  line-height: 12px; /* 100% */
  margin-top: 4px;
`;

const RemainDNAType = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 20px;
`;

const RemainDNATypeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`;

const RemainDNATypeRank = styled.div`
  color: #ff642e;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 100% */
  margin-right: 10px;
`;

const RemainDNATitle = styled.div`
  display: flex;
  flex: 1;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px; /* 100% */
`;

const RemainDNATypeRatio = styled.div`
  color: #000;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 114.286% */
  letter-spacing: -0.28px;
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

const Tip = styled.div`
  font-size: 8px;
  margin-bottom: 12px;
`;
