import axios from 'axios';
// axios.defaults.baseURL 을 통해 기본 baseURL 을 설정, 이는 API 요청의 기본 경로를 정의
// useAxios 함수 : 'useAxios' 함수는 매개변수로 URL과 설정 객체를 받아 HTTP 요청을 수행하고 응답을 처리함
// url : API 엔드포인트(endpoint)의 경로를 나타내는 매개변수
//  엔드포인트는 서버 애플리케이션에서 클라이언트 애플리케이션으로부터 요청을 처리하는 데 사용되는 URL의 일부, 일반적으로 API에서 엔드포인트는 데이터를 가져오거나 생성,수정,삭제하는 작업을 수행하기 위한 url 경로를 나타낸다.
// config : HTTP 요청 설정을 담고 있는 객체로, HTTP 메서드, 파라미터 등을 설정
// options : 'useAxios' 함수의 옵션을 설정할 수 있는 객체 (immediate 는 즉시 실행 여부를 결정하는 옵션)

// Ref 객체 및 함수들: response, data, error, loading 은 ref() 함수를 통해 생성된 반응성있는 변수(HTTP 요청과 관련된 응답 데이터, 에러, 로딩 상태를 추적함)
// execute : HTTP 요청을 실행하는 함수 (내부에서 axios 를 사용하여 실제 요청을 보내고, 응답 및 에러를 처리)
// watchEffect 및 조건부 실행 : watchEffect 는 Vue 의 'watchEffect' 함수를 사용하여 URL 또는 params 가 변경될때마다 요청을 다시 실행,
// iSRef, unref 는 Vue 의 반응성 관련 함수들을 사용하여 URL 과 params 가 반응성을 가진 변수인지 확인하고, 그에 맞게 조건부 실행을 수행
import { isRef, ref, unref, watchEffect } from 'vue';

// env 파일에서 정의한 환경 변수들을 'import.meta.env' 를 통해 접근할 수 있게 해줌
// axios.defaults.baseURL 을 사용하여 기본 URL을 설정함으로써 모든 http 요청의 기본 주소를 지정할 수 있음
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
// apiUrl 을 사용하여 Axios 요청 보내기 등의 작업 수행
// 예: axios.get(`${apiUrl}/posts`)

// Axios 요청에 사용될 기본 설정을 정의
const defaultConfig = {
	method: 'get', // HTTP 요청의 기본 메서드를 get 으로 설정한다.
};

const defaultOptions = {
	immediate: true, // 이 옵션은 일반적으로 커스텀 훅이나 함수에서 사용될 때, 특정 설정이 즉시 적용되는지 여부를 나타낸다.
};

// useAxios 함수 : url, config, options 세 가지 매개변수를 받으며, http 요청을 수행
export const useAxios = (url, config = {}, options = {}) => {
	//ref()함수 사용하여 'response', 'data','error','loading' 변수들을 만듦(이 변수들은 http 요청과 관련된 응답 데이터, 에러, 로딩 상태 등을 추적)
	const response = ref(null);
	const data = ref(null);
	const error = ref(null);
	const loading = ref(false);

	// onSuccess, onError, immediate 를 비구조화 할당하여 사용함
	// 객체 구조 분해(Destructuring)와 객체 병합(Object Spread)을 활용하여 변수를 설정하는 부분
	const { onSuccess, onError, immediate } = {
		//defaultOptions 객체와 options 객체를 병합하여 새로운 객체를 만듦
		//defaultOptions 에는 immediate, onSuccess, onError 등의 속성이 있고,
		//options 에도 동일한 속성이 있다면, 두 객체를 합쳐 새로운 객체를 만들다.
		...defaultOptions,
		...options,
	};

	const { params } = config;
	const execute = body => {
		data.value = null;
		error.value = null;
		loading.value = true;
		axios(unref(url), {
			...defaultConfig,
			...config,
			params: unref(params),
			data: typeof body === 'object' ? body : {},
		})
			.then(res => {
				response.value = res;
				data.value = res.data;
				if (onSuccess) {
					onSuccess(res);
				}
			})
			.catch(err => {
				error.value = err;
				if (onError) {
					onError(err);
				}
			})
			.finally(() => {
				loading.value = false;
			});
	};
	if (isRef(params) || isRef(url)) {
		watchEffect(execute);
	} else {
		if (immediate) {
			execute();
		}
	}
	return {
		response,
		data,
		error,
		loading,
		execute,
	};
};
