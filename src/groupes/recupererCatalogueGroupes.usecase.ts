import { GroupeRepository } from '@/groupes/ports/groupe.repository';
import { GroupeCataloguePresenter } from '@/groupes/ports/groupeCatalogue.presenter';
export interface GroupeCatalogue {
  id: string;
  titre: string;
  description: string;
  estMembre: boolean;
  thematiques: string[];
  nombreMembres: number;
  icon: string;
}
export class RecupererCatalogueGroupesUseCase {
  constructor(private groupeRepository: GroupeRepository) {}
  async execute(utilisateurId: string, presenter: GroupeCataloguePresenter): Promise<void> {
    const groupes = await this.groupeRepository.recupererCatalogueGroupes(utilisateurId);
    presenter.present(groupes);
  }
}
