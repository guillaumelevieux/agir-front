import { GroupeRepository } from '@/groupes/ports/groupe.repository';
import { GroupeEvent, GroupeEventBus } from '@/groupes/groupeEventBusImpl';

export class QuitterGroupeUsecase {
  constructor(private groupeRepository: GroupeRepository, private groupeEventBus: GroupeEventBus) {}
  async execute(utilisateurId, groupeId) {
    await this.groupeRepository.quitterGroupeActif(utilisateurId, groupeId);
    this.groupeEventBus.publish(GroupeEvent.GROUPE_SUPPRIME);
  }
}
