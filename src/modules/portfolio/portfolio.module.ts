import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { PortfolioRepository } from '../../repositories/portfolio.repository';
import { TwitterService } from '../twitter/twitter.service';

@Module({
  controllers: [PortfolioController],
  providers: [PortfolioService, PortfolioRepository, TwitterService]
})
export class PortfolioModule {}
