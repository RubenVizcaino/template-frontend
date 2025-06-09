export type Category = 'GRANO' | 'MOLIDO' | 'CAPSULAS';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  stock: number;
  imageUrl: string;
  category: Category;
  createdAt: string; 
  updatedAt: string;
}