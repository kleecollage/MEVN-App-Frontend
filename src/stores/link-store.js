import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useUserStore } from "./user-store";
import { ref } from "vue";


export const useLinkStore = defineStore('link', () => {

  const userStore = useUserStore();
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
      console.log(res.data)
      links.value.push(res.data.newLink)
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  const getLinks = async () => {
    try {
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
    }
  };

  // Calls
  getLinks();

  return {
    // PROPERTIES
    links,
    // METHODS
    createLink,
    getLinks
  }
})