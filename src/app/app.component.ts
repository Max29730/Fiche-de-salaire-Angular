import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'salaire';

  nom = ""
  statut = 0
  heures = 0
  taux = 0
  base = 0
  newtaux = 0
  maj = 0

  statutTaux() {
    if (this.statut == 1) {
      this.taux = 15
    }

    if (this.statut == 2) {
      this.taux = 12.5
    }

    if (this.statut == 3) {
      this.taux = 10
    }
    console.log(this.taux)
  }

  calculBase() {

    if (this.heures <= 169) {
      this.base = this.heures * this.taux
    }
    if (this.heures > 169) {
      this.maj = this.taux / 2;
      this.newtaux = this.taux + this.maj;
      this.base = this.heures * this.newtaux;
      console.log(this.taux);
      console.log(this.newtaux);
    }
    if (this.heures > 180) {
      this.newtaux = this.taux + (this.taux * 0.6)
      this.base = this.heures * this.newtaux
      console.log(this.newtaux)
    }

    this.calculCotis()

  }

  detteSoc = 0
  contriSoc = 0
  assMal = 0
  assViell = 0
  assChom = 0
  retrComp = 0
  cortisAGFF = 0
  totalCotis = 0

  calculCotis() {
    this.detteSoc = this.base * 0.0349
    this.contriSoc = this.base * 0.0615
    this.assMal = this.base * 0.0095
    this.assViell = this.base * 0.0844
    this.assChom = this.base * 0.0305
    this.retrComp = this.base * 0.0381
    this.cortisAGFF = this.base * 0.0102

    this.totalCotis = this.detteSoc + this.contriSoc + this.assMal + this.assViell + this.assChom + this.retrComp + this.cortisAGFF

  }

  enfant = 0
  prime = 0

  calculPrime() {
    if (this.enfant == 0) {
      this.prime = 0
    }
    if (this.enfant == 1) {
      this.prime = 20
    }
    if (this.enfant == 2) {
      this.prime = 50
    }
    if (this.enfant > 2) {
      this.prime = 70 + 20 * (this.enfant - 2)
    }

  }
  TTC = 0
  calculTotal() {
    this.TTC = this.base - this.totalCotis + this.prime
  }
}
