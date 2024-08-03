/* eslint-disable no-underscore-dangle */
import { vi, expect, it } from 'vitest';
import path from 'path';
import * as fsExtra from '@ndelangen/fs-extra-unified';
import { initialGlobals } from './initial-globals';

vi.mock('@ndelangen/fs-extra-unified', async () => import('../../../../../__mocks__/fs-extra'));

const previewConfigPath = path.join('.storybook', 'preview.js');
const check = async (previewContents: string) => {
  vi.mocked<typeof import('../../../../../__mocks__/fs-extra')>(fsExtra as any).__setMockFiles({
    [previewConfigPath]: previewContents,
  });
  return initialGlobals.check({
    packageManager: {} as any,
    configDir: '',
    mainConfig: {} as any,
    storybookVersion: '8.0',
    previewConfigPath,
  });
};

it('no globals setting', async () => {
  await expect(check(`export default { tags: ['a', 'b']}`)).resolves.toBeFalsy();
});

it('initialGlobals setting', async () => {
  await expect(check(`export default { initialGlobals: { a:  1 } }`)).resolves.toBeFalsy();
});

it('globals setting', async () => {
  await expect(check(`export default { globals: { a:  1 } }`)).resolves.toBeTruthy();
});
