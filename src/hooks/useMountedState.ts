import { useCallback, useEffect, useRef } from 'react'
// 此hook用于判断数据是否计算过 正在计算则返回true
export default function useMountedState(): () => boolean {
  const mountedRef = useRef<boolean>(false)
  // 返回获取mount状态的回调函数
  const get = useCallback(() => mountedRef.current, [])
  useEffect(() => {
    // 加载时设为true
    mountedRef.current = true
    // 卸载时设为false
    return () => {
      mountedRef.current = false
    }
  })
  return get
}
