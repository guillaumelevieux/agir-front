//import { Groupe } from '@/groupes/recupererGroupeActifs.usecase';
import { GroupeCatalogue } from '@/groupes/recupererCatalogueGroupes.usecase';

export interface GroupeRepository {
  recupererMesGroupes(utilisateurId: string): Promise<GroupeCatalogue[]>;
  recupererCatalogueGroupes(utilisateurId: string): Promise<GroupeCatalogue[]>;
  quitterGroupeActif(utilisateurId, groupeId): Promise<void>;
  joindreGroupeActif(utilisateurId, groupeId): Promise<void>;
}
