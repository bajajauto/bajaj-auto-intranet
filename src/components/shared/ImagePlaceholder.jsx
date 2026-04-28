import { ImageIcon } from 'lucide-react'

export default function ImagePlaceholder({ width, height, label, className = '' }) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-200 text-text-secondary gap-2 ${className}`}
      style={{ width, height }}
      aria-label={label ? `Image placeholder: ${label}` : 'Image placeholder'}
    >
      <ImageIcon size={20} className="text-gray-300" />
      {label && <span className="text-xs text-gray-400 text-center px-2 leading-tight">{label}</span>}
    </div>
  )
}
