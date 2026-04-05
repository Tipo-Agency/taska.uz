import React, { Suspense, lazy } from 'react';
import { Navigate, useOutletContext, useParams } from 'react-router-dom';
import { PageSpinner } from '../components/PageSpinner';
import { isModuleId } from '../config/siteNavigation';
import type { ModuleId } from '../config/siteNavigation';
import type { AppOutletContext } from '../layouts/AppLayout';

type LandingProps = { onOpenModal: () => void };

const moduleLandings: Record<ModuleId, React.LazyExoticComponent<React.FC<LandingProps>>> = {
  tasks: lazy(() =>
    import('../components/TasksModuleLanding').then((m) => ({ default: m.TasksModuleLanding })),
  ),
  funnel: lazy(() =>
    import('../components/FunnelModuleLanding').then((m) => ({ default: m.FunnelModuleLanding })),
  ),
  clients: lazy(() =>
    import('../components/ClientsModuleLanding').then((m) => ({ default: m.ClientsModuleLanding })),
  ),
  warehouse: lazy(() =>
    import('../components/WarehouseModuleLanding').then((m) => ({ default: m.WarehouseModuleLanding })),
  ),
  finance: lazy(() =>
    import('../components/FinanceModuleLanding').then((m) => ({ default: m.FinanceModuleLanding })),
  ),
  processes: lazy(() =>
    import('../components/ProcessesModuleLanding').then((m) => ({ default: m.ProcessesModuleLanding })),
  ),
  team: lazy(() =>
    import('../components/TeamModuleLanding').then((m) => ({ default: m.TeamModuleLanding })),
  ),
  analytics: lazy(() =>
    import('../components/AnalyticsModuleLanding').then((m) => ({ default: m.AnalyticsModuleLanding })),
  ),
};

const ModulePage: React.FC = () => {
  const { moduleId } = useParams();
  const { openModal } = useOutletContext<AppOutletContext>();

  if (!moduleId || !isModuleId(moduleId)) {
    return <Navigate to="/404" replace />;
  }

  const Landing = moduleLandings[moduleId];

  return (
    <Suspense fallback={<PageSpinner />}>
      <Landing onOpenModal={openModal} />
    </Suspense>
  );
};

export default ModulePage;
