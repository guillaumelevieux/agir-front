import { EvaluerEmpreintePresenter } from "@/empreinte/ports/evaluerEmpreinte.presenter.ts";

export interface EvaluerEmpreinteViewModel {
  resultat: string;
}
export class EvaluerEmpreintePresenterImpl implements EvaluerEmpreintePresenter {
  private _evaluerEmpreinteViewModel: (viewModel: EvaluerEmpreinteViewModel) => void;
  constructor(evaluerEmpreinteViewModel: (viewModel: EvaluerEmpreinteViewModel) => void) {
    this._evaluerEmpreinteViewModel = evaluerEmpreinteViewModel;
  }
  presente(succes: boolean): void {
    this._evaluerEmpreinteViewModel({
      resultat: succes ? "Bravo" : "Perdu",
    });
  }
}
