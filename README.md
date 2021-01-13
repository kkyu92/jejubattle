# JEJU BATTLE README

## 1. Build Guide

#### 1). README file

- README 파일의 Release Notes 에 버전과 change note 를 기록한다.

#### 2). android/app/build.gradle

- android 의 version code를 1 증가시켜준다.

#### 3). ios build Number

- XCode를 열어서 build Number를 1 증가시켜준다.

#### 4). android cmd build

- android 디렉토리 이동 "./gradlew cleanBuildCache"
- android 디렉토리로 이동하여 cmd 상에서 "./gradlew bundleRelease" 하여 빌드한다.

#### 5). ios xcode build

- XCode Product > Archive를 통해 빌드한다.

## 2. Release Notes

#### Android Internal Test Links

> https://play.google.com/apps/internaltest/4700794782783427988

#### 2021.01.13

> android (2.0.0.36)
> ios (2.0.0.26)

- QA 4

#### 2021.01.08

> android (2.0.0.35)
> ios (2.0.0.25)

- QA 3

#### 2021.01.07

> android (2.0.0.34)
> ios (2.0.0.24)

- QA 3

#### 2020.12.24

> android (2.0.0.33)
> ios (2.0.0.23)

- QA 2

#### 2020.12.21

> android (2.0.0.32)
> ios (2.0.0.22)

- blackList
- locker, admin push

#### 2020.12.17

> android (2.0.0.31)
> ios (2.0.0.21)

- QA 1

#### 2020.12.03

> android (2.0.0.30)
> ios (2.0.0.20)

- app icon 수정

#### 2020.12.02

> android (2.0.0.28)
> ios (2.0.0.20)

- 업체 + 일반 QA

#### 2020.11.26

> android (2.0.0.27)
> ios (2.0.0.19)

- 업체 + 일반 QA

#### 2020.11.19

> android (2.0.0.26)
> ios (2.0.0.18)

- app icon 변경

#### 2020.11.18

> android (2.0.0.25)
> ios (2.0.0.17)

- ios reject [permission]

#### 2020.11.16 ~ 2020.11.17

> android (2.0.0.25)
> ios (2.0.0.16)

- android 등록
- app icon 변경
- 메뉴
  [ ] 보관함 (사용 / 삭제) : 제휴앱
  [ ] 탈퇴
- QA
  [v] 처리일 기준 2020.11.16 ~ 17

#### 2020.11.09 ~ 2020.11.13

> android (2.0.0.24)
> ios (2.0.0.15)

- 메뉴
  [v] 인앱결제
  [v] 알림 리스트 (관리자 / 보관함 제외)
  [ ] 보관함 (사용 / 삭제) : 제휴앱
  [ ] 탈퇴
- 메인화면
  [v] 광고
- QA
  [v] 처리일 기준 2020.11.09 ~ 13

#### 2020.11.02 ~ 2020.11.06

> android (2.0.0.23)
> ios (2.0.0.14)

- 로그인
  [v] 애플 로그인
- 메뉴
  [ ] 알림 리스트
  [ ] 인앱결제
  [v] 나의배틀 (삭제 / UI)
  [ ] 보관함 (사용 / 삭제) : 제휴앱
  [v] 고객센터
  [v] 설정 (알림설정 / 약관)
  [ ] 탈퇴
- 메인화면
  [ ] 광고
  [v] 다가오는 배틀
- 배틀
  [v] 랜덤박스 추가 항목
  [v] 배틀 진행중 입장불가 추가
- 알림
  [v] 알림 최종완료
  [v] 프로필 추가 (android)
- QA
  [v] 처리일 기준 2020.11.06

#### 2020.11.02

> android (2.0.0.22)
> ios (2.0.0.13)

- error 수정

#### 2020.10.16 ~ 2020.10.30

> android (2.0.0.21)
> ios (2.0.0.12)

- 로그인
  [ ] 애플 로그인
- 메뉴
  [ ] 알림 리스트
  [ ] 인앱결제
  [v] 내주변살펴보기 (필터x)
  [ ] 나의배틀 (삭제)
  [v] 여행정보 (추천코스)
  [v] 위시리스트 (지도)
  [ ] 보관함 (사용 / 삭제) FIXME: 제휴앱
  [ ] 고객센터
  [ ] 설정 (알림설정 / 약관 / 탈퇴)
- 메인화면
  [ ] 광고
  [ ] 다가오는 배틀
- 스포츠배틀
  [v] 배틀리스트 (필터)
  [v] 배틀지도 (필터)
  [v] 시스템 / 채팅 알림 TODO:채팅알림 테스트 해야함
- 운동시설
  [v] 위치순 (필터)
  [v] 건강운동 리스트 (필터)
- 상세페이지
  [v] 시설정보 (소개, 지도)
  [v] 추천코스와 구분

#### 2020.09.14 ~ 10.16

> android (2.0.0.20)
> ios (2.0.0.11)

- socket reConnect 적용
- api [ getScore / locker]
- 배틀 1:1 < 이미지 없는 사용자가 들어올 경우 수정 / 배틀 n:n < 프로필 제거
- 필수설정 < 실시간 변경 적용 / 채팅방 시스템 메시지 적용
- 배틀완료 및 평가 < (Android) Toast --> Alert [react-native-root-toast]
- 필수설정 수정시 ready, coin 초기화
- 보상받기(코인 사용유무에 따라 랜덤박스 달라짐) --> [RandomBox-추가필요]
- 포인트 결제
- 보관함 완료 (리스트, 삭제, 완료, 페이징)
- 보상받기 baCode5 삭제 / rewardType 추가
- 배틀 다시하기 방장만

* 알림푸시 진행중

* 코인 인앱결제 -> 앱등록 -> 애플 로그인
* 애플 로그인해야 결제들어감
* 코인 결제 (iOS, android 등록)

#### 2020.09.08

> android (2.0.0.19)
> ios (2.0.0.9)

- battle 관련 api 추가 구현
- react-native-nuno-ui 의존성 분리
- 버그수정

#### 2020.09.04

> android (2.0.0.18)
> ios (2.0.0.7)

- bug 수정 및 battle관련 api 적용

#### 2020.08.27

> android (2.0.0.17)
> ios (2.0.0.6)

- bug fix
- update review delete
- fullmap filter 전체버튼동작
- 이름수정시 공백책크

#### 2020.08.26

> android (2.0.0.16)
> ios (2.0.0.5)

- socket url 변경

#### 2020.08.26

> android (2.0.0.15)
> ios (2.0.0.4)

- socket url 변경

#### 2020.08.25

> android (2.0.0.14)
> ios (2.0.0.3)

- battle api 적용
- socket 통신을 통한 chatting 구현
- 기타 기존 api 수정 및 버그 수정

#### 2020.08.18

> android (2.0.0.8)
> ios (2.0.0.1)

- email verify

#### 2020.08.18

> android (2.0.0.7)
> ios (2.0.0.1)

- android appscheme

#### 2020.08.18

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

#### 2020.08.05

> android (1.0.0.5)

- facebook app id 변경

#### 2020.08.05

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

#### 2020.07.31

> android (1.0.0.3)

- api 연결, 데이타 바인딩
