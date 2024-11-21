<script setup lang="ts">
import { NButton, NInput, NGi, NGrid, NSpace, useMessage, NRadioGroup, NRadioButton } from "naive-ui"
import { api, util } from "siyuan_api_cache_lib"
import { ref, defineProps, onMounted } from "vue"
import { ContentType, GetAndDecryptData, saveData } from "../lib/decrypt"
import { useI18n } from "vue-i18n"
const message = useMessage()
const { t } = useI18n()

const content = ref("")
const props = defineProps<{
    unlock: (password: string) => void,
    lock: () => void
}>()
const content_types = [{
    label: "content_type_text",
    value: 'text'
}, {
    label: "content_type_table",
    value: 'sheet'
}]
const content_type = ref<ContentType>('text')

const handleClick = async () => {
    const decr = await GetAndDecryptData(content.value)
    if (!decr.success) {
        if (decr.isFirst) {
            if (content.value === "") {
                message.error(t("password_empty"))
            } else {
                await saveData("", content.value, content_type.value)
                props.unlock(content.value)
            }
        } else
            message.error(t("password_wrong"))
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
                <n-input :on-update:value="handleInput" :placeholder="isFirstToSetPassword ? t('set_initial_key') : t('enter_the_key')"
                    @keyup="handleKeyUp" passively-activated round type="password" />
            </n-space>
        </n-gi>
        <n-gi span="1">
            <n-space justify="space-around" :item-style="{
                margin: '10px'
            }">
                <n-button @click="handleClick" type="primary" ghost>{{ $t('unlock') }}</n-button>
            </n-space>
        </n-gi>
        <n-gi span="3">
            <n-space v-if="isFirstToSetPassword" justify="center">
                <n-radio-group v-model:value="content_type" name="radiobuttongroup1">
                    <n-radio-button v-for="ty in content_types" :key="ty.value" :value="ty.value" :label="ty.label">
                        {{ $t(ty.label) }}
                    </n-radio-button>
                </n-radio-group>
            </n-space>
        </n-gi>
    </n-grid>

</template>

<style>
</style>
