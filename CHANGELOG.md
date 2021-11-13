# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.1.23](https://github.com/ecomplus/app-correios/compare/v1.1.22...v1.1.23) (2021-11-13)


### Bug Fixes

* **correios-ws:** fix _read property config of undefined_ error ([083dabf](https://github.com/ecomplus/app-correios/commit/083dabf55b8240c94467030df8b278361f1aab7d))

### [1.1.22](https://github.com/ecomplus/app-correios/compare/v1.1.21...v1.1.22) (2021-11-13)


### Bug Fixes

* **correios-ws:** fix parsing result object to promise payload ([e49d19a](https://github.com/ecomplus/app-correios/commit/e49d19aacae50d1e9d5465a356c0977026f58173))

### [1.1.21](https://github.com/ecomplus/app-correios/compare/v1.1.20...v1.1.21) (2021-11-13)


### Bug Fixes

* **correios-ws:** deal with ws service unavailable (with response status 200) ([f7eb42e](https://github.com/ecomplus/app-correios/commit/f7eb42e6d97d62832b6f95f9035978b7e29d0f49))

### [1.1.20](https://github.com/ecomplus/app-correios/compare/v1.1.19...v1.1.20) (2021-11-01)

### [1.1.19](https://github.com/ecomplus/app-correios/compare/v1.1.18...v1.1.19) (2021-10-26)

### [1.1.18](https://github.com/ecomplus/app-correios/compare/v1.1.17...v1.1.18) (2021-10-21)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.15.5 firestore ([2719e4d](https://github.com/ecomplus/app-correios/commit/2719e4d3dd0eaeed82c38098c3f7bdfd340ebb93))

### [1.1.17](https://github.com/ecomplus/app-correios/compare/v1.1.16...v1.1.17) (2021-08-17)


### Bug Fixes

* correct Valor if is greater than 999.99 ([#12](https://github.com/ecomplus/app-correios/issues/12)) ([d39cc4e](https://github.com/ecomplus/app-correios/commit/d39cc4e3e26a0f29b05842a5c623dc74f2402ebb))

### [1.1.16](https://github.com/ecomplus/app-correios/compare/v1.1.15...v1.1.16) (2021-07-23)


### Bug Fixes

* **calculate-shipping:** prevent returning negative declared value price ([02acda0](https://github.com/ecomplus/app-correios/commit/02acda0bc68af6951bfb7b90c4ecf7993822414e))

### [1.1.15](https://github.com/ecomplus/app-correios/compare/v1.1.14...v1.1.15) (2021-06-29)


### Bug Fixes

* **correios-ws:** update min declared value to 21 BRL ([c980867](https://github.com/ecomplus/app-correios/commit/c98086793c6c220f6f52a9260ee72a64d1e8e42a))

### [1.1.14](https://github.com/ecomplus/app-correios/compare/v1.1.13...v1.1.14) (2020-12-19)


### Bug Fixes

* **calculate-shipping:** fix checking 'headersSent' ([e56f5e5](https://github.com/ecomplus/app-correios/commit/e56f5e5c2dc83e85f2345771a2404e996d14f6e2))

### [1.1.13](https://github.com/ecomplus/app-correios/compare/v1.1.12...v1.1.13) (2020-11-30)


### Bug Fixes

* **calculate-shipping:** properly handling 'free_no_weight_shipping' option ([7937745](https://github.com/ecomplus/app-correios/commit/79377457975dc77869bfc0cd3f99c161e94be7a1))

### [1.1.12](https://github.com/ecomplus/app-correios/compare/v1.1.11...v1.1.12) (2020-11-28)

### [1.1.11](https://github.com/ecomplus/app-correios/compare/v1.1.10...v1.1.11) (2020-11-24)

### [1.1.10](https://github.com/ecomplus/app-correios/compare/v1.1.9...v1.1.10) (2020-11-21)


### Bug Fixes

* **calculate-shipping:** prevent send response on headers already sent ([3ef8f4f](https://github.com/ecomplus/app-correios/commit/3ef8f4f93c2e9400abed8e646a9e5d6d8fd52ce0))

### [1.1.9](https://github.com/ecomplus/app-correios/compare/v1.1.8...v1.1.9) (2020-11-18)


### Bug Fixes

* **calculate-shipping:** set only the cheapest shipping line free when no weight ([#11](https://github.com/ecomplus/app-correios/issues/11)) ([6d2e62d](https://github.com/ecomplus/app-correios/commit/6d2e62de068ee72a3af86286d4204399d53591f8))
* **deps:** update non-major and dev deps ([d585611](https://github.com/ecomplus/app-correios/commit/d585611ce17661a3159a773f0a0cf4c4627dee43))

### [1.1.8](https://github.com/ecomplus/app-correios/compare/v1.1.7...v1.1.8) (2020-10-05)


### Bug Fixes

* **calculate-shipping:** returning package dimensions and weight ([65b4d20](https://github.com/ecomplus/app-correios/commit/65b4d2001d6ed8e51259e12409ffbdcb3fe7078d))
* **calculate-shipping:** returning package info (x quantity) ([85d6592](https://github.com/ecomplus/app-correios/commit/85d6592c910774c8702cd21ee914eb72ccdc3b32))

### [1.1.7](https://github.com/ecomplus/app-correios/compare/v1.1.6...v1.1.7) (2020-09-08)


### Bug Fixes

* **calculate-shipping:** ignoring cubic weight when lower than 5kg ([#10](https://github.com/ecomplus/app-correios/issues/10)) ([ce91bcb](https://github.com/ecomplus/app-correios/commit/ce91bcb8ea92c5e078347e3038a4540a95747d36))

### [1.1.6](https://github.com/ecomplus/app-correios/compare/v1.1.5...v1.1.6) (2020-09-02)


### Bug Fixes

* **calculate-shipping:** handling Correios error '010' ([#9](https://github.com/ecomplus/app-correios/issues/9)) ([a0bef06](https://github.com/ecomplus/app-correios/commit/a0bef061a9a2e9ebad62ac5ec870c1931f3e8018))

### [1.1.5](https://github.com/ecomplus/app-correios/compare/v1.1.4...v1.1.5) (2020-08-10)


### Bug Fixes

* **calculate-shipping:** prevent handling bad additional/discount config ([68d669d](https://github.com/ecomplus/app-correios/commit/68d669d27d8cdac09a8540fbaa9e3e0bdb84aa62))

### [1.1.4](https://github.com/ecomplus/app-correios/compare/v1.1.3...v1.1.4) (2020-08-10)


### Bug Fixes

* **calculate-shipping:** prevent error with discount null ([#8](https://github.com/ecomplus/app-correios/issues/8)) ([be5a6b7](https://github.com/ecomplus/app-correios/commit/be5a6b75f2e7cf34f9363d20a128abc69f99c308))

### [1.1.3](https://github.com/ecomplus/app-correios/compare/v1.1.2...v1.1.3) (2020-07-24)

### [1.1.2](https://github.com/ecomplus/app-correios/compare/v1.1.1...v1.1.2) (2020-07-21)


### Bug Fixes

* **correios-offline:** fix counting documents while deleting old ones ([e5bf9b0](https://github.com/ecomplus/app-correios/commit/e5bf9b0517dd0c4a74d4202d1996e191b615bf79))

### [1.1.1](https://github.com/ecomplus/app-correios/compare/v1.1.0...v1.1.1) (2020-07-21)


### Bug Fixes

* **update-database:** prevent exiting loop (async) function ([9cc48a8](https://github.com/ecomplus/app-correios/commit/9cc48a8204604763269e084c0d7b9d7ceae1faa6))

## [1.1.0](https://github.com/ecomplus/app-correios/compare/v1.0.14...v1.1.0) (2020-07-20)


### Features

* **calculate-shipping:** free shipping if all items has no weigth ([#6](https://github.com/ecomplus/app-correios/issues/6)) ([4e53c0e](https://github.com/ecomplus/app-correios/commit/4e53c0e72941b3afc503d86340809d15efe8854e))
* **calculate-shipping:** mannually handle WS timeout, save to offline ([ad61cbd](https://github.com/ecomplus/app-correios/commit/ad61cbded7609f6317bbd3154c2900d7133541eb))


### Bug Fixes

* **application:** fix admin settings object ('free_no_weight_shipping') ([0d2fa21](https://github.com/ecomplus/app-correios/commit/0d2fa21245b44c9068af51fd122c8663b0ab2c54))
* **calculate-shipping:** free shipping for zero weight if configured ([607fcd3](https://github.com/ecomplus/app-correios/commit/607fcd3506e656deed392d372421a53e6ada546f))
* **update-by-contract:** ensure stop weight loop on 50kg once ([c4d1871](https://github.com/ecomplus/app-correios/commit/c4d187120b1cda822c52f8b341d7b0b844eec43c))
* **update-by-contract:** ensure stop weight loop on 50kg once ([9b045f4](https://github.com/ecomplus/app-correios/commit/9b045f4d8e46d12c3a8ffb012cbb6cfab3481088))
* **update-by-contract:** fix handling calculate errors to skip contracts ([d89cc0a](https://github.com/ecomplus/app-correios/commit/d89cc0a6d07f9e8872940726e2c449ec8a19e82c))
* **update-by-contract:** fix skipping response services with errors ([4060b8e](https://github.com/ecomplus/app-correios/commit/4060b8ec066df958b2783f788c0ab70b8f8f0493))
* **update-by-contract:** prevent multiple zip codes queue at same time ([f88c4db](https://github.com/ecomplus/app-correios/commit/f88c4db488cf3beec228900358b9f4ec8e7eecfd))

### [1.0.14](https://github.com/ecomplus/app-correios/compare/v1.0.13...v1.0.14) (2020-07-19)


### Bug Fixes

* **correios-offline:** fix body object before run insert to firestore ([b151e9a](https://github.com/ecomplus/app-correios/commit/b151e9a81ba80961ad5d6cd5438e72a8c4bc825e))
* **correios-offline:** prevent undefined prop 'nCdEmpresa' ([df293ac](https://github.com/ecomplus/app-correios/commit/df293ac6267546573181c8de1e78cc0db2920e04))

### [1.0.13](https://github.com/ecomplus/app-correios/compare/v1.0.12...v1.0.13) (2020-07-19)


### Bug Fixes

* **local:** start clearing old documents after update done ([2091374](https://github.com/ecomplus/app-correios/commit/2091374ec7a578a5039c0838ec5c9b4220808352))

### [1.0.12](https://github.com/ecomplus/app-correios/compare/v1.0.11...v1.0.12) (2020-07-19)


### Bug Fixes

* **correios-offline:** fix deleting document with DocumentReference ([b7a4108](https://github.com/ecomplus/app-correios/commit/b7a4108d9f348d821933673ba405fd93bc7eedae))

### [1.0.11](https://github.com/ecomplus/app-correios/compare/v1.0.10...v1.0.11) (2020-07-19)


### Bug Fixes

* **correios-offline:** delete old documents one by one ([e78c1a7](https://github.com/ecomplus/app-correios/commit/e78c1a79168952926d5a2f28743073746c13c705))
* **correios-offline:** ensure 'sCepOrigem' is set when updating data ([941040f](https://github.com/ecomplus/app-correios/commit/941040fbe6e00e35b0d3d7545e0456a32ccf13f1))

### [1.0.10](https://github.com/ecomplus/app-correios/compare/v1.0.9...v1.0.10) (2020-07-19)


### Bug Fixes

* **offline-data:** random sort contracts, update debugs ([e6a9e87](https://github.com/ecomplus/app-correios/commit/e6a9e87dd2208e4244801c056a1675733ca9a751))

### [1.0.9](https://github.com/ecomplus/app-correios/compare/v1.0.8...v1.0.9) (2020-06-23)


### Bug Fixes

* **correios-offline:** fix handling delay between error requests ([033afe0](https://github.com/ecomplus/app-correios/commit/033afe06b1e62658b318e33630b7a6e28ecc0b25))

### [1.0.8](https://github.com/ecomplus/app-correios/compare/v1.0.7...v1.0.8) (2020-06-23)

### [1.0.7](https://github.com/ecomplus/app-correios/compare/v1.0.6...v1.0.7) (2020-06-23)


### Bug Fixes

* **contracts:** ignore empty code/passwords (trim) ([1a62af6](https://github.com/ecomplus/app-correios/commit/1a62af6152eb8278bd31a2065ffcb795d5fe3d17))
* **correios-offline:** fix handling response from database get ([60d1572](https://github.com/ecomplus/app-correios/commit/60d157234f74334ff439af15b374040b144aedc9))

### [1.0.6](https://github.com/ecomplus/app-correios/compare/v1.0.5...v1.0.6) (2020-06-23)


### Bug Fixes

* **calculate-shipping:** validate zip for 'free_shipping_from_value' ([16244cb](https://github.com/ecomplus/app-correios/commit/16244cb52a9f6275f592bcea7d7de9ada561b5c3))
* importing @ecomplus/application-sdk ([61a50bd](https://github.com/ecomplus/app-correios/commit/61a50bd0f76ed17f26661d6f684201469604203a))
* **database:** prevent 'UNIQUE constraint failed' error on save ([0818bb8](https://github.com/ecomplus/app-correios/commit/0818bb8e09a5eade4503483ba00ed0efdd41de4d))
* **deps:** update non-major, add @ecomplus/application-sdk ([ad9ea63](https://github.com/ecomplus/app-correios/commit/ad9ea634c0d1100247c47f8fc6642f4b8e21785a))

### [1.0.5](https://github.com/ecomplus/app-correios/compare/v1.0.4...v1.0.5) (2020-04-10)

### [1.0.4](https://github.com/ecomplus/app-correios/compare/v1.0.3...v1.0.4) (2020-04-09)


### Bug Fixes

* **ws-calculate:** do not log ECONNABORTED (ws offline) to prevent flood ([98ea510](https://github.com/ecomplus/app-correios/commit/98ea51031869819308672cfa4bd1cb68fafc514b))

### [1.0.3](https://github.com/ecomplus/app-correios/compare/v1.0.2...v1.0.3) (2020-03-18)


### Bug Fixes

* **calculate-shipping:** fix handling additional custom service codes ([39cbadb](https://github.com/ecomplus/app-correios/commit/39cbadb248c0573e16923ff4a398561a6f46886d))

### [1.0.2](https://github.com/ecomclub/app-correios/compare/v1.0.1...v1.0.2) (2020-02-17)


### Bug Fixes

* **declared-value:** fix to updated Correios min value (20.5) ([6aea8da](https://github.com/ecomclub/app-correios/commit/6aea8da27c8c8d64a47865e499773197445dfb71))

### [1.0.1](https://github.com/ecomclub/app-correios/compare/v1.0.0...v1.0.1) (2020-02-10)


### Bug Fixes

* **calculate-shipping:** check first code before set 'nCdServico' ([c411da2](https://github.com/ecomclub/app-correios/commit/c411da2f6bf9878a886ab4eae9184034a160275f))

## [1.0.0](https://github.com/ecomclub/app-correios/compare/v0.2.20...v1.0.0) (2020-01-23)


### Bug Fixes

* **calculate-shipping:** send 400 response when no items ([f27afae](https://github.com/ecomclub/app-correios/commit/f27afaece1818099e7224fa8632d7b1bbb60fe41))

### [0.2.20](https://github.com/ecomclub/app-correios/compare/v0.2.19...v0.2.20) (2020-01-23)


### Bug Fixes

* **correios-calculate:** add optional timeout to axios request ([3e6ce68](https://github.com/ecomclub/app-correios/commit/3e6ce68a29549521dbe3fdf37f69f2bc7528c49b))
* **correios-calculate:** fix adding timeout to axios, default to 20000 ([0a6bfbb](https://github.com/ecomclub/app-correios/commit/0a6bfbb7a60cb83d4842303c4c9656249cce7ed7))

### [0.2.19](https://github.com/ecomclub/app-correios/compare/v0.2.18...v0.2.19) (2020-01-22)


### Bug Fixes

* **calculate-shipping:** treating known Correios error codes ([b7f7483](https://github.com/ecomclub/app-correios/commit/b7f748367de3b1892f42b288d8438ecf8ab04286))

### [0.2.18](https://github.com/ecomclub/app-correios/compare/v0.2.17...v0.2.18) (2019-12-23)

### [0.2.17](https://github.com/ecomclub/app-correios/compare/v0.2.16...v0.2.17) (2019-12-23)

### [0.2.16](https://github.com/ecomclub/app-correios/compare/v0.2.15...v0.2.16) (2019-12-23)


### Bug Fixes

* **calculate-shipping:** limit custom field value length (255) ([484bf73](https://github.com/ecomclub/app-correios/commit/484bf735efe3aa2c75d2976d1455fb6fa6f81ec2))

### [0.2.15](https://github.com/ecomclub/app-correios/compare/v0.2.14...v0.2.15) (2019-12-23)


### Bug Fixes

* **correios-ws:** add url to returned cServico(s) ([585ef84](https://github.com/ecomclub/app-correios/commit/585ef84485a597b1e0a6c0885f820b5a176c10cd))

### [0.2.14](https://github.com/ecomclub/app-correios/compare/v0.2.13...v0.2.14) (2019-12-23)


### Features

* **calculate-shipping:** ws url on custom fields to facilitate debug ([ddf5529](https://github.com/ecomclub/app-correios/commit/ddf5529d99bcb2d46f5bef1c74aaae3a8c534cdf))

### [0.2.13](https://github.com/ecomclub/app-correios/compare/v0.2.12...v0.2.13) (2019-12-20)

### [0.2.12](https://github.com/ecomclub/app-correios/compare/v0.2.11...v0.2.12) (2019-12-20)


### Bug Fixes

* **calculate-shipping:** pre check for maximum allowed declared value ([a36041b](https://github.com/ecomclub/app-correios/commit/a36041ba346c4911454ac86984afb6b9cd3a35bc))

### [0.2.11](https://github.com/ecomclub/app-correios/compare/v0.2.10...v0.2.11) (2019-12-19)


### Bug Fixes

* **correios-ws:** check maximum delcared value (optional) ([a38a1f2](https://github.com/ecomclub/app-correios/commit/a38a1f23d94501135694510a196a1d934aa59238))

### [0.2.10](https://github.com/ecomclub/app-correios/compare/v0.2.9...v0.2.10) (2019-12-19)


### Bug Fixes

* **calculate-shipping:** fix calcule physical, cubic and final weight ([7b94b4c](https://github.com/ecomclub/app-correios/commit/7b94b4ceaeca34b61c462d35aa31991fdce33661))

### [0.2.9](https://github.com/ecomclub/app-correios/compare/v0.2.8...v0.2.9) (2019-12-19)


### Bug Fixes

* **calculate-shipping:** fix getting correios ws url from service object ([1b8118a](https://github.com/ecomclub/app-correios/commit/1b8118af9bd6d24ae92fba1e45a4bd3b95ed4d09))

### [0.2.8](https://github.com/ecomclub/app-correios/compare/v0.2.7...v0.2.8) (2019-12-19)

### [0.2.7](https://github.com/ecomclub/app-correios/compare/v0.2.6...v0.2.7) (2019-12-13)


### Bug Fixes

* **calculate-shipping:** ensure sCepDestino format (numbers only) ([14a7e25](https://github.com/ecomclub/app-correios/commit/14a7e259464bed34bd4a2598a2645938c226d66e))

### [0.2.6](https://github.com/ecomclub/app-correios/compare/v0.2.4...v0.2.6) (2019-12-13)

### [0.2.5](https://github.com/ecomclub/app-correios/compare/v0.2.4...v0.2.5) (2019-12-13)

### [0.2.4](https://github.com/ecomclub/app-correios/compare/v0.2.3...v0.2.4) (2019-12-11)


### Bug Fixes

* **calculate-shipping:** fix checking shipping services to return error ([4e04ef3](https://github.com/ecomclub/app-correios/commit/4e04ef3ec033ec0449a7f11f113f9028ac53195e))

### [0.2.3](https://github.com/ecomclub/app-correios/compare/v0.2.2...v0.2.3) (2019-12-11)


### Bug Fixes

* **correios-ws:** check for minimum 'nVlValorDeclarado' ([f7f256e](https://github.com/ecomclub/app-correios/commit/f7f256e251c2038bbada81cdd8e3a7b54bae314a))

### [0.2.2](https://github.com/ecomclub/app-correios/compare/v0.2.2-0...v0.2.2) (2019-12-05)


### Bug Fixes

* **correios-ws:** stop simulating Correios offline ([2313c8b](https://github.com/ecomclub/app-correios/commit/2313c8b275fb62849e749f7aa70e422148bbf983))

### [0.2.2-0](https://github.com/ecomclub/app-correios/compare/v0.2.1...v0.2.2-0) (2019-12-05)

### [0.2.1](https://github.com/ecomclub/app-correios/compare/v0.2.0...v0.2.1) (2019-12-05)


### Bug Fixes

* **correios-ws:** stop simulating Correios offline ([fc3337f](https://github.com/ecomclub/app-correios/commit/fc3337fa1c331e7875a8e1bf0b390201b05482a5))

## [0.2.0](https://github.com/ecomclub/app-correios/compare/v0.1.8-alpha.7...v0.2.0) (2019-12-05)

### [0.1.8](https://github.com/ecomclub/app-correios/compare/v0.1.8-alpha.7...v0.1.8) (2019-12-05)

### [0.1.8-alpha.7](https://github.com/ecomclub/app-correios/compare/v0.1.8-alpha.6...v0.1.8-alpha.7) (2019-12-05)


### Bug Fixes

* **calculate-shipping:** check price props typeof ([cb30ff0](https://github.com/ecomclub/app-correios/commit/cb30ff01242b8705c27ac3ac72ceb58f9a698e85))

### [0.1.8-alpha.6](https://github.com/ecomclub/app-correios/compare/v0.1.8-alpha.5...v0.1.8-alpha.6) (2019-12-05)

### [0.1.8-alpha.5](https://github.com/ecomclub/app-correios/compare/v0.1.8-alpha.4...v0.1.8-alpha.5) (2019-12-05)


### Bug Fixes

* **calculate-shipping:** fix setting services array ([1ebf22e](https://github.com/ecomclub/app-correios/commit/1ebf22e74ba55165cac17d0603c9d085ec7c1cfc))

### [0.1.8-alpha.4](https://github.com/ecomclub/app-correios/compare/v0.1.8-alpha.3...v0.1.8-alpha.4) (2019-12-05)


### Bug Fixes

* **calculate-shipping:** fix reducing results from offline database ([ba5ecfc](https://github.com/ecomclub/app-correios/commit/ba5ecfc21b41a5d64b07dfec87d6d188844895e3))

### [0.1.8-alpha.3](https://github.com/ecomclub/app-correios/compare/v0.1.8-alpha.2...v0.1.8-alpha.3) (2019-12-05)

### [0.1.8-alpha.2](https://github.com/ecomclub/app-correios/compare/v0.1.8-alpha.1...v0.1.8-alpha.2) (2019-12-05)

### [0.1.8-alpha.1](https://github.com/ecomclub/app-correios/compare/v0.1.8-alpha.0...v0.1.8-alpha.1) (2019-12-05)

### [0.1.8](https://github.com/ecomclub/app-correios/compare/v0.1.7...v0.1.8) (2019-12-04)

### [0.1.8-alpha.0](https://github.com/ecomclub/app-correios/compare/v0.1.7...v0.1.8-alpha.0) (2019-12-05)

### [0.1.8](https://github.com/ecomclub/app-correios/compare/v0.1.7...v0.1.8) (2019-12-04)


### Bug Fixes

* **calculate-shipping:** fix checking shipping rules zip range ([b1e509f](https://github.com/ecomclub/app-correios/commit/b1e509fc738f42989e4387356cc5957b84fba442))

### [0.1.7](https://github.com/ecomclub/app-correios/compare/v0.1.6...v0.1.7) (2019-11-13)


### Bug Fixes

* **correios-ws:** skip debugging ECONNRESET error ([97a234d](https://github.com/ecomclub/app-correios/commit/97a234d0bf59d4aa24e03013ff1af670bc360b60))

### [0.1.6](https://github.com/ecomclub/app-correios/compare/v0.1.5...v0.1.6) (2019-11-12)


### Bug Fixes

* **correios-offline:** update database lib method returning promise ([40f02d6](https://github.com/ecomclub/app-correios/commit/40f02d63239028ad8f8ab439ce182eb1b4561ade))

### [0.1.5](https://github.com/ecomclub/app-correios/compare/v0.1.4...v0.1.5) (2019-11-01)


### Bug Fixes

* **calculate-shipping:** fix price strings to number ('Valor') ([aff95f5](https://github.com/ecomclub/app-correios/commit/aff95f5907b3d4cc2cc7b937df232c8aaad2b923))

### [0.1.4](https://github.com/ecomclub/app-correios/compare/v0.1.3...v0.1.4) (2019-11-01)


### Bug Fixes

* **calculate-shipping:** fix price strings to number ([8737c55](https://github.com/ecomclub/app-correios/commit/8737c55d511031e668ff6c21fbb2071db2c9c56b))

### [0.1.3](https://github.com/ecomclub/app-correios/compare/v0.1.2...v0.1.3) (2019-11-01)


### Bug Fixes

* **ecom-webhook:** fix getting config (hidden) and parsing zip ([3865f27](https://github.com/ecomclub/app-correios/commit/3865f2795a294e24096a58568f8e6af3ec0f229c))

### [0.1.2](https://github.com/ecomclub/app-correios/compare/v0.1.1...v0.1.2) (2019-11-01)


### Bug Fixes

* **ecom-webhook:** importing remove, save from lib database correctly ([6e303b8](https://github.com/ecomclub/app-correios/commit/6e303b863fc180c7de8cd8432359d6e08d956f24))

### [0.1.1](https://github.com/ecomclub/app-correios/compare/v0.1.0...v0.1.1) (2019-11-01)


### Bug Fixes

* **procedures:** fix default procedure trigger ([37559f5](https://github.com/ecomclub/app-correios/commit/37559f50db66a2ec351a237f81558a00ecb7a990))

## [0.1.0](https://github.com/ecomclub/app-correios/compare/v0.0.14...v0.1.0) (2019-11-01)


### Bug Fixes

* **local:** stop checkout triggers.length to setup procedures ([27f0e13](https://github.com/ecomclub/app-correios/commit/27f0e134c658c42d8e3503865cd1b158ad76df52))
* **zip-code-string:** removing not numbers chars ([4562849](https://github.com/ecomclub/app-correios/commit/4562849987e97f0045a3822fec2b82f6d1380dd4))

### [0.0.14](https://github.com/ecomclub/app-correios/compare/v0.0.13...v0.0.14) (2019-10-31)


### Bug Fixes

* **correios-offline:** handle only senders from databse (not all ranges) ([8d5b9a8](https://github.com/ecomclub/app-correios/commit/8d5b9a89e915148a5bb8e1b2eca50d8669f5a6b9))
* **correios-offline:** shuffle zip code ranges list ([2a97e03](https://github.com/ecomclub/app-correios/commit/2a97e03a49a88a44646adbb09a4da1fc3f1b0000))
* **ecom-webhook:** also saves zip codes without contract ([146c410](https://github.com/ecomclub/app-correios/commit/146c410d803301695c8d26061fa46cca841b2880))

### [0.0.13](https://github.com/ecomclub/app-correios/compare/v0.0.12...v0.0.13) (2019-10-31)


### Bug Fixes

* **calculate-shipping:** fix finding matched zip code from mocked list ([1734a96](https://github.com/ecomclub/app-correios/commit/1734a96844e86f57475ed4092f49c4462ddf0a22))
* **calculate-shipping:** prefer ws result, add margin to offline value ([e86dd68](https://github.com/ecomclub/app-correios/commit/e86dd68a63d5605df32701aa2660d2162b06be88))
* **correios-offline:** fix handling zip code ranges ([2c91a17](https://github.com/ecomclub/app-correios/commit/2c91a179d60fff160c36c0d799670f69c21ca742))

### [0.0.12](https://github.com/ecomclub/app-correios/compare/v0.0.11...v0.0.12) (2019-10-31)


### Bug Fixes

* **error-msg:** fix handling MsgErro from Correios response object ([69df832](https://github.com/ecomclub/app-correios/commit/69df83286e70103f6537007269c4fdd20e6ffb5b))

### [0.0.11](https://github.com/ecomclub/app-correios/compare/v0.0.10...v0.0.11) (2019-10-31)


### Bug Fixes

* **correios-offline:** fix saved data, skip same zip codes ([6fd8752](https://github.com/ecomclub/app-correios/commit/6fd875281cb12da50818dc82ec75d10297a2e0b5))

### [0.0.10](https://github.com/ecomclub/app-correios/compare/v0.0.9...v0.0.10) (2019-10-31)


### Bug Fixes

* **calculate-shipping:** doesn't pass sDsSenha to list, only nCdEmpresa ([bb7770f](https://github.com/ecomclub/app-correios/commit/bb7770f19a88aa72f90a9434846d40a79093b6df))
* **correios-offline:** fix saved data, stop trying when get error -2 ([e2b68f6](https://github.com/ecomclub/app-correios/commit/e2b68f6ba53e94a2b3529929d502660b379a60e3))
* **zip-codes:** fix mocked zip codes for correios offline ([260104f](https://github.com/ecomclub/app-correios/commit/260104f406167d4c536121fc785c107bf32bb724))

### [0.0.9](https://github.com/ecomclub/app-correios/compare/v0.0.8...v0.0.9) (2019-10-31)


### Bug Fixes

* **calculate-shipping:** fix mounting services from calculate result ([c9d7b6f](https://github.com/ecomclub/app-correios/commit/c9d7b6fede59dc6158fb7dcf1faad1ec6e6a776c))
* **correios-offline:** fix mounting services array ([4aad3c5](https://github.com/ecomclub/app-correios/commit/4aad3c5176dce9396385f68ece10dfbccd0c87a4))
* **correios-ws:** overwrite nCdServico, merge promises results ([f99409f](https://github.com/ecomclub/app-correios/commit/f99409f382ddef316729a64a5dcbea7de3864b5d))

### [0.0.8](https://github.com/ecomclub/app-correios/compare/v0.0.7...v0.0.8) (2019-10-31)


### Bug Fixes

* **correios-ws:** limit up to 1 service / request ([b452081](https://github.com/ecomclub/app-correios/commit/b452081628f164e430b865f7eda7744f94755cfc))

### [0.0.7](https://github.com/ecomclub/app-correios/compare/v0.0.6...v0.0.7) (2019-10-30)


### Bug Fixes

* **calculate:** fix getting data from axios response (correios ws) ([cd8e8cc](https://github.com/ecomclub/app-correios/commit/cd8e8ccaf9d33e22ba8607937ee3897bf78dcc82))

### [0.0.6](https://github.com/ecomclub/app-correios/compare/v0.0.5...v0.0.6) (2019-10-30)


### Bug Fixes

* **firestore:** calling Timestamp from admin.firestore ([cd27509](https://github.com/ecomclub/app-correios/commit/cd27509648273d5e5873d400d7cc3b39df057ea2))

### [0.0.5](https://github.com/ecomclub/app-correios/compare/v0.0.4...v0.0.5) (2019-10-30)


### Bug Fixes

* **firestore:** fix setting up firestore with firebase admin ([e042d92](https://github.com/ecomclub/app-correios/commit/e042d921520a5f088605b030405206b871a84ed6))

### [0.0.4](https://github.com/ecomclub/app-correios/compare/v0.0.3...v0.0.4) (2019-10-30)


### Bug Fixes

* **local:** require correios offline client first (prevent reload) ([2609aed](https://github.com/ecomclub/app-correios/commit/2609aedace9df8181095db025ea60d256cf476e6))

### [0.0.3](https://github.com/ecomclub/app-correios/compare/v0.0.2...v0.0.3) (2019-10-29)


### Features

* **calculate-shipping:** handling shipping calculate request ([80938a5](https://github.com/ecomclub/app-correios/commit/80938a504c0a8581ece32aa3f54036db6c509b4f))
* **ecom-webhooks:** add/remove Correios contracts on local database ([888c2de](https://github.com/ecomclub/app-correios/commit/888c2de4c37c7eb28c05b468f05da2ea3d951d1a))


### Bug Fixes

* **calculate-shipping:** fix reading 'correios_contract' from config ([07d32db](https://github.com/ecomclub/app-correios/commit/07d32dbc669f39cda45d86bc616abda7a2de909f))
* **calculate-shipping:** fix reading 'services' from config ([b335937](https://github.com/ecomclub/app-correios/commit/b335937a42b44c5ddd4ddf229ce3b5174c3553b8))
* **calculate-shipping:** fix require paths to lib ([c8438d2](https://github.com/ecomclub/app-correios/commit/c8438d20fcead90393f15c1ea6e7ed2391eb1f22))
* **correios-offline:** fix client list method ([36c8c1a](https://github.com/ecomclub/app-correios/commit/36c8c1aefc8ea259603dddc5ee2e2cb2cafd506c))

### 0.0.2 (2019-10-28)


### Features

* **correios-offline:** method to calculate and save correios responses ([199ec43](https://github.com/ecomclub/app-correios/commit/199ec43dc8d91be7fbb3b08077d88566e91fb403))
* **correios-offline:** method to update all correios offline data ([0548f1a](https://github.com/ecomclub/app-correios/commit/0548f1ab441fa73ea090b60e07d10b7d8744c9de))
* **firestore:** setup firestore client and methods ([c8c6496](https://github.com/ecomclub/app-correios/commit/c8c6496ba2098929869e966ceede33cfeb2e7ffb))
* **local:** clear correios offline docs older than 15 days ago ([f4bae9d](https://github.com/ecomclub/app-correios/commit/f4bae9dad2ca283699c5b456ad5ea3f63edb8d98))
* **local:** intervals to update Correios offline database ([a2c77ce](https://github.com/ecomclub/app-correios/commit/a2c77ce7793e2afbb24b2ec96d7494e85d380f7f))
* **procedures:** setup store api procedures ([e07575b](https://github.com/ecomclub/app-correios/commit/e07575b2549559e605b2b8e6ed93b2e6b27d41b3))
* **routes:** add correct app routes on express router ([adca7db](https://github.com/ecomclub/app-correios/commit/adca7dbd237966fbd9865fa72c9f3fc50a2c6fd8))


### Bug Fixes

* **local:** set bigger interval for correios offline update ([00d0b18](https://github.com/ecomclub/app-correios/commit/00d0b18ac22fcb8771d4805a938a84f4e0118d79))
