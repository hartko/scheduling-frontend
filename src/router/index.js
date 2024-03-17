// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/components/Layout.vue';
import Login from '@/views/auth/Login.vue';
import Profile from '@/views/user/Profile.vue';
import Room from '@/views/room/List.vue';
import ShowRoom from '@/views/room/Show.vue';
import Schedule from '@/views/schedule/List.vue';
import RoomSchedule from '@/views/roomSchedule/List.vue';
import Teacher from '@/views/teacher/List.vue';
import Department from '@/views/department/List.vue';


const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '/profile', component: Profile },
      { path: '/teacher', component: Teacher },
      { path: '/department', component: Department },
      { path: '/room', component: Room },
      { path: '/room/show/:id', component: ShowRoom },
      { path: '/schedule', component: Schedule },
      { path: '/room-schedule', component: RoomSchedule },
      // Add more routes as needed
    ],
  },
  { path: '/login', component: Login }, // New login route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
