import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {admin} from './admin';

Vue.use(Vuex);

const apiHost = process.env.NODE_ENV === 'production' ? 'https://old.доммолодежи.рф/api' : 'http://dmvo.local/api';

const requestData = {
   closestEvents: {
      state: 'events_closest',
      method: 'get_all_closest_events',
   },
   contacts: {
      state: 'contacts',
      method: 'get_contacts'
   },
   family: {
      state: 'family',
      method: 'get_family'
   },
   psychological: {
      state: 'psychological',
      method: 'get_psychological'
   },
   service: {
      state: 'service',
      method: 'get_service'
   },
   transforce: {
      state: 'transforce',
      method: 'get_transforce'
   },
   studio: {
      state: 'studio_page',
      method: 'get_studios_by_directions'
   },
   volunteer: {
      state: 'volunteer',
      method: 'get_volunteer'
   }
};

export function createStore () {
   return new Vuex.Store({
      modules: {
         admin: admin
      },
      state: {
         apiHost: apiHost,

         index_carousel: [],
         index_closestEvents: [],
         index_closestExhibitions: [],
         index_news: [],

         team: [],

         event: {},
         events_closest: [],
         events_past: [],

         studio: {},
         studio_page: [],
         studio_news: {},

         page: {},
         psychological: {},
         psychological_closestEvents: [],

         volunteer: {},

         family: {},

         service: {},

         transforce: {},

         board_posts: [],

         contacts: [],
      },

      actions: {
         getData({commit}, request) {
            return axios.get(`${apiHost}/${requestData[request.name].method}`).then((response) => {
               response.data.name = requestData[request.name].state;
               commit('setData', response.data);
            });
         },

         getIndexData({commit}) {
            return axios.get(`${apiHost}/get_index`).then((response) => {
               commit('setIndexData', response.data);
            });
         },

         getTeam({commit}) {
            return axios.get(`${apiHost}/get_people`).then((response) => {
               commit('setTeamData', response.data);
            });
         },

         getEvent({commit}, request) {
            return axios.get(`${apiHost}/get_event/${request.id}`).then((response) => {
               commit('setEventData', response.data);
            });
         },

         getPastEvents({commit}, request) {
            return axios.get(`${apiHost}/get_past_events/${request.year}`).then((response) => {
               commit('setPastEventsData', response.data);
            });
         },

         getStudio({commit}, request) {
            return axios.get(`${apiHost}/get_studio/${request.id}`).then((response) => {
               commit('setStudioData', response.data);
            });
         },

         getPage({commit}, request) {
            return axios.get(`${apiHost}/get_page/${request.id}`).then((response) => {
               commit('setPageData', response.data);
            });
         },

         getNews({commit}, request) {
            return new Promise((resolve) => {
               let url = request.tag ? `${apiHost}/get_news/${request.offset}/${request.tag}` : `${apiHost}/get_news/${request.offset}`;
               return axios.get(url).then((response) => {
                  response.tag = request.tag;
                  commit('setNews', response);
                  resolve(response.data);
               });
            });
         },

         getPosts({commit}) {
            return axios.get(`${apiHost}/get_board_posts`).then(response => {
               commit('setPostsData', response.data);
            });
         },
      },

      mutations: {
         /**
          * @param state
          * @param data – возвращаем то что вернулось в запросе. в data.name лежит имя поля, куда все записываем
          */
         setData(state, data) {
            Vue.set(state, data.name, data);
         },

         setIndexData(state, data) {
            Vue.set(state, 'index_carousel', data.carousel);
            Vue.set(state, 'index_closestEvents', data.events);
            Vue.set(state, 'index_closestExhibitions', data.exhibitions);
            Vue.set(state, 'index_news', data.news);
         },

         setNews(state, response) {
            let eventsArray = [];
            if (response.tag === 'psychological') {
               eventsArray = state.psychological.events.concat(response.data);
               Vue.set(state.psychological, 'events', eventsArray);
            } else if (response.tag === 'online') {
               eventsArray = state.volunteer.events.concat(response.data);
               Vue.set(state.volunteer, 'events', eventsArray);
            } else if (response.tag === 'family') {
               eventsArray = state.family.events.concat(response.data);
               Vue.set(state.family, 'events', eventsArray);
            } else if (response.tag === 'transforce') {
               eventsArray = state.transforce.events.concat(response.data);
               Vue.set(state.transforce, 'events', eventsArray);
            } else if (response.tag) {
               eventsArray = state.studio.events.concat(response.data);
               Vue.set(state.studio, 'events', eventsArray);
            } else {
               eventsArray = state.index_news.concat(response.data);
               state.index_news.concat(response.data);
               Vue.set(state, 'index_news', eventsArray);
            }
         },

         setEventData(state, data) {
            Vue.set(state, 'event', data);
         },

         setPastEventsData(state, data) {
            Vue.set(state, 'events_past', data);
         },

         setStudioData(state, data) {
            Vue.set(state, 'studio', data);
         },

         setPageData(state, data) {
            Vue.set(state.page, data.id, data);
         },

         setTeamData(state, data) {
            Vue.set(state, 'team', data);
         },

         setPostsData(state, data) {
            Vue.set(state, 'board_posts', data);
         },
      },

      getters: {

      }
   })
}
