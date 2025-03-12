<template>
  <div class="companies-page">
    <div class="bg-blue-600 py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto flex justify-center items-center flex-col">
        <h1 class="text-3xl font-bold text-white mb-6">Companies Directory</h1>
        <div class="relative rounded-md shadow-sm max-w-2xl w-full">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
            <svg
                class="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
              <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
              />
            </svg>
          </div>
          <input
              type="text"
              v-model="store.searchQuery"
              @input="store.applyFilters"
              class="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search companies..."
          />
        </div>
      </div>
    </div>

    <!-- Filters section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white shadow-md -mt-4 rounded-t-lg">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Industry Filter -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Industry</label>
          <DropDownSelect
              id="industry"
              :options="store.filterOptions.industry"
              v-model="store.filters.industry"
              @update:modelValue="store.applyFilters"
              placeholder="Select industries"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Organization Type</label>
          <DropDownSelect
              id="industry"
              :options="store.filterOptions.organizationType"
              v-model="store.filters.organizationType"
              @update:modelValue="store.applyFilters"
              placeholder="Select Organization Type"
          />
        </div>

        <!-- Size Filter -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
          <DropDownSelect
              id="size"
              :options="store.filterOptions.size"
              v-model="store.filters.size"
              @update:modelValue="store.applyFilters"
              placeholder="Select sizes"
          />
        </div>

        <!-- Location Filter -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Geographical Scope</label>
          <DropDownSelect
              id="location"
              :options="store.filterOptions.geographicalScope"
              v-model="store.filters.geographicalScope"
              @update:modelValue="store.applyFilters"
              placeholder="Select locations"
          />
        </div>

        <!-- Founded Year Filter -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Founded Year</label>
          <DropDownSelect
              id="foundedYear"
              :options="store.filterOptions.foundedYear"
              v-model="store.filters.foundedYear"
              @update:modelValue="store.applyFilters"
              placeholder="Select years"
          />
        </div>
      </div>

      <div class="flex justify-end mt-4">
        <button
            @click="store.resetFilters"
            class="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    </div>

    <!-- Companies Table -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div class="bg-white overflow-hidden shadow-sm sm:rounded-b-lg mt-8">
        <div class="overflow-x-auto">
          <div class="overflow-hidden">
            <table class="w-full divide-y divide-gray-200 table-fixed">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="w-1/6 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" class="w-1/6 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th scope="col" class="w-1/12 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" class="w-1/6 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Governance Model
                </th>
                <th scope="col" class="w-1/12 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Founded
                </th>
                <th scope="col" class="w-1/12 px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="company in store.displayCompanies" :key="company.id">
                <td class="px-2 py-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                      {{ company.name.charAt(0) }}
                    </div>
                    <div class="ml-2">
                      <div class="text-sm font-medium text-gray-900 truncate max-w-xs">{{ company.name }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-2 py-4">
                  <div class="text-sm text-gray-900 truncate">{{ company.industry }}</div>
                </td>
                <td class="px-2 py-4">
                  <div class="text-sm text-gray-900 truncate">{{ company.size }}</div>
                </td>
                <td class="px-2 py-4">
                  <div class="text-sm text-gray-900 truncate">{{ company.governance_model }}</div>
                </td>
                <td class="px-2 py-4">
                  <div class="text-sm text-gray-900 truncate">{{ company.year_founded }}</div>
                </td>
                <td class="px-2 py-4 text-right text-sm font-medium">
                  <button @click="viewCompany(company)" class="text-blue-600 hover:text-blue-900 cursor-pointer">View</button>
                </td>
              </tr>
              <!-- Empty state when no results match -->
              <tr v-if="store.isLoading">
                <td colspan="6" class="px-2 py-10 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
              <tr v-if="store.displayCompanies.length === 0 && !store.isLoading">
                <td colspan="6" class="px-2 py-10 text-center text-gray-500">
                  No companies found matching your criteria. Try adjusting your filters.
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ (store.currentPage - 1) * 10 + 1 }}</span>
                to
                <span class="font-medium">{{ Math.min(store.currentPage * 10, store.totalRecords) }}</span>
                of
                <span class="font-medium">{{ store.totalRecords }}</span>
                results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                    @click="store.prevPage"
                    :disabled="store.currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    :class="{ 'opacity-50 cursor-not-allowed': store.currentPage === 1 }"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                  >
                    <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                    />
                  </svg>
                </button>

                <button
                    v-for="page in displayedPages"
                    :key="page"
                    @click="store.goToPage(page)"
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50"
                    :class="store.currentPage === page ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'text-gray-500'"
                >
                  {{ page }}
                </button>

                <button
                    @click="store.nextPage"
                    :disabled="store.currentPage === store.totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    :class="{ 'opacity-50 cursor-not-allowed': store.currentPage === store.totalPages }"
                >
                  <span class="sr-only">Next</span>
                  <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                  >
                    <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <CompanyDetailPanel
        :selectedCompany="selectedCompany"
        @close="closePanel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCompaniesStore } from '../stores/companiesStore';
import CompanyDetailPanel from '../components/CompanyDetailPanel.vue';
import DropDownSelect from '../components/DropDownSelect.vue';
import type {Company} from "../types";

const store = useCompaniesStore();

// Fetch data on component mount
onMounted(() => {
  store.fetchAllCompanies();
});

const displayedPages = computed(() => {
  let pages = [];
  const maxVisiblePages = 5;

  if (store.totalPages <= maxVisiblePages) {
    for (let i = 1; i <= store.totalPages; i++) {
      pages.push(i);
    }
  } else {
    const leftBound = Math.max(1, store.currentPage - Math.floor(maxVisiblePages / 2));
    const rightBound = Math.min(store.totalPages, leftBound + maxVisiblePages - 1);

    for (let i = leftBound; i <= rightBound; i++) {
      pages.push(i);
    }
  }

  return pages;
});

// Detail panel state
const selectedCompany = ref<Company | null>(null);

// View company details
const viewCompany = (company: Company) => {
  selectedCompany.value = company;
};

// Close panel
const closePanel = () => {
  selectedCompany.value = null;
};
</script>