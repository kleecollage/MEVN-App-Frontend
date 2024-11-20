<template>
  <q-btn @click="userStore.access">Ingresar</q-btn>
  <q-btn @click="createLink">Crear Link</q-btn>
  <q-btn @click="userStore.logout">Cerrar Sesion</q-btn>
  {{ userStore.token }} - {{ userStore.expiresIn }}
</template>

<script setup>
import { useUserStore } from 'src/stores/user-store';

// CONSTANTS
// const { token, expiresIn, access, refreshToken } = useUserStore();
const userStore = useUserStore();

// METHODS
const createLink = async () => {
  try {
    const res = await api({
      method: 'POST',
      url: '/links',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.value,
      },
      data: {
        longLink: "pornhub.com"
      }
    });
    console.log(res.data);
  } catch (error) {
    console.log(error)
  }
};
// CALLS
// userStore.refreshToken();
</script>