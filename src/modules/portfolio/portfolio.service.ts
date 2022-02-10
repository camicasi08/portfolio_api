import { Injectable } from '@nestjs/common';
import { PortfolioRepository } from '../../repositories/portfolio.repository';
import { TwitterService } from '../twitter/twitter.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(private portfolioRepository: PortfolioRepository, private twitterService: TwitterService){}

  async create(createPortfolioDto: CreatePortfolioDto) {
    const createdPortfolio = await this.portfolioRepository.createPortfolio(createPortfolioDto);
    return createdPortfolio;
  }

  findAll() {
    return `This action returns all portfolio`;
  }

  async findOne(id: string) {
    const portfolio = await this.portfolioRepository.getPortfolioById(id);
    const tweets = await this.twitterService.getLastTweets(portfolio.id)
    return {
      ...portfolio,
      tweets: tweets
    };
  }

  async update(id: string, updatePortfolioDto: UpdatePortfolioDto) {
    return await this.portfolioRepository.updatePortfolio(id, updatePortfolioDto)
  }

  remove(id: number) {
    return `This action removes a #${id} portfolio`;
  }
}
