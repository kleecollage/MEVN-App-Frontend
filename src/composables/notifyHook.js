import { useQuasar } from "quasar"

export const useNotify = () => {
  const $q = useQuasar();
  const showNotify = (message = 'Server error', color = 'negative', icon = 'report_problem') => {
    $q.notify({
      message,
      color,
      icon
    })
  }

  return { showNotify };
}