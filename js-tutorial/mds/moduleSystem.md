# 모듈
개발하는 애플리케이션의 크기가 커지면 언젠간 파일을 여러 개로 분리해야 하는 시점이 옵니다.

이때 분리된 파일 각각을 '모듈(module)'이라고 부르는데, 모듈은 대개 클래스 하나 혹은 특정한 목적을 가진 복수의 함수로 구성된 라이브러리 하나로 구성됩니다.


라는건 공식문서 설명이고 js로 개발하니까 하도 파일 불러오고 내보내고 해대서 확실하게 개념을 잡아야겠다

기본 js(브라우저)에서는 export, import 구문이 사용 가능한데 node에선 commonJS를 사용해서 따로 package.json 파일에 'type':'module'을 추가해줘야함