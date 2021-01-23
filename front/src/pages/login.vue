<template>
  <q-page padding>
    <EvenlyArticle>
      <template v-slot:head>ログインページ</template>
      <template v-slot:body>
        <div class='col-6'>
          <q-input type="password" filled label="password" v-model="loginKey"/>
        </div>
      </template>
    </EvenlyArticle>
    <EvenlyArticle>
      <template v-slot:body>
      <div class="submit-key">
        <q-btn color="primary" @click="authCheck" label="送信"/>
      </div>
      </template>
    </EvenlyArticle>
  </q-page>
</template>

<script>
import EvenlyArticle from '../layouts/evenly-article';
import { authApi } from '../module/api';

export default {
  name: 'Login',
  components: {
    EvenlyArticle
  },
  data() {
    return {
      loginKey: '',
      isAuthenticated: false,
    };
  },
  mounted() {
    this.initAuthCheck();
  },
  methods: {
    /**
     * ログイン画面表示遷移時にトークンの有無と有効性をチェック
     */
    async initAuthCheck() {
      // tokenが正常であればトップ画面に遷移する
      const res = await this.authenticatedCheck();
      if (res) {
        this.isAuthenticated = res;
        this.toTop();
      }
    },
    /**
     * 入力したキーを認証し発行されたトークンを取得する
     */
    async authCheck() {
      try {
        const mydata = { KEY: null };
        // mydata.KEY = await window.prompt('Please input your key!!');
        mydata.KEY = this.loginKey;
        const response = await authApi.authentication(mydata);
        if (response.apiStatus && response.apiStatus.value === 'ok') {
          console.log('OK');
          sessionStorage.token = response.data.token;
        } else {
          console.log('BAD');
          throw new Error();
        }

        const isAuthenticated = await this.authenticatedCheck();
        if (isAuthenticated) {
          this.isAuthenticated = isAuthenticated;
          this.toTop();
        }
      } catch (e) {
        console.log(e);
        this.toError401();
      }
    },
    /**
     * 保持しているトークンが有効かチェック
     */
    async authenticatedCheck() {
      if (!sessionStorage.token) return false;
      const myToken = { token: sessionStorage.token };
      const response = await authApi.checkToken(myToken);
      return (response.apiStatus && response.apiStatus.value === 'ok');
    },
    /**
     * トップ画面に遷移する
     */
    toTop() {
      this.$router.push('/');
    },
    toError401() {
      console.log('toError401');
      this.$router.push({ path: 'auth_error' });
    },
  },
};
</script>
