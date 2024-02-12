# Chatper 05, 06

## 📚 읽은 내용

### 리팩터링 기법

이름 | 개요 | 배경 | 절차 | 예시

#### 6-1. 함수 추출하기

1. 어떤 일을 하는지 파악한다.
1. 독립된 함수로 추출한다.
   - 코드가 대여섯 줄을 넘어가면 추출할 수 있는지 확인.
   - 추출하지 못한다면 주석을 꼭 달 것!
   - 일단 추출해보고, 효과가 있어보이는지 팀원들과 상의 하면 좋을 것 같다.
   - 일단 함수를 중첩으로 만들고 밖으로 꺼내야 할 때가 오면 함수 옮기기를 실행.
   - 매개변수로 전달하는 것이 좋음.
   - 추출한 함수에서만 사용하는 변수는 안으로 옮긴다.
   - 추출한 함수에서 값이 변하는 값들은 주의해야함.
1. 목적에 맞는 이름을 붙인다.
   - 무엇을 하는지 드러나는 이름.
   - 이름이 떠오르지 않는다면 함수로 추출하면 안 된다는 신호.

```javascript
function printOwing(invoice) {
   console.log('*********************');
   console.log('****** 고객 채무 ******');
   console.log('*********************');

   let outstanding = 0;

   for (const o of invoice.orders) {
      outstanding += o.amount;
   };

   const today = Clock.today;
   invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

   console.log(`고객명 ${invoice.customer}`);
   console.log(`채무액 ${outstanding}`);
   console.log(`마감일 ${invoice.dueDate.toLocaleDateString()}`);
}
```
 ⬇️
```javascript
function printBanner() {
   console.log('*********************');
   console.log('****** 고객 채무 ******');
   console.log('*********************');
};

function printDetail(invoice, outstanding) {
   console.log(`고객명 ${invoice.customer}`);
   console.log(`채무액 ${outstanding}`);
   console.log(`마감일 ${invoice.dueDate.toLocaleDateString()}`);
};

function recordDueDate(invoice) {
   const today = Clock.today;
   invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
};

function calculateOutstanding(invoice) {
   let outstanding = 0;
   for (const o of invoice.orders) {
      outstanding += o.amount;
   };
   return outstanding;
};

function printOwing(invoice) {
   printBanner();

   calculateOutstanding(invoice);

   recordDueDate(invoice);

   printDetail(invoice, outstanding);
}
```

#### 6-2. 함수 인라인하기

1. 다형 메서드인지 확인.
   - 서브 클래스에서 오버라이드 하는 메서드는 인라인 하면 안 된다.
1. 인라인 할 함수를 호출하는 곳을 모두 찾아서 각 호출문을 함수 본문으로 교체.
1. 교체 할 때마다 테스트.
1. 기존 함수 삭제.

```javascript
function rating(aDriver) {
   return moreThanFiveLateDelivers(aDriver) ? 2 : 1
}

function moreThanFiveLateDelivers(dvr) {
   returjn dvr.numberOfLateDelivers > 5
}
```
⬇️

```javascript
function rating(aDriver) {
   return aDriver.numberOfLateDelivers > 5 ? 2 : 1
}
```

#### 6-3. 변수 추출하기

1. 추출하려는 표현식에 부작용 없는지 확인.
1. 불변 변수를 하나 선언하고 이름을 붙일 표현식의 복제본 대입.
1. 원본 표현식을 새로 만든 변수로 교체.
1. 테스트.
1. 표현삭울 여러 곳에서 사용한다면, 각각을 새로 만든 변수로 교체. (교채 시, 테스트 필수)

```javascript
function price(order) {
   return order.quantity * order.itemPrice - Math.max(0, order.quantity - 500) * order.itemPrice * 0.5 + Math.min(order.quantity * order.itemPrice * 0.1 , 100)
}
```
⬇️

```javascript
function price(order) {
   const basePrice = order.quantity * order.itemPrice
   const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.5
   const shipping = Math.min(basePrice * 0.1 , 100)
   return basePrice -  quantityDiscount + shipping
}
```

#### 6-4. 변수 인라인하기

- 밖으로 뺀 변수가 원래 표현식과 다를바가 없을 경우 인라인 한다.
  
#### 6-5. 함수 선언바꾸기

1. 함수 본문에서 제거 대상 매개변수를 참조하는 곳을 확인. 
1. 매서드 선언을 원하는 형태로 변경.
1. 기존 메서드 선언을 원하는 형태로 변경.
1. 테스트.

#### 6-6. 변수 캡슐화하기

1. 변수로의 접근과 갱신을 전담하는 캡슐화 함수들을 만듦.
1. 정적 검사 수행.
1. 변수를 직접 참조하던 부분을 모두 적절한 캡슐화 함수 호출로 변경. (+테스트)
1. 변수의 접근 범위 제한.
1. 테스트.

예시로 변수에 값 대입 함수가 나왔다.
변수에 대한 getter, setter 함수를 만들어 캡슐화를 진행

#### 6-7. 변수 이름 바꾸기
#### 6-8. 매개변수 객체 만들기
#### 6-9. 여러 함수를 클래스로 묶기
#### 6-10. 여러 함수를 변환 함수로 묶기
#### 6-11. 단계 쪼개기

## 📚 느낀점

## 📚 공유하고 싶은 부분 (사이트)
