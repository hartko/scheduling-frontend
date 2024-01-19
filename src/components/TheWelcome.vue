<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-3xl font-semibold mb-6 text-center text-blue-500">Login</h2>
      <form @submit.prevent="login" class="space-y-4">
        <div class="flex items-center border border-blue-500 rounded-md p-3">
          <HeroIconUser class="w-5 h-5 text-gray-500 mr-2" />
          <label for="username" class="block text-sm font-medium text-gray-600">Username:</label>
          <input v-model="username" id="username" class="w-full p-3 border-none focus:outline-none focus:border-blue-700 rounded-md" required />
        </div>
        <div class="flex items-center border border-blue-500 rounded-md p-3">
          <HeroIconKey class="w-5 h-5 text-gray-500 mr-2" />
          <label for="password" class="block text-sm font-medium text-gray-600">Password:</label>
          <input v-model="password" type="password" id="password" class="w-full p-3 border-none focus:outline-none focus:border-blue-700 rounded-md" required />
        </div>
        <div>
          <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { HeroIconUser, HeroIconKey } from '@heroicons/vue/solid';

export default {
  components: {
    HeroIconUser,
    HeroIconKey,
  },
  setup() {
    const username = ref('');
    const password = ref('');

    const login = () => {
      // Perform login logic (e.g., send request to backend)
      // For simplicity, we'll just log the credentials for now
      console.log('Login with:', username.value, password.value);
      
      // Reset form fields after login
      username.value = '';
      password.value = '';
    };

    return {
      username,
      password,
      login,
    };
  },
};
</script>
