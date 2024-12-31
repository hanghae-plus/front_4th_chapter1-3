type Primitive = boolean | number | string | bigint | symbol | undefined | null;

export type KeyValueObject = Record<string, Primitive>;

export function isKeyValueObject(obj: unknown): obj is KeyValueObject {
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
