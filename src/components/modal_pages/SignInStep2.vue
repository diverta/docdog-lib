<template>

  <!-- ToDo: Step2 - Download -->
  <section class="docdog-modal">
    <header class="docdog-modal__head">
      <p class="docdog-modal__head__heading">ログインしてダウンロード</p>
      <button type="button" aria-label="Close" class="docdog-modal__head__close">
        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.8334 1.84163L10.6584 0.666626L6.00008 5.32496L1.34175 0.666626L0.166748 1.84163L4.82508 6.49996L0.166748 11.1583L1.34175 12.3333L6.00008 7.67496L10.6584 12.3333L11.8334 11.1583L7.17508 6.49996L11.8334 1.84163Z" fill="#AAAAAA"/>
        </svg>
      </button>
    </header>

    <div class="docdog-modal__body">
      <!-- Modal Content -->
      <div class="docdog-modal__body__section">
        <div class="docdog-alert docdog-alert--success">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="23" stroke="#fff" stroke-width="4"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21.3038 34.8892C21.0685 34.7916 20.8481 34.6471 20.6569 34.4558L13.5858 27.3848C12.8047 26.6037 12.8047 25.3374 13.5858 24.5563C14.3668 23.7753 15.6332 23.7753 16.4142 24.5563L22.225 30.3671L35.0064 17.5858C35.7874 16.8047 37.0537 16.8047 37.8348 17.5858C38.6158 18.3668 38.6158 19.6332 37.8348 20.4142L23.6927 34.5563C23.0455 35.2035 22.0652 35.3144 21.3038 34.8892Z" fill="#fff"/>
          </svg>
          <p class="docdog-alert__heading">ログインしました</p>
          <p>アカウント作成が完了しました</p>
        </div>
      </div>
      <div class="docdog-modal__body__section">
        <div class="docdog-card__single">
          <div class="docdog-card">
            <div class="docdog-card__thumb" style="background-image: url(/image/doc-1.png);">
              <span class="docdog-card__thumb__badge">PDF</span>
            </div>
            <div class="docdog-card__body">
              <p class="docdog-card__body__title">Kuroco説明資料</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Footer -->
    <footer class="docdog-modal__foot">
      <div class="docdog-button__list">
        <button type="button" class="docdog-button docdog-button--white">ダウンロードリストに追加する</button>
         <button type="button" class="docdog-button docdog-button--primary">ダウンロードする</button>
      </div>
    </footer>

  </section>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>
