<template>
  <h3>Login {{ token }}</h3>
</template>

<script setup>
import { useUserStore } from '../stores/user-store'

// const userStore = useUserStore()
const { token } = useUserStore()


</script>

<style lang="scss" scoped></style>