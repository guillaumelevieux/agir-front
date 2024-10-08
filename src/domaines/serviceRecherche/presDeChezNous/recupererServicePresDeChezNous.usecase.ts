import { ServiceRechercheBase } from '@/domaines/serviceRecherche/catalogue/serviceRecherche';
import { ServiceRecherchePresDeChezNousPresenter } from '@/domaines/serviceRecherche/presDeChezNous/ports/serviceRecherchePresDeChezNous.presenter';
import { ServiceRecherchePresDeChezNousRepository } from '@/domaines/serviceRecherche/presDeChezNous/ports/serviceRecherchePresDeChezNous.repository';

interface ServiceRecherchePresDeChezNousResultat {
  id: string;
  titre: string;
  adresse?: string;
  nombreMiseEnFavoris: number;
  image: string;
  distance?: number;
}

export interface ServiceRecherchePresDeChezNous extends ServiceRechercheBase {
  titre: string;
  suggestions: ServiceRecherchePresDeChezNousResultat[];
  favoris?: ServiceRecherchePresDeChezNousResultat[];
  estEnErreur: boolean;
}

export class RecupererServicePresDeChezNousUsecase {
  constructor(private serviceRecherchePresDeChezNousRepository: ServiceRecherchePresDeChezNousRepository) {}

  async execute(
    idUtilisateur: string,
    idService: string,
    recupererServiceRecherchePresDeChezNousPresenter: ServiceRecherchePresDeChezNousPresenter,
  ) {
    const service = await this.serviceRecherchePresDeChezNousRepository.recupererService(idUtilisateur, idService);
    if (service.estEnErreur) {
      recupererServiceRecherchePresDeChezNousPresenter.presenteErreur();
    } else {
      recupererServiceRecherchePresDeChezNousPresenter.presente(service);
    }
  }
}
