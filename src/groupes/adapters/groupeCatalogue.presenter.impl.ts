import { GroupeCataloguePresenter } from '@/groupes/ports/groupeCatalogue.presenter';
import { GroupeCatalogue } from '@/groupes/recupererCatalogueGroupes.usecase';

export interface GroupeCatalogueViewModel {
  catalogue: GroupeCatalogueViewModelItem[];
  filtreThematiques: string[];
}
export interface GroupeCatalogueViewModelItem {
  id: string;
  titre: string;
  icon: string;
  description: string;
  estMembre: boolean;
  thematiques: string[];
  nombreMembres: number;
}
export class GroupeCataloguePresenterImpl implements GroupeCataloguePresenter {
  constructor(private groupeCatelogueViewModels: (services: GroupeCatalogueViewModel) => void) {}

  present(groupes: GroupeCatalogue[]): void {
    this.groupeCatelogueViewModels({
      catalogue: groupes.map(groupe => ({
        id: groupe.id,
        titre: groupe.titre,
        icon: groupe.icon,
        description: groupe.description,
        estMembre: groupe.estMembre,
        thematiques: groupe.thematiques,
        nombreMembres: groupe.nombreMembres,
      })),
      filtreThematiques: this.recupererLesThematiquesDeFaconUnique(groupes),
    });
  }

  private recupererLesThematiquesDeFaconUnique(groupes: GroupeCatalogue[]) {
    return (
      groupes
        .map(service => service.thematiques)
        .flat()
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort() || ['local', 'national']
    );
    /*return services
      .map(service => service.thematiques)
      .flat()
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();*/
  }
}
