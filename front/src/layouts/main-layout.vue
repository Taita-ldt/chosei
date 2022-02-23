<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title @click="toTop">
          BTCテニス部アプリ
        </q-toolbar-title>
        <q-separator dark vertical />
        <q-btn stretch flat @click="toUserEdit" label="" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',

  components: {
  },

  data() {
    return {
    };
  },
  methods: {
    toTop() {
      this.$router.push('/');
    },
    toUserEdit() {
      this.$router.push({ path: 'useredit' });
    },
  },
};
</script>
