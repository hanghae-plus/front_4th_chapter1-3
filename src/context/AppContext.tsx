// import { createContext, useContext, useState } from "react";
// import { generateItems } from "../utils";
// import { Item } from "../types";

// interface AppContextType {
//   items: Item[];
//   addItems: () => void;
// }

// const AppContext = createContext<AppContextType | undefined>(undefined);

// // AppContext에 정의한 값을 가져와서 사용할 때 적용하는 훅
// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     throw new Error("useAppContext must be used within an AppProvider");
//   }
//   return context;
// };

// // 감싸는 객체는 ContextProvider라는 이름으로 생성하는 것을 추천
// export const AppContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {

//   // const contextValue: AppContextType = {
//   //   addItems,
//   //   items,
//   // };

//   return (
//     <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
//   );
// };
