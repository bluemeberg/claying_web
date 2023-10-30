import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { serverInstance } from "../../api/axios";
import NavBar from "../../components/NavBar";

const LoginPage = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/youtube.readonly");
  const navigate = useNavigate();
  const handleAuth = async () => {
    const result = await signInWithPopup(auth, provider);
    localStorage.setItem("userData", JSON.stringify(result.user));
    // user email post
    const postResult = await serverInstance.post("/users/", {
      email: result.user.email,
    });
    console.log(postResult);
    navigate(`/analysis`, {
      state: {
        photoUrl: result.user.photoURL,
        userName: result.user.displayName,
        email: result.user.email,
        token: result._tokenResponse.oauthAccessToken,
      },
    });
    //   .then((result) => {
    //     console.log(result.user);
    //     navigate(`/analysis`, {
    //       state: result.user,
    //     });
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   });
  };
  return (
    <Container>
      <NavBar color="blue" />
      <SubContainer>
        <Title>
          잠깐! <br></br> 접근을 허용해주세요.
        </Title>
        <SubTitle>
          클레잉 콘텐츠 성향 분석 테스트에서는 <br></br>유튜브 좋아요한 영상,
          구독 채널 정보가 필요해요. <br></br>유튜브에 접근할 수 있도록 구글
          계정을 로그인해주세요.
        </SubTitle>
        <SubTitle kind="caution">
          단, 본 테스트에서는 유저 식별이 가능한 형태로<br></br>유튜브 활동
          데이터를 저장하지 않습니다.
        </SubTitle>
        <GoogleButton onClick={handleAuth}>
          <img src="/images/Google.svg" alt="google" /> Google 계정으로 시작하기
        </GoogleButton>
      </SubContainer>
    </Container>
  );
};

export default LoginPage;

const Container = styled.main`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 calc(3.5vw + 5px);
  background-color: #3c95ff;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  /* margin-bottom: 74px; */
`;

const Title = styled.div`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px; /* 150% */
  letter-spacing: -0.48px;
  margin-bottom: 24px;
`;

const SubTitle = styled.div`
  color: ${(props) => (props.kind === "caution" ? "#FFBB54" : "#fff")};
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: ${(props) => (props.kind === "caution" ? "italic" : "normal")};
  font-weight: ${(props) => (props.kind === "caution" ? "900" : "400")};
  line-height: 24px; /* 171.429% */
  margin-bottom: 24px;
`;

const GoogleButton = styled.div`
  display: flex;
  padding: 12px 74px 12px 12px;
  align-items: center;
  gap: 43px;
  border-radius: 8px;
  background: #fff;
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 157.143% */
  cursor: pointer;
  img {
    width: 28px;
    height: 28px;
  }
`;
