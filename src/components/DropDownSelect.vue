<template>
  <div class="relative">
    <button
        @click="toggleDropdown"
        class="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white"
    >
      <span class="truncate">
        {{ selectedLabels.length ? `${selectedLabels.length} selected` : placeholder }}
      </span>
      <svg
          class="w-5 h-5 ml-2 -mr-1 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
      >
        <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
        />
      </svg>
    </button>

    <div
        v-if="isOpen"
        class="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto"
    >
      <div class="p-2">
        <div
            v-for="option in options"
            :key="option"
            class="flex items-center px-2 py-1 hover:bg-gray-100"
        >
          <input
              type="checkbox"
              :id="`${id}-${option}`"
              :value="option"
              v-model="selectedValues"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label :for="`${id}-${option}`" class="ml-2 block text-sm text-gray-900 cursor-pointer">
            {{ option }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watch, onMounted, onBeforeUnmount} from 'vue';

const props = defineProps({
  options: {
    type: Array as () => string[],
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Select options',
  },
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Array as () => string[],
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectedValues = ref([...props.modelValue]);

const selectedLabels = computed(() => {
  return selectedValues.value;
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdownOnClickOutside = (e: MouseEvent) => {
  if (isOpen.value && !e.target.closest('.relative')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeDropdownOnClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdownOnClickOutside);
});

watch(selectedValues, (newValues) => {
  emit('update:modelValue', newValues);
});
</script>