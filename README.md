# 아이엠픽 (AI'M PICK)

초등학교 1~2학년 대상 진로적성 분석 및 위인 추천 웹 프로그램입니다.

- 48문항 설문 → 6개 기본 유형 점수 → 15가지 복합 진로유형 산출
- 유형별 추천 직업, 위인, 결과 영상 제공
- React + Vite 정적 웹앱

---

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

같은 Wi-Fi 기기에서 테스트하려면:

```bash
npm run dev:lan
```

터미널에 표시되는 Network 주소(예: `http://172.30.1.22:5173`)로 접속

---

## 배포 전 로컬 테스트

배포하기 전에 아래 순서로 확인하세요.

```bash
npm install
npm run build
npm run preview
```

`npm run preview` 실행 후 `http://localhost:4173` 에서 확인:

- 설문 → 결과 화면 정상 표시
- 영상 경로 `/videos/MH.mp4`, `/videos/QH.mp4` 등 정상 재생
- 새로고침해도 404 없이 동작

빌드 결과는 `dist` 폴더에 생성되며, `public/videos/*.mp4` 는 `dist/videos/*.mp4` 로 복사됩니다.

---

## Vercel 배포 방법 (초보자용)

### 1단계. GitHub에 프로젝트 업로드

1. [GitHub](https://github.com) 로그인
2. **New repository** 클릭 → 저장소 이름 입력 (예: `aim-pick`)
3. 프로젝트 폴더에서 Git 초기화 및 업로드:

```bash
git init
git add .
git commit -m "아이엠픽 초기 배포"
git branch -M main
git remote add origin https://github.com/내아이디/aim-pick.git
git push -u origin main
```

> **중요:** `public/videos/` 폴더의 15개 mp4 파일도 함께 업로드되어야 합니다.  
> `.gitignore`에 `public/videos`는 포함하지 않았습니다.

### 2단계. Vercel 배포

1. [Vercel](https://vercel.com) 로그인 (GitHub 계정 연동 권장)
2. **Add New… → Project** 클릭
3. GitHub 저장소 선택
4. 설정 확인:

| 항목 | 값 |
|------|-----|
| Framework Preset | **Vite** |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

5. **Deploy** 클릭
6. 배포 완료 후 생성된 주소 확인 (예: `https://aim-pick.vercel.app`)

### 3단계. 배포 주소로 QR 코드 만들기

배포가 끝나면 고정 URL이 생깁니다. 이 주소로 QR 코드를 만드세요.

```bash
npx qrcode -o public/images/qr-deploy.png "https://aim-pick.vercel.app"
```

또는 [QR Code Generator](https://www.qr-code-generator.com/) 등에서 배포 URL 입력

---

## 접속 방식 비교

### 기존 방식 (로컬 개발 서버)

```
http://내PC_IP주소:5173
```

- 같은 Wi-Fi에 있는 기기만 접속 가능
- PC에서 `npm run dev`가 켜져 있어야 함
- Wi-Fi가 바뀌면 IP가 바뀌어 QR을 다시 만들어야 함

### 배포 방식 (Vercel) — 추천

```
https://배포주소.vercel.app
```

- **어디서든** 접속 가능 (학교, 집, 발표 장소)
- PC를 켜두지 않아도 됨
- QR 주소가 **고정**됨
- 학생들이 각자 휴대폰·태블릿으로 접속 가능

---

## 영상 파일 안내

영상은 `public/videos/` 에 저장하며, 배포 후 `/videos/유형코드.mp4` 로 접근합니다.

| 유형 | 경로 |
|------|------|
| MQ | `/videos/MQ.mp4` |
| MA | `/videos/MA.mp4` |
| MH | `/videos/MH.mp4` |
| … | (총 15개) |

### 영상 용량 권장

| 항목 | 권장 |
|------|------|
| 영상 길이 | 10초 이내 |
| 해상도 | 720p 이하 |
| 파일당 용량 | **10MB 이하** |

현재 프로젝트 영상 용량 (참고):

| 파일 | 용량 |
|------|------|
| MH.mp4 | ~12.8 MB |
| HL.mp4 | ~11.2 MB |
| MA.mp4 | ~10.7 MB |
| 기타 | ~8.7~10.2 MB |

일부 파일이 10MB를 약간 초과합니다. 배포·로딩이 느리면 아래 방법으로 압축하세요.

1. mp4 압축 후 `public/videos`에 다시 넣기
2. 해상도 720p 이하로 낮추기
3. 영상 길이 10초 이내 유지
4. (선택) YouTube 비공개 링크 또는 외부 스토리지 사용

---

## 프로젝트 구조

```
├── package.json
├── vite.config.js
├── vercel.json          ← Vercel SPA 라우팅 설정
├── index.html
├── public/
│   ├── videos/          ← 15개 mp4 (배포 시 dist/videos로 복사)
│   └── images/
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── data/
    │   ├── questions.js
    │   └── resultTypes.js
    ├── components/
    └── styles/
```

---

## 주요 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 로컬 개발 서버 |
| `npm run dev:lan` | 같은 Wi-Fi 접속용 (host 모드) |
| `npm run build` | 배포용 빌드 (`dist` 생성) |
| `npm run preview` | 빌드 결과 로컬 미리보기 |

---

## 문제 해결

### 배포 후 영상이 안 나와요

- `public/videos/MH.mp4` 등 15개 파일이 GitHub에 올라갔는지 확인
- 브라우저에서 `https://배포주소.vercel.app/videos/MH.mp4` 직접 접속 테스트

### 새로고침 시 404가 나와요

- 프로젝트 루트에 `vercel.json` 이 있는지 확인
- Vercel에서 **Redeploy** 실행

### Vercel 배포 용량 초과

- mp4 파일 압축 후 다시 push
- 또는 Git LFS 사용 검토

---

## 라이선스

교육·발표용 MVP 프로젝트
