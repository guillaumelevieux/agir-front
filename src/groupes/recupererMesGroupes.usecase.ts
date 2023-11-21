import { GroupePresenter } from '@/groupes/ports/groupe.presenter';
import { GroupeRepository } from '@/groupes/ports/groupe.repository';

export interface Groupe {
  id: string;
  titre: string;
  description: string;
  estMembre: boolean;
  thematiques: string[];
  nombreMembres: number;
  icon: string;
}

export class RecupererMesGroupesUsecase {
  constructor(private groupeRepository: GroupeRepository) {}

  public async execute(utilisateurId: string, presenter: GroupePresenter) {
    const groupes = await this.groupeRepository.recupererMesGroupes(utilisateurId);
    presenter.present(groupes);
  }
}
