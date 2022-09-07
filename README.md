# weather-emoji-board-service

Weather API를 이용한 Emoji 사용 가능한 게시판 API입니다.

## 목차 🙇‍♂️

- [Skills](#👨‍🔧-skills)
- [서비스개요](#📑-서비스-개요)
- [구현사항](#🛠-구현-사항)
- [테이블 구조](#🚧-테이블-구조)
- [프로젝트 실행](#🚀-프로젝트-실행)
- [문서](#📚-문서)

---

## 👨‍🔧 Skills

### API

<img src="https://img.shields.io/badge/node-16.17.0-339933?logo=node.js"> 
<img src="https://img.shields.io/badge/TypeScript-4.4.5-3178C6?logo=typescript"> 
<img src="https://img.shields.io/badge/NestJS-9.0.0-E0234E?logo=NestJS">
<img src="https://img.shields.io/badge/bcrypt-5.0.1-green">
<img src="https://img.shields.io/badge/@nestjs/axios-0.1.0-E0234E">

### ORM

<img src="https://img.shields.io/badge/TypeORM-0.3.9-orange">

### DB

<img src="https://img.shields.io/badge/MySQL-8.0.30-blue?logo=mysql">

### Docs

<img src="https://img.shields.io/badge/Swagger-6.1.0-green?logo=swagger">

---

## 📑 서비스 개요

- 게시판 글 목록을 Pagination하여 조회할 수 있습니다.
- 비밀번호를 이용해 게시판에 글을 작성할 수 있습니다.
- 비밀번호 검증을 통해 작성한 글을 편집, 삭제 할 수 있습니다.

---

## 🛠 구현 사항

### 1. Read

- page, page-count를 이용한 Pagination
- 최신순 정렬

### 2. Create

- 제목 20자, 본문 200자 제한 적용
- 제목, 본문에 Emoji 사용가능 (utf8mb4 적용)
- 정규표현식을 이용한 비밀번호 규칙 적용(6자 이상, 숫자 1개 이상 포함)
- 비밀번호 암호화 적용(Bcrypt)
- 위치정보(좌표)로 [Weather API](https://www.weatherapi.com)를 이용한 날씨 정보 저장

### 3. Edit

- 게시글 비밀번호 검증을 통한 게시글 수정 기능

### 4. Delete

- 게시글 비밀번호 검증을 통한 게시글 삭제(Soft Delete) 기능

---

## 🚧 테이블 구조

### **posts**

| column_name | comment       | data_type    | character_set | is_nullable | extra                          |
| ----------- | ------------- | ------------ | ------------- | ----------- | ------------------------------ |
| id          | 게시글 아이디 | int          |               | NO          | PK, auto_increment             |
| title       | 제목          | varchar(20   |               | NO          |                                |
| body        | 본문          | varchar(200) |               | NO          |                                |
| password    | 비밀번호      | varchar(60)  |               | NO          |                                |
| weather     | 날씨          | varchar(50)  |               | YES         |                                |
| create_at   | 생성일        | datetime     |               | NO          | DEFAULT_GENERATED              |
| update_at   | 수정일        | datetime     |               | NO          | on update CURRENT_TIMESTAMP(6) |
| delete_at   | 삭제일        | datetime     |               | YES         |                                |

---

## 🚀 프로젝트 실행

### 1. .env 작성

```text
TZ=Asia/Seoul

MODE="dev" # dev, prod
PORT=3000

WEATHER_API_KEY=

# DB
DB_HOST=
DB_PORT=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
```

### 2. 프로젝트 실행

```bash
$ npm install

$ npm run start:dev
```

---

## 📚 문서

### [Local Swagger API](http://localhost:3000/docs)

### [Swagger JSON](swagger.json)
