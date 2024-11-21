<template>
  <q-form @submit.prevent="addLink">
    <q-input
      v-model.trim="link"
      label="Enter link here"
      placeholder="Enter super link here"
      :rules="[(val) => (val && val.trim() !== '') || 'Write something you asshole']"
    />
    <q-btn
      class="q-mt-sm full-width"
      label="Add"
      color="primary"
      type="submmit"
      :loading=loading
    />
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
const { showNotify } = useNotify();
const loading = ref(false);
//** METHODS **//
const addLink = async () => {
  try {
    loading.value = true;
    await useLink.createLink(link.value);
    showNotify('Link added successfully', 'green')
  } catch (error) {
    if (error.errors) {
      return error.errors.forEach(error => {
        showNotify(error.msg);
      });
    }
    showNotify(error);
  } finally {
    loading.value = false;
    link.value = '';
  }
};

</script>