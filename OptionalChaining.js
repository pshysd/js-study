/* 
    옵셔널 체이닝 (?.)
    프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있다.
 */

// 왜 쓰는걸까?
{
    let user = {}; // 주소 정보가 없는 사용자 그니까 빈 객체

    // console.log(user.address.detailAddress) // // TypeError: Cannot read property 'detailAddress' of undefined
}

// 사용자가 여럿 있는데 상세 주소를 기입하지 않은 사용자가 있다고 가정한다면, 에러가 발생할 수 있다.

// querySelect(...) 호출 결과가 null인 경우에도 에러가 발생할 수 있다.
{
    // let html = document.querySelector('.my-element').innerHTML;
}

// 기존에는 && 연산자로 에러처리를 했었다

{
    let user = {}; // 주소 정보가 없는 사용자

    console.log(`&& 연산자로 처리한 결과: ${user && user.address && user.address.detailAddress}`); // undefined
    // user truthy -> user.address truthy -> user.address.detailAddress 접근
    // 아주 꼴뵈기 싫음
}

// 옵셔널 체이닝을 사용한 방법
{
    // ?.은 ?. '앞'의 평가 대상이 undefined나 null이면 평가를 멈추고 undefined를 반환한다.
    let user = {}; // 주소 정보가 없는 사용자
    console.log(`옵셔널 체이닝을 사용한 결과: ${user?.address?.detailAddress}`); // undefined, 에러 발생하지 않음

    user = null;
    console.log(`user가 null이라면?: ${user?.address.detailAddress}`); // undefined
    console.log(`user?.address.detailAddress: ${user?.address.detailAddress}`)
    user = {
        name: 'SH',
        age: 26,
        sex: 'M'
    }

    // console.log(`user가 null이 아닌데 address property가 없을 경우: ${user?.address.detailAddress}`) // 에러발생
}

/* 
    주의사항
    1. 존재하지 않아도 괜찮은 대상에게만 사용해야한다.
    위에서 user는 반드시 있어야하는데 address는 필수 값이 아니므로
    user.address?.street을 사용하는 것이 바람직하다.

    2. ?. 앞의 변수는 꼭 선언되어 있어야 한다.
    user?.address;
    // ReferenceError: user is not defined

    옵셔널 체이닝은 선언이 완료된 변수만을 대상으로 동작한다.
 */