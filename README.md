## Instructions

Clone the repository, after execute Yarn:

```
yarn
yarn dev
```

## Explanation

This api fetches current conversions through a third-party endpoint, and returns BRL, USD, EUR and INR currencies

## Swagger

- `/docs` - Contains a Swagger Page.

## Conversions

- `/v1/convert/{currency}/{value}`:

In `value` insert the number to convert, in `currency` insert the currency.

Example: `/v1/convert/100/USD`

## Tests

To start jest unit tests run:

```
yarn test
```
