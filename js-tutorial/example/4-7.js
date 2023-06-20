// id는 새로운 심볼이 된다.
let id = Symbol();

// 심볼 id에는 '설명이 들어가는 자리입니다.'라는 설명이 붙는다.
id = Symbol('설명이 들어가는 자리입니다.');

let id1 = Symbol('id');
let id2 = Symbol('id');

console.log(id1 == id2); // false

// Symbol은 string으로 자동형변환 되지 않는다.
console.log('id: ', id); // TypeError: Cannot convert a Symbol value to a string
// 노드에선 그냥 Symbol(id) 뜨긴 함 ..

console.log('id.toString(): ', id.toString()); // Symbol(id)

console.log('id.description: ', id.description); // '설명이 들어가는 자리입니다.'

// '숨김' 프로퍼티

// 서드파티 코드에서 가져온 객체
let user = {
	name: 'john',
};
id = Symbol('id');

user[id] = 1;

console.log(user[id]); // 심볼을 키로 사용해 데이터에 접근할 수 있음
