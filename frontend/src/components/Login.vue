<template>
<div class="login-widget">
  <div>Zaloguj sie</div>
  <label for="login">Login</label>
  <input name="login" v-model="username">
  <button @click="login">Zaloguj</button>
</div>
</template>

<script>
import {useWebsocketStore} from "@/stores/websocketStore";
import {useNavigatorStore} from "@/stores/navigator";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      navigator: useNavigatorStore(),
    }
  },
  methods: {
    login(){
      this.$emit("onLogin", this.username);
    }
  }
}
</script>

<style scoped>
.login-widget {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw ;
  font-size: 40px   ;
}
</style>
