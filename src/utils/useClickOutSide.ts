import { ref, onMounted, onUnmounted, Ref } from "vue";

const useClickOutSide = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutSide = ref(false);
  const handler = (E: MouseEvent) => {
    if (
      elementRef.value &&
      elementRef.value.contains(E.target as HTMLElement)
    ) {
      isClickOutSide.value = false;
    } else {
      isClickOutSide.value = true;
    }
  };
  onMounted(() => {
    document.addEventListener("click", handler);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });
  return isClickOutSide;
};

export default useClickOutSide;
