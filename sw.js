var CHCHE_NAME = "pwa-offline-v1";
// 캐싱 스토리지에 저장될 이름
var fileToCache = ["/", "/img/login_logo.png", "css/main.css"];
// 캐싱할 웹자원(이미지,css...)

// 서비스워커 설치(웹자원 캐싱)
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CHCHE_NAME)
      // CHCHE_NAME 변수 이름으로 캐시 스토리지에 캐시를 생성 -> pwa파일 나옴
      // caches - 캐시스토리지에 접근 할 수 있는 예약어
      .then(function (cache) {
        // 캐싱이 성공했을 때
        return cache.addAll(fileToCache); // pwa파일 웹자원 추가
      })
      .catch(function (error) {
        return console.log(error);
      }),
  );
});

// 서비스워커 설치 후 네트워크 요청이 있을때는 캐쉬로 돌려줌
// (캐쉬된 자원으로)
self.addEventListener("fetch", function (event) {
  event.respondWith(
    // fetch 결과에 대한 응답을 알려주는 API
    caches
      .match(event.request)
      // chches.match() - 네트워크에 요청 에 해당하는 캐싱을 반환
      .then(function (response) {
        return response || fetch(event.request);
        // 캐쉬가없을 때는 fetch API (네트워크에서 가져옴)
      })
      .catch(function (error) {
        return console.log(error);
      }),
  );
});

// 서비스워커 활성화 및 업데이트
self.addEventListener("activate", function (event) {
  // var newCacheList =
  event.waitUntil(
    // 내부동작이 끝날때까지 기다려줌
    caches
      .keys() // 객체안의 모든 키들, 스토리지들이 모든 목록을 확인
      .then(function (cacheList) {
        // 위 목록을 가져옴
        return Promise.all(
          // 여러 비동기 작업을 동시에 처리하여 결과를 얻고자할 때
          cacheList.map(function (cacheName) {
            if (newCacheList.indexOf(cacheName) === -1) {
              // 문자열.indexOf('찾을문자') - 같은게 몇번째 인지 알아옴
              // 새로운 newCacheList의 아이템이 기존 캐쉬에 없을 때
              return caches.delete(cacheName);
            }
          }),
        );
        // 새로운 서브
      })
      .catch(function (error) {
        console.log(error);
      }),
  );
});
