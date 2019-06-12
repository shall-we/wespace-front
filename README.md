# WESPACE
본 애플리케이션은 **직원 간 업무 공유 노트 서비스** 개발 프로젝트입니다.

## Quick Start
전체 검색(SEARCH)을 통해 **localhost**를 검색하여 환경에 맞게 변경합니다.
```javascript
const socket = socketio.connect("http://localhost:4000");
```

그 다음 관련 패키지를 설치하고 실행합니다.
```shell
yarn install
yarn start
```

## React Router
| 기능 | HTTP 메서드 | 엔드포인트 | 이동 페이지 | 비고 |
|------|------------|-----------|------------|------|
| 소개 | GET | / | index | **로그인하지 않았을 때** 나타나는 소개 화면입니다. |
| 로그인 | GET | /login | login | **로그인 폼** 창입니다. |
| 회원가입 | GET | /join| join | **회원가입 폼** 창입니다. |
| 노트 메인 | GET | /:{name} | main | 로그인을 했을 시 **노트 메인** 화면으로 이동합니다. |
| 로그아웃 | GET | /logout | logout => index | **로그아웃** 처리를 하고 소개 페이지로 이동합니다. |

## Data URL
- 모든 기능에 대한 **Content-Type**은 `application/json` 입니다.

### User Data URL
- **로그인 액션**은 다음과 같습니다.
```
> 성공 시: 노트 메인으로 redirect
> 실패 시: View에서 AJAX 방식으로 처리
```
- **회원가입 액션**은 다음과 같습니다.
```
> 비밀번호는 6자 이상 영문 소문자와 숫자를 포함
> View에서 Validation 처리 후 소개 페이지로 이동
```

| 액션명 | HTTP | 엔드포인트 | 요청 Param | 응답 Param |
|-------|------|-----------|------------|-----------|
| 로그인 | POST | /login | email, password | result( SUCCESS, FAIL )<br />failType(null,<br />email_mismatch,<br />password_mismatch ) |  |
| 회원가입 | POST | /join | name, email, password | result( SUCCESS, FAIL )<br />failType: ( Already_exists ) |


### Folder Data URL
- **개인 폴더 목록**에서 `userId`는 서버에서 현재 접속중인 세션과 동일한 지 Validation을 수행합니다.

| 액션명 | HTTP | 엔드포인트 | 요청 Param | 응답 Param |
|-------|------|-----------|------------|-----------|
| 개인 폴더 목록 | GET | /folder/private/list | userId | result( SUCCESS, FAIL )<br />list( null, list ) |  |
| 공유 폴더 목록 | GET | /folder/shared/list | userId | result( list, SUCCESS )<br />list |  |
| 폴더 생성 | POST | /folder/new | userId, title | result( SUCCESS, FAIL ) |  |
| 폴더 수정 | PATCH | /folder/update | folderId, title | result( SUCCESS, FAIL ) |  |
| 폴더 삭제 | DELETE | /folder/delete | folderId | result( SUCCESS, FAIL ) |  |
| 휴지통 목록 | GET | /folder/trash | folderId | result( SUCCESS, FAIL ) |  |
| 멤버 초대 | GET | /folder/include | userId, folderId, role | result( SUCCESS, FAIL ) |  |
| 멤버 삭제 | DELETE | /folder/exclude | userId, folderId | result( SUCCESS, FAIL ) |  |


### Note Data URL
- **노트 생성** 시 MongoDB에서 노트를 만들고 브라우저로부터 응답받은 `ObjectId`를 다시 Spring 서버에 요청합니다.
- **노트 갱신** 상태는 다음과 같습니다.
```
> 배포(PUBLISHED) | 활성(ACTIVED) | 잠김(LOCKED) | 삭제(DELETED)
```

| 액션명 | HTTP | 엔드포인트 | 요청 Param | 응답 Param |
|-------|------|-----------|------------|-----------|
| 노트 생성 | POST | /note/new | userId, objectId | result( SUCCESS, FAIL )<br />noteId, failType |  |
| 노트 수정 | PATCH | /note/update | noteId, title | result( SUCCESS, FAIL ) |  |
| 노트 삭제 | DELETE | /note/delete | noteId | result( SUCCESS, FAIL ) |  |
| 노트 갱신 | GET | /note/status | noteId, status | result( SUCCESS, FAIL ) |  |
| 노트 배포 | GET | /note/publish | noteId | result( SUCCESS, FAIL ) |  |
| 파일 업로드 | POST | /note/upload | noteId, file | result( SUCCESS, FAIL ) |  |

## Naming Convention
프로젝트 **개발 생산성 향상** 및 **운영의 효율화**를 위해 정의한 명명 규칙입니다.

### 공통
- 개발을 시작하기 전에 워크스페이스 환경에 **UTF-8**으로 통일합니다.
- 프로젝트명은 소문자에 두 단어가 결합할 경우 **-**로 구분합니다.  
ex) 리액트 프로젝트 생성 명령어를 실행할 경우
```sh
$ create-react-app movie-app
```

### Java
| 구분 | 규칙 | 예시 |
|-----|-----|-----|
| 변수 | Camel Case | String helloWorld;<br />final String helloWorld; |
| 상수 | static, final 성격을 가진<br />객체에 사용<br />대문자 + _ | public static final HELLO_WORLD; |
| 메서드 | Camel Case | public String helloWorld; |
| 클래스 | Camel Case, 맨 앞글자는 대문자 | public HelloWorld |

### JavaScript
| 구분 | 규칙 | 예시 |
|-----|-----|-----|
| 변수 | ES6 표준, Camel Case | let helloWorld;<br />const helloWorld; |
| 상수 | static, final 성격을 가진<br />객체에 사용<br />대문자 + _ | const HELLO_WORLD; |
| 문자열 | 쌍따옴표, Nested 된 경우 안쪽에 홑따옴표 | let str = "hello";<br /> |
| 메서드 | Camel Case<br />익명 함수일 경우 람다식 사용 | function helloWorld,<br />() => console.log("hello world!"); |

### HTML
| 구분 | 규칙 | 예시 |
|-----|-----|-----|
| 속성명 | 소문자, 구분자는 -<br />(id 속성도 동일하게 적용) | `<div data-url="http://..." />`<br />`<div id="position-1" />` |

### CSS
| 구분 | 규칙 | 예시 |
|-----|-----|-----|
| 속성명 | 소문자, 구분자는 - | .helloWorld { data-color: white; } |
| 클래스명 | Camel Case | .helloWorld { } |



## Method

기본 반환 값은 다음과 같습니다.

| 파라미터 | 값                               | 비고                                                         |
| -------- | -------------------------------- | ------------------------------------------------------------ |
| Result   | SUCCESS<br />FAIL<br />FAIL_TYPE | 성공 시 결과 값 (Enum)<br />실패 시 결과 값 (Enum)<br />실패 원인 결과 코드 |



| Model  | 필드명                                       | 자료형                             | 비고                                                         |
| ------ | -------------------------------------------- | ---------------------------------- | ------------------------------------------------------------ |
| Result | SUCCESS<br />FAIL<br />FAIL_TYPE<br />Object | ENUM<br />ENUM<br />Integer<br />- | 성공 시 결과 값<br />실패 시 결과 값<br />실패 원인 결과 코드<br />주기적으로 반환할 값 |

  

### VO (Value Object)

| Model    | 자료형                                                     | 필드명                                                 |
| -------- | ---------------------------------------------------------- | ------------------------------------------------------ |
| UserVO   | `Long`<br />`String`<br />`String`<br />`String`           | id<br />name<br />email<br />password                  |
| FolderVO | `Long`<br />`String`<br />`String`<br />`Long`<br />`Long` | id<br />title<br />content<br />permission<br />userid |
| NoteVO   | `Long`<br />`Long`<br />`String`<br />`String`             | id<br />folderId<br />title<br />content               |
| UploadVO | `Long`<br />`Long`<br />`String`                           | id<br />noteId<br />url                                |

  

### Controller

| 클래스명         | 반환 값                                                      | 메서드명                                                     | 파라미터                                                     | 비고                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| UserController   | <br /><br /><br />`String`<br />`List<UserVO>`               | login<br />logout<br />join<br />index<br />getList          | UserVO<br /><br />UserVO<br /><br />-                        | <br /><br /><br />Intro Page<br />-                          |
| FolderController | `String`<br />`List<FolderVO>`<br />　<br /><br /><br /><br /><br /> | index<br />getList<br />create<br />rename<br />delete<br />invite<br />exclude | FolderVO<br />type, FolderVO<br />FolderVO<br />FolderVO<br />FolderVO<br />FolderVO<br />FolderVO | Login Intro Page<br />type: {private \| shared}<br /><br /><br />**Owner**만 가능<br /><br />**Ownver**만 가능 |
| NoteController   | `List<NoteVO>`<br /><br /><br /><br /><br />-                | getList<br />create<br />rename<br />upload<br />setState<br />delete | folderId, state<br />NoteVO<br />NoteVO<br />noteId, file<br />noteId, state<br />noteId | <br />folderId, contentId<br />noteId, title<br /><br /><br />- |

  

### Service

| 클래스명      | 반환 값                                         | 메서드명                                                     | 파라미터                                                     | 비고                                                         |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| UserService   | <br /><br />`List<UserVO>`                      | login<br />jogin<br />getList                                | UserVO<br />UserVO<br />-                                    |                                                              |
| FolderService | `List<FolderVO>`<br /><br /><br /><br /><br />- | getList<br />create<br />rename<br />delete<br />invite<br />exclude | type, FolderVO<br />FolderVO<br />FolderVO<br />FolderVO<br />FolderVO<br />FolderVO | type: {private \| shared}<br /><br /><br />**Owner**만 가능<br /><br />**Owner**만 가능 |
| NoteService   | `List<NoteVO>`<br /><br /><br /><br /><br />-   | getList<br />create<br />rename<br />upload<br />setState<br />delete | folderId, state<br />NoteVO<br />NoteVO<br />noteId, file<br />noteId, state<br />noteId |                                                              |

  

### DAO

| 클래스명  | 반환 값                                                      | 메서드명                                                     | 파라미터                                                     | 비고                                                         |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| UserDAO   | <br /><br />`List<UserVO>`                                   | login<br />join<br />getList                                 | UserVO<br />UserVO<br />                                     |                                                              |
| FolderDAO | `List<UserVO>`<br />`List<UserVO>`<br />int(index)<br /><br /><br /><br />- | getPrivateList<br />getSharedList<br />create<br />rename<br />delete<br />invite<br />exclude | FolderVO<br />FolderVO<br />FolderVO<br />FolderVO<br />FolderVO<br />FolderVO<br />FolderVO | <br /><br /><br /><br />**Owner**만 가능<br /><br />**Owner**만 가능 |
| NoteDAO   | `List<NoteVO>`<br />`Boolean`<br />`Boolean`<br />`Boolean`<br />`Boolean`<br />`Boolean` | getList<br />create<br />rename<br />upload<br />setState<br />delete | folderId, state<br />NoteVO<br />NoteVO<br />UploadVO<br />noteId, state<br />noteId |                                                              |

