/* 
    * 실행 컨텍스트
    자바스크립트가 왜 그렇게 동작하는지 설명
    실제 동작과는 좀 다르지만 이렇게 이해해도 크게 문제 없음
 */

{
    var name = 'zero'; // (1) 변수 선언 (6) 변수 대입
    function wow(word) { // (2) 변수 언선 (3) 변수 대입
        console.log(word + ' ' + name); // (11)
    }

    function say() { // (4) 변수 선언 (5) 변수 대입
        var name = 'nero'; // (8)
        console.log(name); // (9)
        wow('hello'); // (10)
    }

    say(); // (7)

    // 여기서 결과 값은 nero hello zero

    /* 
        1. 처음 코드를 실행하는 순간 모든 것을 포함하는 전역 컨텍스트 생성(모든 것을 관리하는 환경, 페이지가 종료될 때 까지 유지됨)
        2. 함수를 호출할 때 마다 함수 컨텍스트가 하나씩 더 생김

        * 컨텍스트의 원칙 4가지
        1. 전역 컨텍스트 하나 생성 후, 함수 호출 시 마다 컨텍스트가 생긴다.
        2. 컨텍스트 생성 시 컨텍스트 안에 변수객체(arguments, variable), scope chain, this가 생성됨
        3. 컨텍스트 생성 후 함수가 실행되는데, 사용되는 변수들은 변수 객체 안에서 값을 찾고, 없다면 스코프 체인을 따라 올라가며 찾는다.
        4. 함수 실행이 마무리되면 해당 컨텍스트는 사라진다.(클로져 제외), 페이지가 종요되면 전역 컨텍스트가 사라진다.
     */
    /* 
        * 전역 컨텍스트
        전역 컨텍스트가 생성된 후 두 번째 원칙에 따라 변수객체, scope chain, this가 들어온다.
        전역 컨텍스트는 arguments가 없고, variable은 해당 스코프의 변수들(name, wow, say)

        scope chain(스코프 체인, 자신과 상위 스코프들의 변수 객체)은 자기 자신인 전역 변수객체.
        this - 따로 설정되어 있지 않으면 window
        this를 바꾸는 방법은 new 생성자 호출 또는 함수에 다른 this 값 bind

        -> 일반 함수의 this가 window인 이유(원래 기본적으로 window 이고 new나 bind같은 걸로 this를 바꾸는 것)
     */

    // 전역 컨텍스트를 객체 형식으로 표현
    const globalContext = {
        variableObj: {
            arguments: null,
            variable: ['name', 'wow', 'say']
        },
        scopeChain: ['globalVariableObj'], // 전역변수객체
        this: 'window',
    };
    /* 
        코드를 위에서부터 실행하면 wow, say는 호이스팅 때문에 선언과 동시에 대입이 되고 그 다음 variable의 name에 'zero'가 대입된다.
        variable: [{ name:'zero' },{ wow:Function }, { say:Function } ]
     */
    /* 
        * 함수 컨텍스트
        그 후 (7)번에서 say(); 를 하는 순간 새로운 컨텍스트인 say 함수 컨텍스트가 생성됨. 아까 전역 컨텍스트는 그대로 있음
        arguments는 없고, variable은 name, scope chain은 say 변수 객체와 상위의 전역 변수 객체
        this는 따로 지정해주지 않았으므로 window
     */
    const sayContext = {
        variableObj: {
            arguments: null,
            variable: ['name'], // 초기화 후에 [{name: 'nero'}]
        },
        scopeChain: ['sayVariableObj', 'globalVariableObj'],
        this: 'window'
    };

    /* 
        say()를 호출한 후 위에서부터 차례대로 (8), (9), (10)을 실행
        variable의 name에 nero를 대입하고나서
        console.log(name);이 있다. name 변수는 say context 안에서 찾으면 됨 -> name:'nero'라고 되어있으니
        nero가 콘솔에 찍히고, 그 다음 wow('hello') 차례인데
        sayContext 안에서 wow가 없으니 스코프 체인을 따라 올라가 globalVariableObj에서 찾음
        마침 wow()가 있으니 이걸 호출한다

        (10)번에서 wow('hello')가 호출되었으니 wow 컨텍스트도 생긴다 
        arguments는 word = 'hello'
        scope chain은 wow와 global,
        -> 여기서 중요한 것이 lexical scoping에 따라 wow 함수의 스코프 체인은 선언 시에 이미 정해져 있음.
        따라서 say 스코프는 wow 컨텍스트의 scope chain이 아니다.
        variable은 없고, this는 window
     */

    const wowContext = {
        variableObj: {
            arguments: [{ word: 'hello' }],
            variable: null,
        },
        scopeChain: ['wowVariableObj', 'globalVariableObj'],
        this: 'window'
    };
    /* 
        이러한 컨텍스트가 생긴 후 함수가 실행됨. say 함수는 아직 종료된 게 아님.
        wow()의 console.log(word + ' ' + name)의 word와 name은 wow컨텍스트에서 찾는다.
        word는 arguments에 작성되어있고 name은 없으니 scope chain을 따라 올라가 global에서 찾는다.
        -> hello zero
        wow 함수는 애초에 say 컨텍스트와는 관련이 없었음

        wow('hello') 종료 후 wow 컨텍스트가 사라지고, say()의 실행이 마무리됨
        -> 즉 say로 사라짐
        -> 다 끝났으니 전역 컨텍스트도 사라짐
     */
}

/* 
    * 호이스팅
    변수를 선언하고 초기화했을 때 선언 부분이 최상단으로 끌어올려지는 현상 (초기화 또는 대입 부분은 그대로 남아있음)
    sayWow처럼 함수 표현식이 아니라 함수 선언식일 때는 식 자체가 통쨰로 끌어올려진다.
 */
console.log('-----------------------------------------------');
{
    console.log(zero); // undefined
    sayWow(); // wow
    function sayWow() {
        console.log('wow');
    }
    var zero = 'zero';
}
// 위 코드와 아래 코드는 같다
{
    function sayWow() {
        console.log('wow');
    }
    var zero;
    console.log(zero);
    sayWow();
    zero = 'zero';
}
// BUT 함수표현식으로 작성한 경우엔 에러가 발생함
{
    sayWow(); // (3)
    sayYeah(); // (5) 여기서 대입되기 전에 호출해서 에러
    var sayYeah = function () { // (1) 선언 (6) 대입
        console.log('yeah');
    };
    function sayWow() { // (2) 선언과 동시에 초기화(호이스팅)
        console.log('wow'); // (4)
    }

    {   // 이런 형태로 생성되므로 오류
        const globalContext = {
            variableObj: {
                arguments: null,
                variable: [{ sayWow: Function }, 'sayYeah'],
            },
            scopeChain: ['globalVariableObj'],
            this: window
        };
    }

    // 어.... 뭔소린가 했더니 var sayYeah가 먼저 선언이 되고 그 후에 나중에 function(){} 어쩌고가 대입이 되기 때문에 안된다는 것
}