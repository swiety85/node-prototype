<script>
export default {
  data() {
    return {
      isRegistration: false
    };
  }
};
</script>


<template>

    <div class="login-switcher" v-bind:class="{ 'login-switcher__is-registration': !isRegistration }">

        <div class="grid-container grid-x grid-padding-x login-switcher__container">

            <div class="cell small-6 login-switcher__intro" v-bind:class="{ 'login-switcher__active': !isRegistration }">
                <h3>Don't have an account?</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button class="button" v-on:click="isRegistration = true">Sign up</button>
            </div>

            <form class="cell small-6 login-switcher__form" v-bind:class="{ 'login-switcher__active': isRegistration }">
                <h4 class="text-center">Log in with you email account</h4>
                <label>Email
                    <input type="email" placeholder="somebody@example.com">
                </label>
                <label>Password
                    <input type="password" placeholder="Password">
                </label>

                <input id="show-password" type="checkbox"><label for="show-password">Show password</label>
                <p><input type="submit" class="button expanded" value="Log in" /></p>
                <p class="text-center"><a href="#">Forgot your password?</a></p>
            </form>

            <fieldset class="cell small-6 login-switcher__intro" v-bind:class="{ 'login-switcher__active': isRegistration }">
                <h3>Have an account?</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <button class="button" v-on:click="isRegistration = false">Login</button>
            </fieldset>

            <form class="cell small-6 login-switcher__form" v-bind:class="{ 'login-switcher__active': !isRegistration }">
                <h4 class="text-center">Log in with you email account</h4>
                <label>Email
                    <input type="email" placeholder="somebody@example.com">
                </label>
                <label>Password
                    <input type="password" placeholder="Password">
                </label>

                <input id="show-password" type="checkbox"><label for="show-password">Show password</label>
                <p><input type="submit" class="button expanded" value="Log in" /></p>
                <p class="text-center"><a href="#">Forgot your password?</a></p>
            </form>
        </div>
    </div>

</template>

<style scoped lang="scss">
.login-switcher {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  background-image: url(../assets/login-bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}

.login-switcher__container {
  position: relative;
  width: 1200px;
  color: #f0f0f0;
  padding-top: 50px;
  padding-bottom: 50px;
  padding-right: 50px;
  padding-left: 50px;
  align-self: center;
  margin: 0 auto;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background-color: #1b1b1b;
    opacity: 0.8;
    border-radius: 3px;
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: -40px;
    left: 50px;
    right: auto;
    width: 50%;
    z-index: -1;
    height: calc(100% + 80px);
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 3px 0px 6px 0px rgba(0, 0, 0, 0.75);

    transition: all 500ms cubic-bezier(0.5, -0.5, 0.5, 1.5);
    transition-property: transform;
  }

  .login-switcher__is-registration &::after {
    transform: translate(500px, 0px);
  }
}

.login-switcher__intro {
  position: relative;
  display: none;
  padding: 0 0px 0 80px;
  &:first-child {
    padding: 0 80px 0 0px;
  }
}

.login-switcher__form {
  position: relative;
  display: none;
  padding: 0 60px 0 20px;

  &:nth-child(2) {
    padding: 0 20px 0 60px;
  }
}

.login-switcher__active {
  display: block !important;
}
</style>