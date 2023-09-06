import * as Collapsible from '@radix-ui/react-collapsible'

import { useDispatch } from 'react-redux'
import { ChevronDown } from 'lucide-react'

import { Lesson } from './Lesson'
import { useAppSelector } from '../store'
import { play } from '../store/slices/player'

interface ModuleProps {
  title: string
  moduleIndex: number
  lessonsAmount: number
}

export function Module({ title, moduleIndex, lessonsAmount }: ModuleProps) {
  const dispatch = useDispatch()

  const { currentModuleIndex, currentLessonIndex } = useAppSelector((state) => {
    const { currentModuleIndex, currentLessonIndex } = state.player

    return { currentModuleIndex, currentLessonIndex }
  })

  const lessons = useAppSelector(
    (state) => state.player.course.modules[moduleIndex].lessons
  )

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <span className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </span>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400"> {lessonsAmount} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons.map((lesson, lessonIndex) => {
            const isCurrent =
              currentModuleIndex === moduleIndex &&
              currentLessonIndex === lessonIndex

            return (
              <Lesson
                key={lesson.id}
                title={lesson.title}
                isCurrent={isCurrent}
                duration={lesson.duration}
                onPlay={() => dispatch(play([moduleIndex, lessonIndex]))}
              />
            )
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
