<script setup lang="ts">
import { NLayout, NCard, NMessageProvider } from "naive-ui"
import { onUnmounted, ref } from "vue"
import PasswordInput from "./components/PasswordInput.vue"
import SecretContent from "./components/SecretContent.vue"

const isLock = ref(true)

const psd = ref("")
const unlockPure = (password: string) => {
  isLock.value = false
  psd.value = password
}
const unlock = (password: string) => {
  unlockPure(password)
  window.sessionStorage.setItem("sy-secret-password", password)
  window.sessionStorage.setItem("sy-secret-password-time", new Date().toUTCString())
}

const lock = () => {
  isLock.value = true
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
    } else if (isLock.value) {
      unlockPure(password)
    }
  } else {
    lock()
  }

}, 500)

onUnmounted(() => {
  clearInterval(checkPasswordTimer)
})

</script>

<template>
  <n-message-provider>
    <n-layout embedded :content-style="{
      height: '100vh'
    }">
      <n-card :style="{
        minHeight: '121px'
      }">
        <password-input :unlock="unlock" :lock="lock" v-if="isLock" />
        <secret-content v-if="!isLock" :psd="psd" />
      </n-card>
    </n-layout>
  </n-message-provider>
</template>

<style>
</style>
