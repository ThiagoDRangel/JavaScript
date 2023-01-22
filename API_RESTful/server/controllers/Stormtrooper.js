import repository from '../repository/Stormtrooper.js';

const Stormtrooper = {
  list(request, response, next) {
    repository.list()
      .then(result => response.json(result))
      .catch(next);
  },
  byId(request, response, next) {},
  create(request, response, next) {},
  updateById(request, response, next) {},
  deleteById(request, response, next) {}
}

export default Stormtrooper;