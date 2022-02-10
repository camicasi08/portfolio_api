
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { CreatePortfolioDto } from 'src/modules/portfolio/dto/create-portfolio.dto';
import { UpdatePortfolioDto } from 'src/modules/portfolio/dto/update-portfolio.dto';
import { v4 as uuid } from 'uuid';

let dynamoDB;
if (process.env.IS_OFFLINE === 'true') {
    console.log("HERE!")
  dynamoDB = new AWS.DynamoDB.DocumentClient({
    accessKeyId: 'fake',
    secretAccessKey: 'fake2',
    region: 'localhost',
    endpoint: process.env.DYNAMODB_ENDPOINT,
});
} else {
  dynamoDB = new AWS.DynamoDB.DocumentClient();
}

export class PortfolioRepository{
    constructor(){}
    
    async createPortfolio(createPortfolioDto: CreatePortfolioDto){
        const newPortfolio = {
            id: uuid(),
            ...createPortfolioDto   
        };

        try {
            await dynamoDB
                .put({
                    TableName: process.env.TABLE_NAME,
                    Item: newPortfolio,
                })
                .promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return { ok: true, data: newPortfolio };
    }

    async updatePortfolio(id: string, updatePortfolioDto: UpdatePortfolioDto){

        let portfolio;
        try{
            await this.getPortfolioById(id)
            const params = this.buildUpdateParams(id, updatePortfolioDto)
            const result = await dynamoDB.update(params).promise()
            portfolio = result
            
            
        }catch(error){
            throw new InternalServerErrorException(error);
        }

        return {ok: true};
  
    } 

    buildUpdateParams(id:string, updatePortfolioDto: UpdatePortfolioDto){
        const params = {
            TableName: process.env.TABLE_NAME,
            Key:{id},
            UpdateExpression: {},
            ExpressionAttributeValues:{}
        }

        let setStament = 'set '
        Object.keys(updatePortfolioDto).forEach((key, index)=> {
            const variable = `:a${index}`
            if(index == Object.keys(updatePortfolioDto).length-1){
                setStament += `${key} = ${variable}`
            }else{
                setStament += `${key} = ${variable}, `
            }
            params['ExpressionAttributeValues'][variable] = updatePortfolioDto[key]
        })
        params.UpdateExpression = setStament;
        return params;

    }


    async getPortfolioById(id:string){
        let portfolio;
        
        try {
            
            const result = await dynamoDB
                .get({
                    TableName: process.env.TABLE_NAME,
                    Key: { id },
                })
                .promise();

            portfolio = result.Item;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!portfolio) {
            throw new NotFoundException(`Portfolio with ID "${id}" not found`);
        }

        return portfolio;
    }
}