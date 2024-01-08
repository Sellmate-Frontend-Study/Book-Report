const invoices = require("../MockData/invoices.json");
const plays = require("../MockData/plays.json");
const { statement } = require("../Example/InvoiceForPerformance");

describe('공연 청구 내역 생성', () => {
	test('다양한 공연에 대한 청구 내역 생성', () => {
		const expected = `청구 내역 (고객명: BigCo\n` +
			`Hamlet: $650.00 (55석)\n` +
			`As You Like It: $580.00 (35석)\n` +
			`Othello: $500.00 (40석)\n` +
			`총액: $1,730.00\n` +
			`적립 포인트: 47점\n`;
		
		const result = statement(invoices[0], plays);
		expect(result).toEqual(expected);
	});
});
