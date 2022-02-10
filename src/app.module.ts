import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwitterModule } from './modules/twitter/twitter.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { TwitterService } from './modules/twitter/twitter.service';
import { PortfolioModule } from './modules/portfolio/portfolio.module';

@Module({
  imports: [TwitterModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration]
  }), PortfolioModule],
  controllers: [AppController],
  providers: [AppService, TwitterService],
})
export class AppModule {}
