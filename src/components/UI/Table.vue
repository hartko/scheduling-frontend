<template>
  <!-- Table component -->
  <table class="min-w-full">
    <!-- Table header -->
    <thead>
      <tr>
        <th class="py-2 px-4 border-b border" v-for="header in headers" :key="header">{{ header }}</th>
      </tr>
    </thead>
    <!-- Table body -->
    <tbody>
      <tr class="hover:bg-gray-200 cursor-pointer" v-for="row in data" :key="row.id" @click="handleRowClick(row)">
        <td v-for="key in keys" :key="key" v-show="showData(key)"
          :class="{ 'font-bold text-red-700 bg-red-200': hasNullValue(row) }"
          class="py-2 px-4 border-b text-center border">
          {{ row[key] }}
        </td>
      </tr>
    </tbody>
    <!-- Table footer -->
    <tfoot>
      <tr>
        <!-- Display message if null values are detected -->
        <td v-if="nullDetected" :colspan="headers.length" class="font-bold text-red-700 text-center border text-lg"
          colspan="4">
          <i class="fa-solid fa-circle-info"></i> Rows with empty data will not be saved.
        </td>
        <td v-if="data?.length == 0" :colspan="headers?.length" class="font-bold text-center border text-lg"
          colspan="4">
          <i class="fa-regular fa-face-sad-cry"></i> No data is currently available.
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  data() {
    return {
      nullDetected: false, // Flag to indicate if null values are detected
    };
  },
  props: {
    headers: Array, // Array of table headers
    data: Array // Array of table data
  },
  computed: {
    keys() {
      return Object.keys(this.data[0] || {}); // Extract keys from the first row of data
    }
  },
  methods: {
    // Handle row click event
    handleRowClick(row) {
      this.$emit('row-selected', row); // Emit 'row-selected' event with the clicked row data
    },
    // Check if null values are present in the row
    hasNullValue(value) {
      const hasNull = Object.values(value).includes(null); // Check if object includes null value
      if (hasNull === true) {
        this.nullDetected = true; // Set nullDetected flag to true if null values are detected
      }
      return hasNull; // Return whether null values are detected
    },
    showData(value) {
      const hiddenKeys = ['id', 'created_at', 'updated_at','departmentId'];
      return !hiddenKeys.includes(value);
    }
  }
};
</script>
