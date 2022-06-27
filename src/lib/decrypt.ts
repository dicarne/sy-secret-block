import { AES, enc } from "crypto-js"
import { api, util } from "siyuan_api_cache_lib"

export type ContentType = 'text' | 'sheet'

interface IDecryptDataResult {
    success: boolean
    content?: string
    isFirst?: boolean
    type?: ContentType
}
export async function GetAndDecryptData(password: string): Promise<IDecryptDataResult> {
    const id = util.currentNodeId()!
    const rr = await fetch("/api/attr/getBlockAttrs", {
        method: "post",
        body: JSON.stringify({
            id: id
        })
    })
    const r = await rr.json()
    if (r && r.data && r.data["custom-data"]) {
        try {
            const de = AES.decrypt(r.data["custom-data"], password).toString(enc.Utf8)
            const d = JSON.parse(de)
            if (d.type == "secret-block") {
                return {
                    success: true,
                    content: d.content,
                    type: d.content_type ?? 'text'
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

export const saveData = async (content: string, password: string, content_type: ContentType) => {
    const id = util.currentNodeId()!
    const data = {
        type: "secret-block",
        content: content,
        content_type: content_type
    }
    const saveData = AES.encrypt(JSON.stringify(data), password).toString()

    const resp = await fetch("/api/attr/setBlockAttrs", {
        method: "post", body: JSON.stringify({
            id: id,
            attrs: {
                "custom-data": saveData
            }
        })
    })
    const rj = await resp.json()
    if (!rj || rj.code != 0) {
        console.log("save data error", rj)
    }
    const rr = await fetch("/api/attr/getBlockAttrs", {
        method: "post",
        body: JSON.stringify({
            id: id
        })
    })
    const r = await rr.json()
}

export interface SheetData {
    head: string[]
    body: string[][]
}

export const defaultSheetData = (): SheetData => {
    return {
        head: ["用户名", "密码"],
        body: [["", ""], ["", ""], ["", ""]]
    }
}