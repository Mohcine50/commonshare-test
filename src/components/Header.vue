<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <header class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/">
            <img class="block h-8 w-auto" src="../assets/logo.png" alt="Logo" />
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden sm:flex sm:space-x-8 sm:items-center">
          <router-link
              to="/"
              class="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              active-class="text-blue-600"
              exact
          >
            Home
          </router-link>
          <router-link
              to="/companies"
              class="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              active-class="text-blue-600"
          >
            Companies
          </router-link>
          <router-link
              to="/contact-us"
              class="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              active-class="text-blue-600"
          >
            Contact Us
          </router-link>
          <router-link
              to="/login"
              class="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Login
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden">
          <button
              @click="toggleMenu"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
                v-if="!isOpen"
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
                v-else
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isOpen" class="sm:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link
            to="/"
            class="bg-blue-50 border-l-4 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 text-base font-medium"
            active-class="bg-blue-50 border-blue-500 text-blue-700"
            exact
        >
          Home
        </router-link>
        <router-link
            to="/companies"
            class="border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 text-base font-medium"
            active-class="bg-blue-50 border-blue-500 text-blue-700"
        >
          Companies
        </router-link>
        <router-link
            to="/contact-us"
            class="border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 text-base font-medium"
            active-class="bg-blue-50 border-blue-500 text-blue-700"
        >
          Contact Us
        </router-link>
        <div class="mt-4 mx-4">
          <router-link
              to="/login"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base font-medium"
          >
            Login
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>