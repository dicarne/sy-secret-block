<script lang="ts" setup>
import { AES } from 'crypto-js'
import { NButton, NInput, NGrid, NGi, NSpace, useMessage } from 'naive-ui'
import { api, util } from 'siyuan_api_cache_lib'
import { ref } from 'vue'
const props = defineProps<{
    unlock: (password: string) => void,
    psd: string,
    content: string
}>()
const message = useMessage()
const newpassword = ref("")
const saveData = async () => {
    const id = util.currentNodeId()!
    const data = {
        type: "secret-block",
        content: props.content
    }
    const saveData = AES.encrypt(JSON.stringify(data), newpassword.value).toString()
    const resp = await api.setBlockAttrs({
        id: id,
        attrs: {
            "custom-data": saveData
        }
    })
}

const applyNew = async () => {
    if (newpassword.value === "") {
        message.error("密码不能为空！")
        return
    }
    await saveData()
    props.unlock(newpassword.value)
}
const cancel = () => {
    props.unlock(props.psd)
}
const handlePassword = (str: string) => {
    newpassword.value = str
}
const handleKeyUp = (p: KeyboardEvent) => {
    if (p.key === "Enter") {
        applyNew()
    }
}
</script>
<template>
    <n-grid x-gap="12" cols="2" :style="{
        margin: 'auto'
    }">
        <n-gi span="2">
            <div
                :style="{
                    marginLeft: '10px',
                    marginRight: '10px'
                }"
            >
                <n-input
                    :value="newpassword"
                    :on-update:value="handlePassword"
                    placeholder="请输入新密码"
                    @keyup="handleKeyUp"
                />
            </div>
        </n-gi>
        <n-gi span="2">
            <div
                :style="{
                    marginTop: '10px',
                    marginLeft: '20px',
                    marginRight: '20px'
                }"
            >注意：修改密码只会修改当前块的密码，不会影响其他块！</div>
        </n-gi>
        <n-gi span="2">
            <n-space
                justify="space-around"
                :style="{
                    marginTop: '10px'
                }"
            >
                <n-button @click="applyNew" ghost type="primary">修改</n-button>
                <n-button @click="cancel" ghost type="error">取消</n-button>
            </n-space>
        </n-gi>
    </n-grid>
</template>