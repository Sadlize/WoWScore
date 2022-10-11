import { useCallback, useState } from "react"

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const fetching = useCallback(
    async (...args) => {
      try {
        await callback(...args)
      } catch (e) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    },
    [callback]
  )
  return [fetching, isLoading, error]
}
