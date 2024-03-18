# Chapter 07

## 📚 읽은 내용

### 캡슐화

#### 7-1. 레코드 캡슐화 하기

각 모듈이 자신을 제외한 다른 부분에 드러내지 않아야 할 비밀을 얼마나 잘 숨기는 가 === 캡슐화를 얼마나 잘 했는가

레코드(해시)는 연관된 여러 데이터를 직관적인 방식으로 묶을 수 있음. -> 각각 따로 취급할 때보다 훨씬 의미있는 단위로 전달 가능, 계산해서 얻을 수 있는 값, 없는 값에 대한 명확한 구분이 필수
- 레코드를 데이터 클래스로 전환하면 어떻게 저장했는지 숨긴 채 메서드로 제공 가능
- 불분명명함으로 인해 생기는 문제 감소

```javascript
const organization = { name: "Acme Gooseberries", country: "GB" };
```

⬇️

```javascript
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name()    { return this._name; }
  set name(arg) { this._name = arg; }
  get country()    { return this._country; }
  set country(arg) { this._country = arg; }
}
```

#### 7-2. 컬렉션 캡슐화 하기

컬렉션이란? 프로그래밍 언어가 제공하는 값을 담을 수 있는 컨테이너
컬렉션 원본을 외부에서 직접 변경할 수 없도록 함
기본적으로 컬렉션 조작은 메서드로만 제공하고, 접근한 컬렉션을 직접 수정하지 못하도록 해야함
코드베이스에서 필요한 인터페이스만 노출해야하고, 컬렉션 접근 처리 방식이 통일되어야 함

1. 복제본을 반환하는 방법
1. 읽기전용으로 제공하는 방법

```javascript
class Refrigerator {
    constructor() {
    this._grocery = []
    }

    get grocery() {
    return this._grocery
    }

    set grocery(arg) {
    this._grocery = arg
    }
}

const myRefrigerator = new Refrigerator()
myRefrigerator.grocery(myRefrigerator.grocery.concat('Egg'))

const myGroceryCabinet = myRefrigerator.grocery
myGroceryCabinet.push('Tofu')
myRefrigerator.grocery(myGroceryCabinet)

myGroceryCabinet.splice(
    this._grocery.findIndex((item) => item === 'Tofu'),
    1
)

myRefrigerator.grocery(myGroceryCabinet)
```
⬇️

```javascript
class Refrigerator {
    constructor() {
    this._grocery = []
    }

    addGrocery(grocery) {
    this._grocery.push(grocery)
    }

    removeGrocery(arg) {
    this._grocery.splice(
        this._grocery.findIndex((item) => item === arg),
        1
    )
    }
}

const myRefrigerator = new Refrigerator()
myRefrigerator.addGrocery('Egg')
myRefrigerator.addGrocery('Tofu')
myRefrigerator.removeGrocery('Tofu')
```

#### 7-3. 기본형을 객체로 바꾸기

단순 string, number로 사용되던 특정 상태를 모아서 객체로 변경
객체로 바꾸면 함수를 추가 가능해서 객체 내부로 캡슐화가 가능함

```javascript
orders.filter(o => "high" === o.priority || "rush" === o.priority);
```

⬇️

```javascript
orders.filter(o => o.priority.higherThan(new Priority("normal")))
```

#### 7-4. 임시 변수를 질의 함수로 바꾸기

임시 변수를 사용하면 코드 중복을 줄일 수 있고, 값의 의미도 설명할 수 있음

#### 7-5. 클래스 추출하기

하나의 일을 하는 클래스들로만 묶기. -> 단일 책임 원칙

#### 7-6. 클래스 인라인하기

클래스 추출하기와 반대로 같은 책임을 지는 기능들을 하나의 클래스 안에 넣을 수 있음.   
또한, 리팩터링 후 남은 역할이 거의 없을 경우 흡수 가능.


## 📚 느낀점

중첩된 레코드으 경우 너무 복잡해지는 경향이 있는 것 같다!   
임시 변수 같은 경우는 클래스 안에서 사용할 때 효과가 큰 것 같다.   
회사에서 class를 사용하고 있지 않지만, funtion도 하나의 기능을 담당하게 잘 쪼개야 한다.


## 📚 공유하고 싶은 부분 (사이트)

[자바스크립트 컬렉션](https://velog.io/@yesdoing/JavaScript-Collections)
