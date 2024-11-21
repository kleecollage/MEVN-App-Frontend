import { useQuasar } from "quasar"

export const useNotify = () => {
  const $q = useQuasar();

  const successNotify = (message = 'Everything ok') => {
    $q.notify({
      message,
      color: 'green',
      icon: 'report_problem'
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