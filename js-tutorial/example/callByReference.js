{
	let message = 'Hello!';
	let phrase = message;

	// 원시 타입은 두 개의 독립된 변수에 각각의 'Hello!'가 저장된다. (Call By Value)
}

{
	let user = {
		name: 'John',
	};

	let admin = user;

	admin.name = 'YAMAMOTO';

	console.log(`user.name: ${user.name}`); // 'YAMAMOTO'
	/* 
  user엔 객체를 '참조'할 수 있는 주소가 저장된다.
  admin엔 user가 갖고있는 주소가 저장된다.
  == user를 건들든 admin을 건들든 {name: John} 객체에 접근하게 됨
*/
}

{
	let a = {};
	let b = a; // call by reference

	console.log(`a와 b가 같다면 true를 출력해주세요!!!!  ${a == b}`);
	console.log(`진짜 완전 똑같으면 true를 출력해주세요!!!!!!!!!!!!!!!!!!!!!! ${a === b}`);
	console.log('감사합니다.....................\n');
}

{
	let a = {};
	let b = {};

	console.log(`그럼 이것도 같습니까???? ${a == b}`);
	console.log(`아니군요 그럼 이것도 틀리겠죠????? ${a === b}`);
	console.log('알겟습니다');
}

{
	let user = {
		name: 'John',
		age: 30,
	};

	let clone = {};

	for (let key in user) {
		clone[key] = user[key];
	}

	clone.name = 'Wang Zi Qi'; // 막지엇음

	console.log(`유저를 복사한 클론의 이름을 바꿧는데 그럼 유저는 이름이 바뀔까요 안바뀔까요?? ${user.name}`); // 응 얘는 존이야
	console.log('안바뀌엇습니다');
}

{
	let user = { name: 'John' };

	let permission1 = { canView: true };
	let permission2 = { canWalk: true };

	let jjambbong = Object.assign(user, permission1, permission2);

	console.log(`user와 permission1과 permission2를 합친 결과: ${JSON.stringify(jjambbong)}`);
}

{
	let user = { name: 'John' };

	let OverWrite = Object.assign(user, { name: 'Johnson' });

	console.log(`prop이 겹치면 뒤에걸로 덮어씌워집니다요 ${JSON.stringify(OverWrite)}`);
}

{
	let user = { name: 'John', age: '30', sex: 'M' };

	let clone = Object.assign({}, user);
	console.log(`아 이렇게 간단하게 객체를 복사할 수 있다니 ${JSON.stringify(clone)}`);

	/* 
  Object.assign({}, obj);로 복사할 경우 주소 값이 달라지나
  Object.assign(obj); 로 복사할 경우엔 같은 주소 값을 갖게된다
  */
}

{
  let user = {
    name: 'Jack',
    sizes: {
      height: 183,
      width: 50 // ??뭐냐
    }
  }

  // 오 이런 객체가 객체 prop을 갖고 있을 경우는 좀 골때리는 경우라고 볼 수 있다

  let clone = Object.assign({}, user);

  console.log (user.sizes === clone.sizes); // name은 다르다 하지만 size의 주소값은 같다........... 이걸 해결하려면 딥카피 해야됨

  // 이건 lodash의 _.cloneDeep(obj)같은 메서드를 사용하면 편하게 복사할 수 있다
}
