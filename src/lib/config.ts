export interface EConfig {
    isAutoUnlock?: boolean
}

export async function saveConfig(conf: EConfig) {
    const formData = new FormData();
    // 设置工作空间路径下的文件路径
    formData.append('path', '/conf/sy-secret-block-config.json');
    // 设置是否为创建文件夹，这里为 false
    formData.append('isDir', 'false');
    // 设置最近访问和修改时间，这里使用当前时间
    formData.append('modTime', Math.floor(Date.now() / 1000).toString());
    // 将配置对象转换为 JSON 字符串并创建一个 Blob 对象
    const configBlob = new Blob([JSON.stringify(conf)], { type: 'application/json' });
    // 添加上传的文件
    formData.append('file', configBlob, 'sy-secret-block-config.json');

    let r = await fetch("/api/file/putFile", {
        method: "post",
        // 使用 FormData 作为请求体
        body: formData
    });
    // 可以根据需要处理响应
    return r;
}

export async function getConfig(): Promise<EConfig> {
    let r = await fetch("/api/file/getFile", {
        method: "post",
        body: JSON.stringify({
            path: "/conf/sy-secret-block-config.json"
        })
    })
    let rr = await r.json()
    if (rr.code === 404) {
        let conf: EConfig = {
            isAutoUnlock: true
        }
        await saveConfig(conf)
        return conf
    } else {
        return rr
    }
}