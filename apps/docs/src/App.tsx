import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';
import { Introduction } from './pages/Introduction';
import { Theming } from './pages/Theming';
import { Accessibility } from './pages/Accessibility';
import { ComponentsIndex } from './pages/ComponentsIndex';
import { ButtonPage } from './pages/components/ButtonPage';
import { InputPage } from './pages/components/InputPage';
import { AlertPage } from './pages/components/AlertPage';
import { HooksPage } from './pages/Hooks';
import { UtilitiesPage } from './pages/Utilities';
import { RoadmapPage } from './pages/Roadmap';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Introduction />} />
        <Route path="/theming" element={<Theming />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/components" element={<ComponentsIndex />} />
        <Route path="/components/button" element={<ButtonPage />} />
        <Route path="/components/input" element={<InputPage />} />
        <Route path="/components/alert" element={<AlertPage />} />
        <Route path="/hooks" element={<HooksPage />} />
        <Route path="/utilities" element={<UtilitiesPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
