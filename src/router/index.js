import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress';

const Index = () => import('../views/Index.vue');
const EventsContainer = () => import('../views/EventsContainer.vue');
const EventsPast = () => import('../views/EventsPast.vue');
const Events = () => import('../views/Events.vue');
const Event = () => import('../views/Event.vue');
const About = () => import('../views/about/About.vue');
const Halls = () => import('../views/about/Halls.vue');
const AboutStudio = () => import('../views/about/Studio.vue');
const Psychological = () => import('../views/Psychological.vue');
const Volunteer = () => import('../views/Volunteer.vue');
const Family = () => import('../views/Family.vue');
const Service = () => import('../views/Service.vue');
const Studio = () => import('../views/Studio.vue');
const Empty = () => import('../views/Empty.vue');

Vue.use(Router);

export function createRouter() {
   return new Router({
      mode: 'history',
      fallback: false,
      scrollBehavior: () => ({ y: 0 }),
      routes: [
         {path: '', name: 'main', component: Index},
         {path: '/about/', component: About, children: [
            {path: '', name: 'aboutInfo', component: About, meta: {parent: 'aboutInfo'}},
            {path: 'team', name: 'aboutTeam', component: Empty, meta: {parent: 'aboutInfo'}},
            {path: 'halls', name: 'aboutHalls', component: Halls, meta: {parent: 'aboutInfo'}},
            {path: 'studio', name: 'aboutStudio', component: AboutStudio, meta: {parent: 'aboutInfo'}},
            {path: 'volunteer', name: 'aboutVolunteer', component: Empty, meta: {parent: 'aboutInfo'}},
            {path: 'massmedia', name: 'aboutMassmedia', component: Empty, meta: {parent: 'aboutInfo'}},
            {path: 'history', name: 'aboutHistory', component: Empty, meta: {parent: 'aboutInfo'}},
            {path: 'board', name: 'aboutBoard', component: Empty, meta: {parent: 'aboutInfo'}}
         ]},
         {path: '/events/', component: EventsContainer, children: [
            {path: '', name: 'closestEvents', component: Events, meta: {parent: 'closestEvents'}},
            {path: 'past', name: 'pastEvents', component: EventsPast, meta: {parent: 'closestEvents'}},
            {path: 'other', name: 'otherEvents', component: Empty, meta: {parent: 'closestEvents'}},
            {path: ':id', name: 'event', component: Event, meta: {parent: 'closestEvents'}}
         ]},
         {path: '/studio', name: 'studio', component: Studio},
         {path: '/service', name: 'service', component: Service},
         {path: '/psychological', name: 'psychological', component: Psychological},
         {path: '/volunteer', name: 'volunteer', component: Volunteer},
         {path: '/transeforce', name: 'transeforce', component: Empty},
         {path: '/family', name: 'family', component: Family},
         {path: '/contact', name: 'contact', component: Empty}
      ]
   });
}
