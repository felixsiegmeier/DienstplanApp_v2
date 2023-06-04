import React from 'react'

export default function LeftButton({onClick}) {
  return (
    <div onClick={onClick} className='text-3xl hover:text-cyan-500 mr-4 active:text-cyan-800 select-none cursor-pointer inline'>{"<"}</div>
  )
}
