import { useRef } from '../hooks';
import { shallowEquals } from '../equalities';
import { ComponentType, ReactElement, createElement } from 'react';

export function memo<P extends object>(
	Component: ComponentType<P>,
	_equals = shallowEquals // default: 얕은 비교
) {
	const CachedComponent: React.FC<P> = (props: P) => {
		const oldPropsRef = useRef<P | null>(null);
		const oldComponentRef = useRef<ReactElement | null>(null);

		// 이전 Props가 없거나, 이전 Props 와 새로운 props 가 다른 경우 업데이트
		if (!oldPropsRef.current || !_equals(oldPropsRef.current, props)) {
			const result = createElement(Component, props);

			oldComponentRef.current = result;
			oldPropsRef.current = props;

			return result;
		}

		return oldComponentRef.current;
	};

	return CachedComponent;
}
