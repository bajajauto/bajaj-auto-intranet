import Modal from '@/components/shared/Modal'

export default function VideoLightboxModal({ video, onClose }) {
  if (!video) return null

  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`

  return (
    <Modal isOpen={true} onClose={onClose} title={video.title} maxWidth="max-w-3xl">
      <div className="aspect-video w-full overflow-hidden rounded-card bg-black">
        <iframe
          src={embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
      {video.description && (
        <p className="mt-4 text-sm text-text-secondary">{video.description}</p>
      )}
    </Modal>
  )
}
