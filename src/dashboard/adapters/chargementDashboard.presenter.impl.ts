import { ChargementDashboardPresenter, DashboardViewModel } from "@/dashboard/ports/chargementDashboard.presenter.ts";
import { Dashboard } from "@/dashboard/ports/dashboardRepository.ts";

export class ChargementDashboardPresenterImpl implements ChargementDashboardPresenter {
  constructor(dashboardViewModel: (viewmModel: DashboardViewModel) => void) {
    this._dashboardViewModel = dashboardViewModel;
  }

  private _dashboardViewModel: (viewmModel: DashboardViewModel) => void;
  presenteDashboard(utilisateur: string, dashboard: Dashboard): void {
    this._dashboardViewModel({
      utilisateur,
      compteurs: dashboard.compteurs.map((compteur) => {
        return {
          consommation: compteur.valeur.toString(),
          tendancePicto: compteur.valeur > 50 ? "trend-icon--up" : "trend-icon--down",
          texte: compteur.valeur > 50 ? "Consommation en hausse" : "Consommation en baisse",
          titre: compteur.titre,
        };
      }),
      quizz: dashboard.quizz,
      empreinte: dashboard.empreinte,
      badges: dashboard.badges,
    });
  }
}
