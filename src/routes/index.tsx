import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/tracking', replace: true, })
  }

  // component: () => <Index />,
})

function Index() {
  return (
    <>
      <h1>Index.html</h1>
    </>
  )
}
