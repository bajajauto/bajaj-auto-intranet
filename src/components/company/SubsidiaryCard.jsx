import { ArrowUpRight, Users } from 'lucide-react'

export default function SubsidiaryCard({ subsidiary, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer h-full min-h-[280px]
                 bg-white ring-1 ring-gray-200 shadow-sm
                 hover:shadow-2xl hover:-translate-y-2 hover:ring-brand-dark
                 transition-all duration-500"
    >
      {/* Blue gradient fill on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary to-brand-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Decorative orbs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-brand-light/70 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-700" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-brand-light/40 group-hover:bg-white/5 group-hover:scale-125 transition-all duration-700" />

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col gap-3">

        {/* Code badge */}
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-primary/10 text-brand-primary group-hover:bg-white/15 group-hover:text-white transition-all duration-300">
            {subsidiary.code}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-text-primary group-hover:text-white transition-colors duration-300 leading-snug">
          {subsidiary.fullName}
        </h3>

        {/* Description */}
        <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 group-hover:text-white/80 transition-colors duration-300 flex-1">
          {subsidiary.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-100 group-hover:bg-white/20 transition-colors duration-300" />

        {/* Segments list */}
        <div className="space-y-1.5">
          {subsidiary.segments.slice(0, 3).map((segment) => (
            <div key={segment.id} className="flex items-center gap-2">
              <span className="text-sm leading-none">{segment.icon}</span>
              <span className="text-xs text-text-secondary group-hover:text-white/75 transition-colors duration-300 truncate">
                {segment.name}
              </span>
            </div>
          ))}
          {subsidiary.segments.length > 3 && (
            <p className="text-xs text-text-secondary/50 group-hover:text-white/40 transition-colors duration-300 pl-6">
              +{subsidiary.segments.length - 3} more
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 group-hover:bg-white/20 transition-colors duration-300" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-text-secondary group-hover:text-white/70 transition-colors duration-300">
            <Users size={13} />
            <span>XX,XXX employees</span>
          </div>
          <ArrowUpRight
            size={16}
            className="text-brand-primary group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  )
}
