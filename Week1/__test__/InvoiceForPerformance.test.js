const invoices = require("../MockData/invoices.json");
const plays = require("../MockData/plays.json");
const { statement } = require("../Example/InvoiceForPerformance");

describe('statement 함수 테스트', () => {
	test('일반적인 청구서를 올바르게 처리해야 함', () => {
		const expected = `청구 내역 (고객명: BigCo\n` +
			`Hamlet: $650.00 (55석)\n` +
			`As You Like It: $580.00 (35석)\n` +
			`Othello: $500.00 (40석)\n` +
			`총액: $1,730.00\n` +
			`적립 포인트: 47점\n`;
		
		const result = statement(invoices[0], plays);
		expect(result).toBe(expected);
	});
});
