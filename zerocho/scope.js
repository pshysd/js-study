// 함수의 범위

{
    // 전역 변수
    var x = 'global';
    function ex() {
        var x = 'local';
        x = 'change';
    }
    ex(); // x를 바꿔본다
    console.log(`x: ${x}`); // 여전히 'global'이 출력됨
}

/*
  위의 상황처럼 지역 변수는 전역 변수에 영향을 줄 수 없다 -> 함수 스코프 때문
  함수 안에서 선언된 변수는 해당 함수 안에서만 사용 가능
  => var x = 'local'은 ex() 안에서만 그 데이터가 사용이 가능하다.
  => x = 'change'도 역시 ex() 내부의 지역 변수 x를 바꾸는 것
*/

{
    var x = 'global';
    function ex() {
        x = 'change';
    }
    ex();
    console.log(`x: ${x}`); // change가 출력됨
}

/* 
    아까와는 달리 ex() 내부에 var x를 선언하지 않고 x = 'change'를 했더니 전역 변수가 바뀌었다.
    => JS는 변수의 범위를 호출한 함수의 지역 스코프부터 전역 변수들이 있는 전역 스코프까지 점차 넓혀가며 찾기 때문

    => ex() 범위 안에 x가 없기 때문에 전역 스코프의 x를 찾아서 변경함
 */

/* 
    * 스코프 체인

    내부 함수에서는 외부 함수의 변수에 접근 가능하지만 외부 함수에서는 내부 함수의 변수에 접근할 수 없다.
    또한 모든 함수들은 전역 객체에 접근할 수 있음
 */

{
    var name = 'zero';
    function outer() {
        console.log('외부', name);
        function inner() {
            var enemy = 'nero';
            console.log('내부', name);
        }
        inner();
    }
    outer();
    console.log(`enemy: ${enemy}`); // undefined
}

/* 
    inner()는 name을 찾기 위해 먼저 자기 자신의 스코프에서 찾고 없으면 한 단계 올라가 outer()에서 찾고,
    없으면 다시 올라가 전역 스코프에서 찾는다.
 */

/* 
    * 렉시컬 스코핑
    스코프는 함수를 호출할 때가 아니라 선언할 때 생긴다. 호 출 XXXX 선 언 OOOO
    정적 스코프라고도 불린다
*/

{
    var name = 'zero';
    function log() {
        console.log(name);
    }

    function wrapper() {
        name = 'nero';
        log();
    }
    wrapper(); // nero
}

{
    var name = 'zero';
    function log() {
        console.log(name);
    }

    function wrapper() {
        var name = 'nero';
        log();
    }
    wrapper(); // zero
}

/* 
    왜 zero가 나왔을까 ?
    log()의 name은 wrapper()의 name이 아니라 전역 변수 name을 가리키고 있기 때문.

    함수를 처음 선언하는 순간, 함수 내부의 변수는 자기 스코프로부터 가장 가까운 곳(상위 범위에서)에 있는 변수를 계속 참조하게 됨.
    => 위의 예시에서는 log() 함수안의 name 변수는 선언 시 가장 가까운 전역 변수 name을 참조하게 되는 것
    그러므로 wrapper 안에서 log를 호출해도 지역변수 name='nero'를 참조하는 게 아니라 그대로 전역변수 name의 값인 nero가 나온다.

    무슨 짓을 해도 log()가 한번 선언된 이상, 전역 변수를 가리키게 되어있는 name 변수가 다른 걸 가리키게 할 수는 없다.
    
    유일한 방법은 전역 변수를 다른 값으로 바꾸는 것. -> 실행 컨텍스트를 공부
 */

/*
  전역 변수를 만드는 일은 지양해야 함.
  이유: 변수가 섞일 수 있기 때문...

  간단한 해결 방법은 전역 변수 대신 한 번 함수 안에 넣어 지역 변수로 만드는 것 or obj의 prop으로 만드는 것
*/

{
    var obj = {
        x: 'local',
        y: function () {
            alert(this.x);
        }
    };
}

/* 
    이렇게 하면 obj.x, obj.y() 이렇게 접근해야 하기 때문에 섞일 염려가 없음 <- namespace를 만든다고 함
    이 방식의 단점: 누군가 고의적으로 x와 y를 바꿀 수 있다.
    obj.x = 'hacked'라고 하면 그냥 바뀌어버림

    해결법
 */

{
    var another = function () {
        var x = 'local';
        function y() {
            alert(x);
        }
        return { y: y };
    };

    var newScope = another();
}
{
    var newScope = (function () {
        var x = 'local';
        return {
            y: function () {
                alert(x);
            }
        };
    })();
}