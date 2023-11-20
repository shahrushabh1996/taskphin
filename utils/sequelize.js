function plainRows(rows = []) {
  return rows.map(row => row.dataValues);
}

function plainRow(row = {}) {
  const { dataValues } = row || {};
  return dataValues;
}

function isUniqueKeyViolation(error, key) {
  return error.errors.find(err => err.type === 'unique violation' && err.path === key) !== undefined;
}

module.exports = { 
  plainRows, 
  plainRow,
  isUniqueKeyViolation
}