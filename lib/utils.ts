import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-AU', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-AU', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'short' 
  })
}

export function getTimeAgo(date: Date): string {
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes === 1) return '1 min ago'
  return `${minutes} mins ago`
}

export function getTimeUntil(date: Date): string {
  const minutes = Math.floor((date.getTime() - Date.now()) / 60000)
  if (minutes < 0) return 'Overdue'
  if (minutes < 1) return 'Now'
  if (minutes === 1) return '1 min'
  return `${minutes} mins`
}