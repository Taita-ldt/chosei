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
      <template v-slot:head>応募日</template>
      <template v-slot:body>
        <span v-for="(data, index) in applicationDateData" :key="index">
          {{data.applicationDate}}
        </span>
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
      applicationDateData: []
    };
  },
  mounted() {
    this.initForm();
  },

  methods: {
    // TODO: 認証を全画面に適用するならrouterに組み込む
    async authCheck() {
      // try {
      tokenが正常であれば処理を終了する
      const isAuthenticated = await this.authenticatedCheck();
      if (isAuthenticated){
        return;
      }else{
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
      // await this.authCheck();
      this.getUserResponse = await chouseiApi.getUser();
      this.userlist = _.map(this.getUserResponse, 'name');

      const getCandidateDateResponse = await chouseiApi.getCandidateDate(getQuaryDate());
      this.candidateDate = getCandidateDateResponse.date;
      this.respondent = getCandidateDateResponse.user;
      this.setCandidateTable();
      this.setApplicationDateData();
    },

    async setCandidateTable() {
      const response = await chouseiApi.getLotteryStatus(getQuaryDate());
      if (!response) return;

      this.lotteryStatusColumns.push({ align: 'center', field: 'row1' });
      const col1 = { row1: '抽選倍率 - 日比谷公園' };
      const col2 = { row1: '17:00' };
      const col3 = { row1: '19:00' };
      const orgRound = (value) => Math.round(value * 10) / 10;

      const dateList = _.uniq(_.map(response.lotteryStatus, 'candidate_date'));
      dateList.forEach(
        date => {
          // 時間を引数に抽選状況のリストを返す関数
          const getStatus = (time) => response.lotteryStatus.find(
            res => res.candidate_time === time && date === res.candidate_date
          ).lottery_status_magnification;
          // 列定義を設定
          const rowDef = { align: 'center', field: `row${date}` };
          // 第一候補日をハイライト
          if (this.no1CandidateDate.some(e => e.candidate_date === date)) rowDef.classes = 'bg-yellow-3';
          this.lotteryStatusColumns.push(rowDef);

          col1[`row${date}`] = this.formatDate(date);
          col2[`row${date}`] = orgRound(getStatus('17'));
          col3[`row${date}`] = orgRound(getStatus('19'));
        }
      );
      this.lotteryStatusData.push(col1, col2, col3);
    },

    toChousei() {
      const userdata = _.find(this.getUserResponse, (user) => _.includes(user.name, this.model));
      this.$store.commit('user/updateUserData', userdata);
      this.$router.push({ path: 'user', query: userdata });
    },
    /**
     * 上位1つの応募日を取得し返却する
     */
    async setApplicationDateData() {
      const applicationDateResponse = await chouseiApi.getApplicationDate(getQuaryDate());
      if (!applicationDateResponse) return;

      const applicationDatelist = applicationDateResponse.applicationDate;
      const applicationDateOptions = { yaer: 'long', month: 'long', day: 'numeric', weekday: 'short', hour: '2-digit', minute: '2-digit' };

      // 画面表示用に取得した応募日を加工
      applicationDatelist.forEach(
        dateObj => {
          if (!dateObj.application_date_from || !dateObj.application_date_to) return;
          const from = new Date(dateObj.application_date_from).toLocaleString('ja-JP', applicationDateOptions);
          const to = new Date(dateObj.application_date_to).toLocaleString('ja-JP', applicationDateOptions);
          const dateArrJp = _.uniq(_.flatten([from.split(' '), to.split(' ')]));
          const data = { applicationDate: `${dateArrJp[0]} ${dateArrJp[1]} ~ ${dateArrJp[2]}` };
          this.applicationDateData.push(data);
        }
      );
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
      const cdcList = _.uniq(_.map(dateList, 'status_sum'));
      num--;
      return cdcList.length > num
        ? _.filter(dateList, { status_sum: cdcList[num] }) : null;
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
