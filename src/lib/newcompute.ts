import { computed, ComputedRef, ref } from "vue"

// 每一次都重新计算compute
export const newcompute = <T>(fun: () => T): ComputedRef<T> => {
    const _op_trick = ref(0)
    return computed(() => {
        _op_trick.value += 1        // 用于让compute绑定依赖
        setTimeout(() => {
            _op_trick.value += 1    // 用于更新依赖
        }, 0);
        return fun()
    })
}