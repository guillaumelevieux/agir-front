import { GroupeRepository } from '@/groupes/ports/groupe.repository';
//import { Groupe } from '@/groupes/recupererGroupeActifs.usecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';
import { GroupeCatalogue } from '@/groupes/recupererCatalogueGroupes.usecase';

/*interface GroupeApiModel {
  label: string;
  url: string;
  is_url_externe: boolean;
}*/
interface GroupeCatalogueApiModel {
  id: string;
  name: string;
  thematiques: string[];
  nombreMembres: number; // nombre de membres
  icon_url: string; // image du groupe
  estMembre: boolean; // est-ce que l'utilisateur est membre du groupe
  description: string; // description du groupe
}
export class GroupeRepositoryAxios implements GroupeRepository {
  @intercept401()
  // back ok
  async recupererMesGroupes(utilisateurId: string): Promise<GroupeCatalogue[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.get<GroupeCatalogueApiModel[]>(`/utilisateurs/${utilisateurId}/groupes`);
    return reponse.data.map(groupe => ({
      id: groupe.id,
      titre: groupe.name,
      icon: groupe.icon_url,
      description: groupe.description,
      estMembre: groupe?.estMembre || false,
      nombreMembres: groupe?.nombreMembres || 0,
      thematiques: groupe?.thematiques || [],
    }));
  }

  // back ok
  @intercept401()
  async recupererCatalogueGroupes(utilisateurId: string): Promise<GroupeCatalogue[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const reponse = await axiosInstance.get<GroupeCatalogueApiModel[]>(`/groupes?utilisateurId=${utilisateurId}`);
    return reponse.data.map(groupe => ({
      id: groupe.id,
      titre: groupe.name,
      icon: groupe.icon_url,
      description: groupe.description,
      estMembre: groupe?.estMembre || false,
      nombreMembres: groupe?.nombreMembres || 0,
      thematiques: groupe?.thematiques || [],
    }));
  }

  // back ok
  @intercept401()
  async quitterGroupeActif(utilisateurId: string, groupeId: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.delete(`/utilisateurs/${utilisateurId}/groupes/${groupeId}`);
  }

  // back ok
  @intercept401()
  async joindreGroupeActif(utilisateurId: string, groupeId: string): Promise<void> {
    const axiosInstance = AxiosFactory.getAxios();
    await axiosInstance.post(`/utilisateurs/${utilisateurId}/groupes/${groupeId}`);
  }
}
