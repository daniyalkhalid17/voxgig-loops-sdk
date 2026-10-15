# SDK Assessment Notes

## Project
- API: Loops public API
- SDK language: TypeScript
- Generator: Voxgig SDK generator
- License: MIT

## Build and test
- TypeScript build: `npm run build`
- Test command: `npm test`
- Test result: 466 tests; 422 passed, 1 failed, 43 skipped.
- README examples: runnable examples passed in test mode.

## Issue found: Guardian endpoint
- Endpoint: `GET /v1/email-messages/{emailMessageId}/guardian`
- The OpenAPI operation describes a Guardian validation result containing errors and warnings.
- The generated SDK maps this endpoint to a `list` operation.
- The generated definition test expects two list records but receives zero.
- This remains an unresolved generator mapping/test-fixture issue.
- The SDK has not been verified against a live Loops API account.

## Additional generator observations
- Several group endpoints share generated operation selectors, causing selector conflicts.
- The transactional email create and publish endpoints also share a generated selector.
- The generator reports some flow steps as unreachable because their configured calls do not match an available route.

## Scope and limitations
- Tests used generated SDK test-mode fixtures; they do not prove that every endpoint works against the live API.
- This is an unofficial generated client and is not affiliated with or endorsed by the Loops API provider.
