import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() item: any;
  @Input() rating: number = 3; // Avaliação inicial (de 1 a 5)
  @Input() maxRating: number = 5; // Número máximo de estrelas

  // Função para alterar o rating ao passar o mouse
  setRating(rating: number) {
    this.rating = rating;
    if(this.item)
      this.item.rate = rating;
  }

  // Função para marcar uma estrela como selecionada ou não
  getStarClass(star: number): string {
    return star <= this.rating ? 'filled' : 'empty';
  }
}
