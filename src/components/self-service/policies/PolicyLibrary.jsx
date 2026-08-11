import { useState } from 'react'
import { ChevronRight, FileText } from 'lucide-react'
import { iconMap } from '@/components/shared/iconMap'
import PolicyTopicDetail from './PolicyTopicDetail'

// A category folder that holds files directly instead of topic folders is shown
// as a single topic standing in for the category, so the browser has one shape
// to render and the drill-down reads the same either way.
function topicsOf(category) {
  if (category.topics?.length) return category.topics
  return [
    {
      id: category.id,
      name: category.name,
      icon: category.icon,
      summary: category.summary,
      covered: category.covered,
      documents: category.documents,
      readables: category.readables,
    },
  ]
}

function countDocuments(category) {
  return topicsOf(category).reduce((sum, topic) => sum + (topic.documents?.length ?? 0), 0)
}

function TopicCard({ topic, onOpen }) {
  const Icon = iconMap[topic.icon] ?? iconMap.FileText
  const docCount = topic.documents?.length ?? 0

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-full items-center gap-3 rounded-xl border border-gray-100 bg-white px-3.5 py-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-md focus-ring"
    >
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand-primary transition-all duration-200 group-hover:bg-brand-primary group-hover:text-white">
        <Icon size={18} strokeWidth={1.75} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-2">
          <span className="truncate text-[13px] font-semibold text-text-primary">{topic.name}</span>
          {topic.subtitle && (
            <span className="truncate text-[11px] font-medium text-text-secondary">
              {topic.subtitle}
            </span>
          )}
        </span>
        <span className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-text-secondary">
          <FileText size={11} className="flex-shrink-0" />
          {docCount} {docCount === 1 ? 'document' : 'documents'}
        </span>
      </span>

      <ChevronRight
        size={16}
        className="flex-shrink-0 text-text-secondary transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand-primary"
      />
    </button>
  )
}

export default function PolicyLibrary({ categories }) {
  const [openCategoryId, setOpenCategoryId] = useState(categories[0]?.id ?? null)
  const [selected, setSelected] = useState(null)

  if (selected) {
    return (
      <PolicyTopicDetail
        category={selected.category}
        topic={selected.topic}
        onBack={() => setSelected(null)}
      />
    )
  }

  return (
    <div className="space-y-2.5">
      {categories.map((category, idx) => {
        const Icon = iconMap[category.icon] ?? iconMap.FolderOpen
        const topics = topicsOf(category)
        const isOpen = openCategoryId === category.id
        const docCount = countDocuments(category)

        return (
          <div
            key={category.id}
            className="overflow-hidden rounded-xl border border-gray-100 bg-white animate-in fade-in slide-in-from-bottom-2 duration-300"
            style={{ animationDelay: `${idx * 40}ms` }}
          >
            <button
              type="button"
              onClick={() => setOpenCategoryId(isOpen ? null : category.id)}
              aria-expanded={isOpen}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-200 focus-ring ${
                isOpen ? 'bg-brand-light/50' : 'hover:bg-bg-alt'
              }`}
            >
              <ChevronRight
                size={16}
                className={`flex-shrink-0 text-brand-primary transition-transform duration-200 ${
                  isOpen ? 'rotate-90' : ''
                }`}
              />
              <Icon size={17} strokeWidth={1.75} className="flex-shrink-0 text-brand-primary" />
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-text-primary">
                {category.name}
              </span>
              <span className="flex-shrink-0 rounded-full bg-brand-light px-2 py-0.5 text-[11px] font-semibold text-brand-primary">
                {docCount}
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <ul className="space-y-1.5 border-t border-gray-50 p-3">
                  {topics.map((topic) => (
                    <li key={topic.id}>
                      <TopicCard topic={topic} onOpen={() => setSelected({ category, topic })} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
