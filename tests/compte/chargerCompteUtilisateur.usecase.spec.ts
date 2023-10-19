import {
  CompteUtilisateurPresenterImpl,
  CompteUtlisateurViewModel,
} from '@/compte/adapters/compteUtilisateur.presenter.impl';
import { ChargerCompteUtilisateurUsecase } from '@/compte/chargerCompteUtilisateur.usecase';
import {
  CompteUtilisateur,
  CompteUtilisateurACreer,
  CompteUtilisateurRepository,
} from '@/compte/ports/compteUtilisateur.repository';

class ChargeCompteUtilisateurSansInfosOptionnellesRepository implements CompteUtilisateurRepository {
  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    return Promise.resolve({
      nom: 'Doe',
      id: '1',
      mail: '',
      codePostal: '',
      prenom: 'John',
      revenuFiscal: '',
    });
  }

  mettreAjour(compteUtilisateur: CompteUtilisateur) {}

  creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteUtilisateur> {
    throw Error;
  }

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    throw Error;
  }

  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void> {
    throw Error();
  }

  validerCompteUtilisateur(email: string, code: string): Promise<CompteUtilisateur> {
    throw Error();
  }
}

class ChargeCompteUtilisateurAvecMailRepository implements CompteUtilisateurRepository {
  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    return Promise.resolve({
      nom: 'Doe',
      id: '1',
      mail: 'mail@exemple.com',
      codePostal: '75000',
      prenom: 'John',
      revenuFiscal: '',
    });
  }

  mettreAjour(compteUtilisateur: CompteUtilisateur) {}

  creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteUtilisateur> {
    throw Error;
  }

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    throw Error;
  }

  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void> {
    throw Error();
  }
}
describe('Fichier de tests concernant le chargement du compte utilisateur', () => {
  it('Compte utilisateur sans email', async () => {
    // GIVEN
    // WHEN
    const usecase = new ChargerCompteUtilisateurUsecase(new ChargeCompteUtilisateurSansInfosOptionnellesRepository());
    await usecase.execute('1', new CompteUtilisateurPresenterImpl(expectation));
    // THEN
    function expectation(compteUtilisateurViewModel: CompteUtlisateurViewModel) {
      expect(compteUtilisateurViewModel).toStrictEqual<CompteUtlisateurViewModel>({
        id: '1',
        nom: 'Doe',
        mail: '',
        codePostal: '',
        prenom: 'John',
        revenuFiscal: '',
      });
    }
  });
  it('Compte utilisateur avec email', async () => {
    // GIVEN
    // WHEN
    const usecase = new ChargerCompteUtilisateurUsecase(new ChargeCompteUtilisateurAvecMailRepository());
    await usecase.execute('1', new CompteUtilisateurPresenterImpl(expectation));
    // THEN
    function expectation(compteUtilisateurViewModel: CompteUtlisateurViewModel) {
      expect(compteUtilisateurViewModel).toStrictEqual<CompteUtlisateurViewModel>({
        id: '1',
        nom: 'Doe',
        mail: 'mail@exemple.com',
        codePostal: '75000',
        prenom: 'John',
        revenuFiscal: '',
      });
    }
  });
});
