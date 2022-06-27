<script setup lang="ts">
import { NLayout, NCard, NMessageProvider, useMessage } from "naive-ui"
import { onUnmounted, ref } from "vue"
import PasswordInput from "./components/PasswordInput.vue"
import SecretContent from "./components/SecretContent.vue"
import ResetPassword from "./components/ResetPassword.vue"
import { ContentType, GetAndDecryptData } from "./lib/decrypt"

const message = useMessage()

const psd = ref("")
const unlockPure = async (password: string, tips?: boolean) => {
  if (password === wrong_password_cache.value) return
  const r = await GetAndDecryptData(password)
  if (r.success) {
    _router.value = 'secret-content'
    psd.value = password
    wrong_password_cache.value = ""
  } else {
    if (!r.isFirst) {
      if (tips != false)
        message.error("密码错误")
      wrong_password_cache.value = password
    }
  }
}

const unlock = async (password: string, tips?: boolean) => {
  await unlockPure(password, tips)
  window.sessionStorage.setItem("sy-secret-password", password)
  window.sessionStorage.setItem("sy-secret-password-time", new Date().toUTCString())
}

const lock = () => {
  _router.value = 'password-input'
  psd.value = ""
  window.sessionStorage.removeItem("sy-secret-password")
  window.sessionStorage.removeItem("sy-secret-password-time")
}

const wrong_password_cache = ref("")
const checkPasswordTimer = setInterval(() => {
  const batch_psd = JSON.parse(window.localStorage.getItem("sy-secret-batch-secret") ?? "false")

  const password = window.sessionStorage.getItem("sy-secret-password")
  const old_time = window.sessionStorage.getItem("sy-secret-password-time")
  if (old_time != null && old_time != "" && password != "" && password != null) {
    const time = new Date(old_time)
    const delta = new Date().getTime() - time.getTime()
    if (delta > 1000 * 60 * 10) {
      lock()
    } else if (isRouter('password-input')) {
      if (!batch_psd) {
        return
      }
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
const _content_type = ref<ContentType>("text")
const changePasswordPage = (content: string, content_type: ContentType) => {
  _router.value = 'change-password'
  _content.value = content
  _content_type.value = content_type
}


</script>

<template>
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
      <secret-content v-if="isRouter('secret-content')" :psd="psd" :lock="lock" :change-password="changePasswordPage" />
      <reset-password v-if="isRouter('change-password')" :unlock="unlock" :psd="psd" :content="_content"
        :type="_content_type" />
    </div>
  </n-layout>
</template>

<style>
body {
  overflow-x: hidden;
}
</style>
