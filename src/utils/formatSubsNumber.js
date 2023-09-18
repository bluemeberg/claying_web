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
