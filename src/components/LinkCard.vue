<template>
  <q-card class="my-card q-my-sm">
    <q-card-section>
      <div class="text-overline">{{ link.nanoLink }}</div>
      {{ link }}
    </q-card-section>
    <q-separator />
    <q-card-actions>
      <q-btn flat round icon="mdi-trash-can-outline" color="red" @click="deleteLink(link._id)"/>
      <q-btn flat round icon="mdi-pencil-outline" @click="updateLink(link)"/>
      <q-btn flar color="secondary" @click="copyLink(link.nanoLink)">Copy</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { useNotify } from 'src/composables/notifyHook';
import { useLinkStore } from 'src/stores/link-store';

defineProps({
  link: Object
})

const useLink = useLinkStore();
const $q = useQuasar();
const { errorNotify, successNotify } = useNotify();

const deleteLink = async (id) => {
  $q.dialog({
    title: 'Warning',
    message: 'Would you like to delete this link?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await useLink.removeLink(id);
      successNotify('Link Deleted')
    } catch (error) {
      if (error.errors) {
        return error.errors.forEach(error => {
          errorNotify(error.msg);
        });
      }
      errorNotify(error);
    }
  })
}

const updateLink = (link) => {
  $q.dialog({
    title: 'Edit',
    message: 'What will the new link be like?',
    prompt: {
      model: link.longLink,
      type: 'text',
    },
    cancel: true,
    persistent: true,
  }).onOk( async (data) => {
    try {
      const newLink = {...link, longLink: data};
      await useLink.patchLink(newLink);
      successNotify('Link Updated')
    } catch (error) {
      if (error.errors)
        return error.errors.forEach( error => errorNotify(error.msg) );
      errorNotify(error);
    };
  })
}

const copyLink = async(text) => {
  try {
    const path = `${process.env.FRONT_URI}/${text}`;
    await navigator.clipboard.writeText(path);
    successNotify('Text copy to clipboard')
  } catch (error) {
    console.log(error)
    errorNotify('Copy failed')
  }
}
</script>