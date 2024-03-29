# Chapter 09

## 📚 읽은 내용
- CHAPTER 9
  - **9.1 변수 쪼개기**
  ```js
    let temp = 2 * (height + width);
    console.log(temp);
    temp = height * width;
    console.log(temp);
  ```
  ```js
  const perimeter = 2 * (height + width);
  console.log(perimeter);
  const area = height * width;
  console.log(area);
  ```
  1. 변수를 선언한 곳과 값을 청므 대입하는 곳에서 변수 일므을 바꾼다
  2. 가능하면 이때 불변으로 선언한다
  3. 이 변수에 두 번째로 값을 대입하는 곳 앞까지의 모든 참조(이 변수가 쓰인 곳)를 새로운 변수 이름으로 바꾼다.
  4. 두 번째 대입 시 변수를 원래 이름으로 다시 선언한다
  5. 테스트
  6. 반복한다. 매 반복에서 변수를 새로운 이름으로 선언하고 다음번 대입 때까지의 모든 참조를 새 변수명으로 바꾼다. 이 과정을 마지막 대입까지 반복한다.
  - **9.2 필드 이름 바꾸기**
  ```js
  class Organization {
    get name() {...}
  }
  ```
  ```js
  class Organization {
    get title() {...}
  }
  ```
  1. 레코드의 유효 범위가 제한적이라면 필드에 접근하는 모든 코드를 수정한 후 테스트한다. 이후 단계는 필요없다
  2. 레코드가 캡슐화되지 않았다면 우선 레코드를 캡슐화한다
  3. 캡슐화된 객체 안의 private 필드명을 변경하고, 그에 맞게 내부 메서드들을 수정한다
  4. 테스트
  5. 생성자의 매개변수 중 필드와 이름이 겹치는 게 있다면 함수 선언 바꾸기로 변경한다
  6. 접근자들의 이름도 바꿔준다
  - **9.3 파생 변수를 질의 함수로 바꾸기**
  ```js
  get discountedTotal() { return this._discountedTotal; }
  set discount(aNumber) {
    const old = this._discount;
    this._discount = aNumber;
    this._discountedTotal += old - aNumber; 
  }
  ```
  ```js
  get discountedTotal() {return this._baseTotal - this._discount;}
  set discount(aNumber) {this._discount = aNumber;}
  ```
  1. 변수 값이 갱신되는 지점을 모두 찾는다. 필요하면 변수 쪼개기를 활용해 각 갱신 지점에서 변수를 분리한다.
  2. 해당 변수의 값을 계산해주는 함수를 만든다
  3. 해당 변수가 사용되는 모든 곳에 어서션을 추가하여 함수의 계산 결과가 변수의 값과 같은지 확인한다
  4. 테스트
  5. 변수를 읽는 코드를 모두 함수 호출로 대체한다
  6. 테스트
  7. 변수를 선언하고 갱신하는 코드를 죽은 코드 제거하기로 없앤다.
  - **9.4 참조를 값으로 바꾸기**
  ```js
  class Product {
    applyDiscount(arg) {this._price.amount -= arg;}
  }
  ```
  ```js
  class Product {
    applyDiscount(arg) {
        this._price = new Money(this._price.amount - arg, this._price.currency)
    }
  }
  ```
  1. 후보 클래스가 불변인지, 혹은 불변이 될 수 있는지 확인한다
  2. 각각의 세터를 하나씩 제거한다
  3. 이 값 객체의 필드들을 사용하는 동치성 비교 메서드를 만든다
  - **9.5 값을 참조로 바꾸기**
  ```js
  let customer = new Customer(customerData);
  ```
  ```js
  let customer = customerRepository.get(customerData.id)
  ```
  1. 같은 부류에 속하는 객체들을 보관할 저장소를 만든다 (이미 있다면 생략)
  2. 생성자에서 이 부류의 객체들 중 특정 객체를 정확히 찾아내는 방법이 있는지 확인한다
  3. 호스트 객체의 생성자들을 수정하여 필요한 객체를 이 저장소에서 찾도록 한다. 하나 수정할 때마다 테스트한다
  - **9.6 매직 리터럴 바꾸기**
  ```js
  function potentialEnergy(mass, height) {
    return mass * 9.81 * height
  }
  ```
  ```js
  const STANDARD_GRAVITY = 9.81;
  function potentialEnergy(mass, height) {
    return mass * STANDARD_GRAVITY * height;
  }
  ```
  1. 상수를 선언하고 매직 리터럴을 대입한다
  2. 해당 리터럴이 사용되는 곳을 모두 찾는다
  3. 찾은 곳 각각에서 리터럴이 새 상수와 똑같은 의미로 쓰였는지 확인하여, 같은 의미라면 상수로 대체한 후 테스트한다.
## 📚 느낀점
- 좀 더 깊게 리팩토링에 알 수 있었다.