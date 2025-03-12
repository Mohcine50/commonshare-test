<template>
  <div
      v-if="selectedCompany"
      class="fixed inset-0 overflow-hidden z-50"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-gray-500/10 bg-opacity-75 transition-opacity " @click.self="closePanel" aria-hidden="true"></div>
      <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div
            class="h-full transition-transform ease-in-out duration-300 w-screen max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl"
            :class="{ 'translate-x-0': isPanelOpen, 'translate-x-full': !isPanelOpen }"
        >
          <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-auto">
            <div class="px-4 sm:px-6">
              <div class="flex items-start justify-between">
                <h2 class="text-xl font-bold text-gray-900">
                  {{ selectedCompany.name }}
                </h2>
                <div class="ml-3 h-7 flex items-center">
                  <button
                      @click="closePanel"
                      class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span class="sr-only">Close panel</span>
                    <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="mt-6 relative flex-1 px-4 sm:px-6">
              <div class="border-b border-gray-200 pb-5 mb-5">
                <div class="flex items-center mb-6">
                  <div class="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-xl text-blue-700 font-bold">
                    {{ selectedCompany.name.charAt(0) }}
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">{{ selectedCompany.name }}</h3>
                    <p class="text-sm text-blue-600">{{ selectedCompany.website }}</p>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Industry</h4>
                  <p class="text-base font-medium">{{ selectedCompany.industry }}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Company Size</h4>
                  <p class="text-base font-medium">{{ selectedCompany.size }}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Location</h4>
                  <p class="text-base font-medium">{{ selectedCompany.location }}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Founded</h4>
                  <p class="text-base font-medium">{{ selectedCompany.founded }}</p>
                </div>
              </div>

              <div class="mb-6">
                <h4 class="text-base font-medium text-gray-900 mb-3">About</h4>
                <p class="text-gray-600">
                  {{ selectedCompany.about || `${selectedCompany.name} is a leading organization in the ${selectedCompany.industry} industry, based in ${selectedCompany.location}. Established in ${selectedCompany.founded}, the company has grown to have ${selectedCompany.size} employees.` }}
                </p>
              </div>

              <div class="mb-6">
                <h4 class="text-base font-medium text-gray-900 mb-3">Key Products & Services</h4>
                <ul class="list-disc pl-5 text-gray-600">
                  <li>Product/Service 1</li>
                  <li>Product/Service 2</li>
                  <li>Product/Service 3</li>
                </ul>
              </div>

              <div class="pt-4 border-t border-gray-200">
                <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                  Contact Company
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  selectedCompany: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close']);

const isPanelOpen = ref(false);

watch(
    () => props.selectedCompany,
    (newValue) => {
      if (newValue) {
        isPanelOpen.value = false;

        setTimeout(() => {
          isPanelOpen.value = true;
          document.body.style.overflow = 'hidden';
        }, 50);
      }
    },
    { immediate: true }
);

const closePanel = () => {
  isPanelOpen.value = false;
  setTimeout(() => {
    emit('close');
    document.body.style.overflow = '';
  }, 300);
};

onMounted(() => {
  isPanelOpen.value = false;
});
</script>