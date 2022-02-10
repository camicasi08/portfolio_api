import { Test, TestingModule } from '@nestjs/testing';
import { TwitterService } from '../../twitter/twitter.service'
import { PortfolioRepository } from '../../../repositories/portfolio.repository';
import { PortfolioService } from '../portfolio.service';
import mockData from './mock_data'
class FakeRepository{
    public async getPortfolioById(): Promise<void> {}
    public async updatePortfolio(): Promise<void> {}
}

describe('PortfolioService', () => {
  let service: PortfolioService;
  let portfolioRepository : PortfolioRepository;
  let twitterService: TwitterService;
  beforeEach(async () => {
    const twitterServiceProvider = {
        provide: TwitterService,
        useFactory: () => ({
            getLastTweets: jest.fn(() => {})
        })
    }

    const portfolioRepositoryServiceProvider = {
        provide: PortfolioRepository,
        useClass: FakeRepository
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortfolioService,twitterServiceProvider, portfolioRepositoryServiceProvider],
    }).compile();

    service = module.get<PortfolioService>(PortfolioService);
    portfolioRepository = module.get<PortfolioRepository>(PortfolioRepository);
    twitterService = module.get<TwitterService>(TwitterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a portfolio', async () => {
    const fakeId =  '7339a668-b10a-4e91-af8e-c1078555e863';
    const existingPortfolio = mockData;
    //console.log(existingPortfolio);
    const portfolioRepositoryFindOneSpy = jest
    .spyOn(portfolioRepository, 'getPortfolioById')
    .mockResolvedValue(existingPortfolio);

    const twitterServiceSpy = jest
    .spyOn(twitterService, 'getLastTweets')
    .mockResolvedValue(existingPortfolio.tweets);
    const result = await service.findOne(fakeId);
    

    expect(result).toStrictEqual(existingPortfolio);
    expect(portfolioRepositoryFindOneSpy).toHaveBeenCalledWith(fakeId);
    expect(twitterServiceSpy).toHaveBeenCalled();
  })
});
