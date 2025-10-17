// Styles and libs
import './App.scss';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import RootLayout from './layout/RootLayout.jsx';
// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
// Import hooks
import useDisableMediaInteractions from './hooks/useDisableMediaInteractions';
import useLenisScroll from './hooks/useLenisScroll';

// Import pages
import Home from './pages/public/Home.jsx';

import About from './pages/public/About.jsx';
import Academy from './pages/public/Academy.jsx';
import AddsOn from './pages/public/AddsOn.jsx';
import Blogs from './pages/public/Blogs.jsx';
import Contact from './pages/public/Contact.jsx';
import CookiesPolicy from './pages/public/CookiesPolicy.jsx';
import Demos from './pages/public/Demos.jsx';
import Faq from './pages/public/Faq.jsx';
import Features from './pages/public/Features.jsx';
import LegalNotice from './pages/public/LegalNotice.jsx';
import Partners from './pages/public/Partners.jsx';
import Pricing from './pages/public/Pricing.jsx';
import PrivacyPolicy from './pages/public/PrivacyPolicy.jsx';
import QrCodes from './pages/public/QrCodes.jsx';
import SalesConsultant from './pages/public/SalesConsultant.jsx';
import SmartMarket from './pages/public/SmartMarket.jsx';
import Status from './pages/public/Status.jsx';
import TermsOfService from './pages/public/TermsOfService.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
        <Route index element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/academy" element={<Academy />}/>
        <Route path="/addson" element={<AddsOn />}/>
        <Route path="/blogs" element={<Blogs />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/cookiespolicy" element={<CookiesPolicy />}/>
        <Route path="/demos" element={<Demos />}/>
        <Route path="/faq" element={<Faq />}/>
        <Route path="/features" element={<Features />}/>
        <Route path="/legalnotice" element={<LegalNotice />}/>
        <Route path="/partners" element={<Partners />}/>
        <Route path="/pricing" element={<Pricing />}/>
        <Route path="/privacypolicy" element={<PrivacyPolicy />}/>
        <Route path="/qrcodes" element={<QrCodes />}/>
        <Route path="/salesconsultant" element={<SalesConsultant />}/>
        <Route path="/smartmarket" element={<SmartMarket />}/>
        <Route path="/status" element={<Status />}/>
        <Route path="/termsofservice" element={<TermsOfService />}/>
    </Route>
  )
)

function App() {
  // Call hook to avoid media download
  useDisableMediaInteractions();
  // Call hook to smooth scrolling in Apple OS
  useLenisScroll();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;