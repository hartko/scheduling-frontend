<template>
    <div class="flex justify-center items-center">
      <div :class="spinnerClasses"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      color: {
        type: String,
        default: '#4299e1' // Default color
      },
      size: {
        type: Number,
        default: 50 // Default size in pixels
      }
    },
    computed: {
      spinnerClasses() {
        return {
          'spinner': true,
          'border-gray-200': true, // Border color
          'border-4': true,
          'border-solid': true,
          'rounded-full': true,
          'w-[50px]': this.size === 50, // Size of the spinner
          'w-[100px]': this.size === 100,
          'h-[50px]': this.size === 50,
          'h-[100px]': this.size === 100,
          [`border-${this.color}`]: true // Dynamic border color based on prop
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .spinner {
    border-left-color: transparent;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  