<template>
  <FilDAriane page-courante="Groupes" :page-hierarchie="[{ label: 'Coach', url: 'coach' }]" />
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-3">
      
    </div>
    <div class="fr-col-12 fr-col-lg-9">
      <h1 class="fr-h2">Mes groupes</h1>
      <p>Rejoignez un groupe et partagez vos intérêts avec d'autres.</p>
      <div
        v-for="groupeCatalogueViewModel in groupeCatalogueViewModels.catalogue"
        :key="groupeCatalogueViewModel.id"
      >
        <div
          class="fr-p-2w fr-mb-2w background--white border border-radius--md"
        >
          <div class="fr-grid-row fr-col-12">
            <div class="fr-hidden fr-unhidden-md fr-mr-1w">
              <img class="img-icon-rounded" :src="groupeCatalogueViewModel?.icon" alt="" width="70" height="70" />
            </div>
            <div class="fr-grid-row flex-space-between flex-column fr-ml-1w fr-ml-md-0">
              <span class="fr-mb-1v fr-m-md-0 fr-text--bold fr-text--xl text--lh-1">{{
                groupeCatalogueViewModel.titre
              }}</span>
              <span class="fr-m-md-0 fr-text--xs fr-text-mention--grey fr-icon-group-line fr-icon--xs">
                {{ groupeCatalogueViewModel.nombreMembres }}
              </span>
            </div>
            <div class="fr-grid-row--top fr-grid-row--right fr-grid-row fr-ml-auto">
              <button
                v-if="groupeCatalogueViewModel.estMembre"
                class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-close-line fr-btn--sm"
                @click="quitterGroupeActif(groupeCatalogueViewModel.id)"
              >
                Quitter
              </button>
              <button
                v-else
                class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-add-line fr-btn--sm"
                @click="joindreGroupeActif(groupeCatalogueViewModel.id)"
              >
                Rejoindre
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { GroupeCatalogueViewModel } from '@/groupes/adapters/groupeCatalogue.presenter.impl';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { ref } from 'vue';
  import { GroupeEventBusImpl } from '@/groupes/groupeEventBusImpl';
  import { QuitterGroupeUsecase } from '@/groupes/quitterGroupe.usecase';
  import { GroupeRepositoryAxios } from '@/groupes/adapters/groupe.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import { JoindreGroupeUsecase } from '@/groupes/joindreGroupe.usecase';

  const props = defineProps<{
    groupeCatalogueViewModels: GroupeCatalogueViewModel;
  }>();

  const emit = defineEmits<{
    (event: 'refreshCatalogueGroupes'): void;
  }>();

  // je garde pour plus tard
  const optionsCheckbox = props.groupeCatalogueViewModels.filtreThematiques.map(option => ({
    id: option,
    label: option,
    checked: false,
  }));

  const categoriesActives = ref<string[]>([]);
  categoriesActives.value = optionsCheckbox.filter(({ checked }) => checked).map(({ id }) => id);

  async function quitterGroupeActif(groupeId: string) {
    // eslint-disable-next-line no-console
    console.log('groupe id '+groupeId)
    const useCase = new QuitterGroupeUsecase(new GroupeRepositoryAxios(), GroupeEventBusImpl.getInstance());
    const utilisateurId = utilisateurStore().utilisateur.id;
    await useCase.execute(utilisateurId, groupeId);
    emit('refreshCatalogueGroupes');
  }

  async function joindreGroupeActif(groupeId: string) {
    // eslint-disable-next-line no-console
    console.log('groupe id '+groupeId)
    const useCase = new JoindreGroupeUsecase(new GroupeRepositoryAxios(), GroupeEventBusImpl.getInstance());
    const utilisateurId = utilisateurStore().utilisateur.id;
    await useCase.execute(utilisateurId, groupeId);
    emit('refreshCatalogueGroupes');
  }
</script>
<style scoped>
  .img-icon-rounded {
    display: block;
    border-radius: 10px;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 18, 0.16);
  }

  .img-illustration {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    max-height: 300px;
  }
</style>
