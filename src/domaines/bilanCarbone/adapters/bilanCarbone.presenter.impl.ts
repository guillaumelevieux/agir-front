import { BilanCarbonePresenter } from '@/domaines/bilanCarbone/ports/bilanCarbone.presenter';
import { BilanCompletCarbone, BilanPartielCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

interface BilanCarbonDetailItemViewModel {
  label: string;
  emoji: string;
  impactKgAnnuel: {
    valeur: string;
    unite: string;
  };
  pourcentage: number;
}
interface BilanCarboneDetailViewModel extends BilanCarbonDetailItemViewModel {
  details: BilanCarbonDetailItemViewModel[];
}

export interface BilanCarboneViewModelBase {
  titre: string;
}
export interface BilanCarboneCompletViewModel extends BilanCarboneViewModelBase {
  impactKgAnnuel: {
    valeur: string;
    unite: string;
  };
  impactKgHebdomadaire: {
    valeur: string;
    unite: string;
  };
  univers: BilanCarboneDetailViewModel[];
  top3: {
    label: string;
    emoji: string;
    pourcentage: string;
  }[];
}

interface BilanCarbonePartielTagViewModel {
  wording: string;
  classes: string;
}

export interface BilanCarbonePartielViewModel extends BilanCarboneViewModelBase {
  pourcentageCompletionTotal: number;
  categories: {
    label: string;
    tag: BilanCarbonePartielTagViewModel;
    progressBarStyle: string;
  }[];

  universBilan: {
    contentId: string;
    label: string;
    urlImage: string;
    estTermine: boolean;
    pourcentageProgression: number;
    nombreTotalDeQuestion: number;
    nomDeLunivers: string;
  }[];
}

export class BilanCarbonePresenterImpl implements BilanCarbonePresenter {
  constructor(
    private readonly bilanCarboneViewModel: (viewModel: BilanCarboneCompletViewModel) => void,
    private readonly bilanCarbonePartielViewModel: (viewModel: BilanCarbonePartielViewModel) => void,
  ) {}

  presenteBilanComplet(bilanCarbone: BilanCompletCarbone): void {
    const NOMBRE_SEMAINES_PAR_AN = 52;

    this.bilanCarboneViewModel({
      titre: 'Mon bilan <span class="text--bleu">environnemental</span>',
      impactKgAnnuel: this.formateKg(bilanCarbone.impactKgAnnuel),
      impactKgHebdomadaire: this.formateKg(bilanCarbone.impactKgAnnuel / NOMBRE_SEMAINES_PAR_AN),
      univers: bilanCarbone.univers.map(univers => ({
        label: univers.universLabel,
        impactKgAnnuel: this.formateKg(univers.impactKgAnnuel),
        pourcentage: univers.pourcentage,
        emoji: univers.emoji,
        details: univers.details.map(detail => ({
          emoji: detail.emoji,
          label: detail.label,
          impactKgAnnuel: this.formateKg(detail.impactKgAnnuel),
          pourcentage: detail.pourcentage,
        })),
      })),
      top3: bilanCarbone.top3.map(top3 => ({
        emoji: top3.emoji,
        label: top3.label,
        pourcentage: top3.pourcentage,
      })),
    });
  }

  private formateKg(nombreDeKg: number): { valeur: string; unite: string } {
    return nombreDeKg >= 1000
      ? {
          valeur: `${(nombreDeKg / 1000).toFixed(1)}`,
          unite: 'tonnes',
        }
      : {
          valeur: `${nombreDeKg.toFixed(0)} `,
          unite: 'kg',
        };
  }

  presenteBilanPartiel(bilan: BilanPartielCarbone): void {
    const mapUnivers: Map<number, string> = new Map([
      [0, 'transports'],
      [1, 'alimentation'],
      [2, 'logement'],
      [3, 'consommation'],
    ]);
    this.bilanCarbonePartielViewModel({
      titre: 'Estimez mon <span class="text--bleu">bilan environnemental</span>',
      pourcentageCompletionTotal: bilan.pourcentageCompletionTotal,
      categories: [
        {
          label: '🚙 Transports',
          tag: this.determineTag(bilan.transport.niveau),
          progressBarStyle: this.determineProgressBar(bilan.transport.niveau),
        },
        {
          label: '🥘 Alimentation',
          tag: this.determineTag(bilan.alimentation.niveau),
          progressBarStyle: this.determineProgressBar(bilan.alimentation.niveau),
        },
        {
          label: '🏡 Logement',
          tag: this.determineTag(bilan.logement.niveau),
          progressBarStyle: this.determineProgressBar(bilan.logement.niveau),
        },
        {
          label: '🛍 Consommation',
          tag: this.determineTag(bilan.consommation.niveau),
          progressBarStyle: this.determineProgressBar(bilan.consommation.niveau),
        },
      ],
      universBilan: bilan.universBilan.map((univers, index) => ({
        nomDeLunivers: mapUnivers.get(index) || '',
        contentId: univers.contentId,
        label: univers.label,
        urlImage: univers.urlImage,
        estTermine: univers.estTermine,
        pourcentageProgression: univers.pourcentageProgression,
        nombreTotalDeQuestion: univers.nombreTotalDeQuestion,
      })),
    });
  }

  private determineProgressBar(niveau: 'moyen' | 'faible' | 'fort' | 'tres_fort'): string {
    switch (niveau) {
      case 'moyen':
        return 'progress-bar-impact-moyen';
      case 'faible':
        return 'progress-bar-impact-faible';
      case 'fort':
        return 'progress-bar-impact-fort';
      case 'tres_fort':
        return 'progress-bar-impact-tres-fort';
    }
  }

  private determineTag(niveau: 'moyen' | 'faible' | 'fort' | 'tres_fort'): BilanCarbonePartielTagViewModel {
    switch (niveau) {
      case 'moyen':
        return {
          wording: 'Moyen',
          classes: 'tag-impact-moyen',
        };
      case 'faible':
        return {
          wording: 'Faible',
          classes: 'tag-impact-faible',
        };
      case 'fort':
        return {
          wording: 'Fort',
          classes: 'tag-impact-fort',
        };
      case 'tres_fort':
        return {
          wording: 'Très fort',
          classes: 'tag-impact-tres-fort',
        };
    }
  }
}
