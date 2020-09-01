import { inject, computed, onUnmounted } from 'vue';

export type Parent<T = unknown> = null | {
  children: T[];
};

export function useParent<T = unknown>(key: string, child: T = {} as T) {
  const parent = inject<Parent<T>>(key, null);

  if (parent) {
    const { children } = parent;
    const index = computed(() => children.indexOf(child));

    children.push(child);

    onUnmounted(() => {
      children.splice(index.value, 1);
    });

    return {
      index,
      parent,
    };
  }

  return {};
}