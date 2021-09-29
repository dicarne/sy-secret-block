<script setup lang="ts">
import { NLayout, NCard, NMessageProvider } from "naive-ui"
import { onUnmounted, ref } from "vue"
import PasswordInput from "./components/PasswordInput.vue"
import SecretContent from "./components/SecretContent.vue"
import ResetPassword from "./components/ResetPassword.vue"

const psd = ref("")
const unlockPure = (password: string) => {
  _router.value = 'secret-content'
  psd.value = password
}
const unlock = (password: string) => {
  unlockPure(password)
  window.sessionStorage.setItem("sy-secret-password", password)
  window.sessionStorage.setItem("sy-secret-password-time", new Date().toUTCString())
}

const lock = () => {
  _router.value = 'password-input'
  psd.value = ""
  window.sessionStorage.removeItem("sy-secret-password")
  window.sessionStorage.removeItem("sy-secret-password-time")
}

const checkPasswordTimer = setInterval(() => {
  const password = window.sessionStorage.getItem("sy-secret-password")
  const old_time = window.sessionStorage.getItem("sy-secret-password-time")
  if (old_time != null && old_time != "" && password != "" && password != null) {
    const time = new Date(old_time)
    const delta = new Date().getTime() - time.getTime()
    if (delta > 1000 * 60 * 10) {
      lock()
    } else if (isRouter('password-input')) {
      unlockPure(password)
    }
  } else {
    lock()
  }

}, 500)

onUnmounted(() => {
  clearInterval(checkPasswordTimer)
})

const _router = ref("password-input")
const isRouter = (r: string) => {
  return _router.value === r
}

const _content = ref("")
const changePasswordPage = (content: string) => {
  _router.value = 'change-password'
  _content.value = content
}


</script>

<template>
  <n-message-provider>
    <n-layout embedded :content-style="{
      height: '100vh',
      display: 'flex'
    }">
      <div :style="{
        display: 'flex',
        flex: '1',
        padding: '5px'
      }">
        <password-input :unlock="unlock" :lock="lock" v-if="isRouter('password-input')" />
        <secret-content
          v-if="isRouter('secret-content')"
          :psd="psd"
          :lock="lock"
          :change-password="changePasswordPage"
        />
        <reset-password v-if="isRouter('change-password')" :unlock="unlock" :psd="psd" :content="_content"/>
      </div>
    </n-layout>
  </n-message-provider>
</template>

<style>
</style>
