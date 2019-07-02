import Vue from 'vue';
import Vuex from 'vuex';
import state from './state/state';
import actions from './action/actions';
import mutations from './mutations/mutations';
import getters from './getters/getter';

Vue.use(Vuex);

export default new Vuex.Store({
　　state,
 	mutations,
 	actions,
 	getters
});