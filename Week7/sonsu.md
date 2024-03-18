# Chapter 07

## 📚 읽은 내용

### 용어 정리

#### Record
- 레코드는 여러 필드 또는 속성으로 이루어진 데이터 구조. 이 필드들은 각각 데이터의 한 조각을 저장.
- 객체와 유사하지만, 레코드는 주로 데이터 저장에 초점을 맞추며, 클래스 기반의 객체와 달리, 특정 행동(메서드)보다는 구조화된 상태(필드)에 중점을 둔다.
- 자바스크립트의 객체는 속성과 메서드를 모두 포함할 수 있으며, 속성을 동적으로 추가하거나 제거할 수 있는 유연한 데이터 구조를 가진다.

##### Collection

- 컬렉션은 여러 요소들을 그룹화하고 관리하는 데이터 구조.
- 자바스크립트에서는 Array, Map, Set 등의 컬렉션 타입을 제공
  - Array: 동적인 크기를 갖고, 다양한 타입의 값을 순차적으로 저장할 수 있는 컬렉션입니다. 인덱스로 개별 요소에 접근할 수 있음.
  - Map: 키-값 쌍을 저장하는 컬렉션으로, 키로 사용될 수 있는 타입에 제한이 없으며, 요소들은 삽입된 순서를 유지. 
  - Set: 각 요소가 유일한 값을 가지는 컬렉션으로, 중복된 값을 저장하지 않는다.
- 자바스크립트의 배열은 동적 배열의 형태로, push 메서드와 같은 내장 메서드를 통해 사이즈를 자유롭게 조절 가능.

### 7.1 레코드 캡슐화하기

- 불변 데이터의 경우에는 레코드 사용. 가변 데이터의 경우에는 객체 사용
- 게터와 세터같이 접근 방식에 제한을 두는 것으로 데이터 관리 위험성 감소.
- 게터는 ReadOnly 방식으로 사용하는 등.

### 7.2 컬렉션 캡슐화하기
```javascript
// 캡슐화 이전
class Employee {
  constructor(name) {
    this.name = name;
    this.courses = []; // 직원이 수강하는 코스 목록
  }

  // 코스 목록을 직접 반환
  getCourses() {
    return this.courses;
  }

  addCourse(course) {
    this.courses.push(course);
  }

  removeCourse(course) {
    const index = this.courses.indexOf(course);
    if (index > -1) {
      this.courses.splice(index, 1);
    }
  }
}

// 사용 예
const employee = new Employee("John Doe");
employee.courses.push("Software Engineering"); // 직접 접근하여 수정


// 캡슐화 이후
class Employee {
  constructor(name) {
    this.name = name;
    this._courses = []; // 프라이빗 필드로 변경
  }

  // 코스 목록의 복사본을 반환
  getCourses() {
    return [...this._courses];
  }

  addCourse(course) {
    this._courses.push(course);
  }

  removeCourse(course) {
    const index = this._courses.indexOf(course);
    if (index > -1) {
      this._courses.splice(index, 1);
    }
  }
}

// 사용 예
const employee = new Employee("John Doe");
employee.addCourse("Software Engineering"); // 메서드를 통해 코스 추가
```
- 컬렉션을 캡슐화하면 컬렉션을 수정하는 메서드를 통해서만 컬렉션을 수정할 수 있게 된다.
- 컬렉션 반환시 복사본을 반환함으로써 원본 컬렉션에 불변성 적용
- Vue를 사용하는 상태에서 클래스 내부에서 
- 컬렉션을 수정하는 메서드를 직접 제공하는 경우, 클래스 인스턴스에는 반응형이 적용되더라도 클래스 내부에서는 반응형이 적용되지 않기 때문에 문제가 발생할 여지가 존재.
- 사용한다면 클래스 내부에 액션 함수를 두되, 게터에서만 해당 액션 함수들을 사용하는 방식으로 쓰던가, 클래스 내부에는 게터만 두는 것으로 사실상 데이터 변환 용도로만 사용 필요.
- 이런 방식보다 그냥 컴포저블에서 함수끼리 붙이는 방식으로 처리하면 되는거 아닌가 하는 생각이 계속 드는 중.

### 7.3 기본형을 객체로 바꾸기
### 7.4 임시 변수를 질의 함수로 바꾸기
### 7.5 클래스 추출하기
### 7.6 클래스 인라인하기
### 7.7 위임 숨기기
### 7.8 중개자 제거하기
### 7.9 알고리즘 교체하기
```javascript
// 기존 코드
function foundPerson(people) {
  for (let i = 0; i < people.length; i++) {
    if (people[i] === "Don") {
      return "Don";
    }
    if (people[i] === "John") {
      return "John";
    }
    if (people[i] === "Kent") {
      return "Kent";
    }
  }
  return "";
}

// 수정된 코드
function foundPerson(people) {
  const candidates = ["Don", "John", "Kent"];
  return people.find(p => candidates.includes(p)) || "";
}
```
- 사실상 더 간결하고 읽기 쉬운 코드로 변경하는 일련의 과정을 뭉뚱그려 말하는 듯. 
## 📚 느낀점

## 📚 공유하고 싶은 부분 (사이트)
