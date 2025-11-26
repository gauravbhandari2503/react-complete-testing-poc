import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

function App() {
  const routing = useRoutes(routes);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 min-h-[60vh] bg-white rounded-lg shadow-md mt-6">
        {routing}
      </main>
      <Footer />
    </>
  );
}

export default App;
