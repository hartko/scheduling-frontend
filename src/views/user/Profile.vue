<!-- src/components/Profile.vue -->

<template>
    <div class="container mx-auto mt-8 p-4">
      <div class="max-w-md mx-auto bg-white rounded p-8 shadow-md">
        <img
          src="@/assets/manginginom.jpg"
          alt="Profile Picture"
          class="mx-auto mb-4 rounded-full object-cover" style="width: 200px; height: 200px;"
        />
        <h2 class="text-xl font-semibold mb-2">Mixed Berries</h2>
        <p class="text-gray-600">Professional Manginginom</p>
        <div class="mt-4">
          <p class="text-gray-700">About me:</p>
          <p class="text-gray-600">
            Gin Victim
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Profile',
  };
  </script>
  
  <style scoped>
  /* You can add specific styles for this component */
  </style>
  