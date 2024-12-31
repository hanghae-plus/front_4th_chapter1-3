import {
	KeyValueObject,
	isPrimitive,
	isKeyValueType,
} from './isKeyValueObject';

export function deepEquals<T>(objA: T, objB: T): boolean {
	// 1. 기본 타입이거나 null인 경우 처리
	if (isPrimitive(objA) && isPrimitive(objB)) {
		return objA === objB;
	}

	if (Array.isArray(objA) && Array.isArray(objB)) {
		const arrA = objA as Array<unknown>;
		const arrB = objB as Array<unknown>;

		if (arrA.length !== arrB.length) {
			return false;
		}

		for (let i = 0; i < arrA.length; i++) {
			if (deepEquals(arrA[i], arrB[i]) === false) {
				return false;
			}
		}
		return true;
	}
	if (isKeyValueType(objA) && isKeyValueType(objB)) {
		const keyValueA = objA as KeyValueObject;
		const keyValueB = objB as KeyValueObject;

		const keys = Object.keys(keyValueA);
		for (const key of keys) {
			if (deepEquals(keyValueA[key], keyValueB[key]) === false) {
				return false;
			}
		}
		return true;
	}

	return objA === objB;
}
