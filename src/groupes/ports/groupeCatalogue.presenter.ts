import { GroupeCatalogue } from '@/groupes/recupererCatalogueGroupes.usecase';

export interface GroupeCataloguePresenter {
  present(services: GroupeCatalogue[]): void;
}
