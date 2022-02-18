<template>
  <!-- ToDo: Step3 - Download list -->
  <section class="docdog-modal">
    <header class="docdog-modal__head">
      <p class="docdog-modal__head__heading">ログインしてダウンロード</p>
      <button type="button" aria-label="Close" class="docdog-modal__head__close">
        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.8334 1.84163L10.6584 0.666626L6.00008 5.32496L1.34175 0.666626L0.166748 1.84163L4.82508 6.49996L0.166748 11.1583L1.34175 12.3333L6.00008 7.67496L10.6584 12.3333L11.8334 11.1583L7.17508 6.49996L11.8334 1.84163Z"
            fill="#AAAAAA"
          />
        </svg>
      </button>
    </header>

    <div class="docdog-modal__body">
      <!-- Modal Content -->
      <div class="docdog-modal__body__section">
        <p class="docdog-modal__body__heading">選択中のファイル</p>
        <ul class="docdog-card__list">
          <li>
            <div class="docdog-card">
              <div class="docdog-card__thumb" style="background-image: url(/image/doc-1.png)">
                <span class="docdog-card__thumb__badge">PDF</span>
              </div>
              <div class="docdog-card__body">
                <p class="docdog-card__body__title">Kuroco説明資料</p>
              </div>
              <div class="docdog-card__foot">
                <DeleteButton />
              </div>
            </div>
          </li>
          <li>
            <div class="docdog-card">
              <div class="docdog-card__thumb" style="background-image: url(/image/doc-2.png)">
                <span class="docdog-card__thumb__badge">PDF</span>
              </div>
              <div class="docdog-card__body">
                <p class="docdog-card__body__title">インフラに関するドキュメント</p>
              </div>
              <div class="docdog-card__foot">
                <DeleteButton />
              </div>
            </div>
          </li>
          <li>
            <div class="docdog-card">
              <div class="docdog-card__thumb" style="background-image: url(/image/doc-3.png)">
                <span class="docdog-card__thumb__badge">PDF</span>
              </div>
              <div class="docdog-card__body">
                <p class="docdog-card__body__title">案件ヒアリングシート</p>
              </div>
              <div class="docdog-card__foot">
                <DeleteButton />
              </div>
            </div>
          </li>
          <li>
            <div class="docdog-card">
              <div class="docdog-card__thumb" style="background-image: url(/image/doc-4.png)">
                <span class="docdog-card__thumb__badge">PDF</span>
              </div>
              <div class="docdog-card__body">
                <p class="docdog-card__body__title">Kurocoを利用したプロジェクトの進め方（サンプル）</p>
              </div>
              <div class="docdog-card__foot">
                <DeleteButton />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Modal Footer -->
    <footer class="docdog-modal__foot">
      <button type="button" class="docdog-button docdog-button--primary">まとめてダウンロードする</button>
    </footer>
  </section>
</template>

<script>
import AbstractPage from './AbstractPage.vue';
import DeleteButton from '@/components/DeleteButton.vue';

export default {
  extends: AbstractPage,
  components: {
    DeleteButton,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
