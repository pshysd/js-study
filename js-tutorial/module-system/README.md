# 리듬이 어떻게 쓰는 것인가 . . .
#붙이면 <h1>같이 볼드처리 되면서 연한 밑줄 그어짐

## 이것은 소제목

##을 붙이면 소제목이 된다고 한다

  `![이미지 설명](이미지 파일 경로) <- 이것은 이미지 파일을 업로드`

### #은 여섯개까지 붙일 수 있다!

줄 바꾸기를 할 때는 엔터
엔터를 두번 해야한다 엔터엔터

이렇게

# 구분선은 `-` 와 `*`을 사용한다

근데 여기다가 쓰면 한줄로 나오나?

*** 별 세개

--- 대시 세개

세개 이상 써줘야 인식을 한다

# 코드블록은 `을 세개 써주고 작성하면 된다

    ``` const readMe = 'README';
        console.log(`hi, ${readMe} !`);
    ```

또는 4칸 띄우면 코드로 인식한다 이건 좀 불편한디

# 하이퍼링크는 <> 안에 주소를 작성한다.

<https://github.com/pshysd>
ㄷㄷ

더 알아봐야 한다면
<https://docs.github.com/ko/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax>
<https://ko.wikipedia.org/wiki/%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4>

# 모듈
개발하는 애플리케이션의 크기가 커지면 언젠간 파일을 여러 개로 분리해야 하는 시점이 옵니다.

이때 분리된 파일 각각을 '모듈(module)'이라고 부르는데, 모듈은 대개 클래스 하나 혹은 특정한 목적을 가진 복수의 함수로 구성된 라이브러리 하나로 구성됩니다.


라는건 공식문서 설명이고 js로 개발하니까 하도 파일 불러오고 내보내고 해대서 확실하게 개념을 잡아야겠다

기본 js(브라우저)에서는 export, import 구문이 사용 가능한데 node에선 commonJS를 사용해서 따로 package.json 파일에 'type':'module'을 추가해줘야함