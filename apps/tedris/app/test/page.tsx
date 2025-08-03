import { Button } from '@madrasah/ui/components/button';
import { Alert, AlertTitle, AlertDescription } from '@madrasah/ui/components/alert';

export default async function Test() {
  return (
    <main>
      <Button variant="destructive">Test Button</Button>
      <Alert variant="default">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components and dependencies to your app using the cli.</AlertDescription>
      </Alert>
    </main>
  );
}
