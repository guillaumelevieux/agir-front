import {
  ServiceRechercheRecettesPresenterImpl,
  ServiceRechercheRecettesViewModel,
} from '../../../src/domaines/serviceRecherche/recettes/adapters/serviceRechercheRecettes.presenter.impl';
import { RecupererServiceRecettesUsecase } from '../../../src/domaines/serviceRecherche/recettes/recupererServiceRecettes.usecase';
import { ServiceRechercheRecettesMock } from './adapters/serviceRechercheRecettes.repository.mock';
import { RouteServiceName } from '../../../src/router/services/routes';
import { expect, describe, it } from 'vitest';
describe('Fichier de tests concernant le service Recettes', () => {
  it("en donnant l'id d'un utilisateur et un type de catégorie, renvoie les recettes associées", async () => {
    // GIVEN
    const usecase = new RecupererServiceRecettesUsecase(
      ServiceRechercheRecettesMock.avecServiceARetourner({
        suggestions: [
          {
            id: 'id1',
            titre: 'Tian de sardines',
            difficulte: 'Intérmédiaire',
            img: '',
            nombreFavoris: 12,
            tempsDePreparation: 30,
            typeDePlat: 'Plat principal',
          },
          {
            id: 'id2',
            titre: 'Tiramissu',
            typeDePlat: 'Dessert',
            nombreFavoris: 2,
            img: '',
            tempsDePreparation: 20,
            difficulte: 'Facile',
          },
        ],
        favoris: [
          {
            id: 'id3',
            titre: 'Salade crevettes au curry',
            typeDePlat: 'Entrée',
            nombreFavoris: 8,
            img: '',
            tempsDePreparation: 15,
            difficulte: 'Avancé',
          },
        ],
        categories: [
          { code: 'code1', label: 'label1', estLaCategorieParDefaut: true },
          { code: 'code2', label: 'label2', estLaCategorieParDefaut: false },
        ],
      }),
    );

    // WHEN
    await usecase.execute('idUtilisateur', 'idService', new ServiceRechercheRecettesPresenterImpl(expectation));

    // THEN
    function expectation(serviceRechercheRecettesViewModel: ServiceRechercheRecettesViewModel) {
      expect(serviceRechercheRecettesViewModel).toStrictEqual<ServiceRechercheRecettesViewModel>({
        suggestions: [
          {
            id: 'id1',
            titre: 'Tian de sardines',
            description: 'Plat principal',
            nombreMiseEnFavoris: 12,
            img: '',
            information: '30 min',
            tag: {
              label: 'Intermédiaire',
              style: 'background--bleu-ecume-hover',
            },
            to: {
              name: RouteServiceName.RECETTES_DETAIL,
              params: { id: 'id1' },
            },
          },
          {
            id: 'id2',
            titre: 'Tiramissu',
            description: 'Dessert',
            nombreMiseEnFavoris: 2,
            img: '',
            information: '20 min',
            tag: {
              label: 'Facile',
              style: 'background--vert-bourgeon',
            },
            to: {
              name: RouteServiceName.RECETTES_DETAIL,
              params: { id: 'id2' },
            },
          },
        ],
        favoris: [
          {
            id: 'id3',
            description: 'Entrée',
            img: '',
            information: '15 min',
            nombreMiseEnFavoris: 8,
            tag: {
              label: 'Avancé',
              style: 'background--glycine',
            },
            titre: 'Salade crevettes au curry',
            to: {
              name: RouteServiceName.RECETTES_DETAIL,
              params: { id: 'id3' },
            },
          },
        ],
        aside: {
          nom: 'La fabrique à Menus',
          description: 'Pour vous aider jour après jour à manger varié et équilibré.',
          url: 'https://www.mangerbouger.fr/manger-mieux/la-fabrique-a-menus/',
          logo: '/service-recettes-logo.png',
          screenshot: '/service-recettes.jpg',
        },
        categories: [
          { code: 'code1', label: 'label1', estLaCategorieParDefaut: true },
          { code: 'code2', label: 'label2', estLaCategorieParDefaut: false },
        ],
      });
    }
  });
});
