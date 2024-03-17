<template>
    <!-- Modal backdrop -->
    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-20" v-if="isOpen">
      <!-- Modal container -->
      <div :class=modalClass>
        <!-- Modal header -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold">{{ title }}</h2>
          <!-- Close button -->
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <!-- Modal content -->
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Modal',
    props: {
      isOpen: {
        type: Boolean,
        required: true
      },
      title: {
        type: String,
        default: 'Modal Title'
      },
      modalClass:{
        type: String,
        default: "bg-gray-700 rounded-lg shadow-lg p-8 text-white max-w-6xl w-full"
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  