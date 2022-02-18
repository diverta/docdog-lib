<template>
  <div class="docdog">
    <section class="docdog-toast">
      <header class="docdog-toast__head">
        <p class="docdog-toast__head__heading">ダウンロードリスト</p>
        <button type="button" aria-label="Close" class="docdog-toast__head__close">
          <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.0827 4.239L10.2602 3.4165L6.99935 6.67734L3.73852 3.4165L2.91602 4.239L6.17685 7.49984L2.91602 10.7607L3.73852 11.5832L6.99935 8.32234L10.2602 11.5832L11.0827 10.7607L7.82185 7.49984L11.0827 4.239Z" fill="#AAAAAA"/>
          </svg>
        </button>
      </header>

      <!-- ダウンロードリストモーダル -->
      <div class="docdog-toast__body">
        <ul class="docdog-toast__body__list">
          <li>
            <p class="docdog-toast__body__list__title">Kuroco説明資料</p>
            <DeleteButton />
          </li>
          <li>
            <p class="docdog-toast__body__list__title">インフラに関するドキュメント</p>
            <DeleteButton />
          </li>
          <li>
            <p class="docdog-toast__body__list__title">案件ヒアリングシート</p>
            <DeleteButton />
          </li>
          <li>
            <p class="docdog-toast__body__list__title">Kurocoを利用したプロジェクトの進め方（サンプル）</p>
            <DeleteButton />
          </li>
        </ul>
      </div>
      <footer class="docdog-toast__foot">
        <button type="button" class="docdog-button docdog-button--primary">まとめてダウンロードする</button>
      </footer>
    </section>
  </div>
</template>

<script>
import DeleteButton from '@/components/DeleteButton.vue';
export default {
  components: {
    DeleteButton
  },
  props: {

  },
  methods: {
  },
};
</script>
