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
  newtaux2 = 0
  maj = 0
  heuresup = 0
  heuresup2 = 0


  afficheInfo() {
    let descri = document.getElementById("descri")
    descri?.classList.replace("d-none", "d-block")
  }

  hideInfo() {
    let descri = document.getElementById("descri")
    descri?.classList.replace("d-block", "d-none")
  }

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
    if (this.heures > 0) {
      if (this.heures <= 169) {
        this.base = this.heures * this.taux
      }
      if (this.heures > 169) {
        this.heuresup = this.heures - 169;
        this.maj = this.taux / 2;
        this.newtaux = this.taux + this.maj;
        if (this.heures > 180) {
          this.heuresup = 11;
          this.heuresup2 = this.heures - 180;
          this.newtaux2 = this.taux + (this.taux * 0.6)
        }
        this.base = ((this.heures - this.heuresup) * this.taux) + (this.heuresup * this.newtaux) + (this.heuresup2 * this.newtaux2);
      }
      this.calculCotis()
    }
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
    let factor = 10**2
    this.detteSoc = Math.round((this.base * 0.0349) *factor)/(factor)
    this.contriSoc = Math.round((this.base * 0.0615) *factor)/(factor)
    this.assMal = Math.round((this.base * 0.0095) *factor)/(factor)
    this.assViell = Math.round((this.base * 0.0102) *factor)/(factor)
    this.assChom = Math.round((this.base * 0.0305) *factor)/(factor)
    this.retrComp = Math.round((this.base * 0.0381) *factor)/(factor)
    this.cortisAGFF = Math.round((this.base * 0.0102) *factor)/(factor)

    this.totalCotis = Math.round((this.detteSoc + this.contriSoc + this.assMal + this.assViell + this.assChom + this.retrComp + this.cortisAGFF) * factor) / factor;
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
    let factor = 10**2
    this.TTC = Math.round((this.base - this.totalCotis + this.prime) * factor) / factor
  }
}
