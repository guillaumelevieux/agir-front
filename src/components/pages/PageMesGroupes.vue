<template>
  <div class="fr-container">
    <div v-if="isLoading">Chargement ...</div>
    <div v-else-if="!groupeCatalogueViewModels">Une erreur est survenue</div>
    <CatalogueGroupes
      v-else
      @refresh-catalogue-groupes="refreshCatalogueGroupes"
      :groupe-catalogue-view-models="groupeCatalogueViewModels"
    />
  </div>
</template>
  
<script setup lang="ts">
  import { RecupererMesGroupesUsecase } from '@/groupes/recupererMesGroupes.usecase';
  import { GroupeRepositoryAxios } from '@/groupes/adapters/groupe.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import {
    GroupeCataloguePresenterImpl,
    GroupeCatalogueViewModel,
  } from '@/groupes/adapters/groupeCatalogue.presenter.impl';
  import { onMounted, ref } from 'vue';
  import CatalogueGroupes from '../custom/CatalogueGroupes.vue';

  const utilisateurId: string = utilisateurStore().utilisateur.id;
  const isLoading = ref<boolean>(true);

  const groupeCatalogueViewModels = ref<GroupeCatalogueViewModel>();
  function mapGroupCatalogueViewModel(groupes: GroupeCatalogueViewModel) {
    groupeCatalogueViewModels.value = groupes;
    // eslint-disable-next-line no-console
    console.log(groupes)
    isLoading.value = false;
  }
  const usecase = new RecupererMesGroupesUsecase(new GroupeRepositoryAxios());
  const groupeCataloguePresenterImpl = new GroupeCataloguePresenterImpl(mapGroupCatalogueViewModel);

  function refreshCatalogueGroupes() {
    isLoading.value = true;
    usecase.execute(utilisateurId, groupeCataloguePresenterImpl);
  }
  onMounted(() => {
    refreshCatalogueGroupes();
  });
  
  </script>