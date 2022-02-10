import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioController } from '../portfolio.controller';
import { PortfolioService } from '../portfolio.service';
import { UpdatePortfolioDto } from '../dto/update-portfolio.dto';

describe('PortfolioController', () => {
  let controller: PortfolioController;
  let spyPortfolioService: PortfolioService;

 
  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: PortfolioService,
      useFactory: () => ({
        findOne: jest.fn(() => {}),
        update: jest.fn(() => {}),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioController],
      providers: [PortfolioService, ApiServiceProvider],
    }).compile();

    controller = module.get<PortfolioController>(PortfolioController);
    spyPortfolioService = module.get<PortfolioService>(PortfolioService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findOne method to get a portfolio by id', async () => {
    const fakeId = '7339a668-b10a-4e91-af8e-c1078555e863'
    await controller.findOne(fakeId)
    expect(spyPortfolioService.findOne).toHaveBeenCalled()
 })

  it('should call updated method to updated a portfolio', async () => {
    const fakeId = '7339a668-b10a-4e91-af8e-c1078555e863'
    const portfolioDto = new UpdatePortfolioDto();
    await controller.update(fakeId, portfolioDto)
    expect(spyPortfolioService.update).toHaveBeenCalled()
    expect(spyPortfolioService.update).toHaveBeenCalledWith(fakeId, portfolioDto)
  })


});
