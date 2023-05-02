/* 
    객체 생성하는 법
    1. new 연산자, 생성자 함수에서 배운 new function
    2. 클 라 스

    여기선 클 라 스를 알아본다

    리액트에서 함수로 컴포넌트 만들지만 클 라 스 로도 만드니까 알아두자
 */
// 기본 문법
{
  class MyClass {
    // 여러 메서드를 정의할 수 있음
    constructor() {}
    method1() {}
    method2() {}
    method3() {}
    // ...
  }
  /* 
    이렇게 클래스를 만들고 new MyClass()를 호출하면 내부에서 정의한 메서드가 들어있는 객체가 생성된다.

    객체의 상태를 설정해주는 생성자 메서드 constructor()는 new에 의해 자동으로 호출되므로, 특별한 절차 없이 객체를 초기화할 수 있다.    
  */

  class User {
    constructor(name) {
      this.name = name;
    }

    sayHi() {
      console.log(`hi, ${this.name}`);
    }
  }

  // 사용법:
  let user = new User("John");
  user.sayHi();

  /* 
    new User('John')을 호출하면 다음과 같은 일이 일어난다.
    1. 새로운 객체가 생성
    2. 넘겨받은 인수와 함께 constructor가 자동으로 실행됨. 이 때 인수 'John'이 this.name에 할당됨
   */
}
