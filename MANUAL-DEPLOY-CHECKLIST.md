# 거상투어 수동 배포 체크리스트

## GitHub 준비

- [ ] GitHub에서 **+ → New repository**를 선택했다.
- [ ] 새 저장소를 만들 때 README와 `.gitignore`를 별도로 추가하지 않았다.
- [ ] `geosang-tour-vercel-deploy.zip`을 내 PC에서 압축 해제했다.
- [ ] ZIP 파일 자체가 아니라 압축 해제한 내부 파일을 업로드했다.
- [ ] 저장소 첫 화면에 `package.json`, `index.html`, `src`, `public`이 바로 보인다.
- [ ] `node_modules`, `dist`, `.env`, `.git`이 업로드되지 않았다.
- [ ] **Commit changes**를 눌러 업로드 커밋이 생성된 것을 확인했다.

## Vercel 연결

- [ ] Vercel에 로그인했다.
- [ ] **Add New… → Project**를 선택했다.
- [ ] GitHub 저장소 오른쪽의 **Import**를 눌렀다.
- [ ] Framework Preset이 **Vite**인지 확인했다.
- [ ] Root Directory가 `./`인지 확인했다.
- [ ] Install Command가 `pnpm install --frozen-lockfile`인지 확인했다.
- [ ] Build Command가 `pnpm build`인지 확인했다.
- [ ] Output Directory가 `dist`인지 확인했다.
- [ ] 필수 환경변수가 없음을 확인했다.
- [ ] 맞춤 도메인을 바로 사용할 경우 `SITE_URL`을 등록했다.
- [ ] **Deploy**를 눌렀다.
- [ ] 배포 상태가 **Ready**인지 확인했다.

## 배포 결과 확인

- [ ] 배포 주소에 직접 접속했다.
- [ ] PC 화면에서 헤더, 히어로, 카드 4열, 후기, CTA, 푸터를 확인했다.
- [ ] 모바일 화면 또는 개발자 도구 390px에서 카드 1열과 모바일 메뉴를 확인했다.
- [ ] 성수·홍대·종로·코엑스 이미지가 정상이다.
- [ ] 부산·경주·여수·목포 이미지가 정상이다.
- [ ] 도쿄·중국 선전·시드니·홍콩 이미지가 정상이다.
- [ ] 공식 거상 로고의 투명 배경과 비율이 정상이다.
- [ ] 모든 지역 이미지가 정사각형이며 찌그러지지 않는다.
- [ ] `/favicon.png`에 직접 접속해 심벌이 보인다.
- [ ] `/assets/images/brand/geosang-tour-og.png`에 직접 접속해 OG 이미지를 확인했다.
- [ ] `/robots.txt`와 `/sitemap.xml`이 열린다.
- [ ] 브라우저 Console과 Network에 이미지 404 또는 JavaScript 오류가 없다.

## 맞춤 도메인과 최종 확인

- [ ] Vercel **Settings → Domains**에서 맞춤 도메인을 추가했다.
- [ ] 도메인 구입처에 Vercel이 안내한 DNS 레코드를 등록했다.
- [ ] Domains 화면이 **Valid Configuration** 상태다.
- [ ] `SITE_URL` 환경변수에 `https://`를 포함한 맞춤 도메인을 등록했다.
- [ ] **Deployments → … → Redeploy**로 최종 재배포했다.
- [ ] 맞춤 도메인에서 PC·모바일·이미지·로고·OG 이미지를 다시 확인했다.
- [ ] 카카오톡, Slack 또는 공유 디버거에서 링크 미리보기를 확인했다.
