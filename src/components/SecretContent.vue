<script lang="ts" setup>
import { NInput, NButton } from "naive-ui"
import { api, util } from "siyuan_api_cache_lib"
import { defineProps, onMounted, ref } from "vue"
import AES from "crypto-js/aes"
import { enc } from "crypto-js"

import { debounce, throttle } from "lodash"
const props = defineProps<{
    psd: string
}>()
const content = ref("")

const saveData = async () => {
    const id = util.currentNodeId()!
    const data = {
        type: "secret-block",
        content: content.value
    }
    const saveData = AES.encrypt(JSON.stringify(data), props.psd).toString()
    const resp = await api.setBlockAttrs({
        id: id,
        attrs: {
            "custom-data": saveData
        }
    })
}
const saveData_1000 = debounce(saveData, 200)
const refreashLock = throttle(() => window.sessionStorage.setItem("sy-secret-password-time", new Date().toUTCString()), 1000)

const handleContent = (str: string) => {
    content.value = str
    refreashLock()
    saveData_1000()
}
const init = async () => {
    const id = util.currentNodeId()!
    const r = await api.getBlockAttr(id, "custom-data")

    if (r && r.value != "") {
        const de = AES.decrypt(r.value, props.psd).toString(enc.Utf8)
        try {
            const d = JSON.parse(de)
            if (d.type == "secret-block") {
                content.value = d.content
            } else {
            }
        } catch (error) {
        }
    }
}
onMounted(() => init())

const pasArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '_', '-', '$', '%', '&', '@', '+', '!'];
const makePassword = () => {
    const pasLen = 14
    let password = ''
    let pasArrLen = pasArr.length;
    for (let i = 0; i < pasLen; i++) {
        let x = Math.floor(Math.random() * pasArrLen);
        password += pasArr[x]
    }
    handleContent(password)
}
</script>
<template>
    <div :style="{
        position: 'relative'
    }">
        <n-input type="textarea" :on-update:value="handleContent" :value="content" />
        <n-button
            circle
            :style="{
                position: 'absolute',
                right: '5px',
                bottom: '5px'
            }"
            @click="makePassword"
        >密</n-button>
    </div>
</template>