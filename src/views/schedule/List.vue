<template>
  <div class="items-center">
    <div class="border-blue-300 p-5 rounded">
      <div class="flex items-center">
        <Modal :is-open="scheduleModalOpen" @close="closeModal" title="Schedule Details"
          modalClass='bg-gray-700 rounded-lg shadow-lg p-8 text-white max-w-3xl w-full'>
          <div class="grid grid-cols-12 gap-3 mt-10">
            <!-- Left column for schedule name and capacity -->
            <div class="col-span-2">
              <label for="scheduleName" class="text-lg font-semibold mb-1">Schedule ID: </label>
            </div>
            <div class="col-span-10">
              <input type="text" id="scheduleName" v-model="selectedSchedule.scheduleId" :disabled="viewSchedule"
                class="w-full ml-2 px-2 py-1 bg-gray-600 border border-gray-500 rounded-md focus:outline-none focus:border-gray-500">
            </div>
            <div class="col-span-2">
              <label for="scheduleName" class="text-lg font-semibold mb-1">Name: </label>
            </div>
            <div class="col-span-10">
              <input type="text" id="scheduleName" v-model="selectedSchedule.name" :disabled="viewSchedule"
                class="w-full ml-2 px-2 py-1 bg-gray-600 border border-gray-500 rounded-md focus:outline-none focus:border-gray-500">
            </div>
            <div class="col-span-2">
              <label for="scheduleName" class="text-lg font-semibold mb-1">Capacity: </label>
            </div>
            <div class="col-span-10">
              <input type="text" id="scheduleName" v-model="selectedSchedule.capacity" :disabled="viewSchedule"
                class="w-full ml-2 px-2 py-1 bg-gray-600 border border-gray-500 rounded-md focus:outline-none focus:border-gray-500">
            </div>
            <div class="col-span-2">
              <label for="scheduleName" class="text-lg font-semibold mb-1">Floor: </label>
            </div>
            <div class="col-span-10">
              <input type="text" id="scheduleName" v-model="selectedSchedule.floor" :disabled="viewSchedule"
                class="w-full ml-2 px-2 py-1 bg-gray-600 border border-gray-500 rounded-md focus:outline-none focus:border-gray-500">
            </div>
            <div class="col-span-2">
              <label for="scheduleName" class="text-lg font-semibold mb-1">Building: </label>
            </div>
            <div class="col-span-10">
              <input type="text" id="scheduleName" v-model="selectedSchedule.capacity" :disabled="viewSchedule"
                class="w-full ml-2 px-2 py-1 bg-gray-600 border border-gray-500 rounded-md focus:outline-none focus:border-gray-500">
            </div>
          </div>
          <div class="pt-10 flex justify-end space-x-1">
            <button @click="viewSchedule = false" :disabled="isLoading" class="px-4 py-2 bg-gray-500 text-white rounded"
              :class="{ 'opacity-50 cursor-not-allowed': isLoading }"><i
                class="fa-regular fa-pen-to-square"></i></button>
            <button v-if="!viewSchedule" @click="updateSchedule" :disabled="isLoading" class="px-4 py-2 bg-green-500 text-white rounded"
              :class="{ 'opacity-50 cursor-not-allowed': isLoading }"><i class="fa-regular fa-floppy-disk"></i></button>
              <button v-if="!viewSchedule" @click="viewSchedule = true" :disabled="isLoading" class="px-4 py-2 bg-blue-500 text-white rounded"
              :class="{ 'opacity-50 cursor-not-allowed': isLoading }"><i class="fa-regular fa-eye"></i></button>
          </div>
        </Modal>
      </div>
    </div>
    <!-- Table Modal component -->
    <div class="border-blue-300 p-5 rounded">
      <div class="flex items-center">
        <Modal :is-open="modalOpen" @close="closeModal" title="Upload"
          modalClass='bg-gray-700 rounded-lg shadow-lg p-8 text-white max-w-6xl w-full'>
          <!-- File upload form -->
          <div class="mr-auto space-x-1">
            <input class="px-3 py-2 border bg-gray-500 border-gray-300 rounded" id="file_input" type="file"
              @change="handleFileUpload">
            <button @click="readFile" :disabled="uploadLoading" class="px-4 py-2 bg-green-500 text-white rounded"
              :class="{ 'opacity-50 cursor-not-allowed': uploadLoading }">Upload</button>
          </div>
          <!-- Form for uploaded data -->
          <form>
            <!-- Spinner while loading -->
            <div v-if="uploadLoading" class="py-40">
              <Spinner :color="'#4299e1'" :size="100" />
            </div>
            <!-- Display uploaded data -->
            <div v-else-if="uploadedSchedules.length > 0">
              <p class="text-xl mt-8">Please verify if the data is correct.</p>
              <div class="overflow-auto max-w-full max-h-96">
                <Table class="bg-white text-black table-fixed" :headers="uploadedHeader" :data="uploadedSchedules"
                  @row-selected="handleRowClick" />
              </div>
              <!-- Button to save data -->
              <div class="pt-5">
                <button @click="saveData" :disabled="isLoading" class="px-4 py-2 bg-green-500 text-white rounded"
                  :class="{ 'opacity-50 cursor-not-allowed': isLoading }">Save</button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
      <!-- Search and action elements -->
      <div class="py-8 px-8 m-8 border rounded-md border-solid border-gray-300">
        <div class="mb-4 flex items-center">
          <div class="mr-auto space-x-1 flex items-center">
            <!-- Input field for search term -->
            <input type="text" v-model="searchTerm" placeholder="Search..."
              class="px-3 py-2 border border-gray-300 rounded-l" />
            <!-- Button to search -->
            <button @click="getSchedules" :disabled="isLoading" class="px-4 py-2 bg-blue-500 text-white rounded"
              :class="{ 'opacity-50 cursor-not-allowed': isLoading }"><i
                class="fa-sharp fa-solid fa-magnifying-glass"></i></button>
            <!-- Button to clear search -->
            <button @click="clear" :disabled="isLoading" class="px-4 py-2 bg-gray-500 text-white rounded"
              :class="{ 'opacity-50 cursor-not-allowed': isLoading }"><i class="fa-regular fa-trash-can"></i></button>
          </div>
          <div class="ml-auto space-x-1">
            <!-- Button to add -->
            <button @click="createScheduleModal" class="px-4 py-2 bg-green-500 text-white rounded"><i class="fa-solid fa-plus"></i></button>
            <!-- Button to open modal -->
            <button @click="openModal" class="px-4 py-2 bg-gray-500 text-white rounded"><i
                class="fa-solid fa-upload"></i></button>
          </div>
        </div>
        <!-- Table component -->
        <div class="rounded overflow-hidden border border-gray-300">
           <!-- Spinner while loading -->
           <div v-if="isLoading" class="py-20">
              <Spinner :color="'gray-500'" :size="100" />
            </div>
          <Table v-if="!isLoading" :headers="['Day', 'Start', 'End']" :data="schedules"
            @row-selected="handleRowClick" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '@/components/UI/Table.vue';
import Modal from '@/components/UI/Modal.vue';
import Spinner from '@/components/UI/Spinner.vue';
import axios from 'axios'

export default {
  components: {
    Table,
    Modal,
    Spinner
  },
  data() {
    return {
      modalOpen: false,
      searchTerm: '',
      selectedSchedule: {},
      schedules: [],
      file: null,
      isLoading: false,
      uploadLoading: false,
      scheduleModalOpen: false,
      createSchedule: false,
      viewSchedule: true,
      uploadedSchedules: [],
      uploadedHeader: [],
      uploadedSchedulesFinal: []
    };
  },
  mounted() {
    // Fetch schedules data on component mount
    this.getSchedules();
  },
  methods: {
    // Method to handle file selection
    handleFileUpload({ target }) {
      // Capture the selected file
      this.file = target.files[0];
    },
    // Method to upload file to server
    readFile() {
      this.uploadLoading = true;
      // Check if a file is selected
      if (!this.file) {
        console.error('No file selected');
        return;
      }
      // Send file
      const formData = new FormData();
      formData.append('file', this.file);

      axios.post('http://127.0.0.1:8000/api/excel/read', formData)
        .then(response => {
          const { data } = response;
          if (data.data.arraysWithNull.length > 0) {
            this.uploadedHeader = data.data.header;
            this.uploadedSchedules = data.data.arraysWithNull;
            this.uploadedSchedulesFinal = data.data.arrayWithoutNull;
          }
          this.uploadLoading = false;

        }).catch(error => console.error(error)).finally(() => {
        this.uploadLoading = false;
      });
    },
    // Method for saving the data from the uploaded file
    saveData() {
      this.uploadLoading = true;
      const formData = new FormData();
      formData.append('schedules', JSON.stringify(this.uploadedSchedulesFinal));
      axios.post('http://127.0.0.1:8000/api/schedule', formData)
        .then(response => {
        }).catch(error => console.error(error)).finally(() => {
        this.uploadLoading = false;
      });
    },
    updateSchedule(){
      this.isLoading = true;
      axios.put('http://127.0.0.1:8000/api/schedules/id', {...this.selectedSchedule})
        .then(response => {
        }).catch(error => console.error(error)).finally(() => {
        this.isLoading = false;
      });
    },
    createSchedule(){
      this.isLoading = true;
      axios.post('http://127.0.0.1:8000/api/schedules', {...this.selectedSchedule})
        .then(response => {
        }).catch(error => console.error(error)).finally(() => {
        this.isLoading = false;
      });
    },
    // Method to fetch schedules data
    getSchedules() {
      this.isLoading = true;
      axios.get('http://127.0.0.1:8000/api/schedules', {
        params: {
          search: this.searchTerm
        }
      }).then(response => {
        this.schedules = response.data.data;
        console.log(response.data.data)
      }).catch(error => console.error(error)).finally(() => {
        this.isLoading = false;
      });
    },
    // Method to handle row click event
    handleRowClick(row) {
      this.scheduleModalOpen = true;
      this.selectedSchedule = row;
      console.log('Clicked row:', row);
      // Handle row click event
    },
    // Method to open modal
    openModal() {
      this.modalOpen = true;
    },
    // Method to close modal
    closeModal() {
      this.modalOpen = false;
      this.scheduleModalOpen = false;
    },
    // Method to clear search term
    clear() {
      this.searchTerm = '';
      this.getSchedules();
    },
    createScheduleModal(){
      this.selectedSchedule = {};
      this.scheduleModalOpen = true;
      this.createSchedule = true;
      this.viewSchedule = false;

    }

  }
};
</script>