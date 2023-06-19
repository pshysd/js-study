{
	let group = {
		title: '1조',
		students: ['철수', '영희', '미자'],

		showList() {
			this.students.forEach((student) => console.log(`${this.title}: ${student}`));
		},
	};

	console.log('화살표 함수를 사용한 group.showList() 실행 결과');
	group.showList(); // showList()의 this는 group이 되었다. (== 화살표 함수에는 this가 없기 때문에 스코프 하나를 빠져나와 showList()의 this가 가리키는 group을 찾아감)
}

/* 만일 화살표 함수를 사용하지 않으면 에러가 발생함. */
{
	let group = {
		title: '1조',
		students: ['철수', '영희', '미자'],

		showList() {
			this.students.forEach(function (student) {
				// TypeError: Cannot read property 'title' of undefined //// node.js에서는 undefined로 출력됨 사실 undefined가 맞음 익명함수는 title이라는 property를 가지고 있지 않음
				console.log(`${this.title}: ${student}`);
			});
		},
	};

	group.showList();
}

{
	function defer(f, ms) {
		return function () {
			setTimeout(() => f.apply(this, arguments), ms);
		};
	}

	function sayHi(who) {
		console.log(`Hello, ${who}`);
	}

	let SayHiDeferred = defer(sayHi, 2000);
	SayHiDeferred('철수'); // 2초 뒤 'Hello, 철수'
}