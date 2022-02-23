<template>
  <q-page padding>
    <EvenlyArticle>
      <template v-slot:head>ユーザ情報編集</template>
      <template v-slot:body>
        <div class="q-pa-md">
          <q-markup-table separator="cell" flat bordered>
            <thead class="bg-blue-grey-2">
              <tr>
                <th class="text-left">ユーザ</th>
                <th class="text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in userList" :key='index'>
                <td class="text-left">{{data.name}}</td>
                <td class="text-center">
                  <q-btn label="削除" color="red" @click="confirm = true, user=data" />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
          <div class="flex-break q-py-md"></div>
          <div class='row'>
            <div class='col-8 text-subtitle1'>
              <q-input
                autofocus
                dense
                v-model="userName"
              >
              </q-input>
            </div>
            <div class='col-4'>
              <q-btn color="blue" @click="addUser" label="追加" :disable="!userName"/>
            </div>
          </div>
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <span class="q-ml-sm">{{user.name}}を削除してよろしいですか？</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="キャンセル" color="primary" v-close-popup />
                <q-btn flat label="削除する" color="red"
                  @click="deleteUser(user.id)" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </template>
    </EvenlyArticle>
  </q-page>
</template>

<script>
import EvenlyArticle from '../layouts/evenly-article';
import { chouseiApi } from '../module/api';

export default {
  name: 'PageUserEdit',
  components: {
    EvenlyArticle,
  },

  data() {
    return {
      candidateDates: Object,
      getQuery: { id: Number, name: String },
      userList: {},
      userName: '',
      confirm: false,
      user: {},
    };
  },
  mounted() {
    this.initForm();
  },
  methods: {
    async initForm() {
      this.userList = await chouseiApi.getUser();
    },
    async deleteUser(id) {
      await chouseiApi.deleteUser(id);
      this.userList = await chouseiApi.getUser();
    },
    async addUser() {
      const mydata = { newUserName: null };
      mydata.newUserName = this.userName;
      await chouseiApi.addUser(mydata);
      this.userName = '';
      this.userList = await chouseiApi.getUser();
    },
  },
};
</script>
