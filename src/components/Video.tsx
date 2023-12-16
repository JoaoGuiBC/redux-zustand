import { Loader } from 'lucide-react'
import ReactPlayer from 'react-player'

import { useCurrentLesson, useStore } from '../zustand-store'

export function Video() {
  const { isLoading, next } = useStore((store) => {
    return {
      next: store.next,
      isLoading: store.isLoading,
    }
  })

  const { currentLesson } = useCurrentLesson()

  function handlePlayNext() {
    next()
  }

  if (!currentLesson) return null

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          controls
          width="100%"
          height="100%"
          onEnded={handlePlayNext}
          url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
        />
      )}
    </div>
  )
}
