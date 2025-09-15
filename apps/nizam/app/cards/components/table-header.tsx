import { Button } from '@madrasah/ui/components/button'

export const TableHeader = ({ onCardCreate }: {
  onCardCreate: () => void
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <Button onClick={onCardCreate}>Create a new random card</Button>
    </div>
  )
}
