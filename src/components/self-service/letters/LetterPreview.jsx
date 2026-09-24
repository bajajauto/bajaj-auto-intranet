/*
 * Renders a generated document onto its entity letterhead.
 *
 * The block kinds come from the adapter and map one-to-one onto the shapes the
 * source templates use — paragraph, a labelled line whose label stays bold and
 * inline, a numbered list, a subheading, a signature rule. Keeping them as data
 * rather than markup is what lets the same preview serve all five letters plus
 * Form 60.
 *
 * Everything here is deliberately fixed-colour: a letter is a document, and it
 * has to look the same on screen, in dark mode, and out of a printer.
 */

import Letterhead from './Letterhead'

function Block({ block }) {
  switch (block.kind) {
    case 'subheading':
      return <p className="mt-4 text-[11px] font-bold">{block.text}</p>

    case 'labelled':
      return (
        <p className="mt-1.5 text-[11px] leading-relaxed">
          <span className="font-bold">{block.label}:</span> {block.value}
        </p>
      )

    case 'list':
      return (
        <ol className="mt-2 space-y-1 pl-5 text-[11px] leading-relaxed">
          {block.items.map((item, i) => (
            <li key={i} className="list-decimal">
              {item}
            </li>
          ))}
        </ol>
      )

    case 'signature':
      return (
        <div className="mt-10">
          <span className="block w-48 border-t border-[#1a1a1a]" />
          <span className="mt-1 block text-[10px]">{block.label}</span>
        </div>
      )

    case 'paragraph':
    default:
      return <p className="mt-3 text-[11px] leading-relaxed">{block.text}</p>
  }
}

// Page 2 of the vehicle discount letter — guidance rather than certification,
// so it carries its own heading structure instead of the block list.
function GuidanceSection({ section }) {
  return (
    <div className="text-[10.5px] leading-relaxed">
      <p className="font-bold">{section.title}</p>
      <p className="mt-2">{section.intro}</p>

      {section.groups.map((group) => (
        <div key={group.heading} className="mt-3">
          <p className="font-bold">{group.heading}</p>
          <ol className="mt-1 space-y-1 pl-5">
            {group.items.map((item, i) => (
              <li key={i} className="list-decimal">
                {item}
              </li>
            ))}
          </ol>
        </div>
      ))}

      {section.outro.map((text) => (
        <p key={text} className="mt-3">
          {text}
        </p>
      ))}

      <div className="mt-4">
        {section.signOff.map((line) => (
          <span key={line} className="block font-medium">
            {line}
          </span>
        ))}
      </div>

      <p className="mt-4 text-center text-[9.5px] font-semibold italic">*** {section.note} ***</p>
    </div>
  )
}

function Addressee({ value }) {
  if (!value) return null
  const lines = Array.isArray(value) ? value : [value]
  return (
    <div className="mt-4 text-[11px] font-semibold leading-relaxed">
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </div>
  )
}

export default function LetterPreview({ document: doc }) {
  if (!doc) return null

  const pageCount = 1 + (doc.sections?.length ?? 0)

  return (
    <div className="space-y-5">
      <Letterhead entity={doc.entity} page={1} pageCount={pageCount}>
        <div className="flex h-full flex-col">
          <p className="text-[11px] font-medium">{doc.issuedOnLabel}</p>

          <Addressee value={doc.addressee} />

          {doc.heading && (
            <h3 className="mt-5 text-center text-[12.5px] font-bold uppercase underline underline-offset-4">
              {doc.heading}
            </h3>
          )}

          {doc.salutation && <p className="mt-4 text-[11px]">{doc.salutation}</p>}

          <div className="mt-2">
            {doc.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          <p className="mt-auto pt-6 text-center text-[10px] font-semibold italic">
            *{doc.note}*
          </p>
        </div>
      </Letterhead>

      {doc.sections?.map((section, i) => (
        <Letterhead key={i} entity={doc.entity} page={i + 2} pageCount={pageCount}>
          <GuidanceSection section={section} />
        </Letterhead>
      ))}
    </div>
  )
}

/*
 * Form 60 is a certificate the company issues to a registering authority, so it
 * heads differently from a letter — rule citation, gazette line, and a named
 * signatory block instead of the system-generated note.
 */
export function Form60Preview({ document: doc }) {
  if (!doc) return null

  return (
    <Letterhead entity={doc.entity}>
      <div className="flex h-full flex-col text-[11px]">
        <div className="text-center">
          <h3 className="text-[13px] font-bold">{doc.heading}</h3>
          <p className="text-[10px]">{doc.subheading}</p>
          <p className="mt-1 text-[12px] font-bold underline underline-offset-4">{doc.title}</p>
        </div>

        <Addressee value={doc.addressee} />

        <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-wide">
          {doc.citation}
        </p>

        <div className="mt-1">
          {doc.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <div className="mt-auto pt-8">
          <span className="block w-52 border-t border-[#1a1a1a]" />
          <span className="mt-1 block text-[10px] font-semibold">{doc.signatory}</span>
          <span className="block text-[9.5px]">Authorised Signatory, {doc.entity.name}</span>
        </div>
      </div>
    </Letterhead>
  )
}
