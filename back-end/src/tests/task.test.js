const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const sinon = require('sinon');
const connection = require('../db/connection');
chai.use(chaiHttp);

const { expect } = chai;

const returnTest = [{
  id: 1,
  task_name: "teste",
  started: "2024-02-14T03:00:00.000Z",
  is_finish: false
}]

describe('METODO GET', () => {

  it('consulta a rota /tasks', async () => {
    sinon.stub(connection, 'execute').resolves(returnTest);

    const request = await chai.request(app).get('/tasks');

    expect(request.body).to.deep.eq(returnTest[0]);
    expect(request.status).to.be.eq(200);

  });

  it('consulta a rota /tasks/:name', async () => {
    sinon.stub(connection, 'execute').resolves([{
      message: "Nenhuma task encontrada"
    }]);

    const request = await chai.request(app).get('/tasks/issoComCertezaNãoÉUmaTask');

    expect(request.body).to.deep.eq({
      message: "Nenhuma task encontrada"
    });
    expect(request.status).to.be.eq(404);
  });

  afterEach(sinon.restore);
})