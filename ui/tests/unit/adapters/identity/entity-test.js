import { moduleFor, test } from 'ember-qunit';
import testCases from './_test-cases';
import apiStub from 'vault/tests/helpers/noop-all-api-requests';

moduleFor('adapter:identity/entity', 'Unit | Adapter | identity/entity', {
  needs: ['service:auth', 'service:flash-messages'],
  beforeEach() {
    this.server = apiStub();
  },
  afterEach() {
    this.server.shutdown();
  },
});

const cases = testCases('identit/entity');

cases.forEach(testCase => {
  test(`entity#${testCase.adapterMethod}`, function(assert) {
    assert.expect(2);
    let adapter = this.subject();
    adapter[testCase.adapterMethod](...testCase.args);
    let { url, method } = this.server.handledRequests[0];
    assert.equal(url, testCase.url, `${testCase.adapterMethod} calls the correct url: ${testCase.url}`);
    assert.equal(
      method,
      testCase.method,
      `${testCase.adapterMethod} uses the correct http verb: ${testCase.method}`
    );
  });
});
