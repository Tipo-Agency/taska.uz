import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppLayout } from './layouts/AppLayout';
import { PageSpinner } from './components/PageSpinner';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ModulePage = lazy(() => import('./pages/ModulePage'));
const SolutionPage = lazy(() => import('./pages/SolutionPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const CookiesPage = lazy(() => import('./pages/CookiesPage'));
const EducationPage = lazy(() => import('./pages/EducationPage'));
const InvestorsPage = lazy(() => import('./pages/InvestorsPage'));
const PartnersPage = lazy(() => import('./pages/PartnersPage'));
const WorkOrganizationPage = lazy(() => import('./pages/WorkOrganizationPage'));
const CasesIndexPage = lazy(() => import('./pages/CasesIndexPage'));
const CasePage = lazy(() => import('./pages/CasePage'));
const NewsIndexPage = lazy(() => import('./pages/NewsIndexPage'));
const NewsArticlePage = lazy(() => import('./pages/NewsArticlePage'));

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<PageSpinner />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="cookies" element={<CookiesPage />} />
              <Route path="education" element={<EducationPage />} />
              <Route path="investors" element={<InvestorsPage />} />
              <Route path="partners" element={<PartnersPage />} />
              <Route path="work" element={<WorkOrganizationPage />} />
              <Route path="cases" element={<CasesIndexPage />} />
              <Route path="cases/:slug" element={<CasePage />} />
              <Route path="news" element={<NewsIndexPage />} />
              <Route path="news/:id" element={<NewsArticlePage />} />
              <Route path="modules/:moduleId" element={<ModulePage />} />
              <Route path="solutions/:slug" element={<SolutionPage />} />
              <Route path="404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
