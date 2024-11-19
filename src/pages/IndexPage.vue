<template>
  <q-btn @click="access">Ingresar</q-btn>
  <q-btn @click="createLink">Crear Link</q-btn>
  {{ token }} - {{ expireIn }}
</template>

<script setup>
import { api } from 'src/boot/axios';
import { ref } from 'vue';
// CONSTANTS
const token = ref('')
const expireIn = ref('')

// METHODS
const access = async () => {
  try {
    console.log('clickity click')
    const res = await api.post('/auth/login', {
      email: "jane.smith@mail.com",
      password: "123456"
    });
    token.value = res.data.token;
    expireIn.value = res.data.expiresIn;
    setTime();
  } catch (error) {
    console.log(error)
  }
};

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

const setTime = () => {
  setTimeout(() => {
    console.log("token expired , new token created")
    refreshToken();
  }, expireIn.value * 1000 - 7000);
}


const refreshToken = async () => {
  try {
    const res = await api.get('/auth/refresh')
    token.value = res.data.token;
    expireIn.value = res.data.expiresIn;
    setTime();
  } catch (error) {
    console.log(error)
  }
};

// CALLS
refreshToken();
</script>