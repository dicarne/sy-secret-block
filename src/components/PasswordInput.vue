<script setup lang="ts">
import { NButton, NInput, NGi, NGrid, NSpace, useMessage, NRadioGroup, NRadioButton } from "naive-ui"
import { api, util } from "siyuan_api_cache_lib"
import { ref, defineProps, onMounted } from "vue"
import { ContentType, GetAndDecryptData, saveData } from "../lib/decrypt"
const message = useMessage()
const content = ref("")
const props = defineProps<{
    unlock: (password: string) => void,
    lock: () => void
}>()
const content_types = [{
    label: "文本",
    value: 'text'
}, {
    label: "表格",
    value: 'sheet'
}]
const content_type = ref<ContentType>('text')

const handleClick = async () => {
    const decr = await GetAndDecryptData(content.value)
    if (!decr.success) {
        if (decr.isFirst) {
            if (content.value === "") {
                message.error("密码不能为空！")
            } else {
                await saveData("", content.value, content_type.value)
                props.unlock(content.value)
            }
        } else
            message.error("密码错误！")
    } else {
        props.unlock(content.value)
    }
}
const handleInput = (v: string) => {
    content.value = v
}
const handleKeyUp = (p: KeyboardEvent) => {
    if (p.key === "Enter") {
        handleClick()
    }
}
const isFirstToSetPassword = ref(false)
onMounted(async () => {
    const id = util.currentNodeId()!
    const r = await api.getBlockAttr(id, "custom-data")
    if (!(r && r.value != "")) {
        isFirstToSetPassword.value = true
    }
})

</script>

<template>
    <n-grid x-gap="12" cols="1 400:4" :style="{
        margin: 'auto',
        paddingLeft: '25px'
    }">
        <n-gi span="3">
            <n-space :item-style="{
                margin: '10px',
                width: '100%'
            }">
                <n-input :on-update:value="handleInput" :placeholder="isFirstToSetPassword ? '请设置初始密钥' : '请输入密钥'"
                    @keyup="handleKeyUp" passively-activated round type="password" />
            </n-space>
        </n-gi>
        <n-gi span="1">
            <n-space justify="space-around" :item-style="{
                margin: '10px'
            }">
                <n-button @click="handleClick" type="primary" ghost>解锁</n-button>
            </n-space>
        </n-gi>
        <n-gi span="3">
            <n-space v-if="isFirstToSetPassword" justify="center">
                <n-radio-group v-model:value="content_type" name="radiobuttongroup1">
                    <n-radio-button v-for="ty in content_types" :key="ty.value" :value="ty.value" :label="ty.label">
                        {{ ty.label }}
                    </n-radio-button>
                </n-radio-group>
            </n-space>
        </n-gi>
    </n-grid>

</template>

<style>
</style>
