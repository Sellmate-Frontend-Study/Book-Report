# Chatper 05, 06

## 📚 읽은 내용

### 리팩터링 기법

이름 | 개요 | 배경 | 절차 | 예시

#### 6-1. 함수 추출하기

1. 어떤 일을 하는지 파악한다.
2. 독립된 함수로 추출한다.
   - 코드가 대여섯 줄을 넘어가면 추출할 수 있는지 확인.
   - 추출하지 못한다면 주석을 꼭 달 것!
   - 일단 추출해보고, 효과가 있어보이는지 팀원들과 상의 하면 좋을 것 같다.
   - 일단 함수를 중첩으로 만들고 밖으로 꺼내야 할 때가 오면 함수 옮기기를 실행.
   - 매개변수로 전달하는 것이 좋음.
   - 추출한 함수에서만 사용하는 변수는 안으로 옮긴다.
   - 추출한 함수에서 값이 변하는 값들은 주의해야함.
4. 목적에 맞는 이름을 붙인다.
   - 무엇을 하는지 드러나는 이름.
   - 이름이 떠오르지 않는다면 함수로 추출하면 안 된다는 신호.
```javascript
function printBanner() {
  console.log('**********************');
  console.log('******* 고객 채무 *******);
  console.log('**********************');
};

function printDetail(invoice, outstanding) {
  console.log(`고객명 ${invoice.customer}`);
  console.log(`채무액 ${outstanding}`);
  console.log(`마감일 ${invoice.dueDate.toLocaleDateString()}`);
};

function printOwing(invoice) {

  printBanner();

  let outstanding = 0;

  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  printDetail(invoice, outstanding);
}
```

#### 6-2. 함수 인라인하기
#### 6-3. 변수 추출하기
#### 6-4. 변수 인라인하기
#### 6-5. 함수 선언바꾸기
#### 6-6. 변수 캡슐화하기
#### 6-7. 변수 이름 바꾸기
#### 6-8. 매개변수 객체 만들기
#### 6-9. 여러 함수를 클래스로 묶기
#### 6-10. 여러 함수를 변환 함수로 묶기
#### 6-11. 단계 쪼개기

## 📚 느낀점

## 📚 공유하고 싶은 부분 (사이트)
