'use client'

import { useEffect } from 'react'
import { AlertTriangle, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[app/error]', error)
  }, [error])

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center px-6 py-16">
      <Card className="w-full text-center">
        <CardHeader>
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <CardTitle className="mt-4">Something went wrong</CardTitle>
          <CardDescription>
            {error.message || 'An unexpected error occurred while rendering this page.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-2">
          <Button onClick={reset}>
            <RotateCw className="h-4 w-4" />
            Try again
          </Button>
          <Button variant="outline" asChild>
            <a href="/">Back home</a>
          </Button>
        </CardContent>
      </Card>
      {error.digest ? (
        <p className="mt-4 font-mono text-[11px] text-muted-foreground">digest: {error.digest}</p>
      ) : null}
    </div>
  )
}
