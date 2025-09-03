import { useCallback } from "react"
import { toast } from "../components/ui/sonner"

export function useToast() {
  // Simple wrapper for the toast function from sonner
  const notify = useCallback((message: string, options?: any) => {
    toast(message, options)
  }, [])

  // Return an empty toasts array for compatibility
  return { toast: notify, toasts: [] }
}
