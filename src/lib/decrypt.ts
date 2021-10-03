import { AES, enc } from "crypto-js"
import { api, util } from "siyuan_api_cache_lib"

interface IDecryptDataResult {
    success: boolean
    content?: string
    isFirst?: boolean
}
export async function GetAndDecryptData(password: string): Promise<IDecryptDataResult> {
    const id = util.currentNodeId()!
    const r = await api.getBlockAttr(id, "custom-data")
    if (r && r.value != "") {
        try {
            const de = AES.decrypt(r.value, password).toString(enc.Utf8)
            const d = JSON.parse(de)
            if (d.type == "secret-block") {
                return {
                    success: true,
                    content: d.content
                }
            } else {
                return {
                    success: false
                }
            }
        } catch (error) {
            return {
                success: false
            }
        }

    } else {
        return {
            success: false,
            isFirst: true
        }
    }
}

export const saveData = async (content: string, password: string) => {
    const id = util.currentNodeId()!
    const data = {
        type: "secret-block",
        content: content
    }
    const saveData = AES.encrypt(JSON.stringify(data), password).toString()
    const resp = await api.setBlockAttrs({
        id: id,
        attrs: {
            "custom-data": saveData
        }
    })
}