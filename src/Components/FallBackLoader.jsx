import React from 'react'
import { BounceLoader } from "react-spinners"

export default function FallBackLoader() {
  return (
    <div className="h-100 flex justify-center items-center">
    <BounceLoader color="#008080" />
    <span className="ms-2">Loading...</span>
  </div>
  )
}
