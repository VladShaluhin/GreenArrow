import { TagsPage } from './app.po';

describe('tags App', () => {
  let page: TagsPage;

  beforeEach(() => {
    page = new TagsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
