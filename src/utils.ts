export function renderLog(message: string) {
  console.log(message);
}

// 대규모 데이터 생성 함수 (화살표 함수: 렉시컬 바인딩 되기 때문에 콜백 함수로 사용)
export const generateItems = (count: number, start = 0) => {
  const categories = ["전자기기", "의류", "도서", "식품"];
  return Array.from({ length: count }, (_, index) => ({
    id: start + index,
    name: `상품 ${start + index}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    price: Math.floor(Math.random() * 100000) + 1000,
  }));
};
