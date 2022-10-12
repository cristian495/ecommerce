export type ProductType = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  image: Array<any>;
  name: string;
  price: number;
  slug: Slug;
  details: String;
};

export type Slug = {
  current: String;
};
