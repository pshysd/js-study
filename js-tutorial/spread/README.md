# 나머지 매개 변수와 스프레드 문법

### 정해지지 않은 수의 인수를 받는 방법

```js
const sum = (a, b) => {
	return a + b;
};

console.log(sum(1, 2, 3, 4, 5)); // 3, 에러가 나지 않는다.
```

여분의 매개 변수는 그 값들을 담을 배열 이름을 마침표 3개(...) 뒤에 붙여주면 함수 선언부에 포함시킬 수 있다.

=> 남아있는 매개 변수들을 한 데 모아 배열에 집어넣어라. 라는 뜻

아래 예시에서는 모든 인수가 배열 arg에 모인다.

```js
const sumAll = (...args) => {
	let sum = 0;
	args.forEach((arg) => {
		sum += arg;
	});
	return sum;
};

console.log(sumAll(1)); // 1
console.log(sumAll(1, 2)); // 3
console.log(sumAll(1, 2, 3)); // 6
```

앞 부분의 매개 변수는 변수로, 남아있는 매개 변수들은 배열로 모을 수도 있다.

아래 예시에서는 처음 두 인수는 변수에, 나머지 인수들은 titles라는 배열에 할당된다.

```js
const showName = (firstName, lastName, ...titles) => {
	console.log(`${firstName} ${lastName}`); // SEONGHYEON PARK

	// 나머지 인수들은 배열 titles의 요소가 된다.
	// titles = [26, 'SUWON'];

	console.log(titles[0]); // 26
	console.log(titles[1]); // 'SUWON'
	console.log(titles.length); // 2
};

showName('SEONGHYEON', 'PARK', 26, 'SUWON');
```

**주의) 나머지 매개 변수는 항상 마지막에 있어야 한다.**

나머지 매개 변수는 남아있는 인수를 모으는 역할을 하므로 아래 예시에선 에러가 발생한다.

```js
const f = (args1, ...rest, arg2) => { ... } // ...rest 뒤에 파라미터가 더 있으면 안됨!
```
