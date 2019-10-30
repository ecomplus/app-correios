# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
