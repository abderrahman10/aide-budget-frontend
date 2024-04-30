import Link from 'next/link'
import React from 'react'
export default function NotFound(){
  return <main>
     <div>
      <h2>404 -  Page Not Found</h2>
      <p>Sorry , the page you are looking for does not exist </p>
      <Link href="/">Return Home</Link>
    </div>
  </main>

}