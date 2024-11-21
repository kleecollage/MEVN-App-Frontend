import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useUserStore } from "./user-store";
import { ref } from "vue";
import { useQuasar } from "quasar";


export const useLinkStore = defineStore('link', () => {

  const userStore = useUserStore();
  const $q = useQuasar();
  const links = ref([]);

  const createLink = async(longLink) => {
    try {
      const res = await api({
        method: 'POST',
        url: '/links',
        headers: {
          Authorization: 'Bearer ' + userStore.token
        },
        data: {
          longLink: longLink
        }
      })
      links.value.push(res.data.newLink)
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  const getLinks = async () => {
    try {
      $q.loading.show()
      const { data } = await api({
        method: 'GET',
        url: '/links',
        headers: { Authorization: `Bearer ${userStore.token}` },
      });
      console.log(' -- BD call -- ')
      links.value = [...data.links];
    } catch (error) {
      // console.error(error.response?.data ?? error);
      return error.response?.data ?? error
    } finally {
      $q.loading.hide();
    }
  };

  const removeLink = async (id) => {
    try {
      $q.loading.show()
      await api({
        method: 'DELETE',
        url: `/links/${id}`,
        headers: { Authorization: `Bearer ${userStore.token}` }
      })
      links.value = links.value.filter(link => link._id !== id)
    } catch (error) {
      console.log(error.response?.data ?? error)
    } finally {
      $q.loading.hide();
    }
  }

  const patchLink = async (newLink) => {
    try {
      $q.loading.show()
      await api({
        method: 'PATCH',
        url: `/links/${newLink._id}`,
        headers: { Authorization: `Bearer ${userStore.token}` },
        data: { longLink: newLink.longLink }
      })
      links.value = links.value.map( (item) => item._id === newLink._id ? newLink : item );
    } catch (error) {
      throw(error.response?.data ?? error)
    } finally {
      $q.loading.hide();
    }
  }

  // Calls
  getLinks();

  return {
    // PROPERTIES
    links,
    // METHODS
    createLink,
    getLinks,
    removeLink,
    patchLink
  }
})