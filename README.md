# 거상투어 홈페이지 수동 배포 안내

## 1. 프로젝트 소개

거상투어의 서울·국내 지방·해외 비즈니스 학습여행을 소개하는 반응형 단일 페이지 홈페이지입니다. 공식 거상 심벌, 지역별 투어 이미지, 투어 진행 방식, 후기, 알림 신청 화면을 포함합니다.

이 패키지는 기존 ChatGPT Sites 전용 파일을 제거하고 GitHub와 Vercel에서 바로 사용할 수 있는 표준 Vite 정적 사이트로 정리한 버전입니다. GitHub 저장소나 Vercel 프로젝트는 패키지에 포함되지 않습니다.

## 2. 사용 기술

- Vite 7
- HTML5, CSS3, Vanilla JavaScript
- TypeScript의 `checkJs`를 이용한 JavaScript 타입 검사
- ESLint 9
- pnpm 11 잠금 파일
- Node.js 22 권장 (`20.19` 이상도 지원)

라우트는 `/` 한 개이며 API Route, 서버 기능, 데이터베이스는 사용하지 않습니다. 알림 신청 폼은 현재 화면에서 완료 문구만 표시하며 외부로 개인정보를 전송하지 않습니다.

## 3. 폴더 구조

```text
.
├─ index.html                 # 페이지 콘텐츠와 SEO 메타 태그
├─ src/
│  ├─ main.js                # 메뉴, 로고, 이미지 fallback, 폼 동작
│  └─ styles.css             # 전체 디자인과 반응형 스타일
├─ public/
│  ├─ assets/images/         # 공식 로고, OG 이미지, 모든 지역 이미지
│  ├─ favicon.png
│  └─ site.webmanifest
├─ seo/README.md             # canonical·sitemap 자동 생성 방식
├─ vite.config.js
├─ tsconfig.json
├─ eslint.config.js
├─ package.json
├─ pnpm-lock.yaml
└─ MANUAL-DEPLOY-CHECKLIST.md
```

## 4. 로컬에서 실행하는 방법

1. [Node.js 공식 사이트](https://nodejs.org/)에서 Node.js 22 LTS를 설치합니다.
2. ZIP을 원하는 폴더에 압축 해제합니다.
3. 압축을 푼 폴더의 빈 공간에서 마우스 오른쪽 버튼을 누르고 **터미널에서 열기**를 선택합니다.
4. 아래 명령을 순서대로 실행합니다.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

5. 터미널에 표시된 `http://localhost:5173` 주소를 브라우저에서 엽니다.
6. 종료할 때는 터미널에서 `Ctrl + C`를 누릅니다.

최종 빌드 확인은 다음 명령으로 할 수 있습니다.

```bash
pnpm build
pnpm preview
```

## 5. GitHub에 수동으로 올리는 방법

1. GitHub에 로그인합니다.
2. 오른쪽 위 **+** → **New repository**를 누릅니다.
3. Repository name에 예를 들어 `geosang-tour`를 입력합니다.
4. Public 또는 Private을 선택합니다.
5. **Add a README file**, `.gitignore`, License는 추가하지 않은 상태로 **Create repository**를 누릅니다. 이 패키지에 이미 README와 `.gitignore`가 있습니다.
6. 생성된 저장소 화면에서 **uploading an existing file**을 누릅니다.
7. ZIP 자체를 올리지 말고 먼저 ZIP을 압축 해제합니다.
8. 압축을 푼 폴더 안의 `package.json`, `index.html`, `src`, `public` 등 모든 항목을 업로드 영역에 끌어다 놓습니다.
9. `node_modules`, `dist`, `.env`가 업로드 목록에 없는지 확인합니다.
10. 아래 Commit changes 입력란에 `거상투어 Vercel 배포 파일 추가`라고 입력하고 **Commit changes**를 누릅니다.

GitHub 웹 업로드는 한 번에 올릴 수 있는 파일 크기와 개수에 제한이 있습니다. 업로드가 실패하면 GitHub Desktop을 사용하거나 파일을 두 번에 나누어 올리되, 최종 저장소 루트에 `package.json`이 보여야 합니다.

## 6. Vercel에서 GitHub 저장소 연결하기

1. [Vercel](https://vercel.com/)에 로그인합니다.
2. 대시보드에서 **Add New…** → **Project**를 누릅니다.
3. **Import Git Repository**에서 방금 만든 GitHub 저장소를 찾습니다.
4. 보이지 않으면 **Adjust GitHub App Permissions**를 눌러 해당 저장소 접근을 허용합니다.
5. 저장소 오른쪽의 **Import**를 누릅니다.
6. Project Name은 원하는 이름을 입력합니다.
7. Framework Preset이 **Vite**로 자동 감지되었는지 확인합니다.
8. Root Directory는 저장소 루트인 `./` 그대로 둡니다.
9. **Deploy**를 누릅니다.

## 7. Vercel 빌드 설정

대부분 자동으로 감지되므로 직접 변경하지 않아도 됩니다.

| 항목 | 설정값 |
|---|---|
| Framework Preset | Vite |
| Install Command | `pnpm install` |
| Build Command | `pnpm build` |
| Output Directory | `dist` |
| Development Command | `pnpm dev` |
| Root Directory | `./` |
| Node.js Version | 22.x 권장 |

`vercel.json`은 필요하지 않아 포함하지 않았습니다. 단일 페이지의 내부 이동은 `#seoul` 같은 앵커 방식이므로 새로고침 라우팅 오류도 없습니다.

## 8. 환경변수 등록 방법

필수 환경변수는 없습니다. Vercel 배포 주소는 Vercel 시스템 변수 `VERCEL_PROJECT_PRODUCTION_URL`을 빌드 시 자동 사용합니다.

맞춤 도메인을 연결한 뒤 canonical, Open Graph, robots.txt, sitemap.xml에도 그 도메인을 고정하려면 아래 선택 변수를 등록합니다.

| 변수명 | 필수 여부 | 용도 | 예시 |
|---|---|---|---|
| `SITE_URL` | 선택 | SEO 및 공유 주소의 기준 도메인 | `https://tour.example.com` |

등록 순서:

1. Vercel 프로젝트 → **Settings** → **Environment Variables**로 이동합니다.
2. Key에 `SITE_URL`, Value에 `https://`를 포함한 실제 도메인을 입력합니다.
3. Environment는 **Production**, 필요하면 **Preview**도 선택합니다.
4. **Save**를 누릅니다.
5. **Deployments** → 최신 배포 오른쪽 `…` → **Redeploy**를 누릅니다.

`.env.example`은 변수 이름과 설명만 제공하며 실제 비밀번호·토큰은 포함하지 않습니다.

## 9. 배포 후 확인할 항목

- 첫 화면의 공식 로고와 히어로 이미지가 보이는지
- 성수·홍대·종로·코엑스 이미지가 지역명과 일치하는지
- 부산·경주·여수·목포 이미지가 보이는지
- 도쿄·중국 선전·시드니·홍콩 이미지가 보이는지
- 모든 지역 카드 이미지가 정사각형인지
- PC에서 4열, 태블릿에서 2열, 모바일에서 1열인지
- 모바일 메뉴가 열리고 각 메뉴가 해당 섹션으로 이동하는지
- 알림 신청 버튼을 누르면 완료 메시지가 표시되는지
- `/favicon.png`, `/assets/images/brand/geosang-tour-og.png`, `/robots.txt`, `/sitemap.xml`에 직접 접속되는지
- 브라우저 개발자 도구의 Console과 Network에 404 또는 빨간 오류가 없는지

## 10. 맞춤 도메인 연결 방법

1. Vercel 프로젝트 → **Settings** → **Domains**로 이동합니다.
2. 연결할 도메인을 입력하고 **Add**를 누릅니다.
3. Vercel에 표시된 DNS 안내에 따라 도메인 구입처에서 A 레코드 또는 CNAME을 등록합니다.
4. Vercel Domains 화면이 **Valid Configuration**으로 바뀔 때까지 기다립니다.
5. 위 환경변수 안내대로 `SITE_URL`을 실제 도메인으로 등록합니다.
6. 최신 배포를 **Redeploy**합니다.
7. 맞춤 도메인에서 `/robots.txt`, `/sitemap.xml`과 공유 미리보기를 다시 확인합니다.

## 11. 콘텐츠와 이미지 수정 위치

- 페이지 문구·지역명·링크: `index.html`
- 색상·글자·카드·반응형 레이아웃: `src/styles.css`
- 메뉴·폼·이미지 오류 처리: `src/main.js`
- 서울 이미지: `public/assets/images/tours/seoul/`
- 국내 지방 이미지: `public/assets/images/tours/korea/`
- 해외 이미지: `public/assets/images/tours/overseas/`
- OG 공유 이미지: `public/assets/images/brand/geosang-tour-og.png`
- 파비콘: `public/favicon.png`

이미지를 교체할 때는 기존 파일명과 확장자를 유지하면 코드를 바꿀 필요가 없습니다. 다른 파일명을 쓰면 `index.html`의 해당 이미지 경로도 함께 수정합니다. 파일명은 영문 소문자와 하이픈을 권장합니다.

## 12. 거상 공식 로고 교체 위치

공식 심벌 원본 경로는 다음과 같습니다.

```text
public/assets/images/brand/geosang-brand-symbol.png
```

파비콘에도 같은 심벌을 사용하므로 로고를 변경하면 `public/favicon.png`도 같은 이미지로 교체합니다. 투명 배경과 원본 비율을 유지하고 색상·여백을 임의로 변경하지 마세요.

## 13. 자주 발생하는 오류와 해결법

### `pnpm` 명령을 찾을 수 없음

터미널에서 `corepack enable`을 실행한 뒤 터미널을 닫고 다시 엽니다. 그래도 안 되면 Node.js 22 LTS를 다시 설치합니다.

### Vercel에서 Framework가 감지되지 않음

GitHub 저장소 첫 화면에 `package.json`과 `vite.config.js`가 있는지 확인합니다. ZIP 폴더가 한 겹 더 들어가 있으면 Root Directory를 그 폴더로 지정하거나 파일을 저장소 루트로 옮깁니다.

### 이미지가 404로 표시됨

파일이 `public/assets/images` 아래에 있는지, 코드 경로가 `/assets/images/...`로 시작하는지 확인합니다. GitHub에서는 대소문자를 구분하므로 파일명과 코드의 대소문자가 정확히 같아야 합니다.

### 배포 후 예전 화면이 보임

Vercel **Deployments**에서 최신 커밋이 배포되었는지 확인하고, 브라우저에서 `Ctrl + F5`로 새로고침합니다.

### OG 이미지가 예전 도메인을 가리킴

Vercel 환경변수 `SITE_URL`을 실제 도메인으로 저장한 뒤 반드시 Redeploy합니다. 이후 카카오톡·Slack 등 공유 서비스의 캐시가 갱신될 때까지 시간이 걸릴 수 있습니다.

### 글꼴이 잠시 기본 글꼴로 보임

현재 Noto Sans KR을 Google Fonts에서 불러옵니다. 사내 방화벽이나 네트워크가 Google Fonts를 막으면 시스템 한글 글꼴로 대체되지만 레이아웃과 기능은 유지됩니다.

## 14. 보안과 개인정보

- 실제 API 키, 비밀번호, 토큰, 배포 자격증명은 포함되어 있지 않습니다.
- `.env` 파일은 `.gitignore`에 포함되어 GitHub 업로드에서 제외됩니다.
- 알림 신청 폼을 실제 이메일 수집 기능으로 연결하려면 개인정보 처리방침과 안전한 서버/API를 별도로 준비해야 합니다.
