<template>
  <q-page padding>
    <AddLink />
    <!-- <pre> {{ useLink.links }} </pre> -->
    <template v-for="link in useLink.links" :key="link._id">
      <LinkCard :link="link"/>
    </template>
  </q-page>
</template>

<script setup>
import AddLink from "src/components/AddLink.vue";
import { useLinkStore } from "../stores/link-store";
import LinkCard from "src/components/LinkCard.vue";
//** CONSTANTS **//
const useLink = useLinkStore()
//** METHODS **//

//** CALLS **//
</script>