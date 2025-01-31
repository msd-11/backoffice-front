export type ProductListResponse = {
  statusCode: number;
  data: Product[];
};

export type ProductResponse = {
  statusCode: number;
  data: Product;
};

export type Product = {
  id: number;
  manufacturer: string;
  name: string;
  description: string;
  price: number;
  images: {
    path: string;
    order: number;
  }[];
  categories: {
    id: number;
    name: string;
  }[];
  stock: number;
  createdAt: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  status: string;
};

export type CategoriesListResponse = {
  statusCode: number;
  data: Category[];
};

export type Category = {
  id: number;
  name: string;
};

export type Stock = {
  id: number;
  stock: number;
};

export type ProductStockResponse = {
  statusCode: number;
  data: Stock[];
};

export type ProductItem = {
  id: number;
  product: number;
  reference: string;
  qrcode: string;
};

export type ProductItemListResponse = {
  statusCode: number;
  data: ProductItem[];
};

export type ProductItemResponse = {
  status: number;
  data: ProductItem;
};
