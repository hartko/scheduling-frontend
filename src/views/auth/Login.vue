<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-3xl font-semibold mb-6 text-center text-black-500">Login</h2>
      <MessageDisplay :message="loginError || loginSuccess" :isError="!!loginError" :isSuccess="!!loginSuccess" />
      <form @submit.prevent="login" class="space-y-4">
        <div class="border border-blue-500 rounded-md p-3">
          <label for="username" class="block text-sm font-medium text-gray-600">Username:</label>
          <input v-model="username" id="username" 
            class="w-full border-none focus:outline-none focus:border-blue-700 rounded" required />
        </div>
        <div class="border border-blue-500 rounded-md p-3">
          <label for="password" class="block text-sm font-medium text-gray-600">Password (min. 6 characters):</label>
          <input v-model="password" type="password" id="password" pattern=".{6,}" title="Minimum 6 characters"
            class="w-full border-none focus:outline-none focus:border-blue-700 rounded" required />
        </div>
        <div>
          <button type="submit" :disabled="loading"
            class="w-full bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import MessageDisplay from '@/components/MessageDisplay.vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    MessageDisplay,
  },
  setup() {
    const router = useRouter();

    const username = ref('');
    const password = ref('');
    const loginError = ref('');
    const loginSuccess = ref('');
    const loading = ref(false);

    const login = async () => {
      try {
        loading.value = true; // Set loading state

        // Simulate token expiration scenario (replace with actual token check in production)
        if (localStorage.getItem('token') && Math.random() < 0.2) {
          throw new Error('Token expired');
        }

        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          email: username.value,
          password: password.value,
        });
        if (response && response.data && response.data.result === 'successful') {
          // Assuming the API returns a token upon successful login
          const token = response.data.data.token;

          // Store the token in a secure way (e.g., using secure and HttpOnly cookies)
          localStorage.setItem('token', token);

          // Redirect to the home page or perform other actions upon successful login
          loginError.value = '';
          loginSuccess.value = 'Login successful!';

          // Reset form fields after successful login
          username.value = '';
          password.value = '';

          // Example: Redirect to the home page after 2 seconds
            // Replace with your router navigation logic
            router.push('/profile')
        } else {
          if (response.data && response.data.error) {
            loginError.value = response.data.error;
          } else {
            loginError.value = 'Login failed. Please check your credentials.';
          }
        }
      } catch (error) {
        console.error('Login failed:', error);
        loginError.value = error.message === 'Token expired' ? 'Your session has expired. Please log in again.' : 'Login failed. Please try again later.';
      } finally {
        loading.value = false; // Reset loading state regardless of the outcome
      }
    };

    return {
      username,
      password,
      login,
      loginError,
      loginSuccess,
      loading,
    };
  },
};
</script>
