export interface Experience {
  id: string;
  title: string;
  description: string;
  category: "Adventure" | "Culture" | "Food" | "Wellness" | "Nature";
  destination: {
    city: string;
    country: string;
  };
  price: number;
  rating: number;
  duration: string;
  imageUrl: string;
  isFeatured: boolean;
}
