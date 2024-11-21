import { useQuasar } from "quasar"

export const useNotify = () => {
  const $q = useQuasar();

  const successNotify = (message = 'Everything ok') => {
    $q.notify({
      message,
      color: 'green',
      icon: 'mdi-check-circle-outline'
    })
  }

  const errorNotify = (message = 'Server error') => {
    $q.notify({
      message,
      color: 'negative',
      icon: 'report_problem'
    })
  }

  return { successNotify, errorNotify };
}