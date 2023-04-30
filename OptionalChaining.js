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
    console.log(`user?.address.detailAddress: ${user?.address.detailAddress}`);
    user = {
        name: 'SH',
        age: 26,
        sex: 'M'
    };

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


// 단락 평가: ?.는 왼쪽 평가 대상에 값이 없으면 즉시 평가를 멈춘다.
{
    let user = null;
    let x = 0;

    user?.sayHi(x++); // 아무 일도 일어나지 않음

    alert(x); // 0, x가 증가하지 않았음

    // user가 null이므로 sayHi가 있든없든 체크할 필요도 없이 그냥 넘어간다
}

// ?.() 와 ?.[]
/* 
    ?.은 연산자가 아니다. 함수나 대괄호와 함께 동작하는 특별한 문법 구조체이다
    syntax constuct << ?? 뭔데
    그냥 문법이라고 하면되지 문법 구조체라니
 */

{
    let user1 = {
        adamin() {
            alert('관리자 계정입니다.');
        }
    };
    let user2 = {};

    user1.admin?.(); // 관리자 계정입니다.
    user2.admin?.();
}

/* 
    두 상황 모두에서 user obj는 존재하기 때문에 admin prop에 .만 사용해 접근
    
    그리고난 후 ?.()를 사용해 admin의 존재 여부를 확인
    user1엔 admin이 정의되어 있기 때문에 제대로 호출되었으나
    user2엔 admin이 정의되어 있지 않기 때문에 그냥 평가가 멈추고 만다.

 */

// . 대신 []를 사용해 prop에 접근하는 경우에 ?.[]를 사용할 수도 있다.

{
    let user1 = {
        firstName: 'SEONGHYEON',
    };

    let user2 = null;

    let key = 'firstName';

    alert(user1?.[key]); // SEONGHYEON
    alert(user2?.[key]); // undefined

    alert(user1?.[key]?.something?.not?.existing); // undefined
}

// delete와 조합해서 사용할 수도 있다.
{
    delete user?.name; // user가 존재할 경우에 user.name을 삭제한다
    //  == if(user) delete user.name; 과 같다는거
}

// ?.은 읽기나 삭제에는 사용할 수 있지만 쓰기에는 사용할 수 없다.
{
    // user가 존재할 경우 user.name에 값을 쓰려는 의도로 아래와 같이 작성
    user?.name = 'Violet'; // SyntaxError: Invalid left-hand side in assignment
    // 에러가 발생하는 이유는 undefined = 'Violet'이 되기 때문
}

/* 
    요       약
    1. obj?.prop - obj가 존재하면 obj.prop을 반환, 아니면 undefined
    2. obj?.[prop] - obj가 존재하면 obj[prop]을 반환, 아니면 undefined
    3. obj?.method() - obj가 존재하면 obj.method()를 호출, 아니면 undefined

    - ?.를 계속 연결해서 체인을 만들면 중첩 프로퍼티들에 안전하게 접근 가능
    - ?.은 ?.왼쪽 평가대상이 없어도 괜찮은 경우에만 선택적으로 사용해야 함.
 */