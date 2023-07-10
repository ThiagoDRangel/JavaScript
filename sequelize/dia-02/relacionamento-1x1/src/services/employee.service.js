const { Address, Employee } = require('../models/');

const getAll = async () => {
  const users = await Employee.findAll({
    include: { model: Address, as: 'addresses' },
  });

  return users;
};

const getById = async (id) => {
  const employee = await Employee.findOne({
      where: { id },
      /*  include: [{
         model: Address, as: 'addresses', attributes: { exclude: ['number'] },
       }],
       Essa configuração remove o campo number do retorno*/
      include: [{ model: Address, as: 'addresses' }],
    });
  return employee;
}

module.exports = { 
  getAll,
  getById,
};