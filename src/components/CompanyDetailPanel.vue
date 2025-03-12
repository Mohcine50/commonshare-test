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
                      class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
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
                  </div>
                </div>

                <div class="flex items-center ml-4 gap-3">
                    <a v-if="links?.website" class="text-sm font-semibold">Website</a>
                  <a v-if="links?.linkedin" class="text-sm font-semibold">Linkedin</a>
                  <a v-if="links?.discord" class="text-sm font-semibold">Discord</a>
                  <a v-if="links?.twitter" class="text-sm font-semibold">Twitter</a>
                  <a v-if="links?.github" class="text-sm font-semibold">Github</a>
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
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Governance Model</h4>
                  <p class="text-base font-medium">{{ selectedCompany.governance_model}}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-medium text-gray-500 mb-1">Founded</h4>
                  <p class="text-base font-medium">{{ selectedCompany.year_founded }}</p>
                </div>
              </div>

              <div class="mb-6">
                <h4 class="text-base font-medium text-gray-900 mb-3">Description</h4>
                <p class="text-gray-600">
{{selectedCompany.description
                  }}                </p>
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
import type {Company, LinksSocialMedia} from "../types";
import {getLinkedRecord} from "../services/Airtable.ts";

const props = defineProps({
  selectedCompany: {
    type: Object as ()=> Company | null,
    default: null,
  },
});

const emit = defineEmits(['close']);

const isPanelOpen = ref(false);
const links = ref<LinksSocialMedia | null>(null)

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


onMounted(async () => {
  isPanelOpen.value = false;
  console.log(props.selectedCompany)

  if(props.selectedCompany && props.selectedCompany.links_social_media){
    links.value = await getLinkedRecord("links_social_media", props.selectedCompany.links_social_media) as LinksSocialMedia;
  }
});
</script>