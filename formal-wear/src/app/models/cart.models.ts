export interface Cart {
    selected: unknown;
    updateMode: boolean;
    id: number;
    product_id: number;
    quantity: number;
    name: string;
    price: number;
    description: string;
    image: string;
}