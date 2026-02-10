import { AppRouter } from './routes/router';
import { Toaster } from '@/components/ui/sonner';
import { QuickActions } from '@/components/QuickActions';

function App() {
  return (
    <>
      <AppRouter />
      <Toaster />
      <QuickActions />
    </>
  );
}

export default App;
