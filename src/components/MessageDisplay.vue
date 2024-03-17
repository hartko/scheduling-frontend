<template>
    <div v-if="message" :class="{ 'text-red-500': isError, 'text-green-500': isSuccess }" class="mb-4">
      {{ message }}
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    props: {
      message: String,
      isError: Boolean,
      isSuccess: Boolean,
    },
    setup(props) {
      const displayedMessage = ref(props.message);
  
      // Watch for changes in the message prop
      watch(() => props.message, () => {
        displayedMessage.value = props.message;
      });
  
      return {
        displayedMessage,
      };
    },
  };
  </script>
  