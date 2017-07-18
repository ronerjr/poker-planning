import { PokerPlanningPage } from './app.po';

describe('poker-planning App', () => {
  let page: PokerPlanningPage;

  beforeEach(() => {
    page = new PokerPlanningPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
