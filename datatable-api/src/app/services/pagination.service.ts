import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { FastifyRequest } from 'fastify';

@Injectable()
export class PaginationService<T> {
  constructor(@Inject(REQUEST) private readonly request: FastifyRequest) {}

  async paginate(count: number, take: number, results: T[]) {
    const protocol = this.request.protocol;
    const host = this.request.hostname;
    const originalUrl = this.request.originalUrl;
    const fullUrl = new URL(`${protocol}://${host}${originalUrl}`);

    const currentPageString = fullUrl.searchParams.get('page');

    const currentPage = currentPageString ? parseInt(currentPageString) : 1;
    const nextPage = currentPage * take >= count ? null : currentPage + 1;
    const previousPage = currentPage === 1 ? null : currentPage - 1;

    const nextUrl =
      currentPage * take >= count
        ? null
        : new URL(`${protocol}://${host}${originalUrl}`);

    if (nextUrl) {
      nextUrl.searchParams.set('page', nextPage.toString());
    }

    const previousUrl =
      currentPage === 1 ? null : new URL(`${protocol}://${host}${originalUrl}`);

    if (previousUrl) {
      previousUrl.searchParams.set('page', previousPage.toString());
    }

    return {
      count,
      next: nextUrl ? nextUrl.toString() : null,
      previous: previousUrl ? previousUrl.toString() : null,
      results,
    };
  }
}
