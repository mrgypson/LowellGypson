import { MEMORIAL_PAGE_DOC_ID } from './constants';

export const memorialPageQuery = `*[_type == "memorialPage" && _id == $id][0]{
  headline,
  lifeDates,
  epitaph,
  videoProvider,
  videoId,
  portrait{
    alt,
    asset
  },
  obituary,
  seoDescription
}`;

export const approvedTributesQuery = `*[_type == "tribute" && status == "approved"] | order(submittedAt desc){
  _id,
  authorName,
  relationship,
  message,
  submittedAt
}`;

export const memorialPhotosQuery = `*[_type == "memorialPhoto"] | order(sortOrder asc, _createdAt asc){
  _id,
  caption,
  image{
    alt,
    asset
  },
  sortOrder
}`;

export const MEMORIAL_PAGE_ID = MEMORIAL_PAGE_DOC_ID;
