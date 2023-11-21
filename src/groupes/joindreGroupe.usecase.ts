import { GroupeRepository } from '@/groupes/ports/groupe.repository';
import { GroupeEvent, GroupeEventBus } from '@/groupes/groupeEventBusImpl';

export class JoindreGroupeUsecase {
  constructor(private groupeRepository: GroupeRepository, private groupeEventBus: GroupeEventBus) {}
  async execute(utilisateurId, groupeId) {
    await this.groupeRepository.joindreGroupeActif(utilisateurId, groupeId);
    this.groupeEventBus.publish(GroupeEvent.GROUPE_INSTALLE);
  }
}
