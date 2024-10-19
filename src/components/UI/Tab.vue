<!-- Tab.vue -->
<template>
    <div class="flex">
      <div class="flex flex-col">
        <div v-for="(tab, index) in tabs" :key="index">
          <div
            @click="activeTab = index"
            :class="[tabColors[index], 'cursor-pointer', 'p-2', 'mb-1','transition-all', { 'font-bold': activeTab === index,'text-xl': activeTab === index, 'text-base': activeTab !== index }]"
          >
            {{ tab.label }}
          </div>
        </div>
      </div>
      <div class="flex-1 p-4">
        <slot :tab="tabs[activeTab]"></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: 0,
        tabColors: ['bg-blue-300', 'bg-green-300', 'bg-yellow-300', 'bg-red-300', 'bg-purple-300', 'bg-pink-300', 'bg-indigo-300'], 
      };
    },
    props: {
      tabs: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  