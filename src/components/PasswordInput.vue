<script setup lang="ts">
import { NButton, NInput, NGi, NGrid, NSpace, useMessage } from "naive-ui"
import { api, util } from "siyuan_api_cache_lib"
import { ref, defineProps } from "vue"
import AES from "crypto-js/aes"
import { enc } from "crypto-js"
const message = useMessage()
const content = ref("")
const props = defineProps<{
    unlock: (password: string) => void,
    lock: () => void
}>()
const handleClick = async () => {
    const id = util.currentNodeId()!
    const r = await api.getBlockAttr(id, "custom-data")
    if (r && r.value != "") {
        const de = AES.decrypt(r.value, content.value).toString(enc.Utf8)
        try {
            const d = JSON.parse(de)
            if (d.type == "secret-block") {
                props.unlock(content.value)
            } else {
                message.error("密码错误！")
            }
        } catch (error) {
            message.error("密码错误！")
        }

    } else {
        props.unlock(content.value)
    }
}
const handleInput = (v: string) => {
    content.value = v
}

</script>

<template>
    <n-grid x-gap="12" cols="1 400:4">
        <n-gi span="3">
            <n-space
                :item-style="{
                    margin: '10px',
                    width: '100%'
                }"
            >
                <n-input :on-update:value="handleInput" placeholder="请输入密钥" round type="password" />
            </n-space>
        </n-gi>
        <n-gi span="1">
            <n-space
                justify="space-around"
                :item-style="{
                    margin: '10px'
                }"
            >
                <n-button @click="handleClick" type="primary" ghost>解锁</n-button>
            </n-space>
        </n-gi>
    </n-grid>
</template>

<style>
</style>
