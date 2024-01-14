import { sum } from "../../example/sum";


describe('헬퍼함수 테스트', () => {
    it('두 수를 더합니다', () => {
        expect(sum(1, 2)).toBe(3);
        expect(sum(5, 7)).toBe(12);
    });
});
