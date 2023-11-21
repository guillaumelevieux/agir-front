import { Groupe } from '@/groupes/recupererMesGroupes.usecase';

export interface GroupePresenter {
  present(services: Groupe[]): void;
}
