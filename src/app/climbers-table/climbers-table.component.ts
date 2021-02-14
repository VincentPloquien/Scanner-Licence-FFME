import { Component, Input, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Climber from 'src/app/climber';

@Component({
  selector: 'app-climbers-table',
  templateUrl: './climbers-table.component.html',
  styleUrls: ['./climbers-table.component.css']
})
export class ClimbersTableComponent implements OnInit {
  manager = "";
  @Input() climbers!: Climber[];

  ngOnInit(): void {
    this.manager = localStorage.getItem("manager") || "";
  }

  resetClimbersList(): void {
    this.climbers = [];
  }

  deleteClimberFromList(climber: Climber): void {
    this.climbers.splice(this.climbers.indexOf(climber), 1);
    console.log(this.climbers);
  }

  exportTable(event: Event): void {
    event.preventDefault();
    console.log(event);

    const date = new Date();
    const nomFichier = `perm_${date.getFullYear()}-${date.getMonth()}-${date.getDay()}.pdf`;

    // Bouton du formulaire indisponible...
    // event.target.setAttribute("disabled", true);
    document?.getElementById("exportButton")?.toggleAttribute('disabled', true);

    // Sauvegarde du nom du responsable
    localStorage.setItem("manager", this.manager);

    // Création du document PDF
    const doc = new jsPDF("landscape");
    const columns = [
      { header: "NOM Prénom", dataKey: "table-name" },
      { header: "N° de licence", dataKey: "table-id" },
      { header: "Année de validité", dataKey: "table-year" },
      { header: "Club", dataKey: "table-club" },
      { header: "Date de naissance", dataKey: "table-birthdate" },
      { header: "Passeport", dataKey: "table-passport" },
    ];
    doc.text(`Liste des grimpeurs à la séance du ${date.toLocaleString()}`, 15, 10);
    doc.text(`Responsable : ${this.manager}`, 281, 10, { align: "right" });
    autoTable(doc, { html: "#climbers-table", columns: columns, theme: "grid" });
    doc.save(nomFichier);

    // Bouton du formulaire dispo
    document?.getElementById("exportButton")?.toggleAttribute('disabled', false);
  }

}
