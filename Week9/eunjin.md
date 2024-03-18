# Chapter 09

## 📚 읽은 내용

### 데이터 조직화

#### 9-1. 변수 쪼개기

```javascript
let temp = 2 * (height + width);
temp = height * width;
```

⬇️

```javascript
const perimeter = 2 * (height + width);
const area = height * width;
```

변수에 대입이 두 번 이상 이뤄진다면 여러가지 역할을 수행한다는 표시다. 함수와 마찬가지로 역할 하나당 변수 하나씩이다.

#### 9-2. 필드 이름 바꾸기

이름을 잘 짓자   
이름을 변경할 땐, 이전 이름도 호환이 될 수 있게 변경해야한다.

#### 9-3. 파생 변수를 질의 함수로 바꾸기

```javascript
get discountedTotal() {
  return this._discountedTotal; 
}
set discount(aNumber) {
  const old = this._discount;
  this._discount = aNumber;
  this._discountedTotal += old - aNumber;
}
```

⬇️

```javascript
get discountedTotal() {
  return this._baseTotal - this._discount; 
}
set discount(aNumber) {
  this._discount = aNumber;
}
```

가변 데이터의 유효범위를 확실하게 정하여 다른 값에 영향을 주는 것을 방지한다. 위의 before 예시에서 set discount 이 setter는 getter까지 변경을 시켰다. 하지만 after에서 분리하여 더 이상 사이드 이팩트가 발생하지 않는다.

#### 9-4. 참조를 값으로 바꾸기

```javascript
class Product {
  applyDiscount(arg) {
    this._price.amount -= arg;
  }
}
```

⬇️

```javascript
class Product {
  applyDiscount(arg) {
    this._price = new Money(this._price.amount - arg, this._price.currency)
  }
}
```

값이냐, 참조냐는 내부 객체의 속성을 갱신하는 방법에 따라 나뉜다.   
값은 새로운 속성을 담은 객체를 통째로 갱신하고, 참조는 속성만 변경한다.   
데이터 갱신시, 값으로 만들어 변경하면 사이드 이펙트를 걱정하지 않아도 된다. 또한 분산시스템, 동시성 시스템에 유용하다.

#### 9-5. 값을 참조로 바꾸기

```javascript
let customer = new Customer(customerData)
```

⬇️

```javascript
let customer = customerRepository.get(customerData.id)
```

위와 반대의 경우, 값을 복제하여 변경하는 일이 많아 데이터 갱신 시, 복제한 모든 곳을 전부 바꿔줘야 하는 번거로움이 있을 수 있다.   
이럴 땐, 값을 참조로 변경할 수 있다.

#### 9-6. 매직 리터럴 바꾸기

```javascript
const potentialEnergy = (mass, height) => {
    return mass * height * 9.81
}
```

⬇️

```javascript
const STANDARD_GRAVITY = 9.81

const potentialEnergy = (mass, height) => {
    return mass * height * STANDARD_GRAVITY
}
```

의미를 잘 알 수 있도록 상수를 부여해 사용할 수 있다. `const ONE = 1` 이런건 의미가 없다! 의미를 전달해야하는 곳에만 사용하자~ 남발 금지

## 📚 느낀점

## 📚 공유하고 싶은 부분 (사이트)
