import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateApiKey(): string {
  const prefix = 'optima_'
  const randomPart = Math.random().toString(36).substring(2, 15) + 
                    Math.random().toString(36).substring(2, 15)
  return prefix + randomPart
}

export function formatApiCalls(calls: number): string {
  if (calls >= 1000000) {
    return (calls / 1000000).toFixed(1) + 'M'
  }
  if (calls >= 1000) {
    return (calls / 1000).toFixed(1) + 'K'
  }
  return calls.toString()
}

export function getSubscriptionLimits(tier: string) {
  switch (tier) {
    case 'free':
      return { processes: 3, apiCalls: 1000, price: 0 }
    case 'professional':
      return { processes: 25, apiCalls: 50000, price: 49 }
    case 'enterprise':
      return { processes: -1, apiCalls: 500000, price: 199 }
    case 'enterprise_plus':
      return { processes: -1, apiCalls: -1, price: 'Custom' }
    default:
      return { processes: 3, apiCalls: 1000, price: 0 }
  }
}