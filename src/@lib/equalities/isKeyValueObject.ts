export type Primitive =
	| boolean
	| number
	| string
	| bigint
	| symbol
	| undefined
	| null;

export type PrimitiveKeyValueObject = Record<string, Primitive>;

export interface KeyValueObject {
	[key: string]:
		| Primitive
		| KeyValueObject
		| Array<KeyValueObject | Primitive>;
}

export function isPrimitive(value: unknown): value is Primitive {
	return (
		value === null || // null은 특별하게 처리
		typeof value === 'boolean' ||
		typeof value === 'number' ||
		typeof value === 'string' ||
		typeof value === 'bigint' ||
		typeof value === 'symbol' ||
		typeof value === 'undefined'
	);
}

export function isPrimitiveKeyValueObject(
	obj: unknown
): obj is PrimitiveKeyValueObject {
	if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
		return false;
	}

	// 객체의 값들이 모두 기본 타입(primitive)인지 확인
	for (const value of Object.values(obj)) {
		if (
			typeof value !== 'boolean' &&
			typeof value !== 'number' &&
			typeof value !== 'string' &&
			typeof value !== 'bigint' &&
			typeof value !== 'symbol' &&
			value !== null &&
			value !== undefined
		) {
			return false;
		}
	}

	return true;
}

export function isKeyValueObject(obj: unknown): obj is KeyValueObject {
	if (typeof obj !== 'object' || obj === null) {
		return false;
	}

	if (Array.isArray(obj)) {
		for (const item of obj) {
			if (!isPrimitive(item) && !isKeyValueObject(item)) {
				return false;
			}
		}
		return true; // 배열은 각 요소가 적합하면 true
	}

	for (const value of Object.values(obj)) {
		if (
			!isPrimitive(value) &&
			!isKeyValueObject(value) &&
			!Array.isArray(value)
		) {
			return false;
		}
	}

	return true;
}

export function isKeyValueType(obj: unknown): boolean {
	if (typeof obj !== 'object' || obj === null) {
		return false;
	}

	if (Array.isArray(obj)) {
		for (const item of obj) {
			if (!isPrimitive(item) && !isKeyValueObject(item)) {
				return false;
			}
		}
		return true; // 배열은 각 요소가 적합하면 true
	}

	for (const value of Object.values(obj)) {
		if (isPrimitive(value)) {
			continue;
		}

		if (typeof value === 'object' && value !== null) {
			if (!isKeyValueType(value)) {
				return false;
			}
		} else {
			return false;
		}
	}

	return true;
}
