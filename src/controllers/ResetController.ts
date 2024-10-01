import { Model } from "../models/Model";

export class ResetController {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  reset(): void {
    this.model.resetGrid();  
    this.model.clearSelection(); 
  }
}
