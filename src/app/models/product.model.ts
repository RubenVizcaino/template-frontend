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
  createdAt: string;  // o Date, depende de cómo quieras manejar fechas
  updatedAt: string;  // o Date
}