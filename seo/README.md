# SEO URL 생성 방식

`vite.config.js`가 빌드할 때 `index.html`, `robots.txt`, `sitemap.xml`의 주소를 생성합니다.

- Vercel 기본 주소: Vercel 시스템 변수 `VERCEL_PROJECT_PRODUCTION_URL` 자동 사용
- 맞춤 도메인: Vercel 환경변수 `SITE_URL`에 `https://도메인` 등록
- 로컬 빌드: 임의 도메인을 넣지 않으며 빈 sitemap을 생성

도메인을 바꾼 뒤에는 Vercel에서 재배포해야 공유 이미지와 검색엔진 주소가 갱신됩니다.
