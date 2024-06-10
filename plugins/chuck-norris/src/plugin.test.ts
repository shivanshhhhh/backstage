import { chuckNorrisPlugin } from './plugin';

describe('chuck-norris', () => {
  it('should export plugin', () => {
    expect(chuckNorrisPlugin).toBeDefined();
  });
});
