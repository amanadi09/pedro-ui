import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/utils/vitest.config.ts',
  'packages/hooks/vitest.config.ts',
  'packages/ui/vitest.config.ts',
]);
