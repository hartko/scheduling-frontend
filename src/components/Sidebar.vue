<!-- components/Sidebar.vue -->

<template>
    <div class="sidebar bg-gray-800 text-white p-4">
      <router-link to="/profile" class="block py-2 px-4">Profile</router-link>
      <router-link to="/teacher" class="block py-2 px-4">Teachers</router-link>
      <router-link to="/class-section" class="block py-2 px-4">Class Section</router-link>
      <router-link to="/room" class="block py-2 px-4">Rooms</router-link>
      <router-link to="/course" class="block py-2 px-4">Courses</router-link>
      <router-link to="/subject" class="block py-2 px-4">Subjects</router-link>
      <router-link to="/department" class="block py-2 px-4">Department</router-link>
      <router-link to="/schedule" class="block py-2 px-4">Schedules</router-link>
      <router-link to="/room-schedule" class="block py-2 px-4">Room Schedules</router-link>
      <!-- Add more links as needed -->
    </div>
  </template>
  
  <script>
  export default {
    // Sidebar component logic
  };
  </script>
  
  <style scoped>
  /* Add scoped styles for the Sidebar component if needed */
  </style>
  