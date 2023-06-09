/* 
    테스트는 왜 해야 하는가?
    개발 중엔 콘솔 창 등을 이용해 실제 실행 결과가 기대했던 결과와 같은지 계속 비교하면서 원하는 기능이 잘 구현되고 있는지 확인해야하는데

    코드를 수동으로 '재실행'하면서 테스트를 하면 놓치기가 쉽다.
    ex) 함수 f를 구현 중인데 f(1)이 잘 됐는데 f(2)가 안됐다. 고치고나니 f(2)가 됐다. 근데 고쳐서 f(1)도 잘 되는지 확인해야하는데 이런 경우가 한 두개가 아니라면?
    -> 테스트 자동화 해야함
*/

// Behavior Driven Development(BDD): test, document, example을 한데 모아놓은 개념

// 거듭제곱 함수와 명세서: x를 n번 곱해주는 함수 pow(x,n)을 구현한다고 가정(n은 자연수이고 n >= 0)

// 명세서(specification -> spec) 구현
describe('pow', () => {
    /* 
        it('주어진 숫자의 n 제곱', () => {
            assert.equal(pow(2, 3), 8);
        });
    */
    /* 
        it('2를 세번 곱하면 8입니다.', () => {
            assert.equal(pow(2, 3), 8);
        });
    
        it('3을 네번 곱하면 81입니다.', () => {
            assert.equal(pow(3, 4), 81);
        });
    */
    const makeTest = (x) => {
        let expected = x * x * x;
        it(`${x}를 세번 곱하면 ${expected} 입니다.`, () => {
            assert.equal(pow(x, 3), expected);
        });
    };

    for (let x = 1; x <= 5; x++) {
        makeTest(x);
    }
})
    /*
스펙은 세 가지 구성 요소로 이루어진다.
describe('title'), () => {...}: 구현하고자 하는 기능에 대한 설명이 들어간다. 여기서는 pow()가 어떤 동작을 하는지에 대한 설명

it('유스케이스 설명', () => {...}): it()의 첫번째 인수엔 특정 유스케이스에 대한 설명이 들어간다. 설명은 누구나 읽을 수 있고 이해할 수 있는 자연어로 적어준다. 두번째 인수엔 테스트 함수가 들어간다.

assert.equal(value1, value2): 기능을 제대로 구현했다면 it 블록 내의 코드 assert.equal(value1, value2)가 에러없이 실행된다.

함수 assert.*는 pow가 예상한대로 동작하는지 확인해준다. 위 예시에선 assert.equal이 사용되었는데, 인수끼리 동등 비교했을 때 다르다고 판단되면 error를 뱉음

스펙은 실행 가능하다. 실행 시 it 블록 안의 테스트가 실행된다.
*/
