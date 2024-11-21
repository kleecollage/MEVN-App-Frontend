<template>
  <q-form @submit.prevent="addLink" ref="formAdd">
    <q-input
      v-model.trim="link"
      label="Enter link here"
      placeholder="Enter super link here"
      :rules="[(val) => (val && val.trim() !== '') || 'Write something you asshole']"
      lazy-rules
    />
    <q-btn
      class="q-my-sm full-width"
      label="Add"
      color="secondary"
      type="submmit"
      :loading=loading
    />
  </q-form>
</template>

<script setup>
import { ref } from 'vue';
import { useLinkStore } from 'src/stores/link-store';
import { useNotify } from 'src/composables/notifyHook';
//** CONSTANTS **//
const useLink = useLinkStore();
const link = ref('')
const { errorNotify, successNotify } = useNotify();
const loading = ref(false);
const formAdd = ref(null)
//** METHODS **//
const addLink = async () => {
  try {
    loading.value = true;
    await useLink.createLink(link.value);
    successNotify('Link added successfully')
    formAdd.value.resetValidation()
  } catch (error) {
    if (error.errors) {
      return error.errors.forEach(error => {
        errorNotify(error.msg);
      });
    }
    errorNotify(error);
  } finally {
    loading.value = false;
    link.value = '';
  }
};

</script>