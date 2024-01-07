/**
 * @param { Object } invoice - 청구 내역 데이터를 담고 있는 객체
 * @param { string } invoice.customer - 고객명
 * @param { Array.<{ playID: string, audience: number }> } invoice.performances - 공연 내역 배열
 * @param { Object } plays - 공연 정보를 담고 있는 객체 (각 playID에 대응하는 정보 포함)
 * @param { string } plays.name - 공연명
 * @param { string } plays.type - 공연 종류
 */
export function statement(invoice, plays) {
	
	/**
	 * @param { Object } aPerformance - 공연 내역
	 * @param { number } aPerformance.audience - 공연 관객 수
	 * @param { string } aPerformance.playID - 공연 정보
	 * @param { Object } play - 공연 정보를 담고 있는 객체 (각 playID에 대응하는 정보 포함)
	 * @returns { number }
	 */
	function amountFor(aPerformance, play) {
		let result = 0;
		
		switch (play.type) {
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
				throw new Error(`알 수 없는 장르: ${play.type}`);
		}
		return result;
	}
	
	let totalAmount = 0;
	let volumeCredits = 0;
	let result = `청구 내역 (고객명: ${invoice.customer}\n`;
	const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;
	
	for (let perf of invoice.performances) {
		const play = plays[perf.playID];
		let thisAmount = amountFor(perf, play)
		
		// 포인트를 적립한다.
		volumeCredits += Math.max(perf.audience - 30, 0);
		// 희극 관객 5명마다 추가 포인트를 제공한다.
		if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
		
		// 청구 내역을 출력한다.
		result += `${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
		totalAmount += thisAmount;
	}
	result += `총액: ${format(totalAmount / 100)}\n`;
	result += `적립 포인트: ${volumeCredits}점\n`;
	return result;
}
