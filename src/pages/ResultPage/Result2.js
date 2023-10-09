import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { css, styled } from "styled-components";
import category from "../../utils/category_compare.json";
import categoryReal from "../../utils/category_real.json";
import "./Result2.css";
const Result2 = (props) => {
  console.log(props);
  const data = props.dnaInfoData.map((item) => {
    return {
      name: item.dnatype,
      value: item.dnacount,
      category: item.category,
      percentage: item.percentage,
      rank: item.rank,
    };
  });
  console.log(data);
  const data7 = data.slice(0, 6);
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

  const LEGEND_COLORS = ["#2FA8FF", "#63C7FF", "#F96C4C"];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
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
        <div className="col-md-8">
          <ResponsiveContainer
            width={window.innerHeight * 0.25}
            height={window.innerHeight * 0.25}
            className="text-center"
          >
            <PieChart
              width={window.innerHeight * 0.25}
              height={window.innerHeight * 0.25}
            >
              {/* <Legend layout="vertical" verticalAlign="top" align="top" /> */}
              <Pie
                data={data7}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={window.innerHeight * 0.25 * 0.45}
                fill="#8884d8"
                dataKey="value"
                startAngle={0}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <DetailTop3>
        {LEGEND_COLORS.map((color, index) => (
          <DetailTop3BoxContainer key={index}>
            <DetailTop3Box
              bgcolor={color}
              screenheight={window.innerHeight}
              screenwidth={window.innerWidth}
            >
              {data[index].rank}. {category[data[index].name]}
            </DetailTop3Box>
            <DetailTop3BoxNumber screenheight={window.innerHeight}>
              {data[index].category}, {data[index].percentage}%
            </DetailTop3BoxNumber>
          </DetailTop3BoxContainer>
        ))}
      </DetailTop3>
      <RemainDNAType>
        {remainData.map((item, index) => (
          <RemainDNATypeContainer key={index}>
            <RemainDNATypeRank>{item.rank}</RemainDNATypeRank>
            <RemainDNATitle>
              {category[item.name]} ({categoryReal[item.name]})
            </RemainDNATitle>
            <RemainDNATypeRatio>{item.percentage}%</RemainDNATypeRatio>
          </RemainDNATypeContainer>
        ))}
      </RemainDNAType>
    </Container>
  );
};

export default Result2;

const Container = styled.div`
  position: relative;
  min-height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1faff;
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
