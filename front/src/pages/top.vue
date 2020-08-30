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
      <template v-slot:head>
        コート抽選候補日
      </template>
    </EvenlyArticle>
    <ExpantionItem
      label="第一候補"
      :expanded='expandedNo1'
      v-if="no1CandidateDate"
    >
      <template v-slot:expansion-item>
        <span v-for="(data, index) in no1CandidateDate" :key="index">
          {{formatDate(data.candidate_date)}}
        </span>
      </template>
    </ExpantionItem>
    <ExpantionItem
      label="第二候補"
      v-if="no2CandidateDate"
    >
      <template v-slot:expansion-item>
        <span v-for="(data, index) in no2CandidateDate" :key="index">
          {{formatDate(data.candidate_date)}}
        </span>
      </template>
    </ExpantionItem>
    <EvenlyArticle>
      <template v-slot:head>回答者</template>
      <template v-slot:body>
        <span v-for="(data, index) in respondent" :key="index">
          {{data.user_name}}
        </span>
      </template>
    </EvenlyArticle>
    <EvenlyArticle>
      <template v-slot:head>抽選状況</template>
    </EvenlyArticle>
    <div class="q-pa-md">
      <q-table
        :data="lotteryStatusData"
        :columns="lotteryStatusColumns"
        row-key="name"
        hide-header
        hide-bottom/>
    </div>
    <EvenlyArticle>
      <template v-slot:head>集計結果</template>
    </EvenlyArticle>
    <EvenlyArticle>
      <template v-slot:body>
        <div  class="q-pa-md">
          <q-table
            :data="applicationDateData"
            :columns="applicationDateColumns"
            row-key="name"
            hide-bottom/>
        </div>
      </template>
    </EvenlyArticle>
  </q-page>

</template>

<script>
import _ from 'lodash';
import EvenlyArticle from '../layouts/evenly-article';
import ExpantionItem from '../components/expantion-item';
import { chouseiApi, authApi } from '../module/api';
import { getQuaryDate } from '../module/utilityTools';

export default {
  name: 'Top',
  components: {
    EvenlyArticle,
    ExpantionItem,
  },
  data() {
    return {
      getUserResponse: Object,
      userlist: Array,
      candidateDate: Array,
      respondent: Array,
      model: null,
      expandedNo1: true,
      lotteryStatusColumns: [],
      lotteryStatusData: [],
      // TODO カラム定義の記述場所を変更
      applicationDateColumns: [
        { name: 'applicationDate', label: '応募日', field: 'applicationDate', sortable: true },
        { name: 'magnification', label: '倍率', field: 'magnification', sortable: true }
      ],
      applicationDateData: []
    };
  },
  mounted() {
    this.initForm();
  },

  methods: {
    // TODO: 認証を全画面に適用するならrouterに組み込む
    async authCheck() {
      try {
        // tokenが正常であれば処理を終了する
        const isAuthenticated = await this.authenticatedCheck();
        if (isAuthenticated) return;

        const mydata = { KEY: null };
        mydata.KEY = await window.prompt('Please input your key!!');
        const response = await authApi.authentication(mydata);
        console.log(response.data);
        if (response.apiStatus && response.apiStatus.value === 'ok') {
          console.log('OK');
          localStorage.token = response.data.token;
        } else {
          console.log('BAD');
          throw new Error();
        }
      } catch (e) {
        console.log(e);
        this.toError401();
      }
    },
    async authenticatedCheck() {
      if (!localStorage.token) return false;
      const myToken = { token: localStorage.token };
      const response = await authApi.checkToken(myToken);
      return (response.apiStatus && response.apiStatus.value === 'ok');
    },
    toError401() {
      console.log('toError401');
      this.$router.push({ path: 'auth_error' });
    },

    async initForm() {
      await this.authCheck();
      this.getUserResponse = await chouseiApi.getUser();
      this.userlist = _.map(this.getUserResponse, 'name');

      const getCandidateDateResponse = await chouseiApi.getCandidateDate(getQuaryDate());
      this.candidateDate = getCandidateDateResponse.date;
      this.respondent = getCandidateDateResponse.user;
      this.setCandidateTable();
      console.log('here');
      this.setApplicationTable();
    },

    async setCandidateTable() {
      const response = await chouseiApi.getLotteryStatus(getQuaryDate());
      if (!response) return;

      this.lotteryStatusColumns.push({ align: 'center', field: 'row1' });
      const col1 = { row1: '抽選倍率 - 日比谷公園' };
      const col2 = { row1: '17:00' };
      const col3 = { row1: '19:00' };

      const dateList = _.uniq(_.map(response.lotteryStatus, 'candidate_date'));
      dateList.forEach(
        date => {
          // 時間を引数に抽選状況のリストを返す関数
          const getStatus = (time) => response.lotteryStatus.find(
            res => res.candidate_time === time && date === res.candidate_date
          ).lottery_status;
          // 列定義を設定
          const rowDef = { align: 'center', field: `row${date}` };
          // 第一候補日をハイライト
          if (this.no1CandidateDate.some(e => e.candidate_date === date)) rowDef.classes = 'bg-yellow-3';
          this.lotteryStatusColumns.push(rowDef);

          col1[`row${date}`] = this.formatDate(date);
          col2[`row${date}`] = getStatus('17');
          col3[`row${date}`] = getStatus('19');
        }
      );
      this.lotteryStatusData.push(col1, col2, col3);
    },

    toChousei() {
      const userdata = _.find(this.getUserResponse, (user) => _.includes(user.name, this.model));
      this.$store.commit('user/updateUserData', userdata);
      this.$router.push({ path: 'user', query: userdata });
    },
    // 上位2つの応募日とその倍率を取得し画面のテーブルに表示
    async setApplicationTable() {
      const applicationDateResponse = await chouseiApi.getApplicationDate(getQuaryDate());
      console.log(applicationDateResponse);
      if (!applicationDateResponse) return;
      applicationDateResponse.forEach(
        row => {
          // TODO 日付のフォーマット変更
          // const application_date = row.application_date;
          // const magnification = row.magnification;
          const data = { applicationDate: row.application_date, magnification: row.magnification };
          this.applicationDateData.push(data);
          console.log(this.applicationDateData);
        }
      );
      // return [
      //   { id: '1', applicationDate: '8/10', magnification: '90/100' },
      //   { id: '2', applicationDate: '8/11', magnification: '50/100' },
      //   { id: '3', applicationDate: '8/12', magnification: '10/100' }
      // ];
    },
    formatDate: (date) => {
      const options = { yaer: 'long', month: 'long', day: 'numeric', weekday: 'short' };
      return new Date(date).toLocaleString('ja-JP', options);
    },
    /**
     * 第num候補日のリストを返却する関数
     * @param num: 第num候補日
     * @returns 候補日リスト
     */
    setCandidateDate: (dateList, num) => {
      if (!dateList) return [];
      const cdcList = _.uniq(_.map(dateList, 'candidate_date_count'));
      num--;
      return cdcList.length > num
        ? _.filter(dateList, { candidate_date_count: cdcList[num] }) : null;
    },
  },
  computed: {
    no1CandidateDate() {
      return this.setCandidateDate(this.candidateDate, 1);
    },
    no2CandidateDate() {
      return this.setCandidateDate(this.candidateDate, 2);
    },
  },
};
</script>
