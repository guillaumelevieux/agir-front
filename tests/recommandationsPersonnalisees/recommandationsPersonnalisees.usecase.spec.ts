import { RecommandationsPersonnaliseesUsecase } from '@/recommandationsPersonnalisees/recommandationsPersonnalisees.usecase';
import {
  RecommandationPersonnaliseeViewModel,
  RecommandationsPersonnaliseesPresenterImpl,
} from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';
import { MockRecommandationsPersonnaliseesRepository } from './adapters/recommandationsPersonnalisees.repository.mock';

describe('Fichier de tests concernant le chargement des recommandations personnalisees', () => {
  it('En donnant un id utilisateur doit charger et mettre en forme les recommandations personnalisées suivant leur type', async () => {
    // GIVEN
    const usecase = new RecommandationsPersonnaliseesUsecase(new MockRecommandationsPersonnaliseesRepository());

    // WHEN
    await usecase.execute('1', new RecommandationsPersonnaliseesPresenterImpl(expectation));

    // THEN
    function expectation(recommandationsPersonnaliseesViewModel: RecommandationPersonnaliseeViewModel) {
      expect(recommandationsPersonnaliseesViewModel).toStrictEqual<RecommandationPersonnaliseeViewModel>({
        defisList: [
          {
            bouton: {
              libelle: 'Faire le suivi',
              style: 'fr-btn--icon-left fr-icon-check-line',
              url: '/defi/1',
            },
            contentId: '1',
            image: '/reco_defi.jpg',
            joursRestants: 'Plus que 7 jours',
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            thematique: '🌍 Global',
            titre: 'Un défi',
            type: {
              libelle: 'Action',
              style: 'background--bleu-ecume-hover',
            },
          },
          {
            bouton: {
              libelle: 'Relever le défi',
              style: 'fr-btn--icon-left fr-icon-check-line',
              url: '/defi/1',
            },
            contentId: '1',
            image: '/reco_defi.jpg',
            joursRestants: null,
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            thematique: '🌍 Global',
            titre: 'Un autre défi',
            type: {
              libelle: 'Action',
              style: 'background--bleu-ecume-hover',
            },
          },
        ],
        recommandationsList: [
          {
            bouton: {
              libelle: 'Répondre au quiz',
              style: 'fr-btn--secondary fr-btn--icon-left fr-icon-question-line',
              url: '/agir/quiz/2',
            },
            contentId: '2',
            image: 'illustrationURL',
            joursRestants: null,
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            thematique: '🚲 Transports',
            titre: 'Premier Quiz',
            type: {
              libelle: 'Quiz',
              style: 'background--vert--bourgeon',
            },
          },
          {
            bouton: {
              libelle: "Lire l'article",
              style: 'fr-btn--secondary fr-btn--icon-left fr-icon-newspaper-line',
              url: '/article/article-qui-doit-etre-en-avant/2',
            },
            contentId: '2',
            image: 'illustrationURL',
            joursRestants: null,
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            thematique: '🌍 Global',
            titre: 'Article qui doit être en avant',
            type: {
              libelle: 'Article',
              style: 'background--caramel',
            },
          },
          {
            bouton: {
              libelle: "Simuler l'aide",
              style: 'fr-btn--secondary',
              url: '/vos-aides/',
            },
            contentId: '1',
            image: 'illustrationURL',
            joursRestants: null,
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            thematique: '🌍 Global',
            titre: 'Aide vélo',
            type: {
              libelle: 'Aide',
              style: 'background--yellow',
            },
          },
          {
            bouton: {
              libelle: 'Répondre à la question',
              style: 'fr-btn--icon-left fr-icon-arrow-right-line',
              url: '/kyc/1',
            },
            contentId: '1',
            image: '/ic_kyc.svg',
            joursRestants: null,
            nombreDePointsAGagner: 'nombreDePointsAGagner',
            thematique: '🌍 Global',
            titre: 'Un KYC',
            type: {
              libelle: 'Mieux vous connaître',
              style: 'background--pink',
            },
          },
        ],
      });
    }
  });
});
