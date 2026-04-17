import { validateEmail, dateToString, chunkArray } from './utils';

test('dateToString returns date as string', () => {
  expect(dateToString(new Date('2026-01-01'))).toBe('2026-01-01T00:00:00.000Z');
});

test('dateToString throws for invalid date', () => {
  expect(() => dateToString(new Date('not-a-date'))).toThrow();
});

test('dateToString returns May, 1, 2026 as string', () => {
  expect(dateToString(new Date('2026-05-01'))).toBe('2026-05-01T00:00:00.000Z');
});

test('validateEmail returns true for valid email', () => {
  expect(validateEmail('jackson@gmail.com')).toBe(true);
});

test('validateEmail returns false for missing @', () => {
  expect(validateEmail('noteanemail')).toBe(false);
});

test('validateEmail returns true for any string with @', () => {
  expect(validateEmail('@')).toBe(true);
});

test('chunkArray splits array into chunks', () => {
  expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
});

test('chunkArray returns empty array when given empty array', () => {
  expect(chunkArray([], 1)).toEqual([]);
});

test('chunkArray handles chunk size larger than array', () => {
  expect(chunkArray([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
});
