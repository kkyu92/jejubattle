# JEJU BATTLE README

## 1. Build Guide

#### 1). README file
  - README 파일의 Release Notes 에 버전과 change note 를 기록한다.
#### 2). android/app/build.gradle
  - android 의 version code를 1 증가시켜준다.
#### 3). ios build Number
  - XCode를 열어서 build Number를 1 증가시켜준다.
#### 4). android cmd build
  - android 디렉토리로 이동하여 cmd 상에서 "./gradlew bundleRelease" 하여 빌드한다.
#### 5). ios xcode build
  - XCode Product > Archive를 통해 빌드한다.


## 2. Release Notes

####  Android Internal Test Links
  > https://play.google.com/apps/internaltest/4700794782783427988

####  2020.08.25
  > android (2.0.0.14)
  > ios (2.0.0.3)

  - battle api 적용
  - socket 통신을 통한 chatting 구현
  - 기타 기존 api 수정 및 버그 수정

####  2020.08.18
  > android (2.0.0.8)
  > ios (2.0.0.1)

  - email verify

####  2020.08.18
  > android (2.0.0.7)
  > ios (2.0.0.1)

  - android appscheme

####  2020.08.18
  > android (2.0.0.6)
  > ios (2.0.0.1)

  - notification setting for ios
  - battle api
  - battle update
  - context me 초기값 변경
  - battle api 추가
  - 본인인증
  - 회원가입 수정
  - 가로스크롤 자동스크롤
  - naver login ios setting
  - add react-native-iap
  - editProfile 수정
  - FullMap 수정


####  2020.08.05
  > android (1.0.0.5)

  - facebook app id 변경

####  2020.08.05
  > android (1.0.0.4)

  -join permission
  - join validation
  - event api
  - kakao login
  - text bug 수정
  - travel refactoring
  - dynamic link
  - wishDelete
  - add dynamiclink
- scrap api

####  2020.07.31
  > android (1.0.0.3)

  - api 연결, 데이타 바인딩