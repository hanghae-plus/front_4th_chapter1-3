## 과제 체크포인트

### 기본과제

- [x] shallowEquals 구현 완료
- [x] deepEquals 구현 완료
- [x] memo 구현 완료
- [x] deepMemo 구현 완료
- [x] useRef 구현 완료
- [x] useMemo 구현 완료
- [x] useDeepMemo 구현 완료
- [x] useCallback 구현 완료

### 심화 과제

- [x] 기본과제에서 작성한 hook을 이용하여 렌더링 최적화를 진행하였다.
- [x] Context 코드를 개선하여 렌더링을 최소화하였다.

## 과제 셀프회고

> 3주차 과제는 2주차에 비해서 다소 난이도가 낮다고 하셔서 비교적 가벼운 마음으로 과제에 임했다.
> 하지만 비교적 낮은 난이도에도 많이 낮은 기술적 지식을 가진 나로서는 쉽지 않은 과제였다.
> 그럼에도 2주차보다는 낮은 난이도여서 그런지 과제 막판쯤 코드에 대한 이해도가 생긴 것을 느꼈다.

### 기술적 성장

#### 1. 메모이제이션 (Memoization)

- 개념: 메모이제이션은 동일한 계산을 반복하지 않도록 결과를 저장하여 성능을 최적화하는 기법입니다.
  - React에서는 useMemo 훅을 사용하여 컴포넌트의 특정 값이나 함수의 결과를 메모이제이션할 수 있습니다.
  - 메모이제이션된 값은 의존성 배열이 변경될 때만 업데이트됩니다.
- 어려움: 메모이제이션된 값이 의존성 배열이 변경될 때만 업데이트되도록 하는 방법.
  - 의존성 배열이 변경되지 않으면 이전에 계산된 값을 재사용해야 합니다.
- 해결: useMemo 훅을 사용하여 의존성 배열을 비교하고, 변경된 경우에만 factory 함수를 실행하여 결과를 저장합니다.
  - 이를 통해 불필요한 계산을 방지하고 성능을 최적화할 수 있습니다.
  - useRef 훅을 사용하여 이전 의존성과 결과를 저장하고, shallowEquals 함수를 사용하여 의존성 배열을 얕게 비교합니다.

#### 2. React 훅 (Hooks)

- 개념: React 훅은 함수형 컴포넌트에서 상태와 생명주기 기능을 사용할 수 있게 해줍니다. 대표적인 훅으로는 useState, useEffect, useMemo, useCallback 등이 있습니다.
  - 훅을 사용하면 클래스형 컴포넌트에서 사용하던 상태 관리와 생명주기 메서드를 함수형 컴포넌트에서도 사용할 수 있습니다.
- 어려움: 커스텀 훅을 작성하고, 의존성 배열을 관리하는 방법.
  - 커스텀 훅을 작성할 때는 훅 내부에서 상태와 생명주기를 관리하고, 필요한 값을 반환해야 합니다.
- 해결: useMemo와 useRef 훅을 사용하여 커스텀 훅을 작성하고, 의존성 배열을 비교하여 상태를 관리합니다.
  - 이를 통해 컴포넌트의 상태와 생명주기를 효율적으로 관리할 수 있습니다.
  - 커스텀 훅을 작성할 때는 훅 내부에서 필요한 상태와 함수를 정의하고, 이를 반환합니다.

#### 3. 의존성 배열 (Dependency Array)

- 개념: 의존성 배열은 훅이 실행될 조건을 정의하는 배열입니다. useEffect, useMemo, useCallback 등의 훅에서 사용됩니다.
  - 의존성 배열에 포함된 값이 변경될 때만 훅이 실행됩니다.
- 어려움: 의존성 배열을 올바르게 비교하고, 변경된 경우에만 훅을 실행하는 방법.
  - 의존성 배열이 변경되지 않으면 훅이 실행되지 않아야 합니다.
- 해결: shallowEquals 함수를 사용하여 의존성 배열을 얕게 비교하고, 변경된 경우에만 factory 함수를 실행합니다.
  - 이를 통해 불필요한 훅 실행을 방지하고 성능을 최적화할 수 있습니다.
  - 의존성 배열을 비교할 때는 배열의 각 요소를 얕게 비교하여 변경 여부를 판단합니다.

#### 4. 리렌더링 최적화

- 개념: 불필요한 리렌더링을 방지하여 성능을 최적화하는 것.
  - React에서는 memo HOC와 useCallback 훅을 사용하여 컴포넌트를 메모이제이션할 수 있습니다.
  - 메모이제이션된 컴포넌트는 props가 변경되지 않으면 리렌더링되지 않습니다.
- 어려움: 상태 변경 시 특정 컴포넌트만 리렌더링되도록 하는 방법.
  - 상태 변경이 발생할 때마다 모든 컴포넌트가 리렌더링되지 않도록 해야 합니다.
- 해결: memo HOC와 useCallback 훅을 사용하여 컴포넌트를 메모이제이션하고, 상태 변경 시 특정 컴포넌트만 리렌더링되도록 설정합니다.
  - 이를 통해 불필요한 리렌더링을 방지하고 성능을 최적화할 수 있습니다.
  - memo HOC를 사용하여 컴포넌트를 메모이제이션하고, useCallback 훅을 사용하여 함수를 메모이제이션합니다.

#### 5. 테스트 코드 작성 및 통과

- 개념: 컴포넌트의 동작을 검증하기 위해 테스트 코드를 작성하는 것.
  - React에서는 @testing-library/react와 vitest를 사용하여 테스트 코드를 작성할 수 있습니다.
  - 테스트 코드를 작성하면 컴포넌트의 동작을 자동으로 검증할 수 있습니다.
- 어려움: 특정 조건에서 컴포넌트가 올바르게 리렌더링되는지 테스트하는 방법.
  - 컴포넌트의 상태와 props가 변경될 때 올바르게 리렌더링되는지 검증해야 합니다.
- 해결: @testing-library/react와 vitest를 사용하여 테스트 코드를 작성하고, 컴포넌트의 리렌더링을 검증합니다.
  - 이를 통해 컴포넌트의 동작을 정확하게 검증할 수 있습니다.
  - 테스트 코드를 작성할 때는 컴포넌트를 렌더링하고, 상태와 props를 변경하여 리렌더링 여부를 검증합니다.

### 예제 코드

#### useMemo.ts

```typescript
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

interface MemoizedValue<T> {
  value: T;
  deps: DependencyList;
}

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const memoizedRef = useRef<MemoizedValue<T> | undefined>(undefined);

  // 2. 현재 의존성과 이전 의존성 비교
  const depsChanged =
    !memoizedRef.current || !_equals(memoizedRef.current.deps, _deps);

  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  if (depsChanged) {
    memoizedRef.current = {
      value: factory(),
      deps: _deps,
    };
  }

  // 4. 메모이제이션된 값 반환
  if (!memoizedRef.current) {
    throw new Error("memoizedRef.current is undefined");
  }

  return memoizedRef.current.value as T;
}
```

#### Header.tsx

```tsx
import React, { memo, useCallback } from "react";
import { renderLog } from "../utils";
import { useThemeContext } from "../contexts/ThemeContext";
import { useUserContext } from "../contexts/UserContext";
import { useNotificationContext } from "../contexts/NotificationContext";

// Header 컴포넌트
export const Header: React.FC = memo(() => {
  renderLog("Header rendered");
  const { theme, toggleTheme } = useThemeContext();
  const { user, login, logout } = useUserContext();
  const { addNotification } = useNotificationContext();

  const handleLogin = useCallback(() => {
    login("user@example.com", "password");
    addNotification("로그인되었습니다.", "success");
  }, [login, addNotification]);

  const handleLogout = useCallback(() => {
    logout();
    addNotification("로그아웃되었습니다.", "success");
  }, [logout, addNotification]);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">샘플 애플리케이션</h1>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            {theme === "light" ? "다크 모드" : "라이트 모드"}
          </button>
          {user ? (
            <div className="flex items-center">
              <span className="mr-2">{user.name}님 환영합니다!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
});
```

### 코드 품질

<!-- 예시
- 특히 만족스러운 구현
- 리팩토링이 필요한 부분
- 코드 설계 관련 고민과 결정
-->

> 심화과제를 진행하며 App.tsx를 컴포넌트 별로 구분하며 불필요한 렌더링을 억제시킬 수 있었다.
> 성능 뿐만 아니라 '가독성', '재사용성'을 높일 수 있도록 가능한 선에서 최대한 컴포넌트화 할 수 있도록 노력해야겠다.

#### App.tsx 일부

```tsx

return (
    <ThemeContextProvider>
      <NotificationContextProvider>
        <UserContextProvider>
          <Header />
          <Body>
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 md:pr-4">
                  <ItemList items={items} onAddItemsClick={addItems} />
                </div>
                <div className="w-full md:w-1/2 md:pl-4">
                  <ComplexForm />
                </div>
              </div>
            </div>
          </Body>
          <NotificationSystem />
        </UserContextProvider>
      </NotificationContextProvider>
    </ThemeContextProvider>
  );
};
```

### 학습 효과 분석

<!-- 예시
- 가장 큰 배움이 있었던 부분
- 추가 학습이 필요한 영역
- 실무 적용 가능성
-->

> 이번주까지는 테스트코드를 통과하는 것에만 집중되었던 것 같다.
> 다음주부터는 실무에 어떤 부분을 적용할 수 있을지 고민하며 과제를 진행해나가야겠다.

### 과제 피드백

<!-- 예시
- 과제에서 모호하거나 애매했던 부분
- 과제에서 좋았던 부분
-->

> 따라가기 급급했던 것 같습니다.
> 그래도 1-3주차까지 테스트코드의 존재유무가 코드개선에 자신감을 준다는 것은 확실하게 인지할 수 있었던 것 같습니다.

## 리뷰 받고 싶은 내용

> 심화 과제를 수행하면서 App.tsx 파일을 여러 개의 컴포넌트로 분리하는 작업을 진행했습니다. 이 과정에서 명확한 기준 없이 분리하다 보니, 좋은 코드 구조에 대한 궁금증이 생겼습니다. 아래와 같은 질문을 드리고 싶습니다.

#### 코드 구조

- App.tsx: 메인 컴포넌트 파일로, 여러 개의 하위 컴포넌트로 구성되어 있습니다.
- 컴포넌트 분리: Header, ItemList, ComplexForm, NotificationSystem 등으로 분리
- 컨텍스트 사용: ThemeContext, UserContext, NotificationContext를 사용하여 상태 관리

#### 질문 및 요청 사항

##### 1. 컴포넌트 분리 기준:

- 컴포넌트를 분리할 때 어떤 기준을 가지고 분리하는 것이 좋을까요?
- 현재는 기능별로 분리했지만, 더 나은 방법이 있을지 궁금합니다.

##### 2. 코드 구조 및 설계:

- 좋은 코드 구조란 무엇인가요? 어떤 방향과 원칙을 가지고 설계하면 좋을까요?
- 현재 코드 구조에서 개선할 점이 있다면 무엇인지 피드백 부탁드립니다.
