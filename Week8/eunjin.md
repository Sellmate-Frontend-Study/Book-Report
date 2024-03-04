# Chatper 08

## 📚 읽은 내용

### 기능 이동

#### 8-1. 함수 옮기기

좋은 소프트웨어 설계의 핵심 -> 모듈성   
모듈성이란 프로그램의 어딘가를 수정하려 할 때, 해당 기능과 깊이 관련된 작은 일부만 이해해도 가능하게 해주는 능력!   
서로 연관된 요소들을 함께 묶고 요소 사이의 연결관계를 쉽게 찾고 이해할 수 있도록 해야함   

- 함수가 자신이 속한 모듈보다 다른 곳에서 더 많이 불릴 때
- 다른 함수 안에서 도우미 역할로 정의된 함수 중, 독립적인 가치가 있을 때

```javascript
function trackSummary(points) {
  function radians(degrees) { ... } // 라디안 값으로 변환

  function distance(p1, p2) { // 두 지점의 거리 계산
    const EARTH_RADIUS = 3959;
    const dLat = radians(p2.lat) - radians(p1.lat);
    const dLon = radians(p2.lon) - radians(p1.lon);
    
    ...
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return EARTH_RADIUS * c
  }


  function calculateDistance() { // 총 거리 계산
    let result = 0;

    for (let i = 0; i < points.length; i++) {
      result += distance(points[i - 1], points[i]);
    }

    return result;
  }

  function calculateTime() { ... } // 총 시간 계산

  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;

  return {
    time: totalTime,
    distance: totalDistance,
    pace,
  }
}
```

⬇️

```javascript
function radians(degrees) { ... } // 라디안 값으로 변환

function distance(p1, p2) { ... } // 두 지점의 거리 계산

function calculateDistance() { // 총 거리 계산
  let result = 0;

  for (let i = 0; i < points.length; i++) {
    result += distance(points[i - 1], points[i]);
  }

  return result;
}

function calculateTime() { ... } // 총 시간 계산

function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;

  return {
    time: totalTime,
    distance: totalDistance,
    pace,
  }
}

```

#### 8-2. 필드 옮기기

주어진 문제에 적합한 데이터 구조를 활용하면 동작 코드는 자연스럽게 단순하고 직관적이게 됨

함수에 어떤 클래스나 객체를 넘길 때마다 또 다른 레코드의 필드도 함께 넘기고 있다면 데이터 위치를 옮길 것!   
함수에 건내지는 데이터 조각들은 상호 관계가 명확하게 드러나도록 한 클래스나 객체에 담는 것이 좋음

```javascript
class Customer {
    get plan() {
        return this._plan;
    }

    get discountRate() {
        returh this._discountRate
    }
}
```

⬇️

```javascript
class Customer {
    get plan() {
        return this._plan;
    }

    get discountRate() {
        returh this.plan.discountRate
    }
}
```

#### 8-3. 문장을 함수로 옮기기

문장들을 함수로 옮기려면 그 문장들이 피호출 함수의 일부라는 확인이 있어야한다. 함수와 같이 사용하는 문장을 함수 안으로 이동

```javascript
result.push(`<p>제목: ${person.photo.title}</p>`)
result.concat(photoData(person.photo))

function photoData(aPhoto) {
    return [
    `<p>위치: ${aPhoto.location}</p>`,
    `<p>날짜: ${aPhoto.date.toDateString()}</p>`,
    `<p>태그: ${aPhoto.tag}</p>`,
    ]
}
```

⬇️

```javascript
result.concat(photoData(person.photo))

function photoData(aPhoto) {
    return [
    `<p>제목: ${aPhoto.title}</p>`,
    `<p>위치: ${aPhoto.location}</p>`,
    `<p>날짜: ${aPhoto.date.toDateString()}</p>`,
    `<p>태그: ${aPhoto.tag}</p>`,
    ]
}
```

#### 8-4. 문장을 호출한 곳으로 옮기기

함수는 추상화의 기본 빌딩 블록!   
여러봇에서 사용하던 기능(둘 이상의 다른 일을 하는 함수)이 새로 만든 곳에서 다르게 동작하게 바뀌어야한다면? (예외처리) -> 달라진 동작만 함수에서 꺼내 새로 만든 곳으로 이동해야한댜.

함수의 기능을 쪼개서 밖으로 이동

```javascript
emitPhotoData(outStream, person.photo)

function emitPhotoData(outStream, photo) {
    outStream.write(`<p>제목: ${photo.title}</p>\n`)
    outStream.write(`<p>위치: ${photo.location}</p>\n`)
}
```

⬇️

```javascript
emitPhotoData(outStream, person.photo)
outStream.write(`<p>위치: ${person.photo.location}</p>\n`)

function emitPhotoData(outStream, photo) {
    outStream.write(`<p>제목: ${photo.title}</p>\n`)
}
```

#### 8-5. 인라인 코드를 함수 호출로 바꾸기
#### 8-6. 문장을 슬라이드 하기
#### 8-7. 반복문 쪼개기
#### 8-8. 반복문을 파이프라인으로 바꾸기
#### 8-9. 죽은 코드 제거하기

## 📚 느낀점

## 📚 공유하고 싶은 부분 (사이트)
