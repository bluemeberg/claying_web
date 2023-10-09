export function formatNumber(numberString) {
  const number = parseFloat(numberString);
  if (number >= 10000) {
    // 10,000 이상의 경우
    const formattedNumber = (number / 10000).toFixed(2); // 소수점 둘째 자리까지 표시
    return `${formattedNumber}만`;
  } else {
    // 10,000 미만의 경우
    return number.toLocaleString(); // 천 단위로 쉼표를 추가하여 포맷
  }
}

export function formatDateAgo(dateString) {
  const currentDate = new Date();
  const date = new Date(dateString);

  const timeDifferenceInSeconds = Math.floor((currentDate - date) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return `${timeDifferenceInSeconds}초`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutesAgo}분`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hoursAgo}시간`;
  } else if (timeDifferenceInSeconds < 2592000) {
    const daysAgo = Math.floor(timeDifferenceInSeconds / 86400);
    return `${daysAgo}일`;
  } else if (timeDifferenceInSeconds < 31536000) {
    const monthsAgo = Math.floor(timeDifferenceInSeconds / 2592000);
    return `${monthsAgo}달`;
  } else {
    const yearsAgo = Math.floor(timeDifferenceInSeconds / 31536000);
    return `${yearsAgo}년`;
  }
}
