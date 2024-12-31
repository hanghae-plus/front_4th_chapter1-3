export function renderLog(message: string) {
  console.log(message);
}

// 대규모 데이터 생성 함수
export const generateItems = (count: number, start = 0) => {
  console.log("🚀 ~ generateItems ~ count:", count);
  const categories = ["전자기기", "의류", "도서", "식품"];
  return Array.from({ length: count }, (_, index) => ({
    id: start + index,
    name: `상품 ${start + index}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    price: Math.floor(Math.random() * 100000) + 1000,
  }));
};
