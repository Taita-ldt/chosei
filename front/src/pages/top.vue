<template>
  <q-page>
    <EvenlyArticle>
      <template v-slot:head>スケジュール入力</template>
      <template v-slot:body>
        <div class='col-6'>
          <q-select filled label="name" v-model="model" :options="userlist" @input="toChousei"/>
        </div>
      </template>
    </EvenlyArticle>
    <EvenlyArticle>
      <template v-slot:head>コート抽選候補日</template>
      <template v-slot:body>
        <span v-for="(data, index) in candidateDate" :key="index">
          {{formatDate(data.candidate_date)}}
        </span>
      </template>
    </EvenlyArticle>
    <!-- <EvenlyArticle>
      <template v-slot:head>回答者</template>
      <template v-slot:body>
        <span v-for="(data, index) in respondent" :key="index">
          {{data.candidate_date}}
        </span>
      </template>
    </EvenlyArticle>
    <EvenlyArticle>
      <template v-slot:head>集計結果</template>
      <template v-slot:body>
        <div>
          <q-btn color="primary" @click="toResult" label="確認する"/>
        </div>
      </template>
    </EvenlyArticle> -->
  </q-page>

</template>

<script>
import _ from 'lodash';
import EvenlyArticle from '../layouts/evenly-article';
import { chouseiApi } from '../module/api';
import { getQuaryDate } from '../module/utilityTools';

export default {
  name: 'Top',
  components: {
    EvenlyArticle,
  },
  data() {
    return {
      getUserResponse: Object,
      userlist: Array,
      candidateDate: Array,
      respondent: Array,
      model: null,
    };
  },

  mounted() {
    this.initForm();
  },

  methods: {
    async initForm() {
      this.getUserResponse = await chouseiApi.getUser();
      this.candidateDate = await chouseiApi.getCandidateDate(getQuaryDate());
      const candidateData = {
        candidate_date: [1, 2, 3],
        respondent: ['a', 'b', 'c'],
      };
      this.userlist = _.map(this.getUserResponse, 'name');
      this.respondent = candidateData.respondent;
    },
    toChousei() {
      const userdata = _.find(this.getUserResponse, (user) => _.includes(user.name, this.model));
      this.$store.commit('user/updateUserData', userdata);
      this.$router.push({ path: 'user', query: userdata });
    },
    toResult() {
      console.log('集計結果画面');
    },
    formatDate: (date) => {
      const options = { yaer: 'long', month: 'long', day: 'numeric', weekday: 'short' };
      return new Date(date).toLocaleString('ja-JP', options);
    },
  },
};
</script>
