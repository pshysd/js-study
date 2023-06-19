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

{
  // 클래스는 함수의 한 종류이다.
  class User {
    constructor(name) {
      this.name = name;
    }

    sayHi() {
      console.log(this.name);
    }
  }

  // User가 함수라는 증거
  console.log(typeof User); // function

  /* 
      class User {...} 문법 구조가 하는 일
      1. User라는 이름을 가진 함수를 만든다. 함수 본문은 생성자 메서드 constructor에서 가져온다. 생성자 메서드가 없으면 본문이 비워진 채로 함수가 만들어짐.
      2. sayHi같은 클래스 내에서 정의한 메서드를 User.prototype에 저장한다.
  */

  // 정확히는 생성자 메서드와 동일
  console.log(User === User.prototype.constructor); // true

  // 클래스 내부에서 정의한 메서드는 User.prototype에 저장됨.
  console.log(User.prototype.sayHi);

  // 현재 프로토타입에는 메서드가 두개
  console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
}

/* 
  클래스는 Syntactic sugar가 아니다 . . .
 */
{
  // 1. 생성자 함수
  function User(name) {
    this.name = name;
  }

  // 모든 함수의 프로토타입은 'constructor' 프로퍼티를 기본으로 갖고 있기 때문에 contructor 프로퍼티를 명시적으로 만들 필요가 없다.

  // 2. prototype에 메서드를 추가한다.
  User.prototype.sayHi = function () {
    console.log(this.name);
  };

  // 사용법:
  let user = new User("john");
  user.sayHi();
}
{
  /* 
    생성자 함수로 객체를 만드는 것과 클래스로 만드는 것엔 큰 차이가 있다.

    1. class로 만든 함수엔 특수 내부 프로퍼티인 [[IsClassConstructor]]: true가 이름표처럼 붙는다. 이것만으로도 두 방법엔 분명한 차이가 있음을 알 수 있다
    -> 클래스 생성자를 new와 함께 호출하지 않으면 에러가 발생하는데 이 때 [[ISClassConstructor]]: true가 사용된다.
   */
  class User {
    constructor() {}
  }
  console.log(typeof User); // User의 타입은 함수이긴 하지만 그냥 호출할 수는 없다.
  // User(); // TypeError: Class constructor User cannot be invoked without 'new'
  console.log(User); // class User {...}

  /*
    2. 클래스에 정의된 메서드는 열거할 수 없다.(non-enumerable) 클래스의 prototype 프로퍼티에 추가된 메서드의 enumerable 플래그는 false이다.
    for ... in 으로 객체를 순회할 때, 메서드는 순회 대상에서 제외하고자 하는 경우가 많으므로 이 특징은 매우 유용
    3. 클래스는 항상 strict mode로 실행된다. 클래스 생성자 안 코드 전체엔 자동으로 엄격 모드가 적용된다.
   */
}

{
  // 클래스 표현식
  // 기명 함수 표현식과 유사하게 클래스 표현식에도 이름을 붙일 수 있다.
  let User = class {
    sayHi() {
      console.log("안녕하세요.");
    }
  };
}

{
  // 클래스 표현식에 이름을 붙이면, 이 이름은 오직 클래스 내부에서만 사용할 수 있다.
  let User = class MyClass {
    sayHi() {
      console.log(MyClass); // MyClass라는 이름은 오직 클래스 안에서만 사용할 수 있다.
    }
  };

  new User().sayHi(); // 원하는대로 MyClass의 정의를 보여준다.

  // console.log(MyClass); // ReferenceError: MyClass is not defined, MyClass는 클래스 밖에서 사용 불가능
}

{
  // 클래스를 동적으로 생성하는 것도 가능하다.
  function makeClass(phrase) {
    // 클래스를 선언하고 이를 반환함
    return class {
      sayHi() {
        console.log(phrase);
      }
    };
  }

  // 새로운 클래스를 만듦
  let User = makeClass("안녕하세요");

  new User().sayHi(); // 안녕하세요.
}

{
  // getter와 setter
  class User {
    constructor(name) {
      // setter 활성화
      this.name = name;
    }

    get name() {
      return this._name;
    }

    set name(value) {
      if (value.length < 4) {
        console.log("이름이 너무 짧습니다.");
        return;
      }
      this._name = value;
    }
  }

  let user = new User("보라");
  console.log(user.name); // 보라

  user = new User(""); // 이름이 너무 짧습니다.
}

{
  // 계산된 메서드 이름: 대괄호[...]를 이용해 계산된 메서드 이름 (computed method name)을 만들 수 있다
  class User {
    ["say" + "Hi"]() {
      console.log("Hello");
    }
  }

  new User().sayHi();
  // 계산된 메서드 이름은 리터럴 객체와 유사한 형태를 띄기 때문에 사용법을 외우기 쉽다는 장점이 있음
}

{
  // 클래스 필드: 어떤 종류의 프로퍼티로 클래스에 추가할 수 있다.
  class User {
    name = "보라";

    sayHi() {
      console.log(`${this.name}님 안녕하세요!`);
    }
  }

  new User().sayHi(); // '보라님 안녕하세요!'

  // User.prototype이 아닌 개별 객체에만 클래스 필드가 설정된다.
  let user = new User();
  console.log(user.name); // 보라
  console.log(User.prototype.name); // undefined

  // 복잡한 표현식이나 함수 호출 결과도 사용할 수 있다.
  class User2 {
    // name: prompt('이름을 알려주세요.', '보라');
  }

  let user2 = new User2();
  console.log(user.name); // 보라
}

{
  // 클래스 필드로 바인딩 된 메서드 만들기
  // JS의 this는 동적으로 결정된다. 따라서 객체 메서드를 여기저기 전달해 전혀 다른 컨텍스트에서 호출하게 되면 this는 메서드가 정의된 객체를 참조하지 않음

  class Button {
    constructor(value) {
      this.value = value;
    }

    click() {
      console.log(this.value);
    }
  }

  let button = new Button("안녕하세요.");

  setTimeout(button.click, 1000); // undefined
}

/* 
    해결 방법
    1. setTime(() => button.click(), 1000) 같이 래퍼 함수를 전달하기
    2. 생성자 안 등에서 메서드를 객체에 바인딩하기

    외에 클래스 필드를 활용한 방법이 있다.
*/
{
  class Button {
    constructor(value) {
      this.value = value;
    }
    click = () => {
      console.log(this.value);
    }
  }

  let button = new Button('안녕하세요.');

  setTimeout(button.click, 1000); // 안녕하세요

  /* 
    클래스 필드 click = () => {...}는 각 Button 객체마다 도길벚ㄱ인 함수를 만들어주고 이 함수의 this를 해당 객체에 바인딩시켜준다. 따라서 개발자는 button.click을 아무 곳에나 전달할 수 있고,
    this엔 항상 의도한 값이 들어가게 된다. <- 이벤트 리스너로 설정해야할 때 유용
   */
}

{
  // 요약
  class MyClass {
    prop = value; // property

    contructor() { // constructor

    }

    method(){} // method

    get something(){} // getter
    set something(){} // setter

    [Symbol.iterator](){} // 계산된 이름을 사용해 만드는 메서드 (심볼)
  }
}