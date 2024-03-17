<!-- src/layouts/MainLayout.vue -->

<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex flex-grow">
      <Sidebar />
      <div class="main-content flex-grow bg-white-100 p-4 mb-0">
        <router-view></router-view>
      </div>
    </div>
    <Footer class="flex-none" />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Sidebar,
    Footer,
  },
};
</script>

<style scoped>
/* Add scoped styles for the MainLayout component if needed */
</style>
