export function renderLog(message: string) {
  console.log(message);
}

// 대규모 데이터 생성 함수
export const generateItems = (count: number, start = 0) => {
  const categories = ["전자기기", "의류", "도서", "식품"];
  return Array.from({ length: count }, (_, index) => ({
    id: start + index,
    name: `상품 ${start + index}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    price: Math.floor(Math.random() * 100000) + 1000,
  }));
};

export function assertObject(obj: unknown): asserts obj is object {
  if (typeof obj !== "object") {
    throw new Error("[assertObject] 해당 변수는 객체가 아닙니다.");
  }
}
