
## CHAPTER 03 코드에서 나는 악취

## 📚 읽은 내용


### 3.1 기이한 이름
- 변수명, 함수명 잘 골라써라
  
### 3.2 중복 코드
- 같은 코드 구조가 여러 곳에서 반복된다면 하나로 통합해라

### 3.3 긴 함수
- 코드를 짧은 함수들의 모음으로 구성시켜서 끝없이 위임시켜라
- 원래 코드보다 길어지더라도 함수로 구성하자. 의도와 목적을 드러내기 위함.
- 해당 코드가 무엇을 하는지 드러내지 못할수록 함수로 처리하는게 용이

### 3.4 긴 매개변수 목록
- 매개변수가 길어지면 객체로 넘기자 => 보통 변수 3개정도 이상이면 객체로 처리 고려
- 여러개의 함수가 특정 변수에 의존하는 경우에는 함수들을 클래스로 묶어버리는것도 좋다

### 3.5 전역 데이터
- 전역 데이터는 어디서든 접근할 수 있기 때문에 어디서 문제를 일으키는지 파악하기 힘들다
- 가능하면 캡슐화시켜서 데이터가 외부 요소에 의해 오염되지 않도록 하자

### 3.6 가변 데이터
- 불변성 지키자.

### 3.7 뒤엉킨 변경
- 단일책임원칙(SRP)을 지키자
- 서로 다른 맥락을 가지는 코드들은 각각의 모듈로 분리

### 3.8 산탄총 수술
- 공통화되어 있지않고 수정해야할 부분들이 자잘하게 문어발마냥 많은 경우 변경할 부분들을 하나의 모듈로 모아서 관리


#### 뒤엉킨 변경 VS 산탄총 수술
뒤엉킨 변경 => 여러 종류의 코드들이 하나의 모듈이 섞여들어간 경우, 코드를 맥락별로 분리
산탄총 수술 => 여러 종류의 코드들이 여러곳에 흩뿌려져있다면, 코드를 맥락별로 통합

### 3.9 기능 편애
- 변경할 대상들은 따로 모으자
- 최대한 구역 외부끼리 데이터가 전달되어야 하는 상황은 줄이자


### 3.10 데이터 뭉치
- 데이터 클래스 생성해서 사용
- 컴포넌트 여러곳에서 사용되는 공통된 데이터 형태들은 클래스로 묶어주자
- Model 의미하는듯


### 3.11 기본형 집착
- 화폐, 구간, 좌표 등의 포매팅 로직들은 그 로직을 드러내지 말고 캡슐화시켜서 사용해라
- 예를 들어 
```javascript
const number = 1234567;
const usFormattedNumber = new Intl.NumberFormat('en-US').format(number);
```
이런 방식으로 처리하라는 의미인 듯 함.


### 3.12 반복되는 Switch 문
- 다형성으로 분기처리하자

```javascript
class Logger {
    log(message) {
        throw new Error("This method should be overridden.");
    }
}

class InfoLogger extends Logger {
    log(message) {
        console.log(`INFO: ${message}`);
    }
}

class ErrorLogger extends Logger {
    log(message) {
        console.error(`ERROR: ${message}`);
    }
}

class DebugLogger extends Logger {
    log(message) {
        console.debug(`DEBUG: ${message}`);
    }
}

function getLogger(type) {
    switch (type) {
        case 'info':
            return new InfoLogger();
        case 'error':
            return new ErrorLogger();
        case 'debug':
            return new DebugLogger();
        default:
            throw new Error("Invalid logger type.");
    }
}

// 사용 예시
const logger = getLogger('info');
logger.log("This is an informational message.");

```

- 이런 방식으로 처리하면 확실히 알아보기는 쉬울듯하다. 
- 로그 관련 클래스로 만들어봤는데, 만들고 보니 이렇게 처리해두면 output으로 나오는 문구도 일정해질테니 다국어처리할때 좀 더 편해질지도..?


### 3.13 반복문
- 반복문을 파이프라인으로 만들어라 
- for문 같이 명령형 방식으로 반복문을 돌리지 말고 .map, .filter 같이 선언형으로 배열 메서드를 써서 처리하자


### 3.14 성의없는 요소
- 불필요하게 복잡하게 클래스나 함수를 사용한 경우에는 그냥 줄여버려라

```javascript
class ElementHider {
  hide(element) {
    document.querySelector(element).style.display = 'none';
  }
}

const hider = new ElementHider();
hider.hide("#myElement");
```
위와 같은 방법은 

```javascript
function hideElement(element) {
  document.querySelector(element).style.display = 'none';
}

hideElement("#myElement");
```
이렇게 줄여버려라 

### 3.15 추측성 일반화
- 나중에 사용할 것 같아서 만들어놓은 코드더라도 당장 사용하는거 아니면 굳이? 이다. 지우자


### 3.16 임시 필드

- 임시필드와 연관된 필드들은 별도의 클래스로 처리

```javascript
// 변경 전
class Order {
  constructor(basePrice) {
    this.basePrice = basePrice;
    this.discountLevel = 0; // 임시 필드
  }

  calculateFinalPrice() {
    this.setDiscountLevel();
    return this.basePrice * (1 - this.discountLevel);
  }

  setDiscountLevel() {
    if (this.basePrice > 1000) this.discountLevel = 0.1;
    else this.discountLevel = 0.05;
  }
}

// 변경 후
class PriceCalculator {
  constructor(basePrice) {
    this.basePrice = basePrice;
    this.discountLevel = this.calculateDiscountLevel();
  }

  calculateDiscountLevel() {
    return this.basePrice > 1000 ? 0.1 : 0.05;
  }

  calculateFinalPrice() {
    return this.basePrice * (1 - this.discountLevel);
  }
}

class Order {
  constructor(basePrice) {
    this.basePrice = basePrice;
  }

  calculateFinalPrice() {
    const calculator = new PriceCalculator(this.basePrice);
    return calculator.calculateFinalPrice();
  }
}
```


### 3.17 메시지 체인

- 메세지 체인 문제란 객체지향에서 흔히 발생하는 문제 중 하나로, 객체가 다른 객체를 반환하고 반환된 객체가 또 다른 객체를 반환하는 식으로 여러 객체를 통해 길게 체이닝 되는 형식을 말한다. 
- 이런 방식으로 코드가 작성되면 로직 자체가 객체 내부의 복잡한 네비게이션 구조에 의존하게 되는 현상이 발생.

예를 들어

```javascript
class ContactInfo {
    constructor(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}

class Owner {
    constructor(contactInfo) {
        this.contactInfo = contactInfo;
    }

    getContactInfo() {
        return this.contactInfo;
    }
}

class House {
    constructor(owner) {
        this.owner = owner;
    }

    getOwner() {
        return this.owner;
    }
}

class Neighborhood {
    constructor(houses) {
        this.houses = houses;
    }

    getHouses() {
        return this.houses;
    }
}

const phoneNumber = neighborhood.getHouses()[0].getOwner().getContactInfo().phoneNumber;
```

이런 로직이 있을 때, Employee의 Department를 가져오는 방식이나 Department의 Manager를 가져오는 방식이 변경되면 클라이언트 코드도 수정해야한다. 

- 해결 방식으로 위임 숨기기를 제안하는데, 이는 체인 중간의 객체가 최종 객체를 직접 반환하게 하는 방식을 말한다. 

```javascript
class Neighborhood {
    constructor(houses) {
        this.houses = houses;
    }

    // 직접적으로 소유주의 연락처 정보를 얻는 메서드
    getFirstHouseOwnerPhoneNumber() {
        return this.houses[0].getOwner().getContactInfo().phoneNumber;
    }
}

const phoneNumber = neighborhood.getFirstHouseOwnerPhoneNumber();
```
- Neighborhood 객체의 내부 구조에 대한 의존성이 줄어들고, 시스템의 내부 구조가 변경되더라도 클라이언트 코드의 변경 없이 Neighborhood 클래스만 수정하면 되도록 변경됨

### 3.18 중개자

- 17과 비슷한 이야기. 위임을 계속하게 되면 의존성도 강해지니 실제로 일을 하는 객체와 직접 소통하게 처리
- 의미없이 중개만 계속하는 클래스를 경계해서 하는 이야기인듯.


### 3.19 내부자 거래
- 내부 의존성 강화 경계
- 의존성 주입(DI, Dependency Injection), 퍼사드 패턴
- DI => 단순히 함수 내부에서 생성된 중첩함수를 외부로 꺼내서 별도의 모듈처럼 사용하는 것으로, 내부 의존성을 끊어주는 것
- 퍼사드 패턴 => 블록 형식으로 가져다 사용하는 방식, 리액트의 아토믹 패턴과 비슷한듯

```javascript
// 퍼사드 패턴
class ModuleFacade {
    constructor() {
        this.moduleA = new ModuleA();
        this.moduleB = new ModuleB();
    }

    getCombinedData() {
        return this.moduleB.getData() + " and " + this.moduleA.getData();
    }
}

class ModuleA {
    getData() {
        return "Secret Data from A";
    }
}

class ModuleB {
    getData() {
        return "Secret Data from B";
    }
}

const facade = new ModuleFacade();
```




### 3.20 거대한 클래스
- 사이즈가 커지면 중복 가능성도 많아짐.


### 3.21 서로 다른 인터페이스들의 대안 클래스
- 클래스 내부의 인터페이스만 같으면 갈아끼우는것 가능. 
- 인터페이스가 같아질때까지 필요한 동작을 클래스 내부로 밀어 넣는다.

아래의 코드를 
```javascript
class EmailSender {
    sendEmail(recipient, subject, message) {
        console.log(`Sending email to ${recipient}: ${subject} - ${message}`);
    }
}

class SMSSender {
    sendSMS(phoneNumber, messageBody) {
        console.log(`Sending SMS to ${phoneNumber}: ${messageBody}`);
    }
}

// 예시
const emailSender = new EmailSender();
emailSender.sendEmail('example@example.com', 'Hello', 'This is a test email.');

const smsSender = new SMSSender();
smsSender.sendSMS('+123456789', 'This is a test SMS.');
```

이렇게 리팩토링

```javascript
class EmailSender {
    send(recipient, subject, message) {
        console.log(`Sending email to ${recipient}: ${subject} - ${message}`);
    }
}

class SMSSender {
    send(phoneNumber, messageBody) {
        console.log(`Sending SMS to ${phoneNumber}: ${messageBody}`);
    }
}
```

그러면 


```javascript
class MessageSender {
    send(message) {
        throw new Error('send method should be implemented');
    }
}

class EmailSender extends MessageSender {
    send({recipient, subject, message}) {
        console.log(`Sending email to ${recipient}: ${subject} - ${message}`);
    }
}

class SMSSender extends MessageSender {
    send({phoneNumber, messageBody}) {
        console.log(`Sending SMS to ${phoneNumber}: ${messageBody}`);
    }
}
```

이렇게 분리 가능.


### 3.22 데이터 클래스

- 데이터 클래스란 게터, 세터로만 구성된 클래스를 말한다. 
- 데이터를 캡슐화하고 기능을 클래스 내부로 옮겨, 각 객체가 자신의 데이터와 행동을 갖게 하여 각 개체가 스스로를 어떻게 표현하고 다룰지에 대한 책임을 지게 만든다.

```javascript
// 원본 코드
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    this.email = email;
  }
}

const user = new User('Jane Doe', 'jane.doe@example.com');
console.log(user.getName()); 
user.setEmail('doe.jane@example.com'); 

// 리팩토링
class User {
  constructor(name, email) {
    this._name = name;
    this._email = email;
  }

  getName() {
    return this._name;
  }

  getEmail() {
    return this._email;
  }

  // 세터 메소드는 제거하여 해당 필드가 불변임을 보장.
  
  // `User` 클래스의 새로운 메소드로 책임을 추가
  displayUserInfo() {
    console.log(`User: ${this._name}, Email: ${this._email}`);
  }
}

const user = new User('Jane Doe', 'jane.doe@example.com');
user.displayUserInfo(); // 'User: Jane Doe, Email: jane.doe@example.com'

// _name과 _email은 프라이빗 필드로 만들어 변경할 수 없으며, 클래스 외부에서 setter를 사용하여 변경할 수 없도록 처리. 
//  데이터 클래스에 로직을 추가하여 객체의 책임과 행위를 캡슐화하는 것을 권장.
```


### 3.23 상속 포기
- 위임을 통한 상속 포기
- 실제로 사용되지 않는 상속부분을 별도로 분리

```javascript
// 원본 코드
class Bird {
  fly() {
    console.log("I can fly!");
  }

  eat() {
    console.log("I can eat!");
  }

  sleep() {
    console.log("I can sleep!");
  }
}

// '오리'는 '새'의 모든 기능을 상속받지만, '오리'는 'fly' 기능을 사용하지 않는다.
class Duck extends Bird {
  quack() {
    console.log("Quack!");
  }

  fly() {
    // 오리는 날지 않으므로 이 메서드는 사용되지 않는다.
  }
}

const duck = new Duck();
duck.quack();
duck.fly(); // 오리가 이 상속을 사용할 일은 없다

// 리팩토링
class Bird {
  eat() {
    console.log("I can eat!");
  }

  sleep() {
    console.log("I can sleep!");
  }
}

class FlyingBird extends Bird {
  fly() {
    console.log("I can fly!");
  }
}

// 오리는 'Bird'로부터 'eat'와 'sleep'을 상속받고, 'fly'는 위임받지 않는다.
class Duck extends Bird {
  constructor() {
    super(); // Bird 클래스의 생성자 호출
  }

  quack() {
    console.log("Quack!");
  }
}

const duck = new Duck();
duck.quack(); // "Quack!"
duck.eat(); // "I can eat!"

// 필요한 경우 'FlyingBird'의 인스턴스로 위임할 수 있으며,
// 이를 통해 'Duck' 인스턴스에 'fly' 기능을 추가할 수 있다.
const flyingBird = new FlyingBird();
flyingBird.fly(); // "I can fly!"
```



### 3.24 주석
- 주석은 최대한 달지 않도록
- 주석을 달아야겠다는 생각이 들면 우선 주석이 필요없는 코드로 리팩토링 시도



### 📚 느낀점
- 책에서도 이야기하듯이 냄새가 난다고 무조건 리팩토링 가능할것 같다고 무조건 고칠 것은 아니라는 사실을 명심하자. 
- 위 방식을은 정돈해야할 필요가 있는 코드들에 적용할 예시일 뿐
- 리팩토링을 해야할 코드에 대한 구분을 명확히 할 것.

### 📚 공유하고 싶은 부분 (사이트)
