export function TestRoute({ name }: { name: string }) {
  console.log(`Rendering ${name} route`)
  return (
    <div className="p-4">
      <h1 className="text-2xl">Test Route: {name}</h1>
    </div>
  )
} 