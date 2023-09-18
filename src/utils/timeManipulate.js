export function getTimeAgo(dateString) {
  const currentDate = new Date();
  console.log(currentDate);
  const date = new Date(dateString);
  console.log(date);
  const timeDifference = currentDate - date;
  const secondsInMs = 1000;
  const minutesInMs = secondsInMs * 60;
  const hoursInMs = minutesInMs * 60;
  const daysInMs = hoursInMs * 24;
  const monthsInMs = daysInMs * 30.44; // 평균 월 수 (365일 / 12개월)
  const yearsInMs = daysInMs * 365.25; // 평균 년 수 (365일 + 1/4일)

  if (timeDifference < minutesInMs) {
    const seconds = Math.floor(timeDifference / secondsInMs);
    return `${seconds}초 전`;
  } else if (timeDifference < hoursInMs) {
    const minutes = Math.floor(timeDifference / minutesInMs);
    return `${minutes}분 전`;
  } else if (timeDifference < daysInMs) {
    const hours = Math.floor(timeDifference / hoursInMs);
    return `${hours}시간 전`;
  } else if (timeDifference < monthsInMs) {
    const days = Math.floor(timeDifference / daysInMs);
    return `${days}일 전`;
  } else if (timeDifference < yearsInMs) {
    const months = Math.floor(timeDifference / monthsInMs);
    return `${months}달 전`;
  } else {
    const years = Math.floor(timeDifference / yearsInMs);
    return `${years}년 전`;
  }
}

export function formatDate(inputDate) {
  const date = new Date(inputDate);
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}
