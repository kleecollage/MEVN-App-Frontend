<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h3>Login</h3>
      <q-form @submit.prevent="handleSubmit">
        <q-input
          v-model="email"
          type="email"
          label="Enter your email"
          :rules="[
            val => val && regex.test(email) || 'Incorrect email format'
          ]"
        />
        <q-input
          v-model="password"
          type="password"
          label="Enter your password"
          :rules="[
            val => val && val.length > 5 || 'Do you call this a password?'
          ]"
        />
        <div>
          <q-btn label="Access" type="submit"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user-store'
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
const $q = useQuasar()

// CONSTANTS
const userStore = useUserStore();
const router = useRouter();
const email = ref('john.doe@mail.com');
const password = ref('123456');
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// METHODS
const handleSubmit = async() => {
  try {
    await userStore.access(email.value, password.value);
    router.push('/');
    email.value='';
    password.value='';
  } catch (error) {
    console.log("Error: ", error.error)
    alertDialog(error.error)
  }
};

const alertDialog = (message = "Error en el servidor") => {
  $q.dialog({
      title: 'Error',
      message
    });
};
</script>