import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  pdfSrc = "../../../assets/images/instructions.pdf";
  displayMenu = false

  constructor() { }

  ngOnInit(): void {
  }

}
