<template>
  <div class="docdog-container--middle">
    <AlertSuccess v-if="msg" :msg="msg" :msg2="msg2" />

    <div class="docdog-modal__body__section">
      <h1 class="docdog-modal__body__pagetitle">営業資料ダウンロード</h1>
    </div>

    <div class="docdog-modal__body__section docdog-container--col-2" v-if="list.length">

      <div class="docdog-container--col-2__side">
        <!-- TODO: Download list -->
        <div class="docdog-card docdog-cart--download-list">
          <ul class="docdog-cart">
            <!-- TODO: Componentize cart item -->
            <li  v-for="(item, idx) in list" class="docdog-cart__item">
              <div
                class="docdog-cart__item__thumb"
              >
                <img v-if="item.thumbnail.url" :src="item.thumbnail.url" :alt="item.subject">
                <img v-else src="/src/assets/image/noimage-vertical.svg" :alt="item.subject">
              </div>
              <p class="docdog-cart__item__title">{{ item.subject }}</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="docdog-container--col-2__main">

          <!-- TODO: Step1 email input/error -->
          <div class="docdog-container--white">
            <div class="docdog-modal__body__section">
              <h1 class="docdog-modal__body__pagetitle">必要事項を入力してダウンロード</h1>
            </div>
            <div class="docdog-modal__body__section">
              <div class="docdog-modal__body__section">
                <form>
                  <div class="docdog-form__item" :class="err_fields['email'] ? errClass : ''">
                    <label for="email" class="docdog-form__item__title"
                      >メールアドレス<span class="docdog-form__item__required">（必須）</span></label
                    >
                    <input name="email" type="text" id="email" placeholder="" v-model="email" required />
                    <!-- TODO: form validation in javascript while typing or mouse down -->
                    <p class="docdog-form__item--error__msg">メールアドレスの形式ではありません</p>
                  </div>
                  <div class="docdog-form__button">
                    <button type="submit" class="docdog-button docdog-button--primary" disabled>
                      <span class="docdog-u-d-flex-grow-1">送信してダウンロードする</span>
                      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8046 14.4507C10.6775 14.3236 10.6111 14.1647 10.6053 13.9741C10.5995 13.7834 10.6602 13.6246 10.7873 13.4975L13.0751 11.227H4.85978C4.66335 11.227 4.4987 11.1605 4.36582 11.0277C4.23294 10.8948 4.1665 10.7301 4.1665 10.5337C4.1665 10.3373 4.23294 10.1726 4.36582 10.0397C4.4987 9.90685 4.66335 9.84041 4.85978 9.84041H13.0751L10.77 7.5526C10.6429 7.41394 10.5822 7.25218 10.588 7.0673C10.5938 6.88243 10.6602 6.72644 10.7873 6.59934C10.926 6.47224 11.0906 6.40869 11.2813 6.40869C11.4719 6.40869 11.6308 6.47224 11.7579 6.59934L15.2069 10.0484C15.2763 10.1177 15.3283 10.1928 15.3629 10.2737C15.3976 10.3546 15.4149 10.4413 15.4149 10.5337C15.4149 10.6261 15.3976 10.7128 15.3629 10.7937C15.3283 10.8746 15.2763 10.9497 15.2069 11.019L11.7752 14.4507C11.6366 14.5894 11.4748 14.6587 11.2899 14.6587C11.1051 14.6587 10.9433 14.5894 10.8046 14.4507Z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
              <FormPolicy />
            </div>
          </div>

          <!-- TODO: Step1 - email success -->
          <div class="docdog-container--white">
            <div class="docdog-modal__body__section">
              <h1 class="docdog-modal__body__pagetitle">必要事項を入力してダウンロード</h1>
            </div>
            <div class="docdog-modal__body__section">
              <div class="docdog-modal__body__section">
                <form>
                  <div class="docdog-form__item docdog-form__item--success">
                    <label for="email" class="docdog-form__item__title"
                      >メールアドレス<span class="docdog-form__item__required">（必須）</span></label
                    >
                    <input name="email" type="text" id="email" placeholder="" required value="xxxx@xxx.xx" />
                  </div>
                  <div class="docdog-form__button">
                    <button type="submit" class="docdog-button docdog-button--primary">
                      <span class="docdog-u-d-flex-grow-1">次へ</span>
                      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8046 14.4507C10.6775 14.3236 10.6111 14.1647 10.6053 13.9741C10.5995 13.7834 10.6602 13.6246 10.7873 13.4975L13.0751 11.227H4.85978C4.66335 11.227 4.4987 11.1605 4.36582 11.0277C4.23294 10.8948 4.1665 10.7301 4.1665 10.5337C4.1665 10.3373 4.23294 10.1726 4.36582 10.0397C4.4987 9.90685 4.66335 9.84041 4.85978 9.84041H13.0751L10.77 7.5526C10.6429 7.41394 10.5822 7.25218 10.588 7.0673C10.5938 6.88243 10.6602 6.72644 10.7873 6.59934C10.926 6.47224 11.0906 6.40869 11.2813 6.40869C11.4719 6.40869 11.6308 6.47224 11.7579 6.59934L15.2069 10.0484C15.2763 10.1177 15.3283 10.1928 15.3629 10.2737C15.3976 10.3546 15.4149 10.4413 15.4149 10.5337C15.4149 10.6261 15.3976 10.7128 15.3629 10.7937C15.3283 10.8746 15.2763 10.9497 15.2069 11.019L11.7752 14.4507C11.6366 14.5894 11.4748 14.6587 11.2899 14.6587C11.1051 14.6587 10.9433 14.5894 10.8046 14.4507Z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
              <FormPolicy />
            </div>
          </div>

          <!-- TODO: Step2 - other items input -->
          <div class="docdog-container--white">
            <div class="docdog-modal__body__section">
              <h1 class="docdog-modal__body__pagetitle">必要事項を入力してダウンロード</h1>
            </div>
            <div class="docdog-modal__body__section">
              <div class="docdog-modal__body__section">
                <form>
                  <!-- TODO: form validation in javascript while typing or mouse down -->
                  <div class="docdog-form__item docdog-form__item--success">
                    <label for="email" class="docdog-form__item__title"
                      >メールアドレス<span class="docdog-form__item__required">（必須）</span></label
                    >
                    <input name="email" type="text" id="email" placeholder="" required value="xxxx@xxx.xx" disabled />
                  </div>
                  <div class="docdog-form__item docdog-form__item--col-2">
                    <div class="docdog-form__item" :class="err_fields['name1'] ? 'docdog-form__item--error' : ''">
                      <label for="name1" class="docdog-form__item__title"
                        >姓<span class="docdog-form__item__required">（必須）</span></label
                      >
                      <input name="name1" type="text" id="name1" placeholder="" v-model="name1" required />
                    </div>
                    <div class="docdog-form__item" :class="err_fields['name2'] ? 'docdog-form__item--error' : ''">
                      <label for="name2" class="docdog-form__item__title"
                        >名<span class="docdog-form__item__required">（必須）</span></label
                      >
                      <input name="name2" type="text" id="name2" placeholder="" v-model="name2" required />
                    </div>
                  </div>
                  <div class="docdog-form__item">
                    <label for="company_nm" class="docdog-form__item__title"
                      >会社名<span class="docdog-form__item__required">（必須）</span></label
                    >
                    <input name="company_nm" type="text" id="company_nm" placeholder="" required />
                  </div>
                  <div class="docdog-form__button">
                    <!-- TODO: If all items aren't errors, remove disabled -->
                    <button type="submit" class="docdog-button docdog-button--primary" disabled>
                      <span class="docdog-u-d-flex-grow-1">送信してダウンロードする</span>
                      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8046 14.4507C10.6775 14.3236 10.6111 14.1647 10.6053 13.9741C10.5995 13.7834 10.6602 13.6246 10.7873 13.4975L13.0751 11.227H4.85978C4.66335 11.227 4.4987 11.1605 4.36582 11.0277C4.23294 10.8948 4.1665 10.7301 4.1665 10.5337C4.1665 10.3373 4.23294 10.1726 4.36582 10.0397C4.4987 9.90685 4.66335 9.84041 4.85978 9.84041H13.0751L10.77 7.5526C10.6429 7.41394 10.5822 7.25218 10.588 7.0673C10.5938 6.88243 10.6602 6.72644 10.7873 6.59934C10.926 6.47224 11.0906 6.40869 11.2813 6.40869C11.4719 6.40869 11.6308 6.47224 11.7579 6.59934L15.2069 10.0484C15.2763 10.1177 15.3283 10.1928 15.3629 10.2737C15.3976 10.3546 15.4149 10.4413 15.4149 10.5337C15.4149 10.6261 15.3976 10.7128 15.3629 10.7937C15.3283 10.8746 15.2763 10.9497 15.2069 11.019L11.7752 14.4507C11.6366 14.5894 11.4748 14.6587 11.2899 14.6587C11.1051 14.6587 10.9433 14.5894 10.8046 14.4507Z" />
                      </svg>
                    </button>
                  </div>
                </form>
                <div class="docdog-form__link">
                  <!-- TODO: Back e-mail input screen -->
                  <button type="button" class="docdog-button--text docdog-u-mx-0 docdog-u-d-flex docdog-u-d-flex-align-center">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5323 7.82468C10.6848 7.9772 10.7645 8.16785 10.7715 8.39663C10.7784 8.62541 10.7056 8.81606 10.5531 8.96859L7.80771 11.6932H17.6661C17.9018 11.6932 18.0994 11.7729 18.2589 11.9323C18.4183 12.0918 18.498 12.2894 18.498 12.5251C18.498 12.7608 18.4183 12.9584 18.2589 13.1178C18.0994 13.2773 17.9018 13.357 17.6661 13.357H7.80771L10.5739 16.1024C10.7264 16.2688 10.7992 16.4629 10.7923 16.6848C10.7853 16.9066 10.7056 17.0938 10.5531 17.2463C10.3867 17.3988 10.1891 17.4751 9.96034 17.4751C9.73155 17.4751 9.5409 17.3988 9.38838 17.2463L5.24952 13.1075C5.16632 13.0243 5.10393 12.9341 5.06233 12.8371C5.02073 12.74 4.99994 12.636 4.99994 12.5251C4.99994 12.4142 5.02073 12.3102 5.06233 12.2131C5.10393 12.1161 5.16632 12.0259 5.24952 11.9427L9.36758 7.82468C9.53397 7.65829 9.72809 7.5751 9.94994 7.5751C10.1718 7.5751 10.3659 7.65829 10.5323 7.82468Z" fill="#1371FF"/>
                    </svg>
                    <span>メールアドレスを変更する</span>
                  </button>
                </div>
              </div>
              <FormPolicy />
            </div>
          </div>

      </div>
    </div>

     <!-- TODO: Step4 complete -->
    <section class="docdog-modal__body__section">
      <div class="docdog-article">
        <h2>ダウンロードしました</h2>
        <p>営業資料にご興味をお持ちいただきありがとうございます。</p>
        <div class="docdog-u-pa-x-sm">
          <ul class="docdog-article__check-list">
            <li><strong>資料の内容について質問したい</strong></li>
            <li><strong>構築方法やプロジェクト進行にういて相談したい</strong></li>
            <li><strong>デモを依頼したい</strong></li>
            <li><strong>機能や料金についてもっと知りたい</strong></li>
            <li><strong>パートナー契約について知りたい</strong></li>
          </ul>
        </div>
        <p>など、気になる点がございましたらお気軽にお問い合わせください。</p>
        <a href="#" target="_blank" rel="noopener" class="docdog-button docdog-button--primary">
          <span class="docdog-u-d-flex-grow-1">問い合わせる</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.28804 15.638C7.10471 15.4213 7.00888 15.1796 7.00054 14.913C6.99221 14.6463 7.08804 14.413 7.28804 14.213L11.513 9.98796L7.26304 5.73796C7.07971 5.55463 6.99221 5.31713 7.00054 5.02546C7.00888 4.7338 7.10471 4.4963 7.28804 4.31296C7.50471 4.0963 7.74221 3.99213 8.00054 4.00046C8.25888 4.0088 8.48804 4.11296 8.68804 4.31296L13.663 9.28796C13.763 9.38796 13.838 9.4963 13.888 9.61296C13.938 9.72963 13.963 9.85463 13.963 9.98796C13.963 10.1213 13.938 10.2463 13.888 10.363C13.838 10.4796 13.763 10.588 13.663 10.688L8.71304 15.638C8.51304 15.838 8.27971 15.9338 8.01304 15.9255C7.74638 15.9171 7.50471 15.8213 7.28804 15.638Z" fill="white"/>
          </svg>
        </a>
      </div>
    </section>
    <section class="docdog-modal__body__section docdog-container--white">
      <h2 class="docdog-modal__body__heading">あなたにおすすめのコンテンツ</h2>
      <!-- TODO: implement -->
      <ul class="docdog-card__list" v-if="docs.length > 0">
        <li v-for="doc in docs">
          <CardDocs
            :data="doc"
            :key="doc.topics_id"
            :toastIds="toastIds"
            :showDownloadBtn="showDownloadBtn"
            @download="download(doc)"
            @addToast="addToast"
            @redirect="redirect"
          />
        </li>
      </ul>
      <button
        type="button"
        class="docdog-button docdog-button--white"
        @click.prevent="redirect({ target: 'List' })"
      >
        営業資料一覧を見る
      </button>
    </section>

    <div class="docdog-modal__body__section" v-if="!list.length">
      <p>選択中のファイルはありません。</p>
    </div>

  </div>
  <Loading v-if="toastStatus == 'downloading'" :loadingMessage="'圧縮ファイル作成中'" />
</template>

<script>
import AbstractPage from './AbstractPage.vue';
import AlertSuccess from '@/components/app1/AlertSuccess.vue';
import Loading from '@/components/app1/modal_pages/Loading.vue';
import FormPolicy from '@/components/app1/FormPolicy.vue';
export default {
  extends: AbstractPage,
  components: {
    AlertSuccess,
    Loading,
    FormPolicy,
},
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      email: '',
      name1: '',
      name2: '',
      formDef: [],
      customFields: {},
      errClass: 'docdog-form__item--error',
    };
  },
  mounted() {
    this.footer_data.toastList = this.list;
    memberApi.getMemberForm().then((resp) => {
      Object.values(resp.details).forEach((val) => {
        const manualElements = {
          // Exclude processing of these
          name1: true,
          name2: true,
          email: true,
          login_pwd: true,
        };

        if (!manualElements[val.key_name]) {
          this.formDef.push(val);
        }
      });
    });
  },
  computed: {
    err_fields() {
      if (this.err) {
        return this.err.reduce((carry, item) => {
          let field = item.field;
          if (item.message.indexOf('Name is required') >= 0) {
            field = 'name1';
          }
          if (item.message.indexOf(this.email) === 0) {
            field = 'email';
          }
          return { ...carry, [item.field]: true };
        }, {});
      }
      return {};
    },
    err_msg() {
      return this.err.map((err) => {
        if (err) {
          const { field, code } = err;
          let translatedField = 'データ';
          let tranlatedProblem = '不正';
          const fieldNames = this.formDef.reduce((carry, item) => {
            return {
              ...carry,
              [item.key_name]: item.name,
            };
          }, {});
          if (fieldNames[field]) {
            translatedField = fieldNames[field];
          } else {
            switch (field) {
              case 'email':
                translatedField = 'メールアドレス';
                break;
            }
          }
          switch (code) {
            case 'invalid':
              tranlatedProblem = '不正';
              break;
            case 'required':
              tranlatedProblem = '必須';
              break;
          }
          if (translatedField && tranlatedProblem) {
            return translatedField + 'が' + tranlatedProblem + 'です';
          } else {
            return 'エラーが発生しました。';
          }
        }
      });
    },
  },
  methods: {
    onRemoveToast(idx) {
      this.removeToast(idx);
      if (this.list.length == 0) {
        this.close();
      }
    },
  },
};
</script>
