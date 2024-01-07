/**
 * NOTE: 중첩함수의 경우에는 export가 안되기에 jest로 테스트가 불가능. 외부로 분리시키던가, statement 함수에 의존하여 테스트 되도록 처리.
 */

/**
 * @param { Object } invoice - 청구 내역 데이터를 담고 있는 객체
 * @param { string } invoice.customer - 고객명
 * @param { Array.<{ playID: string, audience: number }> } invoice.performances - 공연 내역 배열
 * @param { Object } plays - 각 playID에 대응하는 공연 정보를 포함하는 객체
 * @param { Object.<string, { name: string, type: string }> } plays - 각 공연 ID에 해당하는 객체. 각 객체는 공연명과 공연 종류를 포함한다.
 */
export function statement(invoice, plays) {
	
	/**
	 * @param { { audience: number, playID: string } } perf - 각 공연 ID에 해당하는 객체. 각 객체는 공연명과 공연 종류를 포함.
	 * @returns { number }
	 */
	function volumeCreditsFor(perf) {
		let volumeCredits = 0;
		volumeCredits += Math.max(perf.audience - 30, 0);
		if ('comedy' === playFor(perf).type)
			volumeCredits += Math.floor(perf.audience / 5);
		return volumeCredits;
	}
	
	/**
	 * @param { Object } aPerformance - 공연 내역
	 * @param { number } aPerformance.audience - 공연 관객 수
	 * @param { string } aPerformance.playID - 공연 ID
	 * @returns { { name: string, type: string } } - 각 공연 ID에 해당하는 객체. 각 객체는 공연명과 공연 종류를 포함.
	 */
	function playFor(aPerformance) {
		return plays[aPerformance.playID];
	}
	
	/**
	 * @param { Object } aPerformance - 공연 내역
	 * @param { number } aPerformance.audience - 공연 관객 수
	 * @param { string } aPerformance.playID - 공연 정보
	 * @param { Object } play - 공연 정보를 담고 있는 객체 (각 playID에 대응하는 정보 포함)
	 * @returns { number }
	 */
	function amountFor(aPerformance) {
		let result = 0;
		
		switch (playFor(aPerformance).type) {
			case 'tragedy':
				result = 40000;
				if (aPerformance.audience > 30) {
					result += 1000 * (aPerformance.audience - 30);
				}
				break;
			case 'comedy':
				result = 30000;
				if (aPerformance.audience > 20) {
					result += 10000 + 500 * (aPerformance.audience - 20);
				}
				result += 300 * aPerformance.audience;
				break;
			default:
				throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
		}
		return result;
	}
	
	let totalAmount = 0;
	let volumeCredits = 0;
	let result = `청구 내역 (고객명: ${invoice.customer}\n`;
	const format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format;
	
	for (let perf of invoice.performances) {
		volumeCredits += volumeCreditsFor(perf);
		
		// 청구 내역을 출력한다.
		result += `${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${perf.audience}석)\n`;
		totalAmount += amountFor(perf);
	}
	result += `총액: ${format(totalAmount / 100)}\n`;
	result += `적립 포인트: ${volumeCredits}점\n`;
	return result;
}
