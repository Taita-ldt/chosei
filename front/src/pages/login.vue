<template>
  <q-page padding>
    <div class="content">
      ログインページ
    </div>
      <q-input filled v-model="loginKey" label="Filled" />
    <div class="submit-key">
      <q-btn color="primary" @click="authCheck" label="送信"/>
      <!-- <q-btn color="primary" @click="authenticatedCheck" label="送信"/> -->
    </div>
  </q-page>
</template>

<script>
import { authApi } from '../module/api';

export default {
  name: 'Login',
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
      // const isAuthenticated = await this.authenticatedCheck();
      const res = await this.authenticatedCheck();
      console.log(`res: ${res}`);
      if (res) {
        this.isAuthenticated = res;
        console.log(`loginKey: ${this.loginKey}`);
        console.log(`isAuthenticated: ${this.isAuthenticated}`);
        this.toTop();
      }
    },
    // TODO: 認証を全画面に適用するならrouterに組み込む
    /**
     * 入力したキーを認証し発行されたトークンを取得する
     */
    async authCheck() {
      try {
        // tokenが正常であれば処理を終了する
        const isAuthenticated = await this.authenticatedCheck();
        if (isAuthenticated) {
          this.isAuthenticated = isAuthenticated;
          console.log(`loginKey: ${this.loginKey}`);
          console.log(`isAuthenticated: ${this.isAuthenticated}`);
          this.toTop();
        }

        const mydata = { KEY: null };
        // mydata.KEY = await window.prompt('Please input your key!!');
        mydata.KEY = this.loginKey;
        const response = await authApi.authentication(mydata);
        console.log(response.data);
        if (response.apiStatus && response.apiStatus.value === 'ok') {
          console.log('OK');
          sessionStorage.token = response.data.token;
        } else {
          console.log('BAD');
          throw new Error();
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
      console.log(this.loginKey);
      this.$router.push('/top');
    },
    toError401() {
      console.log('toError401');
      this.$router.push({ path: 'auth_error' });
    },
  },
};
</script>
