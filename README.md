# app-correios

[![CodeFactor](https://www.codefactor.io/repository/github/ecomplus/app-correios/badge)](https://www.codefactor.io/repository/github/ecomplus/app-correios)
[![license mit](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

E-Com Plus app to integrate Correios calculator

[CHANGELOG](https://github.com/ecomplus/app-correios/blob/master/CHANGELOG.md)

## Reference

1. https://apx-mods.e-com.plus/api/v1/calculate_shipping/schema.json?store_id=100
2. https://apx-mods.e-com.plus/api/v1/calculate_shipping/response_schema.json?store_id=100
3. https://www.correios.com.br/a-a-z/pdf/calculador-remoto-de-precos-e-prazos/manual-de-implementacao-do-calculo-remoto-de-precos-e-prazos

### About "Correios offline"

1. https://github.com/victorhramos/correios-offline-opencart/blob/master/src/KauserCorreios/Correios.php
2. https://suporte.boxloja.pro/article/90-faixa-de-ceps-do-brasil
3. https://suporte.boxloja.pro/article/82-correios-calculo-frete

> From direct tests with Correios WS we're also
considering by default:

```js
ValorValorDeclarado = (nVlValorDeclarado - 20.5) * 0.02
```

## Environment variables sample

Variable              | Value
---                   | ---
`LOGGER_OUTPUT`       | `~/app/log/logger.out`
`LOGGER_ERRORS`       | `~/app/log/logger.err`
`LOGGER_FATAL_ERRORS` | `~/app/log/_stderr`
`PORT`                | `3000`
`APP_BASE_URI`        | `https://correios.ecomplus.biz`
`DB_PATH`             | `~/app/db.sqlite`
`ECOM_AUTH_DB`        | `~/app/db.sqlite`
`ECOM_AUTH_UPDATE`    | `enabled`

## Production server

Published at https://correios.ecomplus.biz

### Continuous deployment

When new version is **production ready**,
[create a new release](https://github.com/ecomplus/app-correios/releases)
(or `npm run release`) to run automatic deploy from _master_ branch
and (re)publish the app.
