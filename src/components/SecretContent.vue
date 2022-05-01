<script lang="ts" setup>
import { NInput, NButton, NDropdown, NTable } from "naive-ui"
import { defineProps, onMounted, reactive, ref } from "vue"

import { debounce, throttle } from "lodash"
import { GetAndDecryptData, saveData, ContentType, SheetData, defaultSheetData } from "../lib/decrypt"
const props = defineProps<{
    psd: string,
    lock: () => void,
    changePassword: (content: string, type: ContentType) => void
}>()
const content = ref("")
const content_type = ref<ContentType>('text')
const saveData_1000 = debounce(() => saveData(content.value, props.psd, content_type.value), 200)
const refreashLock = throttle(() => window.sessionStorage.setItem("sy-secret-password-time", new Date().toUTCString()), 1000)
const inputRef = ref<any>(null)
const showScroll = ref(false)
const refreashScroll = () => {
    const textarea = inputRef.value.$refs.textareaElRef
    if (textarea.scrollHeight > textarea.clientHeight) {
        showScroll.value = true
    } else {
        showScroll.value = false
    }
}
const handleContent = (str: string) => {
    content.value = str
    refreashLock()
    saveData_1000()
    refreashScroll()
}
const handleSheet = () => {
    content.value = JSON.stringify(sheet.value)
    refreashLock()
    saveData_1000()
}
const sheet = ref<SheetData>(defaultSheetData())
const init = async () => {
    const decry = await GetAndDecryptData(props.psd)
    if (decry.success) {
        content.value = decry.content!
        content_type.value = decry.type!
        if (content_type.value === "sheet") {
            try {
                sheet.value = JSON.parse(content.value)
            } catch (error) {
                sheet.value = defaultSheetData()
            }

        }
    } else {
        props.lock()
    }
    refreashScroll()
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
        await saveData(content.value, props.psd, content_type.value)
        props.lock()
    } else if (key === 'change-password') {
        props.changePassword(content.value, content_type.value)
    } else if (key === 'add-row') {
        const len = sheet.value.head.length
        sheet.value.body.push(new Array(len).fill(""))
    } else if (key === 'add-col') {
        sheet.value.head.push("")
        sheet.value.body.forEach(l => l.push(""))
    } else if (key === 'del-row') {
        sheet.value.body.splice(sheet.value.body.length - 1, 1)
    } else if (key === 'del-col') {
        sheet.value.head.splice(sheet.value.head.length - 1, 1)
        sheet.value.body.forEach(l => l.splice(l.length - 1, 1))
    }
}
const options = () => {
    let a = [
        {
            label: '立即锁定',
            key: 'lock-now',
        }, {
            label: '修改密码',
            key: 'change-password'
        }
    ]
    if (content_type.value === "sheet") {
        a = [...a, {
            label: "增加一行",
            key: "add-row"
        }, {
            label: "增加一列",
            key: "add-col"
        }, {
            label: "删除一行",
            key: "del-row"
        }, {
            label: "删除一列",
            key: "del-col"
        }]
    }
    return a
}
const handleHeadUpdate = (index: number) => {
    return (v: string) => {
        sheet.value.head[index] = v
        handleSheet()
    }
}

const handleBodyUpdate = (lindex: number, index: number) => {
    return (v: string) => {
        sheet.value.body[lindex][index] = v
        handleSheet()
    }
}
</script>
<template>
    <div :style="{
        position: 'relative',
        display: 'flex',
        flex: '1'
    }">
        <n-input ref="inputRef" type="textarea" :on-update:value="handleContent" :value="content" placeholder="秘密藏在这~"
            :style="{
                display: 'flex',
                flex: '1',
                '--padding-right': '0px'
            }" v-if="content_type === 'text'" />
        <n-table :bordered="false" :single-line="false" v-if="content_type === 'sheet'">
            <thead>
                <tr>
                    <th v-for="(h, hi) in sheet.head">
                        <n-input :value="h" :on-update:value="handleHeadUpdate(hi)" />
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(line, lindex) in sheet.body">
                    <td v-for="(it, index) in line">
                        <n-input :value=it :on-update:value="handleBodyUpdate(lindex, index)" placeholder="... ..." />
                    </td>
                </tr>
            </tbody>
        </n-table>
        <n-button circle :style="{ position: 'absolute', right: '5px', bottom: '5px' }" @click="makePassword"
            v-if="content === ''">密</n-button>
        <n-dropdown trigger="click" @select="handleSelect" :options="options()" placement="bottom-end">
            <n-button circle :style="{
                position: 'absolute',
                right: showScroll ? '20px' : '5px',
                top: '5px',
                backgroundColor: 'white'
            }" size="small">···</n-button>
        </n-dropdown>
    </div>
</template>