## CHAPTER 03 코드에서 나는 악취

## 📚 읽은 내용
- CHAPTER 5
- CHAPTER 6.1, 6.2, 6.3
  - 변수 추출하기
    ```js
        function pirintOwing(invoice) {
            printBanner();
            let outstanding = calcOutStanding();

            console.log(`고객명 ${invoice.customer}`)
            console.log(`채무액 ${outstanding}`)
        }

        👇

        function pirintOwing(invoice) {
            printBanner();
            let outstanding = calcOutStanding();
            printDetails(outsanding)

            function printDetails(outstanding) {
                console.log(`고객명 ${invoice.customer}`)
                console.log(`채무액 ${outstanding}`)
            }
        }
    ```
      - 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙인다
      - 추출할 코드를 원본 함수에서 복사하여 새 함수에 붙여넣는다
      - 추출한 코드 중 원본 함수의 지역 변수를 참조하거나 추출한 함수의 유효범위를 벗어나는 변수는 없는 지 검사한다. 있다면 매개변수로 전달한다.
      - 변수를 다 처리했다면 컴파일
      - 원본 함수에서 추출한 코드 부분을 새로 만든 함수를 호출하는 문장으로 바꾼다
      - 테스트
      - 다른 코드에 방금 추출한 것과 똑같거나 비슷한 코드가 없는지 살핀다. 있다면 방금 추출한 새 함수를 호출하도록 바꿀 지 검토한다
  - 함수 인라인하기
    ```js
    function getRating(driver) {
        return moreThanFiveLateDeliveries(driver) ? 2 : 1;
    }

    fuction moreThanFiveLateDeliveries(driver) {
        return (driver.numberOfLateDeliveries > 5) ? 2 : 1;
    }

    👇

    function getRating(driver) {
        return (driver.numberOfLateDeliveries > 5) ? 2 : 1
    }
    ```
      - 다형 메서드인지 확인한다
      - 인라인할 함수를 호출하는 곳을 모두 찾는다
      - 각 호출문을 함수 본문으로 교체한다
      - 하나씩 교체할 때마다 테스트
      - 함수 정의를 삭제한다
  -  변수 추출하기
    ```js
        return order.quantity * order.itemPrice - Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 + Math.min(order.quantity * order.itemPrice * 0.1, 100)

        👇

        const basePrice = order.quantity * order.itemPrice;
        const quantityDiscount = Math.max(0,order.quantity - 500) * order.itemPrice * 0.05;
        const shipping = Math.min(basePrice * 0.1, 100);
        return basePrice - quantityDiscount + shipping;
    ```
        - 추출하려는 표현식에 부작용은 없는지 확인한다
        - 불변 변수를 하나 선언하고 일므을 붙일 표현식의 복제본을 대입한다
        - 원본 표현식을 새로 만든 변수로 교체한다
        - 테스트
        - 표현식을 여러 곳에서 사용한다면 각각을 새로 만든 변수로 교체한다. 하나 교체할 때마다 테스트한다.
### 📚 느낀점
- 6.1에서 함수명은 어떻게가 아닌 무엇을 하는지가 드러나야 한다라는 말이 공감됐다.
- 내가 현재까지 진행했던 리팩터링 한 방식이 어느정도 맞았다고 생각되서 좋았다 !