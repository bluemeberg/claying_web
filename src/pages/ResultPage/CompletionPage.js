import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import NavBar from "../../components/NavBar";
import category from "../../utils/category_compare.json";

const CompletionPage = () => {
  const images = [
    "/images/character/basketball.svg",
    "/images/character/car.svg",
    "/images/character/fitness.svg",
    "/images/character/motivation.svg",
    "/images/character/petsLover.svg",
    "/images/character/petVlog.svg",
    "/images/character/playlistMania.svg",
    "/images/character/traveller.svg",
  ];

  const tempImages = {
    "Drama Movies": "/images/character/temp/movie.svg",
    "IT/Tech": "/images/character/temp/ittech.svg",
    "Pet Video(Vlog)": "/images/character/temp/pet.svg",
    "SelfImprovement/Motivation": "/images/character/temp/selfimporvement.svg",
    "Shows/Talk Shows": "/images/character/temp/show.svg",
    Soccer: "/images/character/temp/soccer.svg",
    Finance: "/images/character/temp/finance.svg",
    "Business/Entrepreneurship": "/images/character/temp/business.svg",
    Car: "/images/character/temp/car.svg",
    Comedy: "/images/character/temp/comedy.svg",
    Games: "/images/character/temp/game.svg",
    "Makeup/Beauty": "/images/character/temp/makeupbeauty.svg",
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadein] = useState(true);

  const handleNextImage = useCallback(() => {
    setFadein(false);
    setTimeout(() => {
      setCurrentImageIndex((prevInex) =>
        prevInex === images.length - 1 ? 0 : prevInex + 1
      );
      setFadein(true);
    }, 300);
  }, [images.length]);
  const location = useLocation();
  console.log(location.state);
  const navigate = useNavigate();
  const handleButtonClick = useCallback(() => {
    navigate("/result", { state: location.state });
  }, [location.state, navigate]);
  const [currentCategory, setCurrentCategory] = useState("Drama Movies");
  const [currentImage, setCurrentImage] = useState(tempImages[currentCategory]);

  useEffect(() => {
    if (location.state === null) {
      navigate("/login", {});
    }
    // 주기적으로 이미지를 변경하는 함수
    const changeImage = () => {
      const categories = Object.keys(tempImages);
      const currentIndex = categories.indexOf(currentCategory);
      const nextIndex = (currentIndex + 1) % categories.length;
      const nextCategory = categories[nextIndex];
      setCurrentCategory(nextCategory);
      setCurrentImage(tempImages[nextCategory]);
    };

    // 5초마다 이미지 변경
    const intervalId = setInterval(changeImage, 500);

    // 컴포넌트 언마운트 시 clearInterval
    return () => clearInterval(intervalId);
  }, [currentCategory]);
  return (
    <Container>
      <NavBar color="blue" />
      <SubTitle>분석을 완료했어요!</SubTitle>
      <Title>
        내가 유튜버라면<br></br> 어떤 크리에이터일까?
      </Title>
      <CategoryTitle>{category[currentCategory]}</CategoryTitle>

      <Banner>
        <img src={currentImage} alt={currentCategory} />
      </Banner>
      <Button onClick={handleButtonClick}>결과 확인하기</Button>
    </Container>
  );
};

export default CompletionPage;

const Container = styled.main`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 calc(3.5vw + 5px);
  background-color: #7b61ff;
`;

const SubTitle = styled.div`
  color: #f5f5f5;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  margin-top: 112px;
  margin-bottom: 24px;
`;
const Title = styled.div`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 48px; /* 133.333% */
  letter-spacing: -0.72px;
`;

const Banner = styled.div`
  margin-top: 28px;
  img {
    height: 30vh;
  }
`;

const Button = styled.div`
  width: 312px;
  max-height: 18px;
  padding: 18px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #3c95ff;
  color: var(--white-white-100, #fff);
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px; /* 100% */
  margin-top: 18px;
  display: flex;
  flex: 1;
  margin-bottom: 68px;
  position: absolute;
  bottom: 0;
  cursor: pointer;
`;
const CategoryTitle = styled.div`
  color: #3c95ff;
  text-align: center;
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 24px; /* 150% */
  letter-spacing: -0.32px;
  margin-top: 28px;
`;
