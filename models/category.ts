export default class Category {
  id: string;
  title: string;
  color: string;
  image: any; // Using 'any' type for image to allow require() syntax

  constructor(id: string, title: string, color: string, image: any) {
    this.id = id;
    this.title = title;
    this.color = color;
    this.image = image;
  }
}