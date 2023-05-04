// 배열 아주 중요

{
  const arr = [];
  arr.push(1); // 맨 끝에 요소 1 추가
  arr.pop(); // 맨 끝 요소 하나 제거
  arr.shift(); // 맨 앞 요소 하나 제거
  arr.unshift(1); // 맨 앞에 요소 1 추가
}

{
  const arr = ["I", "go", "home"];

  delete arr[1]; // arr의 1번 idx(== 'go) 제거

  console.log(arr[1]); // undefined

  // delete로 요소를 지우고 난 후의 배열 arr = ['I', , 'home']
  console.log(arr);
  /* 
    아 이건 맘에 안드는데
    -> arr.splice()로 추가, 삭제, 교체가 모두 가능
    사용법:
    arr.splice(index[, deleteCount, elem1, ..., elemN])
    -> 첫번째 매개 변수는 조작을 가할 첫 번째 요소를 가리키는 인덱스. 두번째 매개 변수는 deleteCount로, 제거하고자 하는 요소의 개수. 이후 elem1, ..., elemN은 배열에 추가할 요소
  */
}

{
  // splice를 활용한 요소 삭제
  let arr = ["I", "study", "JS"];
  arr.splice(1, 1); // 1번째 인덱스부터 요소 한 개 제거
  console.log(arr); // ['I', 'JS'];

  // 요소 3개를 지우고, 다른 요소 두개로 교체

  arr = ["I", "study", "JS", "right", "now"];
  // 처음(0) 세 개(3)의 요소를 지우고, 이 자리를 다른 요소로 대체
  arr.splice(0, 3, "Let's", "dance");

  console.log(arr);

  // splice는 삭제된 요소로 구성된 배열을 반환함
  arr = ["I", "study", "JS", "right", "now"];

  // 처음 두 개의 요소를 삭제함
  let removed = arr.splice(0, 2);

  console.log(removed); // ['I', 'study'] <-- 삭제된 요소로 구성된 배열

  // splice()의 deleteCount를 0으로 설정하면 요소를 제거하지 않으면서 새로운 요소를 추가할 수 있다.
  arr = ["I", "study", "JavaScript"];

  // 인덱스 2부터
  // 0개의 요소를 삭제하고g
  // 'complex'와 'language'를 추가한다.
  arr.splice(2, 0, "complex", "language");
  console.log(arr); // ['I', 'study', 'complex','language', 'JavaScript'] // 2번째 인덱스에 우겨넣음

  // 음수 인덱스를 사용하면 뒤에서부터 센다
  arr = [1, 2, 5];

  // 인덱스 -1부터 (배열 끝에서부터 첫번째)
  // 0개의 요소를 삭제하고
  // 3과 4를 추가한다.
  arr.splice(-1, 0, 3, 4);
  console.log(arr);
}

{
  /* 
    slice([start], [end])
    from start to end 까지 요소 복사해서 새로운 배열 반환. 범위 설정하는 메서드는 항상 end는 포함하지 않음!
    start와 end는 둘 다 음수일 수도 있는데, 이땐 배열 끝에서부터 요소 개수를 의미한다.
  */

  let arr = ['t', 'e', 's', 't'];

  console.log(arr.slice(1, 3)); // 1번째 요소부터 3번째 요소 앞까지 복사

  console.log(arr.slice(-2)); // -2번째 요소부터 끝까지 복사
}

{
  /* 
  concat(arg1, arg2, ...): 기존 배열의 요소를 사용해 새로운 배열을 만들거나 기존 배열에 요소를 추가하고자 할 때 사용
  파라미터엔 배열이나 값이 올 수 있다. 갯수 제한x
   */

  let arr = [1, 2];

  // arr의 모든 요소와 [3, 4]를 합친 새로운 배열 생성
  console.log(arr.concat([3, 4]));

  // arr의 모든 요소와 [3, 4], [5, 6]을 합친 새로운 배열 생성
  console.log(arr.concat([3, 4], [5, 6]));

  // arr의 모든 요소와 [3, 4], 5, 6을 합친 새로운 배열 생성
  console.log(arr.concat([3, 4], 5, 6));

  // 객체가 인자로 넘어오면(배열처럼 보이는 유사 배열 객체이더라도) 객체는 분해되지 않고 통으로 복사되어 더해진다.
  let arrayLike = {
    0: 'something',
    length: 1
  };

  console.log(arr.concat(arrayLike)); // 1, 2, [object Object]

  // BUT Symbol.isConcatSpreadable이 있으면 concat은 이 객체를 배열처럼 취급하여 property의 값이 더해진다.
  arrayLike = {
    0: 'something',
    1: 'else',
    [Symbol.isConcatSpreadable]: true,
    length: 2
  };

  console.log(arr.concat(arrayLike)); // 1, 2, something, else
}

{
  /* 
    forEach(): 주어진 함수를 배열 요소 각각에 대해 실행할 수 있게 한다. ** 중요 **
    
    -형태
    arr.forEach((item, index, array) => { 콜 백 })
  */

  ['c', 'js', 'py'].forEach(console.log);
  /* 
    c 0 [ 'c', 'js', 'py' ]
    js 1 [ 'c', 'js', 'py' ]
    py 2 [ 'c', 'js', 'py' ]
    형태로 출력됨

    아

    item index array 순으로 출력되는겅네
  */

  ['c', 'js', 'py'].forEach((item, index, array) => {
    console.log(`${item} is at index ${index} in ${array}`);
  });

  /* 
    c is at index 0 in c,js,py
    js is at index 1 in c,js,py
    py is at index 2 in c,js,py
  */
}

//  ----------------------- 배열 탐색 -----------------------------

{
  /* 
    indexOf(item, from): from부터 시작해 item을 탐색. 찾으면 index 반환, 없으면 -1
    lastIndexOf: 뒤에서부터 함
    includes: 찾으면 true, 없으면 false

    얘네들은 동등(==)이 아니고 일치(===)로 검사함
   */

  const arr = [NaN];
  console.log(arr.indexOf(NaN)); // -1 (===는 NaN에는 동작하지 않으므로 0이 출력되지 않음)
  console.log(arr.includes(NaN)); // true (NaN의 여부를 확인) <- 얘만 NaN 검사 가능
}

