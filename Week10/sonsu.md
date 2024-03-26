# Chapter 10

## 📚 읽은 내용

### 10.1 조건문 분해하기

```javascript
// 변경 전
if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd))
  charge = quantity * plan.summerRate;
else
  charge = quantity * plan.regularRate + plan.regularServiceCharge;

// 변경 후
function summer() {
    return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}
function summerCharge() {
    return quantity * plan.summerRate;
}
function regularCharge() {
    return quantity * plan.regularRate + plan.regularServiceCharge;
}

if (summer())
  charge = summerCharge();
else
  charge = regularCharge();
```

- 조건식을 별도 함수로 분리하여 의도를 명확하게 드러내는 방식
- template단에 로직을 직접 주입하는 방식을 지양하는 것과 동일한 의도


### 10.2 조건식 통합하기

```javascript
// 변경 전
if (anEmployee.seniority < 2) return 0;
if (anEmployee.monthsDisabled > 12) return 0;
if (anEmployee.isPartTime) return 0;

// 변경 후
function isNotEligibleForDisability() {
    return ((anEmployee.seniority < 2)
        || (anEmployee.monthsDisabled > 12)
        || (anEmployee.isPartTime));
}

if (isNotEligibleForDisability()) return 0;
```

- 비교 조건은 달라도 수행되는 결과값은 동일한 코드에 대한 처리방식
- 해당 조건들이 모두 독립적으로 사용되는지 확인 후 적용 필요

### 10.3 중첩 조건문을 보호 구문으로 바꾸기 

```javascript
// 변경 전
function getPayAmount() {
    let result;
    if (isDead) result = deadAmount();
    else {
        if (isSeparated) result = separatedAmount();
        else {
            if (isRetired) result = retiredAmount();
            else result = normalPayAmount();
        }
    }
    return result;
}

// 변경 후
function getPayAmount() {
    if (isDead) return deadAmount();
    if (isSeparated) return separatedAmount();
    if (isRetired) return retiredAmount();
    return normalPayAmount();
}
```

- 함수의 진입점과 반환점은 하나여야한다 => 순수함수
- 다만 액션함수 즉, 사이드 이펙트를 발생시키는 함수의 경우에는 코드의 명확성을 먼저 챙기도록 하자.
- 가변 변수를 제거하자

### 10.4 조건부 로직을 다형성으로 바꾸기 

```javascript
// 변경 전
switch (bird.type) {
    case '유럽 제비':
        return '보통이다';
    case '아프리카 제비':
        return (bird.numberOfCoconuts > 2) ? '지쳤다' : '보통이다';
    case '노르웨이 파랑 앵무':
        return (bird.voltage > 100) ? '그을렸다' : '예쁘다';
    default:
        return '알 수 없다';
}

// 변경 후
class EuropeanSwallow {
    get plumage() {
        return '보통이다';
    }
}

class AfricanSwallow {
    get plumage() {
        return (this.numberOfCoconuts > 2) ? '지쳤다' : '보통이다';
    }
}

class NorwegianBlueParrot {
    get plumage() {
        return (this.voltage > 100) ? '그을렸다' : '예쁘다';
    }
}

// 2차 변경
// 부모 클래스 정의
class Bird {
    constructor(birdObject) {
        Object.assign(this, birdObject);
    }

    get plumage() {
        return '알 수 없다';
    }
}

// 자식 클래스들
class EuropeanSwallow extends Bird {
    get plumage() {
        return '보통이다';
    }
}

class AfricanSwallow extends Bird {
    get plumage() {
        return (this.numberOfCoconuts > 2) ? '지쳤다' : '보통이다';
    }
}

class NorwegianBlueParrot extends Bird {
    get plumage() {
        return (this.voltage > 100) ? '그을렸다' : '예쁘다';
    }
}

// 팩토리 함수
function createBird(bird) {
    switch (bird.type) {
        case '유럽 제비':
            return new EuropeanSwallow(bird);
        case '아프리카 제비':
            return new AfricanSwallow(bird);
        case '노르웨이 파랑 앵무':
            return new NorwegianBlueParrot(bird);
        default:
            return new Bird(bird);
    }
}
```

- 즉 팩토리 방식으로 처리하되, 내부 로직에 대한 역할을 명확하게 드러내기 위해 다형성으로 처리를 권장하는것
- 그렇다고 무조건적으로 다형성 처리하라는 것은 아니고 기본적인 구조인 if else 와 switch를 사용하되, 내부 로직을 다양하게 활용 가능하다고 생각되면 다형성 처리 필요

#### 다형성
- 간단하게 말해 여러가지 형태로 폴리모프가 가능한 방식. 형태가 많은 성질
- 다양한 타입의 객체들이 같은 메시지에 대해 각각 다른 방식으로 반응할 수 있는 능력

### 10.5 특이 케이스 추가하기

```javascript
// 변경 전
if (aCustomer === '미확인 고객') customerName = '거주자';

// 변경 후
class UnknownCustomer {
    get name() {
        return '거주자';
    }
}
```

- 특정 상황에서만 발생하는 예외적인 조건들을 처리하기 위해 사용. 
- 간단하게 생각해서 예외케이스들을 하나의 함수나 클래스에 몰아넣고 해당 값이 나올 경우를 필터링 해야하는 경우에 만들어둔 함수나 클래스를 사용하는 방식

### 10.6 어서션 추가하기

```javascript
// 변경 전
if (this.discountRate) {
    base = base - (this.discountRate * base);
}

// 변경 후
assert(this.discountRate >= 0);
if (this.discountRate) {
    base = base - (this.discountRate * base);
}
```

- 테스트 코드 느낌으로 사용 => 실제 테스트 코드가 작성된 경우 assert 함수를 굳이 사용할 필요는 없음(코드의 흐름 설명 용도로는 사용할지도 모르겠다)
- 개발 환경에서만 돌아가는 함수
- assert함수는 node에서 직접 지원 [참고](https://nodejs.org/api/assert.html)
- 해당 로직이 어떤 상황에서 동작해야하는 로직인지 알려주는 역할
- 어설션 적용 여부는 실서버에서는 아무런 영향이 있으면 안된다
- 프로그래머가 오류를 일으킬만한 오류에만 어설션 사용 => 사실 테스트 코드 또한 문제가 생길거라 예상되는 부분에만 작성해야함.


### 10.7 제어 플래그를 탈출문으로 바꾸기

```javascript
// 변경 전
for (const p of people) {
    if (!found) {
        if (p === '조커') {
            sendAlert();
            found = true;
        }
    }
}

// 변경 후
for (const p of people) {
    if (p === '조커') {
        sendAlert();
        break;
    }
}
```
- 반복문 내부에서 특정 조건을 만족할때만 실행되도록 처리할 때 플래그 대신 사용
- 반복문 내에서 특정 조건이 충족되었을 때 루프를 조기 종료시키는 것이 목적
- 즉 위 코드에서는 p가 조커인 경우를 만족하면 내부 코드를 실행시키고 반복문을 종료하는게 목표
### 

## 📚 느낀점

## 📚 공유하고 싶은 부분 (사이트)
