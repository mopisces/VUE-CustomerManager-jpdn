<template>
	<div class="wrapper">
		<v-head></v-head>
		<v-sidebar></v-sidebar>
		<div class="content-box" :class="{'content-collapse':collapse}">
			<v-tags></v-tags>
			<div class="content">
				
			</div>
		</div>
	</div>
</template>