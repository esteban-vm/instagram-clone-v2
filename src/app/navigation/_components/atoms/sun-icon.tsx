export function SunIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg fill='none' height='800px' viewBox='0 0 24 24' width='800px' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        clipRule='evenodd'
        d='M7.25 22a.75.75 0 01.75-.75h8a.75.75 0 010 1.5H8a.75.75 0 01-.75-.75zM12 1.25a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0V2a.75.75 0 01.75-.75zM1.25 12a.75.75 0 01.75-.75h1a.75.75 0 010 1.5H2a.75.75 0 01-.75-.75zm19 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zM6.083 15.25H2a.75.75 0 000 1.5h20a.75.75 0 000-1.5H6.083z'
        fill='var(--color-orange-600)'
        fillRule='evenodd'
      />
      <path
        d='M4.25 19a.75.75 0 01.75-.75h14a.75.75 0 010 1.5H5a.75.75 0 01-.75-.75z'
        fill='var(--color-yellow-600)'
        opacity={0.75}
      />
      <g fill='var(--color-yellow-600)'>
        <path d='M4.398 4.398a.75.75 0 011.061 0l.393.393a.75.75 0 01-1.06 1.06l-.394-.392a.75.75 0 010-1.06zM19.6 4.399a.75.75 0 010 1.06l-.392.393a.75.75 0 01-1.06-1.06l.392-.393a.75.75 0 011.06 0z' />
      </g>
      <path d='M5.25 12c0 1.178.302 2.286.833 3.25h11.834A6.75 6.75 0 105.25 12z' fill='var(--color-yellow-500)' />
    </svg>
  )
}
