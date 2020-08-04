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