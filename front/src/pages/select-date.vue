<template>
  <q-page padding>
    <EvenlyArticle>
      <template v-slot:head>{{userName}}さん スケジュール入力</template>
      <template v-slot:body>
        <date-select-form
          :datalist='candidateDates.data'
          @parentMethod="updateMessage"
        />
      </template>
    </EvenlyArticle>
    <div class="row justify-center q-pa-md">
      <q-btn color="primary" @click="toChousei" label="確定"/>
    </div>
  </q-page>

</template>

<script>
import _ from 'lodash';
import DateSelectForm from 'components/date-select-form';
import EvenlyArticle from '../layouts/evenly-article';
import { chouseiApi, authApi } from '../module/api';
import { getQuaryDate } from '../module/utilityTools';

export default {
  name: 'PageSelectDate',
  components: {
    DateSelectForm,
    EvenlyArticle,
  },
  data() {
    return {
      candidateDates: Object,
      getQuery: { id: Number, name: String },
      userName: this.$store.state.user.userName,
    };
  },
  created() {
    this.authCheck();
  },
  mounted() {
    this.getQuery = this.$route.query;
    this.initForm();
  },
  methods: {
    /**
     * 画面遷移時にトークンの有無と有効性をチェック
     */
    async authCheck() {
      // tokenが正常であれば処理を終了する
      const isAuthenticated = await this.authenticatedCheck();
      if (!isAuthenticated) {
        console.log('Not Authenticated');
        this.$router.push('/');
      }
    },
    async authenticatedCheck() {
      if (!sessionStorage.token) return false;
      const myToken = { token: sessionStorage.token };
      const response = await authApi.checkToken(myToken);
      return (response.apiStatus && response.apiStatus.value === 'ok');
    },
    async initForm() {
      const setQuery = { month: getQuaryDate(), user: this.getQuery.id };
      this.candidateDates = await chouseiApi.getUserSetDate(setQuery);
    },
    updateMessage(choise) {
      this.choise = choise;
    },
    async toChousei() {
      await chouseiApi.patchCandidateDateStatus(this.getQuery.id, this.getPatchData());
      this.$router.push('/');
    },
    getPatchData() {
      const localCandidateDates = this.candidateDates.data;
      const getStatusIds = function (status) {
        return _.map(localCandidateDates.filter((o) => o['candidate_date_statuses.status'] === status), 'candidate_date_statuses.id');
      };
      return {
        okStatusIds: getStatusIds(2),
        sosoStatusIds: getStatusIds(1),
        badStatusIds: getStatusIds(0),
      };
    },
  },
};
</script>
