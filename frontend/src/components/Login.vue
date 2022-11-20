<template>
  <div class="login-widget">
    <div class="wrapper">
      <h5>Logowanie</h5>
      <label for="login">Nazwa użytkownika</label>
      <input name="login" v-model="username">
      <button @click="login">Zaloguj</button>
    </div>
  </div>
</template>

<script>
import { useWebsocketStore } from "@/stores/websocketStore";
import { useNavigatorStore } from "@/stores/navigator";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      navigator: useNavigatorStore(),
    }
  },
  methods: {
    login() {
      this.$emit("onLogin", this.username);
    }
  }
}
</script>

<style scoped lang="scss">
.login-widget {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-size: 40px;
  position: relative;


  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../assets/bg.png");
    background-repeat: no-repeat, repeat;
    background-size: cover;
    filter: grayscale(100%);
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    padding: 30px;
    border-radius: 5px;
    border: 3px solid #c1c1c1;
    background: #121212;

    h5 {
      margin-top: 0;
      font-size: 20px;
      color: white;
    }

    label {
      font-size: 16px;
      margin-bottom: 5px;
      color: white;
    }

    input {
      background: rgb(106, 59, 8);
      border-radius: 7px;
      border: 4px solid rgba(106, 59, 8, 1);
      padding: 5px 10px;
      font-size: 17px;
      font-weight: 700;
      color: white;
      transition: 200ms;
      // cursor: pointer;
      margin-bottom: 30px;
      background: linear-gradient(0deg, rgba(106, 59, 8, 0.8) 9%, rgba(219, 104, 36, 0.8) 100%);
    }

    button {
      background: rgb(106, 59, 8);
      background: linear-gradient(0deg, rgba(106, 59, 8, 1) 9%, rgba(219, 104, 36, 1) 100%);
      border-radius: 7px;
      border: 4px solid rgba(106, 59, 8, 1);
      border-top: none;
      border-bottom: 5px solid rgba(106, 59, 8, 1);
      padding: 5px 10px;
      font-size: 17px;
      font-weight: 700;
      color: white;
      transition: 200ms;
      cursor: pointer;
    }

    button:hover {
      opacity: 0.9;
    }
  }

}
</style>
