import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({data: createArticleDto})
  }

  findAll() {
    return this.prisma.article.findMany({
      where: {
        published: true,
      },
    });
  }

  findAllDrafts(){
    return this.prisma.article.findMany({where : {published: false}})
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({where: {id}})

    if(!article){
      throw new NotFoundException(`Article with id ${id} not found`)
    }

    return article
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: {id},
      data: updateArticleDto
    })
  }

  remove(id: number) {
    return this.prisma.article.delete({
      where: {id}
    })
  }
}
