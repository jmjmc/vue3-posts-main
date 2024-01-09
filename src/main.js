//bootstrap 과 관련된 css 파일을 import 한다.
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 의 최소한의 css 파일
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap  아이콘에 대한 css 파일

// Vue.js 와 관련된 모듈들을 import 한다.
import { createApp } from 'vue'; // Vue 애플리케이션 생성 함수
import { createPinia } from 'pinia'; // Vue 상태 관리 라이브러라인 Pinia 생성 함수
import App from './App.vue'; // 애플리케이션의 메인 컴포넌트
import router from '@/router'; // 라우터 설정 파일
import globalDirectives from './plugins/global-directives'; // 전역 디렉티브를 관리하는 플러그인
import dayjs from './plugins/dayjs'; // 날짜와 시간을 다루는 라이브러리인 dayjs

// Vue 애플리케이션 생성
const app = createApp(App);

// Pinia 상태 관리 라이브러리를 애플리케이션에 추가
app.use(createPinia());

// 애플리케이션 라우터 추가
app.use(router);

// 전역 디렉티브 플러그인 추가
app.use(globalDirectives);

// dayjs 플러그인 추가
app.use(dayjs);

// 애플리케이션을 HTML 문서의 '#app' 요소에 부착하여 마운트한다.
app.mount('#app');

// bootstrap 과 관련된 JavaScript 파일을 import 한다.
import 'bootstrap/dist/js/bootstrap.js';
