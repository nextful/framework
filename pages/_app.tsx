import type { AppProps } from 'next/app';
import { GlobalContext, InitialValues } from 'GlobalContext';

function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContext.Provider value={InitialValues}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
};

export default App;
