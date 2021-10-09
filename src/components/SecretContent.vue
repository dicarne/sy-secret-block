<script lang="ts" setup>
import { NInput, NButton, NDropdown } from "naive-ui"
import { defineProps, onMounted, ref } from "vue"

import { debounce, throttle } from "lodash"
import { GetAndDecryptData, saveData } from "../lib/decrypt"
const props = defineProps<{
    psd: string,
    lock: () => void,
    changePassword: (content: string) => void
}>()
const content = ref("")

const saveData_1000 = debounce(() => saveData(content.value, props.psd), 200)
const refreashLock = throttle(() => window.sessionStorage.setItem("sy-secret-password-time", new Date().toUTCString()), 1000)

const handleContent = (str: string) => {
    content.value = str
    refreashLock()
    saveData_1000()
}
const init = async () => {
    const decry = await GetAndDecryptData(props.psd)
    if (decry.success) {
        content.value = decry.content!
    } else {
        props.lock()
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
const handleSelect = async (key: string) => {
    if (key === "lock-now") {
        await saveData(content.value, props.psd)
        props.lock()
    } else if (key === 'change-password') {
        props.changePassword(content.value)
    }
}
const options = ref([
    {
        label: '立即锁定',
        key: 'lock-now',
    }, {
        label: '修改密码',
        key: 'change-password'
    }
])
</script>
<template>
    <div :style="{
        position: 'relative',
        display: 'flex',
        flex: '1'
    }">
        <n-input
            type="textarea"
            :on-update:value="handleContent"
            :value="content"
            placeholder="秘密藏在这~"
            :style="{
                display: 'flex',
                flex: '1'
            }"
        />
        <n-button
            circle
            :style="{
                position: 'absolute',
                right: '5px',
                bottom: '5px'
            }"
            @click="makePassword"
            v-if="content === ''"
        >密</n-button>
        <n-dropdown
            trigger="click"
            @select="handleSelect"
            :options="options"
            placement="bottom-end"
        >
            <n-button
                circle
                :style="{
                    position: 'absolute',
                    right: '5px',
                    top: '5px'
                }"
            >···</n-button>
        </n-dropdown>
    </div>
</template>