<template>
	<header>
		<nav class="navbar navbar-expand-sm navbar-dark bg-primary">
			<div class="container-fluid">
				<RouterLink class="navbar-brand" to="/">GYM CODING</RouterLink>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto">
						<li class="nav-item">
							<RouterLink class="nav-link" active-class="active" to="/">
								Home
							</RouterLink>
						</li>
						<li class="nav-item">
							<RouterLink class="nav-link" active-class="active" to="/about">
								About
							</RouterLink>
						</li>
						<li class="nav-item">
							<RouterLink class="nav-link" active-class="active" to="/posts">
								게시글
							</RouterLink>
						</li>
						<li class="nav-item">
							<RouterLink class="nav-link" active-class="active" to="/nested">
								Nested
							</RouterLink>
						</li>
						<li class="nav-item">
							<RouterLink class="nav-link" active-class="active" to="/my">
								MyPage
							</RouterLink>
						</li>
					</ul>
					<div class="d-flex"><!--html 요소의 클릭 이벤트(`click`) 가 발생했을 때 `goPage` 메서드를 호출하도록 설정되어 있음-->
						<button class="btn btn-outline-light" type="button" @click="goPage">
							글쓰기
						</button>
					</div>
				</div>
			</div>
		</nav>
	</header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goPage = () => {
	router.push({
		name: 'PostCreate',
	});
};
</script>

<style lang="scss" scoped></style>
