import React from 'react';
import { Navigate, useOutletContext, useParams } from 'react-router-dom';
import { SolutionLanding } from '../components/SolutionLanding';
import { isSolutionSlug, type SolutionSlug } from '../config/siteNavigation';
import type { AppOutletContext } from '../layouts/AppLayout';

const SolutionPage: React.FC = () => {
  const { slug } = useParams();
  const { openModal } = useOutletContext<AppOutletContext>();

  if (!slug || !isSolutionSlug(slug)) {
    return <Navigate to="/404" replace />;
  }

  return <SolutionLanding slug={slug as SolutionSlug} onOpenModal={openModal} />;
};

export default SolutionPage;
